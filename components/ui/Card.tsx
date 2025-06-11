import { useState } from "react";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";

type CardProps = {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  onErrorImage?: string;
};

export default function Card({
  image,
  title,
  subtitle,
  description,
  onErrorImage,
}: CardProps) {
  const [imageSrc, setImageSrc] = useState(image);

  return (
    <div className="bg-surface rounded-[10px] overflow-hidden shadow-md">
      <Image
        src={imageSrc}
        alt={title}
        width={400}
        height={192}
        className="w-full h-48 object-cover"
        onError={() => {
          if (onErrorImage && imageSrc !== onErrorImage) {
            setImageSrc(onErrorImage);
          }
        }}
      />
      <div className="p-4">
        <SectionTitle>{title}</SectionTitle>
        <p className="text-[13px] text-foreground mb-[10px]">{subtitle}</p>
        <p className="text-[13px]">{description}</p>
      </div>
    </div>
  );
}
