'use client'

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import RewardCard from './RewardCard';
import GetRewardCard from './GetRewardCard';
import { useRouter } from 'next/navigation';
// import { reward, addReward } from './RewardSection';

// export let reward:number = 0;

interface WebCamProps{
  userID:string;
}

const WebCam: React.FC<WebCamProps> = ({userID}) => {
  const router = useRouter();
  const webcamRef = useRef<any>(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [reward, setReward] = useState(0);
  const [countBottle, setCountBottle] = useState(0);
  const [countCan, setCountCan] = useState(0);
  const [message, setMessage] = useState('');
  const [isGetReward, setIsGetReward] = useState(false);
  const [isCapturing, SetIsCapturing] = useState(false);


  const getRewardHandler = () => {
    if(reward == 0){
      setMessage("Total Rewardmu masih 0");
    }
    else{
      setIsGetReward(true);
      setMessage('')
    }
  }

  const rewardHandler = async () => {
    if(reward == 0){
      alert("Reward masih kosong! ");
      setMessage("");
      return;
    }
    try {
      const response = await axios.put(`https://ebin-api.onrender.com/users/${userID}/transaction`, JSON.stringify({ reward: reward, paper: countCan * 100, plastic: countBottle * 125, trashStationID: 'A' }), {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const data = response.data;
      console.log(data);
      alert("Berhasil mengirim reward ke user");
      setCountBottle(0);
      setCountCan(0);
      setReward(0);
      setMessage("");
      router.replace('/');
    }
    catch(error:any){
      console.error(error.message);
    }
  }

  const predictHandler = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    try {
      const response = await axios.post('/api/prediction', JSON.stringify({ imageData: imageSrc }), {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      const data = response.data;
      setPrediction(data);
      console.log(data);
      if(data && data.predictions.length >= 1){
        data.predictions.map((prediction:any) => {
          if (prediction.class == 'plastic bottle'){
            setMessage("Anda berhasil menambahkan botol plastik")
            setCountBottle(countBottle + 1);
            setReward(reward + 100);
          }
          else if(prediction.class == 'can'){
            setMessage("Anda berhasil menambahkan kaleng")
            setCountCan(countCan + 1);
            setReward(reward + 50);
          }
        })
      }
      else{
        setMessage("Tidak terdeteksi sampah botol plastik maupun kaleng");
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  return (
    <div className="flex flex-row items-center justify-around">
      <div className="flex flex-col">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={400}
          height={360}
        />
        <button className = "bg-[#1572A1] text-white border rounded-2xl ml-1 w-full h-8 mt-3" onClick={predictHandler}>Capture</button>
        <button className = "bg-[#1572A1] text-white border rounded-2xl ml-1 w-full h-8 mt-2" onClick={rewardHandler}>Get Reward</button>
      </div>
      {
        isGetReward ? 
        <div>
          {/* <button onClick={()=>{setIsGetReward(false)}}>Back</button> */}
          <GetRewardCard message={message} backHandler={()=>{setIsGetReward(false)}} submitHandler={()=>{}} reward={reward}/>
        </div> 
        : 
        <div>
          <RewardCard count_can={countCan} count_plasticBottle={countBottle} totalReward={reward} message={message}/>
        </div>
      }
    </div>
  );
};

export default WebCam;