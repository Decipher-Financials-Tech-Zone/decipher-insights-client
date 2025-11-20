const fetchMyTasks = async (email) => {
    const url = `http://13.201.129.153:5050/app/tasks/user/email`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email }) // Pass email in the request body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return null;
    }
};

export default fetchMyTasks;
