// services/taskApi.js

export async function appendDailyTasks(tasks) {
  try {
    const response = await fetch('http://13.201.129.153:5050/app/tasks/append-tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tasks),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result; // { message: "Tasks appended successfully." }
  } catch (error) {
    console.error('Error sending daily tasks:', error);
    throw error;
  }
}
