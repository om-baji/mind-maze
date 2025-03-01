import React from 'react'
import AttemptCard from './dashboard/attempt-card'
import TopicCard from './dashboard/topic-card'

const Dashboard : React.FC  = () => {

    const topicData = [
        {
            topic: "Computer Science",
            value: "75"
        },
        {
            topic: "Mathematics",
            value: "82"
        },
        {
            topic: "Physics",
            value: "68"
        },
        {
            topic: "Chemistry",
            value: "79"
        },
        {
            topic: "Biology",
            value: "71"
        }
    ]

  return (
    <div className='flex flex-col justify-center '>
      
      <div className='flex gap-4'>
        <AttemptCard attempted='70' />
        <TopicCard topics={topicData}/>
      </div>


    </div>
  )
}

export default Dashboard
