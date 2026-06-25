import Link from "next/link";
import Image from "next/image";
import ArticleCard, { ArticleCardProps } from "@/components/article/ArticleCard";

async function getPosts(): Promise<any[]> {
  try {
    const res = await fetch("http://localhost:5000/api/blogs", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function toArticleCard(post: any): ArticleCardProps {
  // Pull plain text excerpt from first paragraph block
  const firstParagraph = post.content?.blocks?.find(
    (b: any) => b.type === "paragraph"
  );
  const excerpt = firstParagraph?.data?.text?.replace(/<[^>]*>/g, "") ?? "";

  const words = post.content?.blocks
    ?.map((b: any) => b.data?.text ?? "")
    .join(" ")
    .replace(/<[^>]*>/g, "")
    .split(/\s+/)
    .filter(Boolean).length ?? 0;

  return {
    slug: post.slug,
    title: post.title,
    excerpt,
    author: post.author ?? "Anonymous",
    category: post.category || undefined,
    readTime: Math.max(1, Math.ceil(words / 200)),
    date: new Date(post.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    thumbnail: post.bannerImage || undefined,
  };
}

export default async function LandingPage() {
  const posts = await getPosts();
  const articles = posts.map(toArticleCard);

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
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-[14px] font-medium text-[#5f5e5e] hover:text-[#006e05] transition-colors">Our story</Link>
          <Link href="#" className="text-[14px] font-medium text-[#5f5e5e] hover:text-[#006e05] transition-colors">Membership</Link>
          <Link href="/write" className="text-[14px] font-bold text-[#006e05] border-b-2 border-[#006e05] pb-0.5">Write</Link>
          <Link href="/login" className="text-[14px] font-medium text-[#5f5e5e] hover:text-[#006e05] transition-colors">Sign in</Link>
          <Link
            href="/signup"
            className="bg-[#1a1c1c] text-white text-[14px] font-medium px-5 py-2 rounded-full hover:bg-[#006e05] transition-colors"
          >
            Get started
          </Link>
        </nav>
        {/* Mobile menu icon */}
        <button className="md:hidden text-[#1a1c1c]" aria-label="Menu">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </header>

      <main className="pt-16">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="bg-white border-b border-[#becab6]/50 py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="font-['Source_Serif_4'] text-[36px] md:text-[56px] font-bold leading-tight tracking-tight text-[#1a1c1c] max-w-md">
                Where good ideas find you
              </h1>
              <p className="text-[17px] text-[#5f5e5e] max-w-sm leading-relaxed font-['Inter']">
                Read and share new perspectives and ideas. A sanctuary for long-form thought and intellectual depth.
              </p>
              <div className="pt-2">
                <Link
                  href="/signup"
                  className="inline-block bg-[#1a8917] text-white text-[16px] font-medium px-8 py-3 rounded-full hover:bg-[#006e05] transition-colors"
                >
                  Start reading
                </Link>
              </div>
            </div>
            <div className="flex-1 hidden md:block">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#e8e8e8]">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoI87bWfFwE1EKVsZ_AyBOpnDEFfcquwOi_adifyObH26IQwpFnep6omaO9q7T2AQSaSUJ8S24Y-KrODW8QVNDvLLLtBO8Zqp0xmqh1J19DjNYvC3z8-Xo9cQVZ0W_pU2e_Mxae3R_zHn32Uvzne6XgeIzmF72-FdzrRqDuMV6WlkYArSALzArUWqNr89iHyTL0sUOjJWkfemmjbQnjLPEkZ1l5H1f_52ZGDFFXWOwJ-l39yR4Lu-l-7dekfCcJgd2iZQatkMZow"
                  alt="MediumRefined"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Articles + Sidebar ───────────────────────────────────────────── */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-12 flex flex-col lg:flex-row gap-16">

          {/* Article list */}
          <div className="flex-1 min-w-0">
            {articles.length === 0 ? (
              <p className="text-[15px] text-[#5f5e5e]">No articles yet. Be the first to write one.</p>
            ) : (
              <div className="space-y-10">
                {articles.map((article, i) => (
                  <div key={article.slug}>
                    <ArticleCard {...article} />
                    {i < articles.length - 1 && (
                      <hr className="mt-10 border-[#becab6]/40" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 space-y-8">

            {/* Recommended topics */}
            <div>
              <h3 className="text-[13px] font-semibold tracking-wide uppercase text-[#5f5e5e] mb-4">
                Recommended topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Psychology", "Philosophy", "Culture", "Technology", "Writing", "Science", "Health"].map((tag) => (
                  <button
                    key={tag}
                    className="bg-[#e8e8e8] text-[#1a1c1c] text-[13px] font-medium px-4 py-2 rounded-full hover:bg-[#becab6]/50 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <hr className="border-[#becab6]/40" />

            {/* Who to read */}
            <div>
              <h3 className="text-[13px] font-semibold tracking-wide uppercase text-[#5f5e5e] mb-4">
                Who to read
              </h3>
              <div className="space-y-4">
                {["James Clear", "Naval Ravikant", "Zadie Smith"].map((name) => (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#e4e2e1] border border-[#becab6] flex items-center justify-center text-[13px] font-semibold text-[#5f5e5e] shrink-0">
                        {name[0]}
                      </div>
                      <span className="text-[14px] font-medium text-[#1a1c1c]">{name}</span>
                    </div>
                    <button className="text-[13px] font-semibold text-[#1a1c1c] border border-[#1a1c1c] px-3 py-1 rounded-full hover:bg-[#1a1c1c] hover:text-white transition-colors">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="w-full py-10 px-6 flex flex-col md:flex-row justify-between items-center max-w-[680px] mx-auto border-t border-[#becab6]/40 mt-6">
        <div className="flex items-center gap-3 mb-3 md:mb-0">
          <span className="font-bold text-[15px] text-[#1a1c1c]">MediumRefined</span>
          <span className="text-[13px] text-[#5f5e5e]">© 2024 All rights reserved.</span>
        </div>
        <nav className="flex gap-5 flex-wrap justify-center">
          {["About", "Terms", "Privacy", "Help", "Archive"].map((item) => (
            <Link key={item} href="#" className="text-[13px] text-[#5f5e5e] hover:text-[#006e05] transition-colors">
              {item}
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
}