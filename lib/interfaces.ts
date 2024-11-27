export interface Image {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string;
}

export interface Link {
  id: number;
  text: string;
  url: string;
  isExternal: boolean;
}

export interface HeroSectionProps {
  id: number;
  documentId: string;
  __component: string;
  heading: string;
  subHeading: string;
  image: Image;
  link: Link;
}

export interface StrapiImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
}

export interface FeatureProps {
  id: number;
  heading: string;
  subHeading: string;
  icon: string;
}

export interface FeaturesSectionProps {
  id: number;
  documentId: string;
  __component: string;
  title: string;
  description: string;
  feature: FeatureProps[];
}
