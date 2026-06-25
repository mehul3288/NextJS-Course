import { authOptions } from '@/lib/options';
import { getTrainings } from '@/lib/training';
import { getServerSession } from 'next-auth';
// import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

export default async function TrainingPage() {
 const session= await getServerSession(authOptions);
 if(!session){
    redirect("/login")
 } 

//here we cannot use use client because getTraining is fetching from db so its server function and hence if we make it client it will throw error like fs is not defined becuases fs is not available on client side when using db which internally uses fs
// const router=useRouter();

//  const {data:session,status}=useSession()

//  useEffect(()=>{
//   if(status==="unauthenticated"){
//     router.push("/login")
//   }
//  },[status,router])

 const trainingSessions = getTrainings();

  return (
    <main>
      <h1>Find your favorite activity</h1>
      <ul id="training-sessions">
        {trainingSessions.map((training) => (
          <li key={training.id}>
            <img src={`/trainings/${training.image}`} alt={training.title} />
            <div>
              <h2>{training.title}</h2>
              <p>{training.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
