import Header from "./components/header.jsx";
import UserInput from "./components/UserInput.jsx";
import {useState} from "react";
import Result from "./components/Result.jsx";

function App() {
  const [userInput,setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn:6,
    duration:10
  });
  function handleChange(inputIdentifier,newValue){
    setUserInput((preUserInput)=>{
      return {
        ...preUserInput,
        [inputIdentifier]:+newValue
      }
    })
  }
  const inputValid = userInput.duration >= 1;
  return (
     <>
       <Header/>
       <UserInput userInput={userInput} onChange={handleChange}/>
       {!inputValid && <p>Please Enter a duration greater than zero</p>}
       {inputValid && <Result userInput={userInput}/>}
     </>
  )
}

export default App
