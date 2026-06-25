import Image from "next/image";

interface ImageBlockProps {
  url: string;
  caption?: string;
  stretched?: boolean;
  id: string;
}

export default function ImageBlock({ stretched, url, caption, id }: ImageBlockProps) {
  return (
    <figure id={id} className="my-10 text-center">
      <Image
        src={url}
        alt={caption || "Article image"}
        width={680}
        height={400}
        className={`inline-block p-1 h-auto rounded-lg ${stretched ? "w-full" : ""}`}

      />
      {caption && (
        <figcaption className="mt-3 text-[13px] font-['Inter'] text-[#5f5e5e]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}