import React, { useState, useEffect } from 'react';
function Header(props) {
    const [currentText, setCurrentText] = useState('');
    const [key, setKey] = useState(0); // To trigger re-render and animation

    // Function to get random text
    function randomTxt(txtArr) {
        const randIndex = Math.floor(Math.random() * txtArr.length);
        return txtArr[randIndex];
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentText(randomTxt(props.data.randomTxt));
            setKey(prevKey => prevKey + 1);  // Update key to reset animation
        }, 2000);

        return () => clearInterval(interval);
    }, [props.data.randomTxt]);

    return (
        <header>
            <img src={props.data.image} alt="React logo"/>
            <div>
                <h1>{props.data.title}</h1>
                <h2 key={key} className="random-text" style={{color: "#fff"}}>{currentText}</h2>
                <p> {props.data.description}</p>
            </div>
        </header>
    );
}

export default Header;