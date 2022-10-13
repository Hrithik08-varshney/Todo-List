import "./App.css";
  import { db } from "./firebase-config";
import { useState, useRef, useEffect } from "react";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
function App() {
  const [val, setVal] = useState(""); //for setting input value
  const [dateVal, setDateVal] = useState(""); //date state
  const inp = useRef(null);
  const usersCollectionRef = collection(db, "tasks"); //taking collection reference
  const [arr, setArr] = useState([]); //adding value to an array when input value converted to null
  const [inpObj,setInpObj]=useState({
    inp:"",
    check:false
  })

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
    //------------------------------firestore get
    const getTasks = async () => {
      const data = await getDocs(usersCollectionRef);
      data?.docs?.map((item)=>{
        if(item?.data().date===dateVal){
          // console.log(item?.data());
          if(item?.data().tasks===undefined)
          setArr([]);
          else
          setArr([...arr, ...item.data().tasks])
        }
      })
    };
    getTasks();
  }, [dateVal]);



  

  // -------------------------------------------------submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (val === "") {
      alert("Input is empty");
    } else if (arr.includes(inp.current.value)) {
      alert("Value Already Exists");
    } else {
      inp.current.blur();
      setInpObj({inp:val,check:false})
      setArr([...arr,{inp:val,check:false}]);
      
      console.log(arr, "added in array");
      
      setDoc(doc(db, "tasks", dateVal), {
        date: dateVal,
        tasks: [...arr, {inp:val,check:false}],
      });
      setVal("");
    }
  };

  useEffect(()=>{
      console.log(arr, "added in useEffect");
  },[arr])

  const handleCheckbox=(valIndex)=>{
     console.log(arr[valIndex],"checkbox arr");
     if(arr[valIndex].check===false){
      arr[valIndex].check=true;
     setInpObj({...inpObj,check:true});
     }
     else
     {
      arr[valIndex].check=false;
      setInpObj({...inpObj,check:false});
     }
     setDoc(doc(db, "tasks", dateVal), {
        date: dateVal,
        tasks: [...arr],
      });
  }

  const editedList = (valIndex) => {
    // console.log(arr[valIndex],"myindex");
    inp.current.value = arr[valIndex].inp;
    setVal(inp.current.value);
    inp.current.focus();
    arr.splice(valIndex, 1);
    console.log(arr);
  };

  const deleteList = (e) => {
    const newArr = arr.filter((arrElem, index) => index !== e);

    setDoc(doc(db, "tasks", dateVal), {
      date: dateVal,
      tasks: newArr,
    });

    setArr(newArr);
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
            placeholder="What to do...."
            value={val}
            className="in"
            onChange={(e) => setVal(e.target.value)}
            ref={inp}
          ></input>
        </form>
        <div className="regular-list-div">
           {arr?.map((item, index) => {
            return (
              <div key={index} className="list">
              
                <h3 className="innerHeading">
               <input type="checkbox" className="checkbox" defaultChecked={item.check} onChange={()=>{
                handleCheckbox(index);
               }}/> 
                {
                  item.check ? <del>{item.inp}</del> : <span>{item.inp}</span>
                }
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