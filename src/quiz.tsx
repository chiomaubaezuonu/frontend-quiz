import React from 'react'
import axios from 'axios'


const Quiz = () => {

axios.get('https://frontend-quiz-backend.onrender.com/quiz')
.then(response => {
    console.log(response.data)
})

  return (
    <div>Quiz</div>
  )
}

export default Quiz