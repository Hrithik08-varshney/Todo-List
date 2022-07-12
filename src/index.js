import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/* import "./App.css";
import { useState } from "react";
import List from "./List";
function App() {
  const [val, setVal] = useState("");
  const [arr, setArr] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setArr([val]);
    setVal("");
  };

  console.log(arr);

  return (
    <div className="App">
      <div className="heading">Todo List</div>
      <div className="main">
        <form onSubmit={handleSubmit}>  
          <input
            type="text"
            placeholder="....."
            value={val}
            onChange={(e) => setVal(e.target.value)}
          ></input>
        </form>
        <div className="list-div">
          {arr.map((item) => (
            <List name={item}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App; */


// Full CODE
        /* import "./App.css";
import { useState, useRef, useEffect } from "react";

function App() {
  let db=null;
  const [val, setVal] = useState(""); //for setting input value
  const [arr, setArr] = useState([]); //adding value to an array when input value converted to null
  const [dateVal, setDateVal] = useState(""); //date state
  
  const inp = useRef(null);
  useEffect(() => {
    const d = new Date();
    var date = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (date < 10) {
      date = `0${date}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    const fullDate = date + "-" + month + "-" + year;
    setDateVal(fullDate);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(arr.includes(inp.current.value)){
      alert("Value Already Exists");
    }else{
      console.log(inp.current.value);
      inp.current.blur();
      setArr((oldList) => {
        return [...oldList, val];
      });
      
      setVal("");
    }
  };
  const editedList = (valIndex) => {
    // console.log(arr[valIndex]);
    inp.current.value = arr[valIndex];
    setVal(inp.current.value);
    inp.current.focus();
    arr.splice(valIndex, 1);
    console.log(arr);
    // return deleteList(valIndex); 
  };
  const deleteList = (e) => {
    setArr((oldList) => {
      return oldList.filter((arrElem, index) => {
        return index !== e;
      });
    });
  };
  return (
    <div className="App">
      <div className="heading">
        <div className="title">ToDo List ({dateVal})</div>
      </div>
      <div className="main">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="....."
            value={val}
            className="in"
            onChange={(e) => setVal(e.target.value)}
            ref={inp}
          ></input>
        </form>
        <div className="list-div">
         // { {arr.map((item) => (
          //  <List key={item} name={item}/>
          //))} }
          {arr.map((item, index) => {
            return (
              <div key={index} className="list">
                <h3 className="innerHeading">{item}</h3>
                <div className="button-div">
                  <button
                    className="edit"
                    onClick={() => {
                      editedList(index);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete"
                    onClick={() => {
                      return deleteList(index);
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
 */