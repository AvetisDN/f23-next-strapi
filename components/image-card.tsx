import React from "react";
import StrapiImage from "./strapi-image";

const ImageCard = ({ dataUrl }: { readonly dataUrl: string }) => {
  return (
    <StrapiImage
      src={dataUrl}
      alt="аватар"
      fill={true}
      className="w-full h-full object-cover rounded-md"
    />
  );
};

export default ImageCard;
