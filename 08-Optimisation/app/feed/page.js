import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

//http://localhost:8080/post-1?name=Mehul&id=12344
//post-1 ->param
//name and id-> serachParams
export async function generateMetadata(config){
  const posts=await getPosts(1)
  const numberOfPosts=posts.length;
  console.log(posts);
  
  return {
    title:`Browse all our ${numberOfPosts}`,
    description:"Browse all our postsss"
  }
}

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
