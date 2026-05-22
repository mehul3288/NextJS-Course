import Link from "next/link";
import Header from "@/components/header";

export default function Home() {
  console.log("Executing....");
  
  return (
    <main>
     <Header/>
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p><Link href="/about">About US</Link></p>
    </main>
  );
}
