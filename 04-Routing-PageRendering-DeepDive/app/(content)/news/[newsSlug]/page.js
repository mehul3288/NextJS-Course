import { DUMMY_NEWS } from '@/dummy-news'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

function NewsDetailsPage({params}) {
    const newsSlug=params.newsSlug
    const newsItem=DUMMY_NEWS.find(newsItem=>newsItem.slug===newsSlug)
    if(!newsItem){
        notFound();
    }
  return (
    <article className='news-article'>
        <header>
            <Link href={`/news/${newsItem.slug}/image`}>
            <img src={`/images/news/${newsItem.image}`} alt={newsItem.title}/>
            </Link>
            <h1>{newsItem.title}</h1>
            <time dateTime={newsItem.date}>{newsItem.date}</time>
            <p>
                {newsItem.content}
            </p>
        </header>
    </article>
  )
}

export default NewsDetailsPage