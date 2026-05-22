import { DUMMY_NEWS } from '@/dummy-news';
import React from 'react'

function ImagePage({params}) {
    const newsSlug=params.newsSlug
        const newsItem=DUMMY_NEWS.find(newsItem=>newsItem.slug===newsSlug)
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