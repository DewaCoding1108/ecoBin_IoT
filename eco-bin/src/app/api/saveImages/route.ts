import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import axios from 'axios';

export async function POST(req:Request){
  try{
    const body = await req.json()
    console.log(body)
    const base64Image = body.imageData.split(';base64,').pop();
    const binaryData = Buffer.from(base64Image, 'base64');
    fs.writeFileSync('./public/images/image.jpg', binaryData);
    
    const response = await axios.post('https://detect.roboflow.com/cans-and-plastic-bottel/1', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: base64Image,
      params: {
              api_key: "TrZa30uWu1523sFfV39Z"
          },
    });
    // axios({
    //   method: "POST",
    //   url: "https://detect.roboflow.com/cans-and-plastic-bottel/1",
    //   params: {
    //       api_key: "TrZa30uWu1523sFfV39Z"
    //   },
    //   data: binaryData,
    //   headers: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //   }
    // })
    // .then(function(response:any) {
    //   console.log(response.data);
    // })
    // .catch(function(error:any) {
    //   console.log(error.message);
    // });
    return new Response('ok');
  }
  catch(error){
    console.error('Error saving image:', error);
    return new Response('Error saving images');
  }
  
}