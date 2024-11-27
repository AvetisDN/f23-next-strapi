import { StrapiImageProps } from "@/lib/interfaces";
import { getStrapiMedia } from "@/lib/utils";
import Image from "next/image";

const StrapiImage = ({
  src,
  alt,
  width,
  height,
  fill,
  className,
}: Readonly<StrapiImageProps>) => {
  const imageURL = getStrapiMedia(src);
  if (!imageURL) return null;
  return fill ? (
    <Image src={imageURL} alt={alt} fill={true} className={className} />
  ) : (
    <Image
      src={imageURL}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default StrapiImage;
