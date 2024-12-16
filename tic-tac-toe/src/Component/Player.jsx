import {useState} from "react";

export default function Player({initialName,symbol,isActive,onChangeName}) {
    const [playerName,setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditBtn() {
        setIsEditing((editing)=>!editing);
        if (isEditing) {
            onChangeName(symbol,playerName)
        }
    }

    function playerNameChange(e){
        setPlayerName(e.target.value);
    }
    let EditingPlayerName = <span className="player-name">{playerName}</span>
    if(isEditing){
        EditingPlayerName = <input type="text" value={playerName} onChange={playerNameChange}/>
    }
    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {EditingPlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditBtn}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}