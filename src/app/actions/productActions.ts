'use server';

import { prisma } from '../../lib/prisma';
import { revalidatePath } from 'next/cache';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function createProduct(formData: FormData) {
  try {
    // 1. Extract Product Data
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const subtitle = formData.get('subtitle') as string;
    const shortDescription = formData.get('shortDescription') as string;
    const description = formData.get('description') as string;
    const isPublished = formData.get('isPublished') === 'on';
    const imageFile = formData.get('image') as File | null;

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

    // 3. Upload Image to Supabase Storage
    let imageUrl = '';
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${slug}-${Date.now()}.${fileExt}`;
      
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, buffer, {
          contentType: imageFile.type,
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        return { success: false, error: 'Failed to upload product image to Supabase' };
      }

      const { data: publicUrlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);
        
      imageUrl = publicUrlData.publicUrl;
    }

    // 4. Create Product and Variant inside a Prisma Transaction
    const product = await prisma.$transaction(async (tx) => {
      const newProduct = await tx.product.create({
        data: {
          name,
          slug,
          subtitle,
          shortDescription,
          description,
          isPublished,
          images: imageUrl ? {
            create: {
              url: imageUrl,
              altText: name,
            }
          } : undefined,
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

export async function createVariant(formData: FormData) {
  try {
    const productId = formData.get('productId') as string;
    const sku = formData.get('sku') as string;
    const variantName = formData.get('variantName') as string;
    const price = parseFloat(formData.get('price') as string);
    const mrp = parseFloat(formData.get('mrp') as string);
    const servings = parseInt(formData.get('servings') as string, 10);
    const pricePerServing = parseFloat(formData.get('pricePerServing') as string);
    const stock = parseInt(formData.get('stock') as string, 10);
    const isSubscription = formData.get('isSubscription') === 'on';

    if (!productId || !sku || !variantName || isNaN(price)) {
      return { success: false, error: 'Missing required fields' };
    }

    const variant = await prisma.productVariant.create({
      data: {
        productId,
        sku,
        name: variantName,
        price,
        mrp,
        servings,
        pricePerServing,
        stock,
        isSubscription,
      }
    });

    revalidatePath(`/admin/products/${productId}`);
    revalidatePath('/admin/products');
    revalidatePath('/');

    return { success: true, variantId: variant.id };
  } catch (error: any) {
    console.error('Failed to create variant:', error);
    if (error.code === 'P2002') {
      return { success: false, error: 'A variant with this SKU already exists.' };
    }
    return { success: false, error: error.message || 'An unknown error occurred.' };
  }
}
