import { getNewsItem } from '@/lib/news';
import React from 'react'

async function ImagePage({params}) {
    const newsSlug=params.newsSlug
        const newsItem=await getNewsItem(newsSlug)
        if(!newsItem){
            notFound();
        }
  return (
    <div className='fullscreen-image'>
        <img src={`/images/news/${newsItem.image}`} alt={newsItem.title}/>
    </div>
  )
}

export default ImagePage