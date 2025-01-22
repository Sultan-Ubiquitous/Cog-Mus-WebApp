'use client';
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import axios from "axios";



export default function Home() {
  const {isLoaded, user} = useUser();

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

    if(user && isLoaded){
      whatToDo();  
    }

  }, [isLoaded, user]);


  if(!isLoaded){
    return <div className="flex justify-center items-center min-h-screen">
      <p className="font-extrabold size-60">Loading....</p>
    </div>
  }


  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Nigru</p>
    </div>
  );
}
