import React, {useState} from "react";
import { MainPage, SideBar } from "../../componets";
import "./homepage.css";
export const HomePage = () => {
  const [text, settext] = useState("")
  return (
    <>
      <div className='Home-Page-container'>
        <SideBar data={{text, settext}} />
        <MainPage data={{text, settext}}/>
      </div>
    </>
  );
};
