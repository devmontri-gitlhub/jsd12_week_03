// นำเข้า Library ที่จำเป็น
const express = require('express');        // ใช้สำหรับสร้าง Web Server
const bodyParser = require('body-parser'); // ใช้สำหรับอ่านข้อมูลที่ส่งมาจาก Form (JSON)
const path = require('path');              // ใช้สำหรับจัดการพาธของไฟล์
const fs = require('fs');                  // ใช้สำหรับจัดการระบบไฟล์ (ตรวจสอบว่าไฟล์มีอยู่จริงไหม)
const XLSX = require('xlsx');              // Library สำหรับอ่านและเขียนไฟล์ Excel
const cors = require('cors');              // อนุญาตให้หน้าเว็บ (Frontend) ส่งข้อมูลข้าม Domain มาที่ Server ได้

const app = express();
const port = 3000; // กำหนดให้ Server ทำงานที่ Port 3000

// ตั้งค่า Middleware
app.use(cors()); // เปิดใช้งาน CORS
app.use(bodyParser.json()); // ให้อ่านข้อมูลแบบ JSON ได้
app.use(bodyParser.urlencoded({ extended: true })); // ให้อ่านข้อมูลจาก Form ได้

// กำหนดตำแหน่งไฟล์ Excel ที่จะบันทึก (บันทึกไว้ในโฟลเดอร์เดียวกันกับไฟล์ server.js นี้)
const EXCEL_PATH = path.join(__dirname, 'register.xlsx');

// สร้าง Route สำหรับรับข้อมูลการบันทึก
app.post('/save-excel', (req, res) => {
    try {
        const userData = req.body; // รับข้อมูลผู้สมัครจากหน้าเว็บ
        let workbook;
        let dataToSave = [];

        // --- ส่วนการจัดการไฟล์ Excel ---
        
        // 1. ตรวจสอบว่ามีไฟล์ register.xlsx อยู่แล้วหรือไม่
        if (fs.existsSync(EXCEL_PATH)) {
            // ถ้ามีไฟล์อยู่แล้ว ให้เปิดไฟล์เดิมขึ้นมา
            workbook = XLSX.readFile(EXCEL_PATH);
            const sheetName = workbook.SheetNames[0]; // เลือก Sheet แรก
            const worksheet = workbook.Sheets[sheetName];
            // แปลงข้อมูลจาก Sheet เดิมให้เป็นรูปแบบ JSON เพื่อนำมาต่อท้ายข้อมูลใหม่
            dataToSave = XLSX.utils.sheet_to_json(worksheet);
        } else {
            // ถ้ายังไม่มีไฟล์ ให้สร้างสมุดงาน (Workbook) ใหม่
            workbook = XLSX.utils.book_new();
        }

        // 2. นำข้อมูลใหม่ที่ได้รับจากหน้าเว็บ เพิ่มเข้าไปในชุดข้อมูลเดิม
        dataToSave.push(userData);

        // 3. สร้างแผ่นงาน (Worksheet) ใหม่จากข้อมูลทั้งหมด (ข้อมูลเก่า + ข้อมูลใหม่)
        const newWorksheet = XLSX.utils.json_to_sheet(dataToSave);
        
        // 4. นำแผ่นงานที่สร้างเสร็จแล้ว ใส่เข้าไปในสมุดงาน
        if (workbook.SheetNames.length > 0) {
            // ถ้ามี Sheet เดิมอยู่แล้ว ให้แทนที่ด้วยอันใหม่
            workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;
        } else {
            // ถ้าเป็นไฟล์ใหม่ ให้เพิ่ม Sheet เข้าไป
            XLSX.utils.book_append_sheet(workbook, newWorksheet, "Registration");
        }

        // 5. เขียนไฟล์ทับลงบนดิสก์ (ขั้นตอนนี้จะบันทึกไฟล์โดยตรง ไม่มีการดาวน์โหลดผ่านเบราว์เซอร์)
        XLSX.writeFile(workbook, EXCEL_PATH);

        console.log('บันทึกข้อมูลสำเร็จที่:', EXCEL_PATH);
        res.status(200).send({ message: 'บันทึกสำเร็จที่ ' + EXCEL_PATH });
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการบันทึก:', error);
        res.status(500).send({ message: 'เกิดข้อผิดพลาด: ' + error.message });
    }
});

// เริ่มต้นการทำงานของ Server
app.listen(port, () => {
    console.log(`--------------------------------------------------`);
    console.log(`Server ทำงานแล้วที่: http://localhost:${port}`);
    console.log(`ตำแหน่งไฟล์เป้าหมาย: ${EXCEL_PATH}`);
    console.log(`--------------------------------------------------`);
});
