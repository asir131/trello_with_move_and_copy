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
	const { lists,dispatchListAction } = useContext(ListContext);
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
// 	const [isDown, setIsDown] = useState(false);

// 	const handleClickBoardDown = () => {
// 	  setIsDown(!isDown);
// 	};


const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedList, setSelectedList] = useState('');

  const handleClickMoved = () => {
    if (selectedBoard && selectedList) {
		// Dispatch an action to change the board of the selected list
		dispatchListAction({
			type:"CHANGE_BOARD_ID_OF_A_LIST",
			payload:{ id: selectedList, boardId: selectedBoard }
		});
  
		// Dispatch an action to add the list to the selected board
		// dispatchBoardAction({
		// 	type:"ADD_LIST_ID_TO_A_BOARD",
		// payload:{ listId: selectedList, boardId: selectedBoard }
		// });
	  }
  };

  const handleBoardChange = (event) => {
    setSelectedBoard(event.target.value);
	
  };

  const handleListChange = (event) => {
    setSelectedList(event.target.value);
  };
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
	<form action="">
      <div onClick={handleClickMove}>
        Move
        {isOpenMove && (
          <div className="dropdown-menu">
            <div onClick={prevent}>Boards
              <select value={selectedBoard} onChange={handleBoardChange}>
                <option>Select a board</option>
                {boards.map((board) => (
                  <option key={board.id} value={board.id}>
                    {board.title}
                  </option>
                ))}
              </select>
            </div>
            <div onClick={prevent}>TaskLists
              <select value={selectedList} onChange={handleListChange}>
                <option>Select task list</option>
                {lists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.title}
                  </option>
                ))}
              </select>
            </div>
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
												<div onClick={prevent}>Boards
												<select value={selectedBoard} onChange={handleBoardChange}>
												<option>Select a board</option>
												{boards.map((board) => (
												<option key={board.id} value={board.id}>
													{board.title}
												</option>
												))}
											</select>			
												</div>
												
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
