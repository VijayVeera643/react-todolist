import "../dialogbox/index.css" 
export default function Dialogbox ({onClick , value , onChange , selectvalue , selectOnChange, clickCancelButton }){

    
    return(
        <div className="dialogbox-container">
            <h3 className="heading">Add New Task</h3>
            <div className="inputField-container">
                <input  className="inputField" 
                        placeholder=" Enter a task....."
                        value= {value} 
                        onChange={onChange} 
                />
            </div>
            <div className="select-container">
                <select className="selectOption" value={selectvalue} onChange={selectOnChange}>
                    <option  className="option">TODO</option>
                    <option  className="option">IN PROGRESS</option>
                    <option  className="option">CLOSED</option>
                </select>
            </div>
            <div className="button-container">
                <p className="cancelButton" onClick={clickCancelButton} >cancel</p>
                <button className="createButton" onClick={onClick}>
                    Add
                </button>
            </div>
        </div>
    )
}