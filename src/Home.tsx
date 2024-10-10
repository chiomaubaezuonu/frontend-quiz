import './App.css';
import React, { useState } from 'react';
import { Switch } from 'antd';

function Home() {

  const [dark, setDark] = useState(false)
  const onChange = (checked: boolean) => {
    checked ? setDark(true) : setDark(false)
  };

  return (
    // <div className={`app bg-light py-6 ${!dark ? "bg-light bg-[#f4f6fa]" : "bg-dark bg-[#313e51]"} md:py-24 md:px-28`}>
    <div className={`app py-6 ${!dark ? "bg-light bg-mobile-light bg-[#f4f6fa]" : "bg-dark bg-mobile-dark bg-[#313e51]"} md:py-24 md:px-28`}>
      <header className='flex gap-1 md:gap-5 items-center justify-end'>
        <img src="images/icon-sun-dark.svg" alt="sun" />
        <div className=''>
          <Switch defaultChecked={false} onChange={onChange} />
        </div>
        <img src="images/icon-moon-dark.svg" alt="moon" />
      </header>
      <main className='flex flex-col md:flex-row md:justify-between w-full mt-12 md:mt-24 gap-9 md:gap-6'>
        <div className='flex flex-col gap-4 md:gap-12 pt-2'>
          <h1 className={`${dark ? 'text-white' : 'text-[#313E51]'} text-[2.5rem] md:text-[4rem] leading-[2.5rem] md:leading-[3.6rem]`}>Welcome to the <span className='font-medium'>Frontend Quiz!</span> </h1>
          <p className={` ${dark ? 'text-[#ABC1E1]' : 'text-[#626C7F]'} text-[0.875rem] md:text-[1.25rem] italic font-normal mt-[-0.2rem]`}>Pick a subject to get started.</p>
        </div>
        <div className='w-full md:w-[48.883rem] '>
          <div className={`flex p-[0.5rem] md:p-5 w-full ${!dark ? 'bg-white' : 'bg-[#3B4D66] border-[#3B4D66] text-white'} gap-6 items-center flex-start text-[1.125rem] md:text-[1.75rem] font-medium text-[#313E51] rounded-xl md:rounded-3xl border-white border-[0.2rem] hover:border-[#a729f5] cursor-pointer mb-3 md:mb-5`}>
            <img src="images/icon-html.svg" alt="html" className='bg-[#fff1E9] rounded md:rounded-xl p-[0.075rem] md:p-2' />
            <p>HTML</p>
          </div>
          <div className={`flex p-[0.5rem] md:p-5 w-full ${!dark ? 'bg-white' : 'bg-[#3B4D66] border-[#3B4D66] text-white'} gap-6 items-center flex-start text-[1.125rem] md:text-[1.75rem] font-medium text-[#313E51] rounded-xl md:rounded-3xl border-white border-[0.2rem] hover:border-[#a729f5] cursor-pointer mb-3 md:mb-5`}>
            <img src="images/icon-css.svg" alt="css" className='bg-[#fff1e9] rounded md:rounded-xl p-[0.075rem] md:p-2' />
            <p>CSS</p>
          </div>
          <div className={`flex p-[0.5rem] md:p-5 w-full ${!dark ? 'bg-white' : 'bg-[#3B4D66] border-[#3B4D66] text-white'} gap-6 items-center flex-start text-[1.125rem] md:text-[1.75rem] font-medium text-[#313E51] rounded-xl md:rounded-3xl border-white border-[0.2rem] hover:border-[#a729f5] cursor-pointer mb-3 md:mb-5`}>
            <img src="images/icon-js.svg" alt="javascript" className='bg-[#fff1e9] rounded md:rounded-xl p-[0.075rem] md:p-2' />
            <p>JAVASCRIPT</p>
          </div>
          <div className={`flex p-[0.5rem] md:p-5 w-full ${!dark ? 'bg-white' : 'bg-[#3B4D66] border-[#3B4D66] text-white'} gap-6 items-center flex-start text-[1.125rem] md:text-[1.75rem] font-medium text-[#313E51] rounded-xl md:rounded-3xl border-white border-[0.2rem] hover:border-[#a729f5] cursor-pointer mb-3 md:mb-5`}>
            <img src="images/icon-accessibility.svg" alt="accessibility" className='bg-[#fff1e9] rounded md:rounded-xl p-[0.075rem] md:p-2' />
            <p>ACCESSIBILITY</p>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Home;



