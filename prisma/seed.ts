import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Category
  const category = await prisma.category.upsert({
    where: { slug: 'plant-protein' },
    update: {},
    create: {
      slug: 'plant-protein',
      name: 'Plant Protein',
      description: 'Climate-smart plant protein blends.',
    },
  });

  // 2. Create Base Product
  const product = await prisma.product.upsert({
    where: { slug: 'nutrexia-foundation-blend' },
    update: {},
    create: {
      slug: 'nutrexia-foundation-blend',
      name: 'Nutrexia Foundation Blend',
      subtitle: '30g protein • Prebiotics • Daily Vitamins',
      shortDescription: 'Complete plant protein made from millets, peas, and chana.',
      description: 'Nutrexia pairs a complete pea + roasted chana protein matrix with millet-based prebiotic fibre, turmeric and vitamin fortification.',
      categoryId: category.id,
      isPublished: true,
    },
  });

  // 3. Create Variants
  const variants = [
    {
      sku: 'NTRX-TRIAL',
      name: 'Trial Pack',
      price: 249,
      mrp: 399,
      servings: 5,
      pricePerServing: 49.80,
      stock: 500,
      isSubscription: false,
    },
    {
      sku: 'NTRX-1KG',
      name: '1kg Foundation Pouch',
      price: 1650,
      mrp: 2250,
      servings: 33,
      pricePerServing: 50.00,
      stock: 1000,
      isSubscription: false,
    },
    {
      sku: 'NTRX-SUB-QTR',
      name: 'Quarterly Subscription',
      price: 4450,
      mrp: 6750,
      servings: 99,
      pricePerServing: 44.90,
      stock: 9999,
      isSubscription: true,
    },
  ];

  for (const v of variants) {
    await prisma.productVariant.upsert({
      where: { sku: v.sku },
      update: {},
      create: {
        productId: product.id,
        ...v,
      },
    });
  }

  // 4. Create Product Images (Using the single pack.png for now)
  const existingImages = await prisma.productImage.findMany({ where: { productId: product.id }});
  if (existingImages.length === 0) {
    await prisma.productImage.create({
      data: {
        productId: product.id,
        url: '/pack.png',
        altText: 'Nutrexia packaging',
        position: 0,
      }
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
