"use client";

import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import { AuthContext } from "../../../context/AuthContext";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import fetchMyTasks from "@/app/api/fetch_my_tasks";
import downloadExcel from "@/app/excel_functions.js/array_to_excel";

export default function All_Tasks() {
  const [loading, setLoading] = useState(false)

  const { userDetails, setUserTasks, userTasks } = useContext(AuthContext);

  const columns = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "client", headerName: "Client", flex: 1 },
    { field: "project", headerName: "Project", flex: 1 },
    { field: "tasks", headerName: "Tasks", flex: 2 },
    { field: "comments", headerName: "Comments", flex: 2 },
  ];

  const rows = userTasks?.length
    ? userTasks.map((values, index) => ({ id: index, ...values }))
    : [];

  const paginationModel = { page: 0, pageSize: 8 };

  const fetch_my_tasks = async () => {
    setLoading(true)
    try {
      const data = await fetchMyTasks(userDetails["email"]);
      setUserTasks(data["tasks"])
      setLoading(false)

    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  const downloadTasksExcel = (data) =>{

    downloadExcel(data)
    
  }



  return (
    <>
      <Button variant="contained" onClick={fetch_my_tasks} loading={loading}>
        Refresh Tasks
      </Button>
      <Button variant="outlined" className="left-margin" onClick={()=>downloadTasksExcel(rows)}>
        Download Excel
      </Button>
      <div style={{marginLeft: "20px", marginBottom: "20px"}}></div>
      <Paper sx={{ height: 525, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
}
