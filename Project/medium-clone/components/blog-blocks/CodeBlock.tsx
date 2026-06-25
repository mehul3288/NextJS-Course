interface CodeBlockProps {
  code: string;
  id: string;
}

export default function CodeBlock({ code, id }: CodeBlockProps) {
  return (
    <div id={id} className="my-8">
      <pre className="  bg-[#1a1c1c] text-[#f0f1f1] rounded-lg px-6 py-5 overflow-x-auto">
        <code className="font-mono text-[14px] leading-[24px] whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}
