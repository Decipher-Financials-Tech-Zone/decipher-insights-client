import React, { useEffect, useState } from "react";
import News_Table from "./News_table";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Grid from '@mui/material/Grid2';
import concat_news from "./concat_news";

const News = () => {

  const [news, setNews] = useState(null);
  const [keywords, setkeywords] = useState([])


  const handleFileUpload = async (event) => {
    setNews(null)
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const buffer = e.target.result;
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);
      const worksheet = workbook.worksheets[0]; // Read first worksheet

      // Extract only the first column
      const firstColumnData = [];
      worksheet.eachRow((row, rowNumber) => {
        const firstCell = row.getCell(1).value; // Get first column (Column A)
        firstColumnData.push(firstCell);
      });

      console.log(firstColumnData); // Logs first column data
      multiple_keywords_news_fetch(firstColumnData)
      // setkeywords(firstColumnData)
    };

    reader.readAsArrayBuffer(file);
  };


  const VisuallyHiddenInput = ({ onChange }) => (
    <input
      type="file"
      style={{ display: "none" }}
      onChange={onChange}
      multiple
    />
  );

  async function downloadExcel() {

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Add header row
    worksheet.columns = Object.keys(news["articles"][0]).map(key => ({ header: key, key }));


    // Add data rows
    news["articles"].forEach(row => worksheet.addRow(row));

    // Save the Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "News_Data.xlsx");
  }

  const multiple_keywords_news_fetch = async (keywords) => {
  

    try {
      // Fetch news in parallel for all keywords
      const results = await Promise.all(keywords.map(keyword => concat_news(keyword)));

      // Flatten the array of arrays
      const newsArticles = { articles: results.flat() };

      console.log(newsArticles);

      setNews(newsArticles); // Store fetched data (if setNews is available)
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };


  useEffect(() => {

    // multiple_keywords_news_fetch()

  }, [keywords]);

  return (
    <div style={{ color: "black" }}>
      {/* Ensure news is loaded before accessing `articles` */}
      
        <Paper style={{ height: "100px", position: "fixed", width: "92.5%", display: "flex", alignItems: "center", justifyContent: "center", top: 65 }}>

          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload Excel
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileUpload}
                  multiple
                />
              </Button>
            </Grid>
            <Grid item xs={4}>
            {news &&
              <Button variant="contained" color="success" onClick={downloadExcel} >
                Download News in Excel
              </Button>}
            </Grid>
          </Grid>

        </Paper>
        <div style={{ height: "90px" }}></div>
        {news ? <News_Table news={news.articles} /> : <div><CircularProgress /></div>}
    </div>
  );
};

export default News;
