const axios = require("axios");
const fs = require("fs");

export async function POST(req:Request) {
  try{
    const body = await req.json()
    // console.log(body)
    // const base64Image = body.imageData.split(';base64,').pop();
    const base64Image = body.imageData.split(';base64,').pop();
    const binaryData = Buffer.from(base64Image, 'base64');
    fs.writeFileSync('./public/images/image.jpg', binaryData);
    const image = fs.readFileSync('./public/images/image.jpg', {
      encoding: "base64"
    });
    const response = await axios({
      method: "POST",
      url: "https://detect.roboflow.com/irish-canals/2",
      params: {
        api_key: "uX0A3tXlGr7N0iBXb5UE"
      },
      data: image,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  catch(error:any){
    console.log(error.message);
    return new Response('Error saving images');
  }
}