'use client';
import SimonsGame from "@/components/SimonGame"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react";
import MusicPlayer from "@/components/MusicPlayback";



export default function page() {
  const {isLoaded, user} = useUser();
  const [musicPermission, setMusicPermission] = useState(false);

  useEffect(()=>{
    const checkGroupStatus = ()=>{
      return user?.publicMetadata?.group;
    }
    const baselineTestStatus =()=>{
      return user?.publicMetadata?.baselineTest;
    }
    const playMusic =()=>{
      if(checkGroupStatus()==='intervention' && baselineTestStatus()==='completed'){
        setMusicPermission(true);
      }
    }
    if(isLoaded && user){
      playMusic();
    }
  }, [isLoaded, user])

  return (
    <div className="min-h-screen flex justify-center items-center gap-36 bg-indigo-950 flex-col">
      {musicPermission && <MusicPlayer/>}
      <SimonsGame/>
    </div>
  )
}
