import ParagraphBlock from "./ParagraphBlock";
import HeaderBlock from "./HeaderBlock";
import QuoteBlock from "./QuoteBlock";
import ImageBlock from "./ImageBlock";
import CodeBlock from "./CodeBlock";
import ListBlock from "./ListBlock";

interface Block {
  id: string;
  type: string;
  data: Record<string, any>;
}

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.type) {
          case "paragraph":
            return <ParagraphBlock id={block.id} key={block.id} text={block.data.text} />;

          case "header":
            return (
              <HeaderBlock
                id={block.id}
                key={block.id}
                text={block.data.text}
                level={block.data.level ?? 2}
              />
            );

          case "quote":
            return (
              <QuoteBlock
                id={block.id}
                key={block.id}
                text={block.data.text}
                caption={block.data.caption}
              />
            );

          case "image":
            return (
              <ImageBlock
                id={block.id}
                stretched={block.data.stretched}
                key={block.id}
                url={block.data.file?.url}
                caption={block.data.caption}
              />
            );

          case "code":
            return <CodeBlock id={block.id} key={block.id} code={block.data.code} />;

          case "list":
            return (
              <ListBlock
                id={block.id}
                key={block.id}
                style={block.data.style}
                items={block.data.items}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}
