import { prisma } from '../../lib/prisma';
import Hero from '../../components/sections/Hero';
import AudienceTabs from '../../components/sections/AudienceTabs';
import Formulation from '../../components/sections/Formulation';
import NutritionTabs from '../../components/sections/NutritionTabs';
import Comparison from '../../components/sections/Comparison';
import FomoDrop from '../../components/sections/FomoDrop';
import ShopGrid from '../../components/sections/ShopGrid';
import StoryAndClimate from '../../components/sections/StoryAndClimate';
import TestimonialsAndFaq from '../../components/sections/TestimonialsAndFaq';
import Newsletter from '../../components/sections/Newsletter';

export default async function StorefrontPage() {
  const variants = await prisma.productVariant.findMany({
    include: {
      product: {
        include: { images: true }
      }
    },
    orderBy: { price: 'asc' }
  });

  return (
    <>
      <Hero />
      <AudienceTabs />
      <Formulation />
      <NutritionTabs />
      <Comparison />
      <FomoDrop />
      <ShopGrid variants={variants} />
      <StoryAndClimate />
      <TestimonialsAndFaq />
      <Newsletter />
    </>
  );
}
