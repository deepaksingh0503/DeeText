import React from "react";
import "./button.css";
import "../../App.css";
import { toast, ToastContainer } from "react-toastify";

export const Button = (props) => {
  const ButtonClicked = () => {
    console.log("clicked on button");
var text=props.text;
    toast.success(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <>
      <ToastContainer />
      <span className='button' onClick={props.fun}>
        {props.text}
      </span>
    </>
  );
};
