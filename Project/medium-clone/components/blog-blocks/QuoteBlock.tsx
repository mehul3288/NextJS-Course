interface QuoteBlockProps {
  text: string;
  caption?: string;
  id: string;
}

export default function QuoteBlock({ text, caption, id }: QuoteBlockProps) {
  return (
    <blockquote className="border-l-[3px] border-[#1a8917] pl-6 my-8">
      <p id={id}
        className="font-['Source_Serif_4'] text-[20px] md:text-[22px] leading-[34px] italic text-[#1a1c1c]"
        dangerouslySetInnerHTML={{ __html: text }}
      />
      {caption && (
        <cite className="block mt-2 text-[14px] font-['Inter'] text-[#5f5e5e] not-italic">
          — {caption}
        </cite>
      )}
    </blockquote>
  );
}
