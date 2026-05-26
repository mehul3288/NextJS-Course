import NewsList from '@/component/news-list'
import { getLatestNews } from '@/lib/news'
import React from 'react'

async function LatestNewsPage() {
    const latestNews=await getLatestNews()
  return (
    <>
    <h2>Latest News</h2>
    <NewsList news={latestNews}/>
    </>
  )
}

export default LatestNewsPage