import { FeaturesSectionProps } from "@/lib/interfaces";
import FeaturesItem from "./features-item";

const FeaturesSection = ({ data }: { readonly data: FeaturesSectionProps }) => {
  const { feature, title, description } = data;
  return (
    <div className="container mx-auto p-4 flex flex-col gap-4 mt-6">
      <div className="text-center">
        <h2 className="mb-2 text-2xl lg:text-3xl font-bold">{title}</h2>
        <p className="text-lg text-muted">{description}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-3 gap-4">
        {feature.map((item) => (
          <FeaturesItem data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
