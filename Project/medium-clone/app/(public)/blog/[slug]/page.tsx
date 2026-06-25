import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import BlockRenderer from "@/components/blog-blocks/BlockRenderer";
import LikeButton from "@/components/blog-blocks/LikeButton";
import { CommentButton } from "@/components/blog-blocks/CommentSection";
import { Bookmark } from "lucide-react";
import BookmarkButton from "@/components/blog-blocks/BookmarkButton";

interface Post {
  id: string;
  title: string;
  slug: string;
  author: string;
  createdAt: string;
  category: string;
  content: {
    blocks: any[];
  };
  bannerImage?: string;
}

async function getPost(slug: string): Promise<Post> {
  const res = await fetch(`http://localhost:5000/api/blogs/${slug}`, {
    cache: "no-store",
  });
  // console.log(res);

  if (!res.ok) notFound();
  return res.json();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function estimateReadTime(blocks: any[]) {
  const text = blocks
    .map((b) => b.data?.text ?? b.data?.code ?? "")
    .join(" ")
    .replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;
  console.log(slug);
  const post = await getPost(slug);
  const session = await getServerSession();

  const isLoggedIn = !!session?.user;
  const allBlocks = post.content.blocks;

  // Logged-out users only see 40% of blocks
  const visibleBlocks = isLoggedIn
    ? allBlocks
    : allBlocks.slice(0, Math.max(1, Math.floor(allBlocks.length * 0.4)));

  const readTime = estimateReadTime(allBlocks);

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c]">

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-6 h-16 bg-[#f9f9f9] border-b border-[#becab6]/50">
        <Link
          href="/"
          className="font-['Source_Serif_4'] text-[22px] md:text-[26px] font-bold tracking-tight text-[#1a1c1c]"
        >
          MediumRefined
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/write"
            className="hidden md:block text-[14px] font-medium text-[#5f5e5e] hover:text-[#006e05] transition-colors"
          >
            Write
          </Link>
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="text-[14px] font-medium text-[#5f5e5e] hover:text-[#006e05] transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[14px] font-medium text-[#5f5e5e] hover:text-[#006e05] transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="bg-[#1a1c1c] text-white text-[14px] font-medium px-4 py-1.5 rounded-full hover:bg-[#006e05] transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="pt-16">

        {/* ── Banner Image ─────────────────────────────────────────────────── */}
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 mt-10 mb-10">
          <div className="relative w-full h-[280px] md:h-[480px] rounded-lg overflow-hidden bg-[#e8e8e8]">
            <Image
              src={post.bannerImage ?? "/fallback-banner.jpg"}
              alt={post.title}
              fill
              priority
              className="object-contain" // Changed from object-cover
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </div>


        {/* ── Article ──────────────────────────────────────────────────────── */}
        <article className="max-w-[680px] mx-auto px-4">

          {/* Title */}
          <h1 className="font-['Source_Serif_4'] text-[30px] md:text-[46px] font-bold leading-tight tracking-tight text-[#1a1c1c] mb-4">
            {post.title}
          </h1>
          <p className="text-[#006e05] text-sm">({post?.category.toUpperCase()})  </p>
          <br />

          {/* Meta row */}
          <div className="flex items-center justify-between py-4 border-y border-[#becab6]/50 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#e4e2e1] border border-[#becab6] flex items-center justify-center text-[#5f5e5e] font-semibold text-[15px] select-none shrink-0">
                {post.author?.[0]?.toUpperCase() ?? "A"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-medium text-[#1a1c1c]">
                    {post.author}
                  </span>
                  <span className="text-[13px] font-medium text-[#006e05] cursor-pointer hover:underline">
                    Follow
                  </span>
                </div>
                <div className="text-[13px] text-[#5f5e5e]">
                  {readTime} min read · {formatDate(post.createdAt)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookmarkButton />

            </div>
          </div>

          {/* Blocks */}
          <div className={` ${!isLoggedIn ? "pb-0" : "pb-0"}`}>
            <BlockRenderer blocks={visibleBlocks} />

            {/* ── Paywall ───────────────────────────────────────────────── */}
            {!isLoggedIn && (
              <div className="relative top-[-140px] mt-0">
                {/* Fade overlay that blends into the paywall card */}
                <div className="h-40 bg-gradient-to-b from-transparent to-[#f9f9f9] -mb-1" />

                {/* Paywall card */}
                <div className="bg-[#f9f9f9] pt-6 px-2">
                  <div className="border border-[#becab6]/60 rounded-xl p-8 md:p-10 text-center bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] max-w-[520px] mx-auto">
                    <h3 className="font-['Source_Serif_4'] text-[24px] md:text-[28px] font-bold text-[#1a1c1c] mb-3">
                      Keep reading with a free account
                    </h3>
                    <p className="text-[15px] text-[#5f5e5e] font-['Inter'] mb-7 leading-relaxed">
                      MediumRefined is a place for quiet thought. Join readers who value depth over noise.
                    </p>
                    <div className="space-y-3">
                      <Link
                        href="/signup"
                        className="block w-full bg-[#1a1c1c] text-white text-[15px] font-medium py-3 rounded-full hover:bg-[#006e05] transition-colors"
                      >
                        Sign up for free
                      </Link>
                      <Link
                        href="/login"
                        className="block w-full border border-[#becab6] text-[#1a1c1c] text-[15px] font-medium py-3 rounded-full hover:bg-[#f3f3f4] transition-colors"
                      >
                        Sign in
                      </Link>
                    </div>
                    <p className="mt-5 text-[13px] text-[#5f5e5e]">
                      Already a member?{" "}
                      <Link href="/login" className="text-[#006e05] font-semibold hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>
      </main>

      {/* ── Floating interaction bar (only for logged-in users) ───────────── */}
      {isLoggedIn && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full flex items-center gap-6 border border-[#becab6]/60 shadow-lg z-40">
          <LikeButton slug={post.slug} />
          <CommentButton />
          <div className="w-px h-5 bg-[#becab6]" />
        </div>
      )}

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="w-full py-10 px-6 flex flex-col md:flex-row justify-between items-center max-w-[680px] mx-auto border-t border-[#becab6]/40">
        <div className="mb-4 md:mb-0">
          <p className="font-bold text-[15px] text-[#1a1c1c]">MediumRefined</p>
          <p className="text-[13px] text-[#5f5e5e]">© 2024 MediumRefined. All rights reserved.</p>
        </div>
        <nav className="flex gap-5 flex-wrap justify-center">
          {["About", "Terms", "Privacy", "Help"].map((item) => (
            <Link key={item} href="#" className="text-[13px] text-[#5f5e5e] hover:text-[#006e05] transition-colors">
              {item}
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
}

