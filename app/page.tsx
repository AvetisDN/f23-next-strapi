import FeaturesSection from "@/components/home/features-section";
import HeroSection from "@/components/home/hero-section";
import { getHomePageData } from "@/data/loader";

const blockComponents = {
  "layout.hero-section": HeroSection,
  "layout.features-section": FeaturesSection,
};

function blockRenderer(block) {
  const Component =
    blockComponents[block.__component as keyof typeof blockComponents];
  return Component ? <Component key={block.id} data={block} /> : null;
}

export default async function Home() {
  const strapiData = await getHomePageData();
  const { blocks } = strapiData?.data || [];

  return <>{blocks.map(blockRenderer)}</>;
}
