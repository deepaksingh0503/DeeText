import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { Button } from "../Button/Button";
import { createWorker } from "tesseract.js";
import "./sidebar.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var undoArr = [];
var redoArr = [];
export const SideBar = (props) => {
  var text = props.data.text;
  var settext = props.data.settext;
  const [selectedImage, setSelectedImage] = useState(null);
  const ToastS = (text) => {
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
  const ToastE = (text) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const ToUpperCase = () => {
    let result = text.toUpperCase();
    undoArr.push(text);
    redoArr = [];

    settext(result);
    ToastS("Converted To UpperCase");
  };
  const ToLowerCase = () => {
    let result = text.toLowerCase();
    undoArr.push(text);
    redoArr = [];
    settext(result);

    ToastS("Converted To LowerCase");
  };
  const ClearText = () => {
    undoArr.push(text);
    redoArr = [];

    let result = "";
    settext(result);
    ToastS("Cleared");
  };
  const ImageToText = async () => {
    if (selectedImage === null) {
      ToastE("Please choose a image!!");
      return;
    }
    var filePath = selectedImage.name;

    // Allowing file type
    var allowedExtensions = /(\.jpg|\.bmp |\.png|\.pbm)$/i;

    if (!allowedExtensions.exec(filePath)) {
      ToastE("Please Enter a valid jpg or png file.");

      return;
    }

   
    
    ToastS("Loading..........");
    const worker = await createWorker({
      logger: (m) => console.log(m),
    });

    (async () => {
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const {
        data: { text },
      } = await worker.recognize(selectedImage);
      settext(text);
      await worker.terminate();
      ToastS("Converted to text!");
    })();

  };
  const RemoveExtraSpace = () => {
    undoArr.push(text);
    redoArr = [];
    let result = text.replace(/\s+/g, " ").trim();
    settext(result);
    ToastS("Extra Space Removed");
  };
  function getVoices() {
    let voices = speechSynthesis.getVoices();
    if (!voices.length) {
      let utterance = new SpeechSynthesisUtterance("");
      speechSynthesis.speak(utterance);
      voices = speechSynthesis.getVoices();
    }
    return voices;
  }
  const SpeakLoud = () => {
    let textToSpeak = text;

    let speakData = new SpeechSynthesisUtterance();
    speakData.volume = 1; // From 0 to 1
    speakData.rate = 2; // From 0.1 to 10
    speakData.pitch = 2; // From 0 to 2
    speakData.text = textToSpeak;
    speakData.lang = "en";
    speakData.voice = getVoices()[3];
    speechSynthesis.speak(speakData);

    if (text === "") {
      toast.error("No text Avilable", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      ToastS("Readingt Text");
    }
  };

  const copyToClip = () => {
    navigator.clipboard.writeText(text);
    ToastS("Text Copied!");
  };

  const Undo = () => {
    if (undoArr.length === 0) {
      toast.warn("Cannot Undo", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      var result = undoArr.pop();

      redoArr.push(result);
      settext(result);
      ToastS("Undo!");
    }
  };
  const Redo = () => {
    if (redoArr.length === 0) {
      toast.warn("Cannot Redo", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      var result = redoArr.pop();
      //  undoArr.push(text);
      settext(result);
      ToastS("Redo!");
    }
  };

  const removeSpace = () => {
    let result = text.trim();
    undoArr.push(text);
    settext(result);
    ToastS("Spaces Removed!");
  };

  return (
    <>
      <ToastContainer />
      <div className='container'>
        <div className='heading'>
          <h1>Operations</h1>
        </div>
        <div className='buttons'>
          <span className='copyButton' onClick={copyToClip}>
            Copy to clipboard <FaRegCopy />{" "}
          </span>

          <Button text='Convert to UpperCase' fun={ToUpperCase} />
          <Button text='Convert to LowerCase' fun={ToLowerCase} />
          <div className='group'>
            <Button text='Clear Text' fun={ClearText} />
            <Button text='Read Aloud' fun={SpeakLoud} />
          </div>
          <Button text='Remove Extra Spaces' fun={RemoveExtraSpace} />
          <div className='text_to_text_container'>
            <Button text='Image to text' fun={ImageToText} />
            <div className='Imginput'>
              <input
                type='file'
                name='myImage'
                onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                }}
              />
            </div>
          </div>
          <Button text='Remove trailing space' fun={removeSpace} />
          <div className='group'>
            <Button text='Undo' fun={Undo} />
            <Button text='Redo' fun={Redo} />
          </div>

          {/* <Button text='Extract Email' fun={extractEmails} /> */}
        </div>
      </div>
    </>
  );
};
