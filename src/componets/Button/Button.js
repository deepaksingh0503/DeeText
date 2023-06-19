import React from "react";
import "./button.css";
import "../../App.css";
import { toast, ToastContainer } from "react-toastify";

export const Button = (props) => {
  return (
    <>
      <ToastContainer />
      <span className='button' onClick={props.fun}>
        {props.text}
      </span>
    </>
  );
};
