'use client';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";



export default function Home() {
  const {isLoaded, user} = useUser();
  const [musicPermission, setMusicPermission] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    musicalBackground: '',
    listenedToRagas: ''
  });

  const router = useRouter();

  const handleNavigation = (path: string) =>{
    router.push(path);
  }

  
  const checkFirstSignIn = ()=>{
    if(user?.publicMetadata?.firstSignIn !== false){
      return true;
    } else {
      return false;
    }
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/create-user', {
        userId: user?.id,
        email: user?.emailAddresses[0]?.emailAddress,
        firstName: user?.firstName,
        age: parseInt(formData.age),
        sex: formData.sex,
        musicalBackground: formData.musicalBackground,
        listenedToRagas: formData.listenedToRagas
      });
      
      // After successful submission, proceed with the rest of the flow
      assignGroup();
      updateFirstSignIn();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  function generateRandomNumber(){
    return Math.floor(Math.random()*10) + 1;
  }

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

  const whatToDo = ()=>{
  if(checkFirstSignIn()){
    assignGroup();
    updateFirstSignIn();
  }
  }

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



  useEffect(() => {
    if (user && isLoaded) {
      if (checkFirstSignIn()) {
        setShowForm(true); // Show form for first-time users
      } else {
        whatToDo();
        playMusic();
      }
    }
  }, [isLoaded, user]);





  if(!isLoaded){
    return <div className="flex justify-center items-center min-h-screen">
      <p className="font-extrabold size-60">Loading....</p>
    </div>
  }




  if (showForm) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 className="text-2xl font-bold mb-6 text-center">Tell us about yourself</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          required
          min="1"
          max="120"
        />
      </div>
      
      <div>
        <label htmlFor="sex" className="block text-sm font-medium text-gray-700">Sex</label>
        <select
          id="sex"
          name="sex"
          value={formData.sex}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          required
        >
          <option value="">Select an option</option> {/* Added empty default option */}
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      
      <div>
        <fieldset> {/* Added fieldset for better accessibility */}
          <legend className="block text-sm font-medium text-gray-700">Do you have any musical background?</legend>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="musicalBackground"
                value="yes"
                checked={formData.musicalBackground === 'yes'}
                onChange={handleInputChange}
                className="text-blue-600 focus:ring-blue-500"
                required
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="musicalBackground"
                value="no"
                checked={formData.musicalBackground === 'no'}
                onChange={handleInputChange}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </fieldset>
      </div>
      
      <div>
        <fieldset> {/* Added fieldset for better accessibility */}
          <legend className="block text-sm font-medium text-gray-700">Have you listened to Indian Ragas before?</legend>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="listenedToRagas"
                value="yes"
                checked={formData.listenedToRagas === 'yes'}
                onChange={handleInputChange}
                className="text-blue-600 focus:ring-blue-500"
                required
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="listenedToRagas"
                value="no"
                checked={formData.listenedToRagas === 'no'}
                onChange={handleInputChange}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </fieldset>
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  </div>
</div>
    );
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
