import NewsList from '@/component/news-list'
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from '@/lib/news'
import Link from 'next/link';
import React, { Suspense } from 'react'

async function FilterHeader({year,month}){
 const availbleYears = await getAvailableNewsYears();
  let links = availbleYears
  if ((year && !availbleYears.includes(year)) || (month && !getAvailableNewsMonths(year).includes(month))) {
    throw new Error("Invalid filter.")
  }
  if (year && !month) {
    links = getAvailableNewsMonths(year);
  }
  if (year && month) {
    links = [];
  }
  return (
     <header id="archive-header">
        <nav>
          <ul>
            {links.map(link => {
              const href = year ? `/archive/${year}/${link}` : `/archive/${link}`
              return (<li key={link}>
                <Link href={href}>{link}</Link>
              </li>)
            })}
          </ul>
        </nav>
      </header>
  )
}

async function FilteredNews({ year, month }) {
  let news;
  if (year && !month) {
    news = await getNewsForYear(year)
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year,month)
  }
  console.log(news);
  

  let newsContent = <p>No news found for that selected period.</p>
  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />
  }
  return newsContent

}

async function FilteredNewsPage({ params }) {
  const filter = params.filter
  console.log(filter);
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];
 

  
  
  return (
    <>
    <Suspense fallback={<p>Loading filters...</p>}>
       <FilterHeader year={selectedYear} month={selectedMonth} />
    </Suspense>
     <Suspense fallback={<p>Loading news...</p>}>
       <FilteredNews year={selectedYear} month={selectedMonth}/>
     </Suspense>
    </>
  )
  // const news=getNewsForYear(newsYear)
  //   return (
  //  <NewsList news={news}/>
  //   )
}

export default FilteredNewsPage