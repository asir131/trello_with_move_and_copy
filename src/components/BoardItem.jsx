import { useContext } from "react";

import { BoardContext } from "../contexts/Board";
import { ListContext } from "../contexts/List";
import { TaskContext } from "../contexts/Task";

import { icons } from "../assets";

const BoardItem = ({ board }) => {
	const { dispatchBoardAction } = useContext(BoardContext);
	const { dispatchListAction } = useContext(ListContext);
	const { dispatchTaskAction } = useContext(TaskContext);

	const removeHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatchBoardAction({ type: "REMOVE_BOARD", payload: board.id });
		board.lists.forEach((listId) => {
			dispatchListAction({ type: "REMOVE_LIST", payload: listId });
		});
		board.tasks.forEach((taskId) => {
			dispatchTaskAction({ type: "REMOVE_TASK", payload: taskId });
		});
	};

	return (
		<div className="board-box d-flex flex-direction-column">
			<div className="d-flex justify-content-between">
				<h5>{board.title}</h5>
				<img
					src={icons.crossIcon}
					alt=""
					className="add-item-icon"
					onClick={removeHandler}
				/>
			</div>
		</div>
	);
};

export default BoardItem;
