const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// พาธไฟล์ที่ต้องการบันทึก
const EXCEL_PATH = 'C:\\Users\\User\\jsd12\\week-03\\html\\register.xlsx';

app.post('/save-excel', (req, res) => {
    try {
        const userData = req.body;
        let workbook;
        let worksheet;
        let dataToSave = [];

        // 1. ตรวจสอบว่ามีไฟล์เดิมอยู่หรือไม่
        if (fs.existsSync(EXCEL_PATH)) {
            workbook = XLSX.readFile(EXCEL_PATH);
            const sheetName = workbook.SheetNames[0];
            worksheet = workbook.Sheets[sheetName];
            // อ่านข้อมูลเดิมออกมา
            dataToSave = XLSX.utils.sheet_to_json(worksheet);
        } else {
            // ถ้าไม่มีไฟล์ ให้สร้าง Workbook ใหม่
            workbook = XLSX.utils.book_new();
        }

        // 2. เพิ่มข้อมูลใหม่ต่อท้าย
        dataToSave.push(userData);

        // 3. สร้าง Worksheet ใหม่จากข้อมูลทั้งหมด
        const newWorksheet = XLSX.utils.json_to_sheet(dataToSave);
        
        // 4. นำ Worksheet ใส่ลงใน Workbook
        if (workbook.SheetNames.length > 0) {
            workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;
        } else {
            XLSX.utils.book_append_sheet(workbook, newWorksheet, "Registration");
        }

        // 5. บันทึกไฟล์ทับที่เดิม (ไม่ต้องดาวน์โหลด)
        XLSX.writeFile(workbook, EXCEL_PATH);

        console.log('Successfully saved to:', EXCEL_PATH);
        res.status(200).send({ message: 'Saved successfully to ' + EXCEL_PATH });
    } catch (error) {
        console.error('Save Error:', error);
        res.status(500).send({ message: 'Error saving file: ' + error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Target file: ${EXCEL_PATH}`);
});
