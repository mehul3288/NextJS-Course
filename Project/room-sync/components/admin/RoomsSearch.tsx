"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function RoomsSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.get("q") ?? "";

    const handleSearch = useCallback(
        (value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set("q", value);
            } else {
                params.delete("q");
            }
            router.push(`${pathname}?${params.toString()}`);
        },
        [router, pathname, searchParams]
    );

    return (
        <div className="flex items-center gap-md bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-sm w-full max-w-md focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px] shrink-0">
                search
            </span>
            <input
                type="text"
                placeholder="Search rooms or locations..."
                defaultValue={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-transparent border-none outline-none w-full font-body-sm text-body-sm text-on-surface placeholder:text-outline-variant"
            />
        </div>
    );
}