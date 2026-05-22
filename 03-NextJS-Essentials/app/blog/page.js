import Link from 'next/link'
import React from 'react'

function BlogPage() {
  return (
    <main>
        <h1>
            The Blog
        </h1>
        <p><Link href="/blog/post-1">Blog Post 1</Link></p>
        <p><Link href="/blog/post-2">Blog Post 2</Link></p>
    </main>
  )
}

export default BlogPage