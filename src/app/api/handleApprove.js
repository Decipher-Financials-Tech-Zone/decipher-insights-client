// app/api/handleApprove.js
const base_url = process.env.NEXT_PUBLIC_BASE_URL

export async function approveRejectRequest(requestId, decision) {
  try {
    const res = await fetch(`${base_url}api/wfh/approve/${requestId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ approved: decision }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to approve/reject request");
    }

    return data; // ✅ { success: true, data: updatedRequest }
  } catch (error) {
    console.error("❌ Error approving/rejecting request:", error);
    return { success: false, error: error.message };
  }
}
