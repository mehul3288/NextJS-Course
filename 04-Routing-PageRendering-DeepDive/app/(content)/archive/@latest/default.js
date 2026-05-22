import NewsList from '@/component/news-list'
import { getLatestNews } from '@/lib/news'
import React from 'react'

function LatestNewsPage() {
    const latestNews=getLatestNews()
  return (
    <>
    <h2>Latest News</h2>
    <NewsList news={latestNews}/>
    </>
  )
}

export default LatestNewsPage