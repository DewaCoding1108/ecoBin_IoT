import React from 'react'

interface RewardCardProps {
  message:string;
  backHandler:any;
  submitHandler:any;
  reward:number;
}

const GetRewardCard:React.FC<RewardCardProps> = ({message,backHandler, submitHandler, reward}) => {
  return (
    <div className = "flex flex-col">
      <button className = 'self-start mb-3' onClick={backHandler}>Back</button>
      <div className = "flex flex-col border border-black rounded-xl py-8 px-24">
        <div className = "mb-2">
          <h1>Please input your account id</h1>
        </div>
        <input type='text' className="border border-black rounded-xl w-full text-center"></input>
        <h1 className="self-center mt-2">Total Reward : {reward}</h1>
      </div>
      <button className = 'self-center bg-[#1572A1] text-white border rounded-2xl ml-1 w-1/2 h-8 mt-4' onClick={submitHandler}>Submit</button>
      <p className = "mt-2 text-[12px]">{message}</p>
    </div>

  )
}

export default GetRewardCard