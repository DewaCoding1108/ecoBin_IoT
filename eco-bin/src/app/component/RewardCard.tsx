import React from 'react'

interface RewardCardProps {
  totalReward:number;
  count_plasticBottle:number;
  count_can:number;
  message:string;
}

const RewardCard:React.FC<RewardCardProps> = ({totalReward,count_plasticBottle,count_can,message}) => {
  return (
    <div className = "flex flex-col justify-center items-center">
      <div className = "flex flex-row border border-black rounded-xl py-10 px-32">
        <div className = "mr-2">
          <h1>Plastic Bottle</h1>
          <h1>Alumunium Can</h1>
          <h1>Total Reward</h1>
        </div>
        <div className = "mx-2">
          <h1>:</h1>
          <h1>:</h1>
          <h1>:</h1>
        </div>
        <div className = "ml-2">
          <h1>{count_plasticBottle}</h1>
          <h1>{count_can}</h1>
          <h1>{totalReward}</h1>
        </div>
      </div>
      <p className = "mt-2 text-[12px]">{message}</p>
    </div>

  )
}

export default RewardCard