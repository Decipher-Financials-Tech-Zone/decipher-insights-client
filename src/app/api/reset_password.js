const base_url = process.env.NEXT_PUBLIC_BASE_URL


async function resetPassword(email, newPassword) {
    try {
      const response = await fetch(`${base_url}api/auth/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to reset password");
      }
  
      console.log("Password reset successful:", data.message);
      return data;
    } catch (error) {
      console.error("Error resetting password:", error.message);
    }
  }
  
export default resetPassword