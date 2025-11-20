const edit_todays_task = async (taskUpdate) => {
    const url = `http://13.201.129.153:5050/api/user/edit-task`;
    const body = {
        email: taskUpdate["email"],
        date: taskUpdate["date"],
        tasks: taskUpdate["tasks"],
        client: taskUpdate["client"],
        project: taskUpdate["project"],
        comments: taskUpdate["comments"],
    };

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Task updated successfully:");
        return data;
    } catch (error) {
        console.error("Error updating task:", error);
    }
}

export default edit_todays_task;