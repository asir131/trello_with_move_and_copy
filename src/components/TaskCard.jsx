import { useState, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";

import { BoardContext } from "../contexts/Board";
import { ListContext } from "../contexts/List";
import { TaskContext } from "../contexts/Task";

import { icons } from "../assets";

import AddItemForm from "./AddItemForm";

const TaskCard = ({ task, index }) => {
	const [taskTitle, setTaskTitle] = useState(task.title);
	const [editMode, setEditMode] = useState(false);
	const { tasks: allTasks, dispatchTaskAction } = useContext(TaskContext);
	const { lists,dispatchListAction } = useContext(ListContext);
	const { boards,dispatchBoardAction } = useContext(BoardContext);
     console.log(allTasks);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatchTaskAction({
			type: "UPDATE_TASK_TITLE",
			payload: {
				id: task.id,
				title: taskTitle,
			},
		});

		setEditMode(false);
	};

	const removeHandler = () => {
		dispatchTaskAction({
			type: "REMOVE_TASK",
			payload: task.id,
		});

		dispatchListAction({
			type: "REMOVE_TASK_ID_FROM_A_LIST",
			payload: {
				id: task.listId,
				taskId: task.id,
			},
		});

		dispatchBoardAction({
			type: "REMOVE_TASK_ID_FROM_A_BOARD",
			payload: {
				id: task.boardId,
				taskId: task.id,
			},
		});
	};


	const [isOpen, setIsOpen] = useState(false);

	const handleClick = (e) => {
		e.stopPropagation();
	  setIsOpen(!isOpen);
	};
	const [isOpenMove, setIsOpenMove] = useState(false);

	const handleClickMove = (e) => {
		e.stopPropagation();
		setIsOpenMove(!isOpenMove);
	};

	const [isOpenCopy, setIsOpenCopy] = useState(false);

	const handleClickCopy = (e) => {
		e.stopPropagation();
	  setIsOpenCopy(!isOpenCopy);
	};
const prevent=(e) => {
  e.stopPropagation();
};


const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedList, setSelectedList] = useState('');

  const handleClickCopied = (e) => {
	
    console.log(selectedList,selectedBoard);
		// Dispatch an action to change the board of the selected list
		const taskID=Date.now()+"";
		dispatchListAction({
			type:"ADD_TASK_ID_TO_A_LIST",
			payload:{ id: selectedList, taskId: taskID }
		});
		dispatchTaskAction({
			type:"CREATE_TASK",
			payload:{
				id: taskID,
				title:task.title,
				listId:selectedList,
				boardId:selectedBoard,
			}
		})
	
  
		// Dispatch an action to add the list to the selected board
		// dispatchBoardAction({
		// 	type:"ADD_TASK_ID_TO_A_BOARD",
		// payload:{ taskId: task.id, id: selectedBoard }
		// });
	  
  };
  const handleClickMoved=() => {
	
   

	
	// dispatchTaskAction({
	// 	type:"CHANGE_BOARD_ID_OF_A_TASK",
	// 	payload:{ boardId: selectedBoard, id: task.id }
	// });
		dispatchTaskAction({
			type:"CHANGE_LIST_ID_OF_A_TASK",
			payload:{ listId: selectedList, id: task.id }
		});
	dispatchListAction({
		type:"ADD_TASK_ID_TO_A_LIST",
		payload:{ id: selectedList, taskId: task.id }
	});
	
	// dispatchBoardAction({
	// 	type:"ADD_TASK_ID_TO_A_BOARD",
	// 	payload:{ id: selectedBoard, taskId: task.id }
	// });
	// 	// Dispatch an action to change the board of the selected list
	
		
		

		// const TaskId=Date.now()+"";
		
		// // console.log(task.id,task.title,selectedList,selectedBoard);
		// dispatchTaskAction({
		// 	type:"CREATE_TASK",
		// 	payload:{
		// 		id:TaskId,
		// 		title:task.title,
		// 		listId:selectedList,
		// 		boardId:selectedBoard,
		// 	}
		// });
		// dispatchTaskAction({
		// 	type:"REMOVE_TASK",
		// 	payload:task.id,
		// });
		dispatchListAction({
			type:"REMOVE_TASK_ID_FROM_A_LIST",
			payload:{
				id:task.listId,
				taskId:task.id,
			}
		});
		
		// dispatchBoardAction({
		// 	type:"REMOVE_TASK_ID_FROM_A_BOARD",
		// 	payload:{
		// 		id:task.boardId,
		// 		taskId:task.id,
		// 	}
		// });
  };

  const handleBoardChange = (event) => {
	
    setSelectedBoard(event.target.value);
	
  };

  const handleListChange = (event) => {
    setSelectedList(event.target.value);
  };






	return (
		<Draggable draggableId={task.id} index={index}>
			{(provided) => {
				// console.log(provided, "params from draggable");
				return (
					<div
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
					>
						{!editMode ? (
							<div
								onClick={() => setEditMode(true)}
								className="task-card"
							>
								<p>{task.title}</p>


								<img
								onClick={handleClick}
								src={icons.editIcon}
								alt=""
								className="add-item-icon"
							/>
							{isOpen && (
							<div className="dropdown-menu">
	<form >
      <div onClick={handleClickCopy}>
        Copy
        {isOpenCopy && (
          <div className="dropdown-menu">
            <div onClick={prevent}>
              <select value={selectedBoard} onChange={handleBoardChange}>
                <option>Board</option>
                {boards.map((board) => (
                  <option key={board.id} value={board.id}>
                    {board.title}
                  </option>
                ))}
              </select>
            </div>
            <div onClick={prevent}>
              <select value={selectedList} onChange={handleListChange}>
                <option>List</option>
                {lists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.title}
                  </option>
                ))}
              </select>
            </div>
            <button className="add-button" onClick={handleClickCopied}>
              Copy
            </button>
          </div>
        )}
      </div>
    </form>
							
							
							
							
							
							
							<div onClick={handleClickMove}>Move

							{isOpenMove && (
								<div className="dropdown-menu">
										<form >

											<div onClick={prevent}>
											<select value={selectedBoard} onChange={handleBoardChange}>
												<option>Board</option>
												{boards.map((board) => (
												<option key={board.id} value={board.id}>
													{board.title}
												</option>
												))}
											</select>	
											<div onClick={prevent}>
              <select value={selectedList} onChange={handleListChange}>
                <option>List</option>
                {lists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.title}
                  </option>
                ))}
              </select>
            </div>
											
											</div>
											<button className="add-button" type="submit" onClick={handleClickMoved}>
												Move
												</button>		
										</form>
												
									</div>
												)}	
							</div>
							</div>
      )}


								
								<img
									src={icons.crossIcon}
									alt=""
									className="add-item-icon"
									onClick={removeHandler}
								/>
							</div>
						) : (
							<AddItemForm
								title={taskTitle}
								onChangeHandler={(e) => {
									setTaskTitle(e.target.value);
								}}
								setEditMode={setEditMode}
								submitHandler={submitHandler}
							/>
						)}
					</div>
				);
			}}
		</Draggable>
	);
};

export default TaskCard;
