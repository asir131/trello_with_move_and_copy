import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ourRouter } from "./router/router";
import BoardProvider from "./contexts/Board";
import ListProvider from "./contexts/List";
import TaskProvider from "./contexts/Task";
// import App from "./App";
// import StudentProvider from "./contexts/Student";

// import reportWebVitals from "./reportWebVitals";
// import App2 from "./App2";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		{/* <StudentProvider>
			<App />
		</StudentProvider> */}
		{/* <App2 />
		<App /> */}
		<BoardProvider>
			<ListProvider>
				<TaskProvider>
					<RouterProvider router={ourRouter} />
				</TaskProvider>
			</ListProvider>
		</BoardProvider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
