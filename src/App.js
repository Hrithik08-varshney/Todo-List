import "./App.css";
import { useState, useRef, useEffect } from "react";
/* import List from "./List"; */
function App() {
  const [val, setVal] = useState(""); //for setting input value
  const [dateVal, setDateVal] = useState(""); //date state
  /* const [change,setChange]=useState(0); */
 /*  const [obtainData, setObtainData] = useState([]); */
 const [setObj,updateSetObj]=useState({
  index:"",
  value:"",
  completed:""
 })

  const inp = useRef(null); 
  var request;
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

  let db = null;

  const getLocalItems=()=>{
    let list=localStorage.getItem('items');
    /* console.log(list); */
    if(list){
      return JSON.parse(localStorage.getItem('items'))
    }
    else{
      return [];
    }
  }

  const [arr, setArr] = useState(getLocalItems()); //adding value to an array when input value converted to null

   useEffect(()=>{
    localStorage.setItem('items', JSON.stringify(arr));
   },[arr])

    /* useEffect(()=>{
    localStorage.setItem('items', JSON.stringify(setObj));
   },[setObj])  */
   
 /*  const handlerFunction = () => {
    var req = indexedDB.open("My Database");
    req.onsuccess = (e) => {
      const d = e.target.result;
      const tx = d.transaction("Todo", "readonly");
      const p_Notes = tx.objectStore("Todo");
     const r = p_Notes.openCursor();
     r.onsuccess = (e) => {
      setObtainData([...obtainData,r.result?.key]);
        var cursor = e.target.result;
        if (cursor) {
          cursor.continue(); //this will call next row in database
        } 
       };
    }
  } */
/*     console.log(obtainData);
 */  
  // ---------------------------------------------database useEffect
  /* useEffect(() => {
    handlerFunction();
  },[]);
   */
   // -------------------------------------------------submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (val === "") {
      alert("Input is empty");
    } else if (arr.includes(inp.current.value)) {
      alert("Value Already Exists");
    } else {
      inp.current.blur();
      setArr((oldList) => {
        return [...oldList, val];
      });
      /* let len=arr.length;
      updateSetObj({...setObj,
        ["index"]:len,
        ["value"]:val,
        ["completed"]:false}) */
      //-------------------------------------------database creation
     /*  request = indexedDB.open("My Database");
      request.onupgradeneeded = (e) => {
        db = e.target.result;
        db.createObjectStore("Todo", { keyPath: "List" });
        alert("upgrade is called");
  
      };
      request.onsuccess = (e) => {
     
        db = e.target.result;
        const todo_list = {
          List: val,
          text: val,
        };
        
        const tx = db.transaction("Todo", "readwrite"); //api call
        const p_Notes = tx.objectStore("Todo"); //reference to object store
        p_Notes.add(todo_list); 
      };*/
      setVal("");
    }
  };
  const editedList = (valIndex) => {
    /* console.log(arr[valIndex]); */
    inp.current.value = arr[valIndex];
    setVal(inp.current.value);
    inp.current.focus();
    arr.splice(valIndex, 1);
    console.log(arr);
    /* return deleteList(valIndex); */
  };
    const deleteList = (e) => {
    setArr((oldList) => {
      return oldList.filter((arrElem, index) => {
        return index !== e;
      });
    });
  };

  useEffect(()=> {
    setArr(["study", "call"])
  },[])
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
          {arr.map((item, index) => {
           {/*  {console.log(index)} */}
            return (
            
              <div key={index} className="list">
                <h3 className="innerHeading">
               {/*  <input className="checkbox" type="checkbox" /> */}
                {item}
                </h3>
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

/* 
import "./App.css";
import { useState, useRef, useEffect } from "react";
function App() {
  const [val, setVal] = useState(""); //for setting input value
  const [dateVal, setDateVal] = useState(""); //date state
 const [setObj,updateSetObj]=useState({
  index:"",
  value:"",
  completed:""
 })

  const inp = useRef(null); 
  var request;
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

  let db = null;

  const getLocalItems=()=>{
    let list=localStorage.getItem('items');
    if(list){
      return JSON.parse(localStorage.getItem('items'))
    }
    else{
      return [];
    }
  }

  const [arr, setArr] = useState(getLocalItems()); //adding value to an array when input value converted to null

   useEffect(()=>{
    localStorage.setItem('items', JSON.stringify(arr));
   },[arr])
   // -------------------------------------------------submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (val === "") {
      alert("Input is empty");
    } else if (arr.includes(inp.current.value)) {
      alert("Value Already Exists");
    } else {
      inp.current.blur();
      setArr((oldList) => {
        return [...oldList, val];
      });
      setVal("");
    }
  };
  const editedList = (valIndex) => {
    inp.current.value = arr[valIndex];
    setVal(inp.current.value);
    inp.current.focus();
    arr.splice(valIndex, 1);
    console.log(arr);
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
          {arr.map((item, index) => {
            return (
            
              <div key={index} className="list">
                <h3 className="innerHeading">
                {item}
                </h3>
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