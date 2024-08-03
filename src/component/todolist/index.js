import "../todolist/index.css";
import DeleteIcon from '../../assets/icons/minus-circle.svg';
import EditIcon from '../../assets/icons/editicon2.png';
import UpdateIcon from "../../assets/icons/updateIcon.png";
import { useEffect, useState } from "react";
import Dialogbox from "./dialogbox/index.js";

export default function TodoListApp() {

    const [inputdata, setInputData] = useState('');
    const [listitem, setListItem] = useState([]);
    const [progress, setProgress] = useState([]);
    const [clickindex, setclickIndex] = useState(null);
    const [updatevalue, setUpdateValue] = useState("");
    const [dialogbox, setDialogbox] = useState(false);
    const [selectValue, setSelectValue] = useState("TODO")
    const [closedlist, setClosedlist] = useState([])

    useEffect(() => {
        fetch(`https://dummyjson.com/todos`)
            .then((response) => response.json())
            .then(list => setListItem(list.todos))
    }, [])

    const handledialogbox = () => {
        setDialogbox(true)
    };

    const addListItems = () => {

        if (inputdata.trim() !== "") {
            if (selectValue === "TODO") {
                setListItem([
                    ...listitem,
                    { id: listitem.length + 1, inputdata }
                ])
            }

            if (selectValue === "IN PROGRESS") {
                setProgress([
                    ...progress,
                    { id: progress.length + 1, inputdata }
                ])
            }

            if (selectValue === "CLOSED") {
                setClosedlist([
                    ...closedlist,
                    { id: closedlist.length + 1, inputdata }
                ])
            }
            setInputData('')

        }
    }

    const deleteListitem = (listIndex) => {
        setListItem(listitem => {
            return listitem.filter((list, index) => index !== listIndex);
        })
    }

    const editListItem = (index, value, addvalue) => {
        setUpdateValue(value ? value : addvalue)
        setclickIndex(index)
    }

    const updateListItem = (listIndex) => {
        const updatedValue = [...listitem].map((list, index) => {
            if (index === listIndex) {
                list.inputdata = updatevalue
                list.todo = updatevalue
            }
            return list
        })
        setListItem(updatedValue)
        setclickIndex(null)
    }

    const selectedOption = (event) => {
        const  {value} = event.target;
        setSelectValue(value)
    }
     
    const handleCancelbutton = ( ) => {
        setDialogbox(false)
    }

    return (
        <div className="todoApp-container" >
            <div className="addListItemInputField"
                style={{
                    filter: dialogbox ? "blur(3px)" : "none"
                }}>
                <div className="heading-container">
                    <h3 className="todoapp-heading">
                        TODOLIST-APP
                    </h3>
                </div>
                <div className="button-container">
                    <button className="add-dialogbox-button"
                        onClick={handledialogbox}
                    >
                        add
                    </button>
                </div>
            </div>

            <div className="todolist-headings-container"
                style={{
                    filter: dialogbox ? "blur(2px)" : "none"
                }}>
                <div className="todo-container">
                    <p className="todo-heading">
                        TODO
                    </p>
                    <div>
                        <ul className="todo-listitems">
                            {listitem.map((list, index) => (
                                <li className="list-item"
                                    key={list.id}
                                >
                                    {clickindex === index ?
                                        <p className="list-content">
                                            <input className="update-inputField"
                                                value={updatevalue}
                                                onChange={(event) => setUpdateValue(event.target.value)}
                                                style={{
                                                    height: "25px",
                                                    width: "150px"
                                                }}
                                            />
                                        </p> :

                                        <p className="list-content">
                                            {list.inputdata ? list.inputdata : list.todo}
                                        </p>
                                    }
                                    {clickindex === index ?
                                        <div className="Update-icon">
                                            <img
                                                src={UpdateIcon}
                                                alt="UpdateIcon"
                                                width={"20px"}
                                                height={"20px"}
                                                onClick={() => updateListItem(index)}
                                            />
                                        </div> :

                                        <div className="Edit-icon">
                                            <img
                                                src={EditIcon}
                                                alt="EditIcon"
                                                width={"20px"}
                                                height={"20px"}
                                                onClick={() => editListItem(index, list.todo, list.inputdata)}
                                            />
                                        </div>
                                    }
                                    <div className="delete-icon">
                                        <img
                                            src={DeleteIcon}
                                            alt="removeIcon"
                                            width={"20px"}
                                            height={"20px"}
                                            onClick={() => {
                                                deleteListitem(index)
                                            }}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="progress-container">
                    <p className="in-progress-heading">
                        IN PROGRESS
                    </p>
                    <div>
                        <ul className="progress-listItems">
                            {progress.map((progresslist, index) => (
                                <li className="list-item" key={progresslist.id}>
                                    <p className="list-content">
                                        {progresslist.inputdata}
                                    </p>
                                    <img className="delete-Icon"
                                        src={DeleteIcon}
                                        alt="removeIcon"
                                        width={"20px"}
                                        height={"20px"}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="closed-container">
                    <p className="closed-heading">
                        CLOSED
                    </p>
                    <div>
                        <ul className="closed-listItems">
                            {closedlist.map((closelist, index) => (
                                <li className="list-item" key={closelist.id}>
                                    <p className="list-content">
                                        {closelist.inputdata}
                                    </p>
                                    <img className="delete-Icon "
                                        src={DeleteIcon}
                                        alt="removeIcon"
                                        width={"20px"}
                                        height={"20px"}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="dialogbox"
                style={{
                    visibility: dialogbox ? "visible" : "hidden",
                    position: "absolute",
                    top: "175px",
                    left: "525px",
                }}>
                <Dialogbox value={inputdata}
                    onChange={event => setInputData(event.target.value)}
                    onClick={addListItems}
                    selectvalue={selectValue}
                    selectOnChange={selectedOption}
                    clickCancelButton={handleCancelbutton} />
            </div>
        </div>
    )
}