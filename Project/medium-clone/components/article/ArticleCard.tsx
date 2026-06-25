import Image from "next/image";
import Link from "next/link";

export interface ArticleCardProps {
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    publication?: string;
    category?: string;
    readTime: number;
    date: string;
    thumbnail?: string;
}

export default function ArticleCard({
    slug,
    title,
    excerpt,
    author,
    publication,
    category,
    readTime,
    date,
    thumbnail,
}: ArticleCardProps) {
    return (
        <article className="flex flex-col md:flex-row gap-5 group">

            {/* Text content */}
            <div className="flex-1 flex flex-col justify-between gap-3 order-2 md:order-1">

                {/* Author line */}
                <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-[#e4e2e1] border border-[#becab6] flex items-center justify-center text-[10px] font-semibold text-[#5f5e5e] shrink-0">
                        {author[0].toUpperCase()}
                    </div>
                    <span className="text-[13px] font-semibold text-[#1a1c1c]">{author}</span>
                    {publication && (
                        <>
                            <span className="text-[13px] text-[#5f5e5e]">in</span>
                            <span className="text-[13px] font-semibold text-[#1a1c1c]">{publication}</span>
                        </>
                    )}
                </div>

                {/* Title + excerpt */}
                <Link href={`/blog/${slug}`} className="block space-y-1.5">
                    <h2 className="font-['Source_Serif_4'] text-[20px] md:text-[22px] font-bold leading-snug text-[#1a1c1c] group-hover:text-[#006e05] transition-colors line-clamp-2">
                        {title}
                    </h2>
                    <p className="text-[15px] text-[#5f5e5e] leading-relaxed line-clamp-2 font-['Inter']">
                        {excerpt}
                    </p>
                </Link>

                {/* Meta row */}
                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-3">
                        <span className="text-[13px] text-[#5f5e5e]">
                            {date} · {readTime} min read
                        </span>
                        {category && (
                            <span className="bg-[#e8e8e8] text-[#3f4a3b] text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full">
                                {category}
                            </span>
                        )}
                    </div>
                    <button
                        aria-label="Bookmark"
                        className="text-[#5f5e5e] hover:text-[#006e05] transition-colors p-1 rounded-full hover:bg-[#f3f3f4]"
                    >
                        <BookmarkIcon />
                    </button>
                </div>
            </div>

            {/* Thumbnail */}
            <Link
                href={`/blog/${slug}`}
                className="w-full md:w-44 h-44 md:h-28 shrink-0 order-1 md:order-2 overflow-hidden rounded-lg bg-[#e8e8e8]"
            >
                {thumbnail ? (
                    <Image
                        src={thumbnail}
                        alt={title}
                        width={176}
                        height={112}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#e4e2e1] to-[#becab6]" />
                )}
            </Link>
        </article>
    );
}

function BookmarkIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>
    );
}