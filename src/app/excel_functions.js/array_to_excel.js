import ExcelJS from "exceljs";

async function downloadExcel(data, fileName = "data.xlsx") {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Define columns based on object keys
    const columns = Object.keys(data[0]).map((key) => ({ header: key, key }));
    worksheet.columns = columns;

    // Add rows
    data.forEach((item) => worksheet.addRow(item));

    // Generate the Excel file as a Blob
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a link and trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export default downloadExcel