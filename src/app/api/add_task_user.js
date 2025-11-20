const add_task_user = async (taskUpdate) => {
    const url = `http://13.201.129.153:5050/api/user/add-task`;
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
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Task added successfully:");
        return data;
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

export default add_task_user

