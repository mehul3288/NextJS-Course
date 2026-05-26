import ModalBackdrop from '@/component/modal-backdrop';
import { getNewsItem } from '@/lib/news';
import React from 'react'

async function InterceptedImagePage({ params }) {
    
    const newsSlug = params.newsSlug
    const newsItem =await getNewsItem(newsSlug)
    if (!newsItem) {
        notFound();
    }
    
    return (
        <>
            <ModalBackdrop/>
            <dialog className='modal' open>
                <div className='fullscreen-image'>
                    <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
                </div>
            </dialog>
        </>
    )
}

export default InterceptedImagePage