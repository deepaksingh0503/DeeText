import React, { useState } from "react";
import "./mainpage.css";
import { ImSvg } from "react-icons/im";
import "../../App.css";

export const MainPage = (props) => {
  var text = props.data.text;
  var settext = props.data.settext;
  const onChangeTextField = (event) => {
    settext(event.target.value);
  };
  return (
    <>
      <div className='main-page-container'>
        <div className='main-heading'>
          <h1>Enter you Text Here...</h1>
          <textarea
            type='text'
            placeholder='Enter You Text Here....'
            onChange={onChangeTextField}
            value={text}></textarea>
        </div>

        <div className='textDetails'>
          <h2>Your Text Summary</h2>
          <p>
            <ImSvg />{" "}
            <span
              className='bold-
            Text'>
              {" "}
              {text
                .split(" ")
                .filter(function (n) {
                  return n !== "";
                })
                .length.toString()}
            </span>{" "}
            words and{" "}
            <span
              className='bold-
            Text'>
              {text.length.toString()}
            </span>{" "}
            characters{" "}
          </p>
          <p>
            {"  "}
            <ImSvg />
            {"  "}
            <span>
              {Math.floor(
                (text.split(" ").filter(function (n) {
                  return n !== "";
                }).length /
                  200) *
                  60
              )}
              {"  "}
            </span>
            seconds read
          </p>
          <h2>Preview</h2>
          <p>{text === "" ? "Nothing to preview!!" : text}</p>
        </div>
      </div>
    </>
  );
};
