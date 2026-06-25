"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import type { OutputData } from "@editorjs/editorjs";
import { useSession } from "next-auth/react";
import { useApiClient } from "@/hooks/useApiClient";

// Dynamically import Editor to avoid SSR issues with EditorJS
const Editor = dynamic(() => import("@/components/editor/Editor"), { ssr: false });

const CATEGORIES = [
  { value: "technology", label: "Technology" },
  { value: "design", label: "Design" },
  { value: "science", label: "Science" },
  { value: "culture", label: "Culture" },
  { value: "politics", label: "Politics" },
  { value: "health", label: "Health & Wellness" },
  { value: "business", label: "Business" },
  { value: "philosophy", label: "Philosophy" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
  { value: "art", label: "Art & Creativity" },
  { value: "fiction", label: "Fiction" },
];

export default function WriteBlogPage() {
  const params = useParams();
  const router = useRouter();
  const session = useSession();
  const api = useApiClient();

  const blogId = params?.id?.[0];
  const isEditMode = !!blogId;

  const [title, setTitle] = useState("");
  const [editorData, setEditorData] = useState<OutputData | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [wordCount, setWordCount] = useState(0);

  // New state
  const [selectedCategory, setSelectedCategory] = useState("");
  const [bannerImageFile, setBanneImageFile] = useState<File | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!blogId) return;

    async function fetchBlog() {
      try {
        const blog = await api(`/blogs/${blogId}`, { method: "GET" }, false);
        setTitle(blog.title);
        setEditorData(blog.content);
        if (blog.category) setSelectedCategory(blog.category);
        if (blog.bannerImage) setBannerImage(blog.bannerImage);

        if (blog.content?.blocks) {
          const text = blog.content.blocks
            .map((block: any) => {
              if (block.type === "paragraph" || block.type === "header") {
                return block.data.text?.replace(/<[^>]*>/g, "") ?? "";
              }
              if (block.type === "list") {
                return (block.data.items ?? []).join(" ");
              }
              return "";
            })
            .join(" ");

          const words = text.split(/\s+/).filter((w: string) => w.length > 0).length;
          setWordCount(words);
        }
      } catch (err) {
        console.error("Failed to fetch blog post:", err);
        alert("Failed to load the blog post.");
        router.push("/write");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlog();
  }, [blogId, api, router]);

  function handleEditorChange(data: OutputData) {
    setEditorData((prevEditorData) => {
      const oldBlocks = prevEditorData?.blocks || [];
      const newBlocks = data.blocks || [];

      if (newBlocks.length < oldBlocks.length) {
        const newBlockIds = new Set(newBlocks.map((block) => block.id));
        const deletedBlock = oldBlocks.find((block) => !newBlockIds.has(block.id));

        if (deletedBlock?.type === "image" && deletedBlock.data?.file?.url) {
          deleteImage(deletedBlock.data.file.url);
        }
      }

      return data;
    });
  }

  async function deleteImage(url: string) {
    await api(`/uploads/image`, { method: "DELETE", body: JSON.stringify({ filename: url.split("/").pop() }) }, false);
  }

  async function uploadBannerImage(file: File) {
    const formData = new FormData();
    formData.append("image", file)
    const response = await fetch("http://localhost:5000/api/uploads/image",
      {
        method: "POST",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        body: formData,
      })

    const result = await response.json()
    return result

    // if (result.success) {
    //   setBannerImage(result.file.url)
    // }

    // return result.file.url
  }

  function handleBannerFile(file: File) {
    setBanneImageFile(file)
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setBannerImage(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  async function handlePublish() {
    if (!title.trim()) {
      alert("Please add a title before publishing.");
      return;
    }
    setIsPublishing(true);

    try {
      // if (bannerImageFile) {
      //     const result=await uploadBannerImage(bannerImageFile);
      //   }
      let uploadedFileUrl = "";
      if (bannerImageFile) {
        const data = await uploadBannerImage(bannerImageFile);
        uploadedFileUrl = data?.file?.url;
      }
      const payload = {
        title,
        content: editorData,
        authorId: session.data?.user?.id,
        author: session.data?.user?.name,
        category: selectedCategory,
        bannerImage: uploadedFileUrl,
      };

      if (isEditMode) {

        const updated = await api("/blogs", {
          method: "POST",
          body: JSON.stringify({ id: blogId, ...payload }),
        });
        alert("Blog updated successfully!");
      } else {

        // Promise.all([uploadBannerImage(banne)]);
        const post = await api("/blogs", {
          method: "POST",
          body: JSON.stringify({ ...payload, createdAt: new Date().toISOString() }),
        });
        alert("Blog published successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while publishing.");
    } finally {
      setIsPublishing(false);
    }
  }

  const progress = Math.min((wordCount / 500) * 100, 100);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center text-[#1a1c1c]">
        <div className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-[#1a8917]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-[#5f5e5e] font-medium text-[16px]">Loading editor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c]">

      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 z-[100] h-[2px] bg-[#1a8917] transition-all duration-200"
        style={{ width: `${progress}%` }}
      />

      {/* ── Top Nav ── */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-6 h-16 bg-[#f9f9f9] border-b border-[#becab6]/50">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="font-['Source_Serif_4'] text-[24px] md:text-[28px] font-bold tracking-tight text-[#1a1c1c]"
          >
            MediumRefined
          </Link>
          <span className="hidden md:block text-[13px] text-[#5f5e5e] border-l border-[#becab6] pl-4">
            {isEditMode ? "Editing Story" : "Draft in Writing"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="bg-[#1a8917] text-white font-medium text-[14px] px-5 py-1.5 rounded-full hover:bg-[#006e05] active:scale-95 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isPublishing ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {isEditMode ? "Saving…" : "Publishing…"}
              </>
            ) : (
              isEditMode ? "Save Changes" : "Publish"
            )}
          </button>

          <div className="w-8 h-8 rounded-full bg-[#e4e2e1] border border-[#becab6] flex items-center justify-center text-[#5f5e5e] text-[13px] font-semibold select-none">
            {session.data?.user?.name ? session.data.user.name[0].toUpperCase() : "U"}
          </div>
        </div>
      </nav>

      {/* ── Editor Canvas ── */}
      <main className="pt-24 pb-24 px-4">
        <div className="max-w-[680px] mx-auto">

          {/* Title input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full bg-transparent border-none outline-none font-['Source_Serif_4'] text-[32px] md:text-[48px] font-bold leading-tight tracking-tight text-[#1a1c1c] placeholder:text-[#becab6] mb-6 caret-[#006e05]"
          />

          {/* Divider */}
          <div className="h-px bg-[#becab6]/40 mb-6" />

          {/* ── Category + Banner ── */}
          <div className="mb-8 flex flex-col gap-5">

            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-[#5f5e5e]">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-64 border border-[#becab6] rounded-lg px-3 py-2 text-[14px] text-[#1a1c1c] bg-white outline-none focus:border-[#1a8917] transition-colors cursor-pointer"
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Banner Image */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-[#5f5e5e]">Banner Image</label>
              {bannerImage ? (
                <div className="flex flex-col gap-2">
                  <img
                    src={bannerImage}
                    alt="Banner preview"
                    className="w-full h-[180px] object-cover rounded-lg border border-[#becab6]"
                  />
                  <div className="flex gap-3">
                    {/* <button
                      type="button"
                      onClick={() => bannerInputRef.current?.click()}
                      className="text-[13px] text-[#1a8917] hover:underline"
                    >
                      Change image
                    </button> */}
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          if (bannerImage && !bannerImage.startsWith("data:")) {
                            await deleteImage(bannerImage);
                          }

                          setBannerImage(null);
                          setBanneImageFile(null);
                        } catch (error) {
                          console.error("Failed to delete banner image:", error);
                          alert("Failed to delete banner image.");
                        }
                      }}
                      className="text-[13px] text-[#9e9b99] hover:text-[#e05555] hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => bannerInputRef.current?.click()}
                  className="w-full h-[100px] border border-dashed border-[#becab6] rounded-lg text-[13px] text-[#9e9b99] hover:border-[#1a8917] hover:text-[#1a8917] transition-colors"
                >
                  + Upload banner image
                </button>
              )}
              <input
                ref={bannerInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleBannerFile(file);
                  e.target.value = "";
                }}
              />
            </div>

          </div>

          {/* Divider before editor */}
          <div className="h-px bg-[#becab6]/40 mb-8" />

          {/* EditorJS */}
          <Editor onChange={handleEditorChange} initialData={editorData} />
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="w-full py-10 px-6 flex flex-col md:flex-row justify-between items-center max-w-[680px] mx-auto border-t border-[#becab6]/40 opacity-50">
        <p className="text-[14px] text-[#5f5e5e] mb-3 md:mb-0">
          © 2024 MediumRefined. All rights reserved.
        </p>
        <nav className="flex gap-6">
          {["Terms", "Privacy", "Help"].map((item) => (
            <Link key={item} href="#" className="text-[14px] text-[#5f5e5e] hover:text-[#006e05] transition-colors">
              {item}
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
}