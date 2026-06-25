import TextAnnotator from "./HighlightSelection";

interface ParagraphBlockProps {
  text: string;
  id: string
}

export default function ParagraphBlock({ text, id }: ParagraphBlockProps) {
  return (
    <TextAnnotator>
      <p id={id}
        className="font-['Source_Serif_4'] text-[18px] md:text-[20px] leading-[28px] md:leading-[32px] text-[#1a1c1c] my-5"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </TextAnnotator>
  );
}
