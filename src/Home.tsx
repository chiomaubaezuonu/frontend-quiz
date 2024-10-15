import './App.css';
import React, { useEffect, useState } from 'react';
import { Switch } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import Header from './Header';
import axios from 'axios'
import { useGlobalContext, DarkTheme } from './context';
 


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

interface Subject {
  id: number,
  img: string,
  subjectName: String
}
const subjects: Subject[] = [
  {
    id: 0,
    img: 'assets/images/icon-html.svg',
    subjectName: 'HTML',
  },
  {
    id: 1,
    img: 'assets/images/icon-css.svg',
    subjectName: 'CSS',
  },
  {
    id: 2,
    img: 'assets/images/icon-js.svg',
    subjectName: 'JS',
  },
  {
    id: 3,
    img: 'assets/images/icon-accessibility.svg',
    subjectName: 'ACCESSIBILITY',
  }
]
function Home() {

  const { darkTheme, setDarkTheme } = useGlobalContext()
  const [displayedQuiz, setDisplayedQuiz] = useState<QuizData[]>([])
  const [selectedSubjectId, setSelectedSubjectId] = useState(0)

  const onChange = (checked: boolean) => {
    checked ? setDarkTheme(checked) : setDarkTheme(false)
  };

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
    // <div className={`app bg-light py-6 ${!dark ? "bg-light bg-[#f4f6fa]" : "bg-dark bg-[#313e51]"} md:py-24 md:px-28`}>
    <div className={`app py-6 ${!darkTheme ? "bg-light bg-mobile-light bg-[#f4f6fa]" : "bg-dark bg-mobile-dark bg-[#313e51]"} md:py-24 md:px-28`}>
      <header className='flex gap-1 md:gap-5 items-center justify-end'>
        <img src="assets/images/icon-sun-dark.svg" alt="sun" />
        <div className=''>
          <Switch defaultChecked={darkTheme} onChange={onChange} />
        </div>
        <img src="assets/images/icon-moon-dark.svg" alt="moon" />
      </header>
      <main className='flex flex-col md:flex-row md:justify-between w-full mt-12 md:mt-24 gap-9 md:gap-6'>
        <div className='flex flex-col gap-4 md:gap-12 pt-2'>
          <h1 className={`${darkTheme ? 'text-white' : 'text-[#313E51]'} text-[2.5rem] md:text-[4rem] leading-[2.5rem] md:leading-[3.6rem]`}>Welcome to the <span className='font-medium'>Frontend Quiz!</span> </h1>
          <p className={` ${darkTheme ? 'text-[#ABC1E1]' : 'text-[#626C7F]'} text-[0.875rem] md:text-[1.25rem] italic font-normal mt-[-0.2rem]`}>Pick a subject to get started.</p>
        </div>
        <div className='w-full md:w-[48.883rem]' >
          {subjects.map((subject) => {
            return <Link to='/quiz' state={{ subject, displayedQuiz, selectedSubjectId }} key={subject.id}>
              <div className={`flex p-[0.5rem] md:p-5 w-full ${!darkTheme ? 'bg-white' : 'bg-[#3B4D66] border-[#3B4D66] text-white'} gap-6 items-center flex-start text-[1.125rem] md:text-[1.75rem] font-medium text-[#313E51] rounded-xl md:rounded-3xl border-white border-[0.2rem] hover:border-[#a729f5] cursor-pointer mb-3 md:mb-5`} onClick={() => subject.id ? setSelectedSubjectId(subject.id) : ""}>
                <img src={subject.img} alt="logo" />
                <p>{subject.subjectName}</p>
              </div>
            </Link>
          })

          }
        </div>
        <p>{selectedSubjectId}</p>
      </main>
    </div>
  );
}

export default Home;



