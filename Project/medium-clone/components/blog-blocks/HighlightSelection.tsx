"use client"
import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

interface Annotation {
  id: string;
  start: number;
  end: number;
  note: string;
  selectedText: string;
}

interface PopoverState {
  x: number;
  y: number;
  start: number;
  end: number;
  selectedText: string;
}

interface TextAnnotatorProps {
  children: ReactElement;
}

export default function TextAnnotator({
  children,
}: TextAnnotatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [popover, setPopover] = useState<PopoverState | null>(null);
  const [note, setNote] = useState("");
  const [isListOpen, setIsListOpen] = useState(false);

  function getTextOffset(
    root: HTMLElement,
    node: Node,
    offset: number
  ): number {
    const range = document.createRange();
    range.setStart(root, 0);
    range.setEnd(node, offset);

    return range.toString().length;
  }

  useEffect(() => {
    const handleMouseUp = () => {
      const root = containerRef.current;

      if (!root) return;

      const selection = window.getSelection();

      if (
        !selection ||
        selection.isCollapsed ||
        selection.rangeCount === 0
      ) {
        return;
      }

      const range = selection.getRangeAt(0);

      if (!root.contains(range.commonAncestorContainer)) {
        return;
      }

      const start = getTextOffset(
        root,
        range.startContainer,
        range.startOffset
      );

      const end = getTextOffset(
        root,
        range.endContainer,
        range.endOffset
      );

      const selectedText = selection.toString().trim();

      if (!selectedText) return;

      const overlap = annotations.some(
        (annotation) =>
          start < annotation.end &&
          end > annotation.start
      );

      if (overlap) {
        alert("Overlapping highlights are not allowed.");
        selection.removeAllRanges();
        return;
      }

      const rect = range.getBoundingClientRect();
      const containerRect = root.getBoundingClientRect();

      setPopover({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top - 50,
        start,
        end,
        selectedText,
      });
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    };
  }, [annotations]);

  const saveAnnotation = () => {
    if (!popover || !note.trim()) return;
    setAnnotations((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        start: popover.start,
        end: popover.end,
        selectedText: popover.selectedText,
        note,
      },
    ]);

    setPopover(null);
    setNote("");
    window.getSelection()?.removeAllRanges();
  };

  return (
    /* Container initialized with relative tracking */
    <div ref={containerRef} className="relative">
      {children}

      {/* Text Selection Floating Popover */}
      {popover && (
        <div
          style={{ top: popover.y, left: popover.x }}
          className="absolute -translate-x-1/2 bg-white border border-gray-200 p-3 rounded-lg shadow-md z-[9999] flex items-center gap-2"
        >
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add note"
            className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-blue-400"
          />

          <button
            onClick={saveAnnotation}
            className="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 cursor-pointer"
          >
            Save
          </button>

          <button
            onClick={() => setPopover(null)}
            className="px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Sticky Right Sidebar Container */}
      {annotations.length > 0 && (
        <div className="absolute top-5 -right-[60px] z-[99999]">
          {/* Toggle Action Button */}
          <button
            onClick={() => setIsListOpen(!isListOpen)}
            className="p-2 bg-blue-400 text-white rounded cursor-pointer whitespace-nowrap shadow-sm hover:bg-blue-500 transition-colors"
          >
            ** ({annotations.length})
          </button>

          {/* Annotations List Popup */}
          {isListOpen && (
            <div className="absolute top-[45px] right-0 w-[280px] bg-white border border-gray-200 rounded-lg p-3 shadow-xl max-h-[300px] overflow-y-auto">
              <h4 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2 mb-2">
                Annotations ({annotations.length})
              </h4>

              <div className="flex flex-col gap-2.5">
                {[...annotations]
                  .sort((a, b) => a.start - b.start)
                  .map((ann) => (
                    <div
                      key={ann.id}
                      className="text-xs p-2 bg-gray-50 rounded border-l-4 border-blue-400"
                    >
                      <div className="italic text-gray-500 mb-1 break-words">
                        "{ann.selectedText}"
                      </div>
                      <div className="font-medium text-gray-900 break-words">
                        {ann.note}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}