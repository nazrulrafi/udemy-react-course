import React,{useState} from 'react';

function Player({initialName,symbol,isActive,onChangeName}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    function handleEditFunc(){
        setIsEditing(isEditing => !isEditing);
        onChangeName(symbol,playerName);
    }
    function handleEditName(e){
        setPlayerName(e.target.value);
    }
    let editingName = <span className="player-name">{playerName}</span>;
    if(isEditing){
        editingName = <input type="text" value={playerName} onChange={handleEditName} required/>
    }
    return (
        <li className={isActive?"active":""}>
              <span className="player">
                {editingName}
                <span className="player-symbol">{symbol}</span>
              </span>
            <button onClick={handleEditFunc}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}

export default Player;