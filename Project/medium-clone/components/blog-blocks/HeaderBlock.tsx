import TextAnnotator from "./HighlightSelection";

interface HeaderBlockProps {
  text: string;
  level: 1 | 2 | 3;
  id: string;
}

const styles = {
  1: "font-['Source_Serif_4'] text-[32px] md:text-[40px] leading-tight font-bold tracking-tight text-[#1a1c1c] mt-10 mb-4",
  2: "font-['Source_Serif_4'] text-[24px] md:text-[28px] leading-tight font-bold tracking-tight text-[#1a1c1c] mt-8 mb-3",
  3: "font-['Inter'] text-[20px] leading-tight font-semibold text-[#1a1c1c] mt-6 mb-2",
} as const;

const headingTags = {
  1: "h1",
  2: "h2",
  3: "h3",
} as const;

export default function HeaderBlock({ text, level, id }: HeaderBlockProps) {
  const Tag = headingTags[level];

  return (
    <TextAnnotator>
      <Tag
        id={id}
        className={styles[level]}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </TextAnnotator>

  );
}