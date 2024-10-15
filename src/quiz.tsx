import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import { useLocation } from 'react-router-dom';


interface QuizData {
  quizzes: [],
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

// interface Option {
//   optionLetter: string,
//   options: string
// }
const Quiz = () => {
  // const [displayedQuiz, setDisplayedQuiz] = useState<QuizData[]>([])
  const [dark, setDark] = useState(false)
  const location = useLocation()
  const { subject, index, displayedQuiz, selectedSubjectId } = location.state || {}
  const [questionIndex, setQuestionIndex] = useState(0)
  const [subjectIndex, setSubjectIndex] = useState(0)

  // useEffect(() => {
  //   axios.get('https://frontend-quiz-backend.onrender.com/quiz')
  //     .then(response => {
  //       const quizData = response.data as QuizData[];
  //       const allQuizzes = quizData.flatMap(data => data.quizzes);
  //       setDisplayedQuiz(allQuizzes)
  //     })

  //     .catch(error => {
  //       console.error("Fetching data failed:", error);
  //     })
  // }, [])

  const selectedQuiz = displayedQuiz[subjectIndex]
  const totalSubjects = selectedQuiz?.questions.length;

  const handleNextQuestion = () => {
    if (questionIndex < totalSubjects - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  }
  useEffect(() => {
     console.log(selectedSubjectId)
    console.log(displayedQuiz[3])
  }, [])
  
  return (
    <div className={`app py-6 ${!dark ? "bg-light bg-mobile-light bg-[#f4f6fa]" : "bg-dark bg-mobile-dark bg-[#313e51]"} md:py-24 md:px-28`}>
      {/* {displayedQuiz.length > 0 ? displayedQuiz.map((quiz) => {
        return <div key={quiz.id} className=''>
          <p>{quiz.title}</p>
          <p>{quiz.questions.map((question) => {
            return <div key={question.id}>
              <p>{question.question}</p>
            </div>
          })}</p>
        </div>

      }) : (
        <p>Fetching...</p> 
      )} */}
      {
        displayedQuiz ?
          displayedQuiz.map((quiz: QuizData) => {
            return <div key={quiz.id}>
              <div className='flex'>
                <img src={quiz.icon} alt="logo" />
                <p>{quiz?.title}</p>
              </div>
              <main className='flex justify-between items-stretch'>
                <div>
                  <p>Question 1 of 10</p>
                  {quiz.questions.map((question: any) => {
                    return <p key={question.id}>{question.question}</p>
                  })}
                </div>

                <div className='w-full md:w-[48.883rem] '>
                  {quiz.questions.map((question) => {
                    return <div className={`flex p-[0.5rem] md:p-5 w-full ${!dark ? 'bg-white' : 'bg-[#3B4D66] border-[#3B4D66] text-white'} gap-6 items-center flex-start text-[1.125rem] md:text-[1.75rem] font-medium text-[#313E51] rounded-xl md:rounded-3xl border-white border-[0.2rem] hover:border-[#a729f5] cursor-pointer mb-3 md:mb-5`}>
                      <p>{question.options}</p>
                    </div>
                  })

                  }
                  <button onClick={handleNextQuestion} className={`flex p-[0.5rem] md:p-5 w-full ${!dark ? 'bg-[#a729f5] text-white' : 'bg-[#a729f5] border-[#a729f5] text-white'} gap-6 items-center flex-start text-[1.125rem] md:text-[1.75rem] font-medium text-[#313E51] rounded-xl md:rounded-3xl border-white border-[0.2rem] hover:border-[#a729f5] cursor-pointer mb-3 md:mb-5`}>Submit Answer</button>
                </div>
              </main>

            </div>
          }) : "Fetching..."
      }
    </div>
  )
}

export default Quiz