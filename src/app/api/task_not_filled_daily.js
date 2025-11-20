const base_url = process.env.NEXT_PUBLIC_BASE_URL


const task_not_filled_daily = async (date) => {
    try {
        if (!date) {
            console.error("Date is required");
            return;
        }

        const response = await fetch(`${base_url}app/tasks/not-filled?date=${date}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data
        // Use this data in your UI
    } catch (error) {
        console.error("Failed to fetch users with missing tasks for date:", error);
    }
}


export default task_not_filled_daily
