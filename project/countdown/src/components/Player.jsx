import {useRef, useState} from "react";

export default function Player() {
    const playerName = useRef();
    const [enterPlayerName,setEnterPlayerName] = useState(null)


    function handleSubmit(e) {
        setEnterPlayerName(playerName.current.value)
        playerName.current.value = ""
    }
  return (
    <section id="player">
      <h2>Welcome {enterPlayerName ?? "Unknown entry"}</h2>
      <p>
        <input type="text" ref={playerName} />
        <button onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
}
