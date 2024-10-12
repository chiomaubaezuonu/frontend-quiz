import React, { useEffect, useState } from 'react'
import axios from 'axios'


interface QuizData {
  quizzes:[],
  id: string,
  title: string,
  icon: string,
  questions: [
    {
      id: string,
      question: String,
      options: string[],
      answer: string
    },
  ]

}

const Quiz = () => {
  const [displayedQuiz, setDisplayedQuiz] = useState<QuizData[]>([])

  useEffect(() => {
    axios.get('https://frontend-quiz-backend.onrender.com/quiz')
      .then(response => {
        const quizData = response.data as QuizData[];
        const allQuizzes = quizData.flatMap(data => data.quizzes);
        setDisplayedQuiz(allQuizzes)
      })

      .catch(error => {
        console.error("Fetching data failed:", error);
      })
  }, [])
  return (
    <div className='bg-green-400 p-6'>
      {displayedQuiz.length > 0 ? displayedQuiz.map((quiz) => {
        return <div key={quiz.id} className='bg-green-400'>
          <p>{quiz.title}</p>
          <p>{quiz.questions.map((question) => {
            return <div key={question.id}>
              <p>{question.question}</p>
            </div>
          })}</p>
        </div>

      }) : (
        <p>No quiz available</p>
      )}
    </div>
  )
}

export default Quiz



// useEffect(() => {
//   displayedQuiz && displayedQuiz.map((quiz) => {
//     // return console.log(quiz)
//   })
// }, [displayedQuiz])