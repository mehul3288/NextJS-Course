"use client";

import { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import "./Editor.css";

const EDITOR_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  header: {
    class: Header,
    config: {
      levels: [1, 2, 3],
      defaultLevel: 2,
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: { defaultStyle: "unordered" },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: "Enter a quote",
      captionPlaceholder: "Quote's author",
    },
  },
  image: {
    class: ImageTool,
    config: {
      uploader: {
        async uploadByFile(file: File) {
          const formData = new FormData();
          console.log(file);

          formData.append("image", file);

          const response = await fetch("http://localhost:5000/api/uploads/image",
            {
              method: "POST",
              // headers: {
              //   Authorization: `Bearer ${token}`,
              // },
              body: formData,
            })

          const result = await response.json();

          return {
            success: 1,
            file: {
              url: result.file.url,
            },
          };
        },
        uploadByUrl(url: string) {
          return Promise.resolve({ success: 1, file: { url } });
        },
      },
    },
  },
};

interface EditorProps {
  onChange?: (data: OutputData) => void;
  initialData?: OutputData | null;
}

export default function Editor({ onChange, initialData }: EditorProps) {
  const editorRef = useRef<EditorJS | null>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  // Tracks whether this effect invocation is still the "live" one.
  // When StrictMode unmounts+remounts, the cleanup sets this to false
  // so the pending isReady promise knows to destroy instead of keep.
  const isMounted = useRef(false);

  useEffect(() => {
    // Already initialised — nothing to do
    if (editorRef.current) return;
    if (!holderRef.current) return;

    isMounted.current = true;

    const editor = new EditorJS({
      holder: holderRef.current,
      tools: EDITOR_TOOLS,
      placeholder: "Tell your story…",
      data: initialData || undefined,
      async onChange(api) {
        const data = await api.saver.save();
        onChange?.(data);
      },
    });

    // Wait for EditorJS to finish booting, then check if we're still mounted.
    // If StrictMode already called cleanup by the time isReady resolves,
    // destroy immediately so the DOM is clean for the real mount.
    editor.isReady
      .then(() => {
        if (!isMounted.current) {
          editor.destroy();
        } else {
          editorRef.current = editor;
        }
      })
      .catch(() => { });

    return () => {
      isMounted.current = false;

      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return <div ref={holderRef} id="editorjs-holder" />;
}
