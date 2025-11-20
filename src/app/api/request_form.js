// src/app/api/request_form.js
const base_url = process.env.NEXT_PUBLIC_BASE_URL


export async function submitWFHRequest(formData) {
  try {
    // ✅ Corrected endpoint path
    const response = await fetch(`${base_url}api/wfh/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to submit WFH request");
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error submitting WFH request:", error);
    return { success: false, error: error.message };
  }
}
