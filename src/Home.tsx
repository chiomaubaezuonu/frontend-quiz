import './App.css';
import React, { useEffect, useState } from 'react';
import { Switch, Flex, Progress } from 'antd';
import Header from './Header';
import axios from 'axios'
import { useGlobalContext } from './context';



interface QuizData {
  quizzes: [],
  _id: string,
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

const backgroundColors = ['bg-[#FFF1E9]', 'bg-[#E0FDEF]', 'bg-[#EBF0FF}', 'bg-[#F6E7FF]'];

interface Subject {
  id: number,
  img: string,
  subjectName: String,
  backgroundColor: String
}

const subjects: Subject[] = [
  {
    id: 0,
    img: 'assets/images/icon-html.svg',
    subjectName: 'HTML',
    backgroundColor: 'bg-[#FFF1E9]'
  },
  {
    id: 1,
    img: 'assets/images/icon-css.svg',
    subjectName: 'CSS',
    backgroundColor: 'bg-[#E0FDEF]'
  },
  {
    id: 2,
    img: 'assets/images/icon-js.svg',
    subjectName: 'JavaScript',
    backgroundColor: 'bg-[#EBF0FF]'
  },
  {
    id: 3,
    img: 'assets/images/icon-accessibility.svg',
    subjectName: 'Accessibility',
    backgroundColor: 'bg-[#F6E7FF]'
  }
]

function Home() {

  const { darkTheme } = useGlobalContext()
  const [totalQuiz, setTotalQuiz] = useState<QuizData[]>([])
  const [subjectList, setSubjectList] = useState(true)
  const [selectedQuiz, setSelectedQuiz] = useState<QuizData | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0)
  const [scorePage, setScorePage] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [buttonText, setButtonText] = useState("Submit Answer")
  const [disableOptions, setDisableOptions] = useState(false)

  useEffect(() => {
    axios.get('https://frontend-quiz-backend.onrender.com/quiz')
      .then(response => {
        setTotalQuiz(response.data[0].quizzes || [])
      })

      .catch(error => {
        console.error("Fetching data failed:", error);
      })
  }, [])

  const handleShowQuiz = (subjectId: any) => {
    setSubjectList(false)
    if (subjectId !== null && subjectId !== undefined && totalQuiz.length > 0) {
      const selectedQuiz = totalQuiz.find((eachQuiz, index) => index === subjectId)
      if (selectedQuiz) {
        setQuestionIndex(0)
        setTotalScore(0)
        setSelectedQuiz(selectedQuiz)
      } else {

        console.log('No quiz found for this subjectId');

      }
    }
  }

  const handleSubmit = () => {
    //first if statement prevents user from going to next question without selecting an option
    // if (selectedQuiz?.questions[questionIndex].options.includes(selectedOption)) {
    //   setButtonText("Next Question")
    //   // setQuestionIndex(questionIndex + 1)
    // } else {
    //   return ""
    // }
    // second if statement checks if selected option matches fetched answer
    // if (selectedQuiz?.questions[questionIndex].answer === selectedOption) {
    //   setTotalScore(totalScore + 1)
    //   setIsCorrect(true)
    // }
    // else {
    //   setIsCorrect(false)
    // }

    // if (questionIndex === 9) {
    //   setScorePage(true)
    //   setSubjectList(true)
    // }



    //new
    if (!selectedQuiz?.questions[questionIndex].options.includes(selectedOption)) {
      return;
    }
    setButtonText("Next Question")
    setDisableOptions(true)

    if (selectedOption === selectedQuiz.questions[questionIndex].answer) {
      setIsCorrect(true)
      setTotalScore(totalScore + 1)
    }
    else {
      setIsCorrect(false)
    }
    if (buttonText === "Next Question") {
      setQuestionIndex(questionIndex + 1)
      setButtonText("Submit Answer")
      setDisableOptions(false)
    }

    if (questionIndex === 9) {
      setScorePage(true)
      setSubjectList(true)
    }
  }

  interface BgColors {
    HTML: string;
    CSS: string;
    JavaScript: string;
    Accessibility: string;
  }


  const bgColors: BgColors = {
    HTML: 'bg-[#FFF1E9]',
    CSS: 'bg-[#E0FDEF]',
    JavaScript: 'bg-[#EBF0FF]',
    Accessibility: 'bg-[#F6E7FF]'
  }
  useEffect(() => {
    if (selectedQuiz) {
      setProgressPercentage(questionIndex * selectedQuiz?.questions.length)
    }
  }, [questionIndex]);

  const restartQuiz = () => {
    setSubjectList(true)
    setScorePage(false)
    setDisableOptions(false)
    setButtonText("Submit Answer")
    setTotalScore(0)
  }

  return (
    <div className={`app py-6 ${!darkTheme ? "bg-light bg-mobile-light bg-[#f4f6fa]" : "bg-dark bg-mobile-dark bg-[#313e51]"} md:py-24 md:px-28`}>
      {/* if subjectList is true, display just header component. else display header, imported icon and title */}
      {subjectList ?
        <Header />
        :
        <div className='flex justify-between'>
          <div className='flex gap-6 items-center'>
            <img src={selectedQuiz?.icon} alt="logo" className={`rounded-2xl px-2 py-2 ${bgColors[selectedQuiz?.title as keyof BgColors]} `} />
            <p className='text-3xl'>{selectedQuiz?.title}</p>
          </div>
          <Header />
        </div>
      }

      {/* if subjectList is true, display Welcome note  */}
      {subjectList ?
        <main className='flex flex-col md:flex-row md:justify-between w-full mt-12 md:mt-24 gap-9 md:gap-6'>
          <div className='flex flex-col gap-4 md:gap-12 pt-2'>
            <h1 className={`${darkTheme ? 'text-white' : 'text-[#313E51]'} text-[2.5rem] md:text-[4rem] leading-[2.5rem] md:leading-[3.6rem]`}>{scorePage ? 'Quiz completed ' : 'Welcome to the'}
              <span className='font-medium'>{scorePage ? 'You scored...' : 'Frontend Quiz!'}</span> </h1>
            {scorePage ? " " : <p className={` ${darkTheme ? 'text-[#ABC1E1]' : 'text-[#626C7F]'} text-[0.875rem] md:text-[1.25rem] italic font-normal mt-[-0.2rem]`}>Pick a subject to get started.</p>}

          </div>
          {/* If scorePage is false, display subjectList besides welcome note else dispay score bpard */}
          {!scorePage ?
            <div className='w-full md:w-[48.883rem]' >
              {subjects.map((subject) => {
                return <div onClick={() => handleShowQuiz(subject.id)} key={subject.id} className={`flex p-[0.5rem] md:p-5 w-full ${!darkTheme ? 'bg-white' : 'bg-[#3B4D66] border-[#3B4D66] text-white'} gap-6 items-center flex-start text-[1.125rem] md:text-[1.75rem] font-medium text-[#313E51] rounded-xl md:rounded-3xl border-[0.2rem] hover:border-[#a729f5] cursor-pointer mb-3 md:mb-5 `}>
                  <img src={subject.img} alt="logo" className={`${subject.backgroundColor} rounded-xl px-2 py-2`} />
                  <p>{subject.subjectName}</p>
                </div>
              }
              )}
            </div> :
            <div>
              <div className={`w-full md:w-[34.883rem] shadow-lg rounded-xl p-12 gap-10 md:rounded-3xl ${!darkTheme ? 'bg-white' : 'bg-[#3B4D66] border-[#3B4D66] text-white'}`} >
                <div className='flex justify-center items-center gap-6'>
                  <img src={selectedQuiz?.icon} alt="logo" className={`rounded-xl px-2 py-2 ${bgColors[selectedQuiz?.title as keyof BgColors]}`} />
                  <p>{selectedQuiz?.title}</p>
                </div>
                <p className='text-center text-[9rem]'>{totalScore}</p>
                <p className='text-2xl text-center'>out of 10</p>
              </div>
              <button onClick={restartQuiz} className={`flex justify-center p-[0.5rem] mt-8 md:p-6 w-full ${!darkTheme ? 'bg-[#a729f5] text-white' : 'bg-[#a729f5] border-[#a729f5] text-white'} gap-6  text-[1.125rem] md:text-[1.75rem] font-medium text-[#313E51] rounded-xl md:rounded-3xl cursor-pointer mb-3 md:mb-5`}>Play again</button>
            </div>
          }

        </main>
        :
        <div>
          {
            selectedQuiz !== null && !subjectList ?
              <div>
                <main className='flex justify-between items-stretch transition-all' >
                  <div>
                    <p>Question {questionIndex <= 9 ? questionIndex + 1 : ''} of {selectedQuiz?.questions.length}</p>
                    <p>{selectedQuiz.questions[questionIndex]?.question}</p>
                    {scorePage && subjectList ? " " :
                      <Flex gap="small" vertical className='mt-16'>
                        <Progress percent={progressPercentage} showInfo={false} />
                      </Flex>}
                  </div>

                  <div className='w-full md:w-[48.883rem]'>
                    {selectedQuiz.questions[questionIndex]?.options.map((option, index) => {
                      return <div key={index} onClick={() => setSelectedOption(option)} className={`${selectedOption === option ? 'border-[0.2rem] border-[#a729f5]' : ''}
                        ${buttonText === "Next Question" ? (isCorrect ? 'border-green-500' : 'border-red-500') : ""}
                        ${disableOptions ? 'pointer-events-none' : ''}
                      flex p-[0.5rem] md:p-5 w-full ${!darkTheme ? 'bg-white' : 'bg-[#3B4D66] border-[#3B4D66] text-white'} gap-6 items-center flex-start text-[1.125rem] md:text-[1.75rem] font-medium text-[#313E51] rounded-xl md:rounded-3xl    cursor-pointer mb-3 md:mb-5`}>
                        <p className={`text-[#626C7F] hover:text-[#a729f5] ${selectedOption === option ? 'bg-[#a729f5] text-white' : 'bg-[#F4F6FA]'} hover:bg-[#f0d9e7] rounded-2xl px-6 py-3 
                        ${buttonText === "Next Question" && selectedOption === option ? (isCorrect ? 'bg-green-500' : 'bg-red-500') : ""}
                          `}>{String.fromCharCode(65 + index)}</p>
                        <p>{option}</p>
                        {/* Restart here after making app responsive */}
                        {/* {selectedOption && selectedOption === option  ? 
                       ( buttonText !== "Next question" && isCorrect ?
                          <img src='assets/images/icon-correct.svg' alt='correct-answer' />
                          :
                          <img src='assets/images/icon-incorrect.svg' alt='incorrect-answer' />
                       )
                        : ""        
                        } */}
                      </div>
                    })
                    }
                    <button onClick={handleSubmit} className={`flex justify-center p-[0.5rem] md:p-5 w-full ${!darkTheme ? 'bg-[#a729f5] text-white' : 'bg-[#a729f5] border-[#a729f5] text-white'} 
                       gap-6 items-center flex-start text-[1.125rem] md:text-[1.75rem] font-medium text-[#313E51] rounded-xl md:rounded-3xl border-white border-[0.2rem] hover:border-[#a729f5] cursor-pointer mb-3 md:mb-5`}>{buttonText}</button>
                  </div>
                </main>
              </div>
              : "Fetching..."
          }

        </div>
      }
    </div>
  );
}

export default Home;
