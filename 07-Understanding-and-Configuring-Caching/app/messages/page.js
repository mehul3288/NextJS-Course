import { unstable_noStore } from 'next/cache';

import Messages from '@/components/messages';
import { getMessages } from '@/lib/messages';

//This all reserve names nextjs is looking for so we need to export those constants. They will be applied to request sent from this file only. so its file wide
//file wide setting for revalidate cache time
// export const revalidate=5;

//avoid caching all together file wide
//export const dynamic="force-dynamic" //it is same as to "no-store" request sent using fetch function


export default async function MessagesPage() {
  //this will make sure that data is not cached and you will get the same effect as no-store and now you will get this effect just inside this component but in that component for all the request that might be send to any data source so if you have mulitple components in same page and you want to cache data for some component you can use this. This will disable caching for that specific component
  // unstable_noStore();

  //Interacting with extrernal db;
  // const response = await fetch('http://localhost:8080/messages',{
  //   // cache:"no-store",
  //   next:{
  //     // revalidate:5,
  //     tags:["msg"]
  //   }
  // });
  // const messages = await response.json();

  //NextJS extends fetch function and hence it adds some extra feature to it one is next which takes an object and we can set a expiry time which says for how much time that cache is valid and after that time if a request is send it will fetch fresh data

  //   setTimeout(()=>{
  //   const messages=getMessages();
  //   console.log("Inside setTimeout");
    
  // },5000)
  console.log("Mehul");
  
  const messages=await getMessages()

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}

