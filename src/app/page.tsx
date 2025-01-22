'use client';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";



export default function Home() {
  const {isLoaded, user} = useUser();
    const [musicPermission, setMusicPermission] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: string) =>{
    router.push(path);
  }

  useEffect(()=>{
    //checks if first time signing in or not
    const checkFirstSignIn = ()=>{
      if(user?.publicMetadata?.firstSignIn !== false){
        return true;
      } else {
        return false;
      }
    }


    //generates a random number
    function generateRandomNumber(){
      return Math.floor(Math.random()*10) + 1;
    }


    //assigns a group based on the random number generated
    const assignGroup = async()=>{
      if(generateRandomNumber()%2===0){
        try{
          await axios.post('/api/intervention', {
            userId: user?.id
          });
          console.log("INTERVENTIONNNNNNNNNNNNNNNNNNNNN");
          
        } catch(error){
          console.error('Error updating metadata', error);
        }
      } else{
        try{
          await axios.post('/api/nonintervention', {
            userId: user?.id
          });
          console.log("NOT INTERVENTIONNNNNNNNNNNNNNNNNNNNN");
        } catch(error){
          console.error('Error updating metadata', error);
        }
      }
    }


    //Changes status to not first time signed in
    const updateFirstSignIn = async()=>{

        try{
          await axios.post('/api/public', {
            userId: user?.id
          });
          console.log("SignInUpdateddddddddddd");

        } catch (error) {
          console.error('Error updating metadata:', error);
          
        }
    };


    //flow of actions and tasks 
    const whatToDo = ()=>{
      if(checkFirstSignIn()){
        assignGroup();
        updateFirstSignIn();
      }
    }

    //handling music
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

    if(user && isLoaded){
      whatToDo();
      playMusic();
    }

  }, [isLoaded, user]);


  if(!isLoaded){
    return <div className="flex justify-center items-center min-h-screen">
      <p className="font-extrabold size-60">Loading....</p>
    </div>
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
  <p className="text-2xl font-bold text-gray-800 mb-8">Choose which game to play</p>
  <div className="flex flex-wrap gap-10 justify-center">
    <div className="max-w-xs w-full bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Stroop</h2>
      <p className="text-sm text-gray-600 mb-4">
        Test your reaction and cognitive skills by matching colors with their names!
      </p>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200" onClick={()=>handleNavigation("/games/stroop-test")}>
        Play Stroop
      </button>
    </div>
    <div className="max-w-xs w-full bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Simon&apos;s Game</h2>
      <p className="text-sm text-gray-600 mb-4">
        Challenge your memory by repeating sequences in Simon&apos;s Game!
      </p>
      <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200" onClick={()=>handleNavigation("/games/simon-game")}>
        Play Simon&apos;s Game
      </button>
    </div>
    {musicPermission && <div className="max-w-xs w-full bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Music</h2>
      <p className="text-sm text-gray-600 mb-4">
          Only listen to music
      </p>
      <button className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200" onClick={()=>handleNavigation("/music")}>
        Listen to Music
      </button>
    </div>}
  </div>
</div>

  );
}
