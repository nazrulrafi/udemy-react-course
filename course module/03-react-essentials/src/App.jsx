import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from "./components/Header/Header.jsx";
import {CORE_CONCEPTS,EXAMPLES,HEADER_CONTENT} from "./data.js";
import CoreConcept from "./components/CoreConcept/CoreConcept.jsx";
import Examples from "./components/Examples/Examples.jsx";

function App() {
  return (
    <>
      <div className="react-wrapper">
          <Header data={HEADER_CONTENT}/>
          <main>
              <CoreConcept data={CORE_CONCEPTS}/>
              <Examples data={EXAMPLES}/>
          </main>
      </div>
    </>
  )
}

export default App
