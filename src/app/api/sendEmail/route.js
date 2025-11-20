// app/api/sendEmail/route.js
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const submission = await req.json();

    // ✅ Construct your dark theme HTML email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Form Submission - Approval Required</title>
          <style>
            body {
              font-family: "Segoe UI", Roboto, Arial, sans-serif;
              background-color: #0d1117;
              padding: 20px;
              color: #e6edf3;
            }
            .container {
              background-color: #161b22;
              padding: 25px;
              border-radius: 12px;
              max-width: 620px;
              margin: auto;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
            }
            h2 {
              color: #58a6ff;
              border-bottom: 1px solid #30363d;
              padding-bottom: 8px;
              margin-bottom: 20px;
            }
            .details { margin: 20px 0; line-height: 1.7; }
            .label { font-weight: 600; color: #c9d1d9; }
            .actions { text-align: center; margin-top: 30px; }
            .btn {
              display: inline-block;
              padding: 10px 20px;
              margin: 8px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              font-size: 15px;
              color: #fff;
              transition: opacity 0.2s ease-in-out;
            }
            .approve { background-color: #238636; }
            .reject { background-color: #da3633; }
            .approve:hover, .reject:hover { opacity: 0.9; }
            .footer { margin-top: 30px; font-size: 12px; color: #8b949e; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>📝 New WFH request</h2>
            <p>A new form has been submitted and requires your review and approval:</p>
            <div class="details">
              <p><span class="label">Name:</span> ${submission.name || "N/A"}</p>
              <p><span class="label">Start Date:</span> ${submission.startDate}</p>
              <p><span class="label">End Date:</span> ${submission.endDate}</p>
              <p><span class="label">Last Non-standard Month:</span> ${submission.lastNonStandardMonth}</p>
              <p><span class="label">Number of WFH Days:</span> ${submission.numWfhDays}</p>
            </div>
            <div class="actions">
             <a href="${process.env.BACKEND_BASE_URL}api/wfh/approve/${submission.id}?approved=true" class="btn approve">✅ Approve</a>
             <a href="${process.env.BACKEND_BASE_URL}api/wfh/approve/${submission.id}?approved=false" class="btn reject">❌ Reject</a>
            </div>
            <div class="footer">
              This is an automated email. Please do not reply directly.<br/>
              © ${new Date().getFullYear()} Decipher Insights
            </div>
          </div>
        </body>
      </html>
    `;

    // ✅ Configure your transporter (use your email provider)
    const transporter = nodemailer.createTransport({
      service: "gmail", // or 'Outlook', 'Zoho', etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //  Send the email
    await transporter.sendMail({
      from: `"Decipher Insights" <${process.env.EMAIL_USER}>`,
      to: ["luv.ratan@decipherfinancials.com", "megha.punjabi@decipherfinancials.com","isha.joshi@decipherfinancials.com", "anil.kumar@decipherfinancials.com", "sneha.mehta@decipherfinancials.com"],
      subject: "Form Submission - Approval Required",
      html: emailHtml,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}
