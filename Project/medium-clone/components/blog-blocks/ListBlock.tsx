interface ListItem {
  content: string;
  items?: ListItem[];
}

interface ListBlockProps {
  style: "ordered" | "unordered";
  items: ListItem[];
  id: string;
}

function renderItems(items: ListItem[]) {
  return items.map((item, index) => (
    <li key={index} className="my-1 pl-1">
      <span dangerouslySetInnerHTML={{ __html: item.content }} />
      {item.items && item.items.length > 0 && (
        <ul className="ml-5 mt-1 list-disc">
          {renderItems(item.items)}
        </ul>
      )}
    </li>
  ));
}

export default function ListBlock({ style, items, id }: ListBlockProps) {
  const baseClass =
    "font-['Source_Serif_4'] text-[18px] md:text-[20px] leading-[28px] md:leading-[32px] text-[#1a1c1c] my-5 ml-6 space-y-1";

  if (style === "ordered") {
    return (
      <ol id={id} className={`${baseClass} list-decimal`}>
        {renderItems(items)}
      </ol>
    );
  }

  return (
    <ul id={id} className={`${baseClass} list-disc`}>
      {renderItems(items)}
    </ul>
  );
}
