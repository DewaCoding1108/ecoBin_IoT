'use client'
// components/QrScannerComponent.tsx

import React, { useState } from 'react';
import Webcam from 'react-webcam';
import jsQR  from 'jsqr';

interface QRCodeReaderProps{
  submitHandler:any;
  webcamRef:any;
}

const QRCodeReader:React.FC<QRCodeReaderProps> = ({submitHandler, webcamRef}) => {
  const [scannedResult, setScannedResult] = useState<string | null>(null);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className="mb-3 text-black">Silakan tekan Scan QR Code</h1>
      <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={400}
          height={200}
          videoConstraints={{
            facingMode: 'environment',
          }}
        />
        <button className = "bg-[#1572A1] text-white border rounded-2xl ml-1 w-full h-8 mt-3" onClick={submitHandler}>Scan QR Code</button>
      </div>
    </div>
  );
};

export default QRCodeReader;