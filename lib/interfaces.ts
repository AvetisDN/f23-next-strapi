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

export interface LogoProps {
  label?: string;
}

export interface HeaderProps {
  data: {
    logo: {
      id: number;
      label: string;
    };
    ctaButton: {
      id: number;
      text: string;
      url: string;
      isExternal: boolean;
    };
  };
}

export interface SocialLink {
  id: number;
  url: string;
  label: string;
  icon: string;
}

export interface FooterProps {
  data: {
    logo: {
      id: number;
      label: string;
    };
    copyright: string;
    social: SocialLink[];
  };
}

export interface RegisterProps {
  username: string;
  email: string;
  password: string;
}
export interface LoginProps {
  identifier: string;
  password: string;
}

export interface StrapiErrorsProps {
  message: string | null;
  name: string;
  status?: string | null;
}

export interface SubmitButtonProps {
  text: string;
  loadingText: string;
  className?: string;
  loading?: boolean;
}

export interface UserInfoProps {
  username: string;
  email: string;
}

export interface AccountFormProps {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  credits: number;
}
export interface AvatarFormProps {
  id: string;
  url: string;
  alternativeText: string | null;
}

export interface ImagePickerProps {
  id: string;
  name: string;
  showCard?: boolean;
  defaultValue?: string;
}

export interface SummaryPayload {
  data: {
    title?: string;
    videoId: string;
    summary: string;
    authorId?: string;
  };
}

export interface SummaryCardProps {
  documentId: string;
  title: string;
  summary: string;
  createdAt: string;
}

export interface SummarySingleProps {
  summaryId: string;
}
export interface SearchParamsProps {
  search?: string;
  page?: string;
}

export interface YtPlayerProps {
  videoId: string;
}

export interface PaginationProps {
  pageCount: number;
}

export interface PaginationArrowProps {
  direction: "prev" | "next";
  href: string;
  isDisabled: boolean;
}
export interface CreatePageUrlInterface {
  (arg1: number): string;
}
export interface PaginationNumberProps {
  current: number;
  pageCount: number;
  createPageURL: CreatePageUrlInterface;
}
