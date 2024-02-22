import { useState, useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import { icons } from "../assets";


import AddItem from "./AddItem";
import AddItemForm from "./AddItemForm";

import { BoardContext } from "../contexts/Board";
import { ListContext } from "../contexts/List";
import { TaskContext } from "../contexts/Task";
import TaskCard from "./TaskCard";

const TaskList = ({ taskList }) => {
	const [editMode, setEditMode] = useState(false);
	const [taskTitle, setTaskTitle] = useState("");

	const { tasks: allTasks, dispatchTaskAction } = useContext(TaskContext);
	const { dispatchListAction  } = useContext(ListContext);
	const { boards,dispatchBoardAction } = useContext(BoardContext);

	const submitHandler = (e) => {
		e.preventDefault();

		const newTaskId = Date.now() + "";

		dispatchTaskAction({
			type: "CREATE_TASK",
			payload: {
				id: newTaskId,
				title: taskTitle,
				listId: taskList.id,
				boardId: taskList.boardId,
			},
		});

		dispatchListAction({
			type: "ADD_TASK_ID_TO_A_LIST",
			payload: { id: taskList.id, taskId: newTaskId },
		});

		dispatchBoardAction({
			type: "ADD_TASK_ID_TO_A_BOARD",
			payload: { id: taskList.boardId, taskId: newTaskId },
		});

		setEditMode(false);
		setTaskTitle("");
	};

	const removeHandler = () => {
		dispatchListAction({ type: "REMOVE_LIST", payload: taskList.id });
		dispatchBoardAction({
			type: "REMOVE_LIST_ID_FROM_A_BOARD",
			payload: { id: taskList.boardId, listId: taskList.id },
		});
		taskList.tasks.forEach((taskId) => {
			dispatchTaskAction({ type: "REMOVE_TASK", payload: taskId });
		});
	};
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		
	  setIsOpen(!isOpen);
	};
	const [isOpenMove, setIsOpenMove] = useState(false);

	const handleClickMove = () => {
		
		setIsOpenMove(!isOpenMove);
	};

	const [isOpenCopy, setIsOpenCopy] = useState(false);

	const handleClickCopy = () => {
		
	  setIsOpenCopy(!isOpenCopy);
	};
const prevent=(e) => {
  e.stopPropagation();
};
// 	const [isDown, setIsDown] = useState(false);

// 	const handleClickBoardDown = () => {
// 	  setIsDown(!isDown);
// 	};


const [selectedBoard, setSelectedBoard] = useState('');
//  const [selectedList] = useState('');



  const handleClickCopied=(e) => {
	
   console.log(taskList.id);
   const listId= Date.now()+"";
		// Dispatch an action to change the board of the selected list
		dispatchBoardAction({
			type:"ADD_LIST_ID_TO_A_BOARD",
			payload:{ id:selectedBoard, listId: listId}
		});
		const taskIds=[];
		taskList.tasks.forEach((Tid)=> {
			const taskObj = allTasks.find((ele)=>ele.id===Tid)
			const TaskID=Date.now()+"";
			dispatchTaskAction({
				type:"CREATE_TASK",
				payload:{
					id: TaskID,
					title: taskObj.title,
					listId:listId,
					boardId:selectedBoard,
				}
	     
			});
			taskIds.push(TaskID);
		});
		dispatchListAction({
			type: "CREATE_LIST",
			payload:{
				id:listId,
				title:taskList.title,
				boardId:selectedBoard,
				tasks: taskIds,


			}
		});
			
  };
  const handleClickMoved = (e) => {
	
	// dispatchBoardAction({
	// 	type:"ADD_LIST_ID_TO_A_BOARD",
	// payload:{ listId: selectedList, boardId: selectedBoard }
	// });
		// Dispatch an action to change the board of the selected list
		dispatchListAction({
			type:"CHANGE_BOARD_ID_OF_A_LIST",
			payload:{ id: taskList.id, boardId: selectedBoard }
		});
		// dispatchBoardAction({
		// 	type:"REMOVE_LIST_ID_FROM_A_BOARD",
		// 	payload:{ listId: taskList.id, boardId: taskList.boardId }
		// });
		
	console.log(boards,taskList.boardId);
  
		// Dispatch an action to add the list to the selected board
		
	  
  };
  

  const handleBoardChange = (event) => {
	
    setSelectedBoard(event.target.value);
	
  };

//   const handleListChange = (event) => {
//     setSelectedList(event.target.value);
//   };
	return (
		<Droppable droppableId={taskList.id}>
			{(provided) => {
				// console.log(provided, "params from dropabble");
				return (
					
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						className="list-container"
					>
						
						<div className="list-title-container">
						
							<h5>{taskList.title}</h5>
							<img
								onClick={handleClick}
								src={icons.editIcon}
								alt=""
								className="add-item-icon"
							/>
							{isOpen && (
							<div className="dropdown-menu">
	<form >
      <div onClick={handleClickMove}>
        Move
        {isOpenMove && (
          <div className="dropdown-menu">
            <div onClick={prevent}>
              <select value={selectedBoard} onChange={handleBoardChange}>
                <option>Select a board</option>
                {boards.map((board) => (
                  <option key={board.id} value={board.id}>
                    {board.title}
                  </option>
                ))}
              </select>
            </div>
            {/* <div onClick={prevent}>
              <select value={selectedList} onChange={handleListChange}>
                <option>Select list</option>
                {lists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.title}
                  </option>
                ))}
              </select>
            </div> */}
            <button className="add-button" onClick={handleClickMoved}>
              Move
            </button>
          </div>
        )}
      </div>
    </form>
							
							
							
							
							
							
							<div onClick={handleClickCopy}>Copy

							{isOpenCopy && (
								<div className="dropdown-menu">
										<form >

											<div onClick={prevent}>
											<select value={selectedBoard} onChange={handleBoardChange}>
												<option>Select a board</option>
												{boards.map((board) => (
												<option key={board.id} value={board.id}>
													{board.title}
												</option>
												))}
											</select>	
											
											</div>
											<button className="add-button" type="submit" onClick={handleClickCopied}>
												Copy to
												</button>		
										</form>
												
									</div>
												)}	
							</div>
							</div>
      )}
							<img
								onClick={removeHandler}
								src={icons.crossIcon}
								alt=""
								className="add-item-icon"
							/>
						</div>
						{taskList.tasks
							.map((item) => {
								return allTasks.find((ele) => ele.id === item);
							})
							.map((task, index) => (
								<TaskCard
									index={index}
									key={task.id}
									task={task}
								/>
								// <p key={task.id}>{task.title}</p>
							))}
						{!editMode ? (
							<AddItem setEditMode={setEditMode} />
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
						{provided.placeholder}
					</div>
				);
			}}
		</Droppable>
	);
};

export default TaskList;
