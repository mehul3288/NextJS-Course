import React from 'react'

function BlogPostPage({params}) {
  return (
    <main>
        <h1>Blog Post</h1>
        <p>{params.slugs}</p>
    </main>
  )
}

export default BlogPostPage