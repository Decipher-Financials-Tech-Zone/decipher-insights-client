import React, { useState } from "react";
import TaskSheetAdmin_Table from "./TaskSheetAdmin_Table";
import Switch from "@mui/material/Switch";
import All_Tasks_Selector from "./All_Tasks_Selector";
import Tasks_Not_Filled_selector from "./Tasks_Not_Filled_selector";
import TaskSheetAdmin_NotFilled_Table from "./TaskSheetAdmin_NotFilled_Table";

const TaskSheetAdmin = () => {
  const [adminTasksList, setAdminTasksList] = useState();
  const [taskNotFilledList, setTaskNotFilledList] = useState();
  const [tableInfoType, setTableInfoType] = useState("tasks");

  const switchOnchangeFunction = () => {
    if (tableInfoType == "tasks") {
      setTableInfoType("unfilledTasks");
    } else {
      setTableInfoType("tasks");
    }
  };

  return (
    <div>
      <div>
        <b style={{ color: tableInfoType != "tasks" ? "green" : "grey" }}>
          {" "}
          Task Not Filled
        </b>

        <Switch onChange={switchOnchangeFunction} defaultChecked />
        <b style={{ color: tableInfoType == "tasks" ? "green" : "grey" }}>
          All Task List
        </b>
      </div>

      {tableInfoType == "tasks" ? (
        <>
          <All_Tasks_Selector
            setAdminTasksList={setAdminTasksList}
            adminTasksList={adminTasksList}
          />
          <div className="space_class"></div>
          <TaskSheetAdmin_Table tasksTableData={adminTasksList} />
        </>
      ) : (
        <>
          <Tasks_Not_Filled_selector
            setTaskNotFilledList={setTaskNotFilledList}
            taskNotFilledList={taskNotFilledList}
          />
          <div className="space_class"></div>
          <TaskSheetAdmin_NotFilled_Table taskNotFilledList={taskNotFilledList}/>
        </>
      )}
    </div>
  );
};

export default TaskSheetAdmin;
