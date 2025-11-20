const base_url = process.env.NEXT_PUBLIC_BASE_URL

const fetchAdminTasks = async (date) => {
    const url = `${base_url}app/tasks?date=${date}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
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

export default fetchAdminTasks
