import NewsList from '@/component/news-list'
import { getAllNews } from '@/lib/news'


async function NewsPage() {
    //Because of this below commented code this page will become a client side page and hence we miss out on that server side rendering advantage over here
    // const [error,setError]=useState()
    // const [loading,setLoading]=useState()
    // const[news,setNews]=useState();
    // useEffect(()=>{
    //     async function fetchNews(){
    //         setLoading(true);
    //         const res=await fetch("http://localhost:8080/news")
    //         if(!res.ok){
    //             setError("Failed to fetch news.")
    //             setLoading(false);
    //         }
    //         const news=await res.json();
    //         setLoading(false);
    //         setNews(news);
    //     }
    //     fetchNews();
    // },[])
    // if(loading){
    //     return <p>Loading...</p>
    // }
    // if(error){
    //     return <p>{error}</p>
    // }

    //The server way if you're backend is separate
    // const res=await fetch("http://localhost:8080/news");
    // if(!res.ok){
    //     throw new Error("Failed to fetch news")
    // }
    // const news=await res.json();

//If you backend is inside nextjs, if you own the db
    const news=await getAllNews();

    // let newsContent;
    //the news here will not be undefined until and unless api throws an error because it is an async function know so it will wait for the response and then only it will execute the jsx code
    // if(news){
    //     newsContent=<NewsList news={DUMMY_NEWS}/>
    // }
    return (
        <>
            <h1>News Page</h1>
            <NewsList news={news}/>
        </>
    )
}

export default NewsPage