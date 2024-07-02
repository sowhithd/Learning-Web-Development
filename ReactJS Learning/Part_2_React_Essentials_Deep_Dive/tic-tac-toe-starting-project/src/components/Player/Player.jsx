import { useState } from "react"

export default function Player({initialPlayerName,playerSymbol,isActive,onChangeName}) {

const [isEditing,setIsEditing] = useState(false);
const[playerName,setPlayerName] = useState(initialPlayerName);

function handleEditPlayer(){
    //setIsEditing(!isEditing);
    setIsEditing(editing => !editing);
    if(isEditing) {
    onChangeName(playerSymbol,playerName);
    }
}

function handleChange($event){
    setPlayerName($event.target.value);
}

let playerNamePlaceHolder = <span className="player-name">{playerName}</span>;
if (isEditing){
    /*
        with value attribute we can't edit the input feild in UI
        Because we are setting that value prop on the input element.
        And the special thing about that value prop is that it sets the value that's shown in the input.
        And if we try to edit this value, we can't do that, because this value which is set here,
        basically overwrites any changes we're trying to do.

        Ex:playerNamePlaceHolder = <input type="text" required value={initialPlayerName}/>;

        One way around this problem would be to set the special default value prop,
        which just sets an initial value instead of enforcing a value thereafter.

       Ex: playerNamePlaceHolder = <input type="text" required defaultValue={initialPlayerName}/>;
        
    */
    playerNamePlaceHolder = <input type="text" required value={playerName} onChange={handleChange}/>;
}
    return(
        <li className={isActive? 'active': undefined}>
        <span className="player">
        {playerNamePlaceHolder}
          
          <span className="player-symbol">{playerSymbol}</span>
          </span>
          <button onClick={handleEditPlayer}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}