"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";

import Link from 'next/link'
 
export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}

export default function Home() {

  const {user}=useKindeBrowserClient();

  useEffect(()=>{
console.log("--",user)
  },[user])
    return (
    <div>
     <Header/>

     <Hero/>
    </div>

  );
}
