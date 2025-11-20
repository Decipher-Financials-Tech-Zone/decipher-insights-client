const base_url = process.env.NEXT_PUBLIC_BASE_URL

const task_not_filled_weekly = async() => {
    try {
        const response = await fetch(`${base_url}app/tasks/not-filled/last-week`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return(data)
        
    } catch (error) {
        console.error("Failed to fetch users with missing tasks:", error);
    }
}


export default task_not_filled_weekly