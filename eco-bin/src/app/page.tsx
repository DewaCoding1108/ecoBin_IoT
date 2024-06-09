'use client'

import Image from "next/image";
import React, {useState} from 'react'
import WebCam from "./component/WebCam";
import QRCodeReader from "./component/QRCodeReader";
import axios from "axios";
// import { useRouter } from 'next/router';
import { useRouter } from "next/navigation";
import Webcam from 'react-webcam';
import jsQR  from 'jsqr';

export default function Home() {
  const router = useRouter();
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const webcamRef = React.useRef<Webcam>(null); 

  const scanQrCode = async () => {
    const webcam = webcamRef.current;
    if (webcam?.video?.readyState === 4) {
      const canvas = document.createElement('canvas');
      const video = webcam.video;
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      const canvasContext = canvas.getContext('2d');
      if (canvasContext) {
        canvasContext.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const imageData = canvasContext.getImageData(0, 0, video.videoWidth, video.videoHeight);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          try{
            const response = await axios.get(`https://ebin-api.onrender.com/users/${code.data}`,{
              headers: {
                'Content-Type': 'application/json'
              },
            });
            const data = response.data;
            if(response.data){
              setScannedResult(code.data);
              router.replace(`/reward/${code.data}`);
            }
            else{
              alert("User tidak ditemukan");
            }
          }
          catch(error:any){
            console.error(error.message);
            alert("User tidak ditemukan");
          } 
        }
        else{
          alert("QR Code tidak terdeteksi")
        }
      }
    }
  };


  return (
    <main className ="bg-gray-200 pb-28 flex flex-col justify-center items-center">
      <QRCodeReader webcamRef={webcamRef} submitHandler={scanQrCode}/>
      {/* {scannedResult && 
      <div>
        <p>Anda berhasil scan QR Code</p>
        <p>Scanned Result: {scannedResult}</p>
      </div>} */}
    </main>
  );
}
