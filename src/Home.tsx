import './App.css';
import React from 'react';
import { Switch } from 'antd';

function Home() {

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div className="app bg-[#f4f6fa] py-24 px-28">
      <header className='flex gap-2 items-center justify-end'>
        <img src="images/icon-sun-dark.svg" alt="sun" />
        <div className=''>
          <Switch defaultChecked onChange={onChange} />
        </div>
        <img src="images/icon-moon-dark.svg" alt="moon" />
      </header>
      <main className='flex justify-between'>
        <div>
          <h1>Welcome to the Frontend Quiz!</h1>
          <p>Pick a subject to get started.</p>
        </div>
        <div>
          <div className='flex'>
            <img src="images/icon-html.svg" alt="html" className='bg-[#fff1e9] rounded-xl p-2' />
            <p>HTML</p>
          </div>
          <div>
            <img src="images/icon-css.svg" alt="css" />
            <p>CSS</p>
          </div>
          <div>
            <img src="images/icon-js.svg" alt="javascript" />
            <p>JAVASCRIPT</p>
          </div>
          <div>
            <img src="images/icon-accessibility.svg" alt="accessibility" />
            <p>ACCESSIBILITY</p>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Home;

// #313e51