'use server';

import { prisma } from '../../lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
  try {
    // 1. Extract Product Data
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const subtitle = formData.get('subtitle') as string;
    const shortDescription = formData.get('shortDescription') as string;
    const description = formData.get('description') as string;
    const isPublished = formData.get('isPublished') === 'on';

    // 2. Extract Initial Variant Data
    const sku = formData.get('sku') as string;
    const variantName = formData.get('variantName') as string;
    const price = parseFloat(formData.get('price') as string);
    const mrp = parseFloat(formData.get('mrp') as string);
    const servings = parseInt(formData.get('servings') as string, 10);
    const pricePerServing = parseFloat(formData.get('pricePerServing') as string);
    const stock = parseInt(formData.get('stock') as string, 10);
    const isSubscription = formData.get('isSubscription') === 'on';

    // Basic Validation
    if (!name || !slug || !shortDescription || !description || !sku || !variantName || isNaN(price)) {
      return { success: false, error: 'Missing required fields' };
    }

    // 3. Create Product and Variant inside a Prisma Transaction
    const product = await prisma.$transaction(async (tx) => {
      const newProduct = await tx.product.create({
        data: {
          name,
          slug,
          subtitle,
          shortDescription,
          description,
          isPublished,
          variants: {
            create: {
              sku,
              name: variantName,
              price,
              mrp,
              servings,
              pricePerServing,
              stock,
              isSubscription,
            }
          }
        },
      });
      return newProduct;
    });

    // 4. Revalidate cache for storefront and admin
    revalidatePath('/');
    revalidatePath('/admin/products');

    return { success: true, productId: product.id };
  } catch (error: any) {
    console.error('Failed to create product:', error);
    
    // Check if it's a unique constraint error (like duplicate Slug or SKU)
    if (error.code === 'P2002') {
      return { success: false, error: 'A product with this Slug or SKU already exists.' };
    }

    return { success: false, error: error.message || 'An unknown error occurred.' };
  }
}
