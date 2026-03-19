✦ ผมจะทำการรวบรวมไฟล์ทั้งหมดที่จำเป็นสำหรับการทำงานนี้ ไปไว้ในโฟลเดอร์ใหม่ชื่อ project_html_to_excel และปรับปรุงโค้ดใน ser
ver.js ให้เป็น
"Relative Path" เพื่อให้คุณสามารถนำไปวางที่เครื่องอื่นหรือโฟลเดอร์อื่นแล้วใช้งานได้ทันทีครับ

ขั้นตอนดำเนินการ:

1.  สร้างโฟลเดอร์ project_html_to_excel
2.  คัดลอกไฟล์ index_register_noai.html, index_register_noai_show.html, server.js, และ package.json
3.  แก้ไข server.js ให้บันทึกไฟล์ Excel ในโฟลเดอร์เดียวกับที่โปรแกรมอ ยู่

╭────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮  
│ ✓ Shell mkdir project*html_to_excel; cp index_register_noai.html project_html_to_excel/; cp index_register_noai*… │  
│ │  
│ mkdir : An item with the specified name C:\Users\User\jsd12\week-03\html\project_html_to_excel already │  
│ exists. │  
│ At line:1 char:1 │  
│ + mkdir project_html_to_excel; │  
│ + ~~~~~~~~~~~~~~~~~~~~~~~~~~~ │  
│ + CategoryInfo : ResourceExists: (C:\Users\User\j...t_html_to_excel:String) [New-Item], IOExc │  
✦ ผมจะทำการปรับปรุงโค้ดใน project_html_to_excel/server.js ให้ใช้พาธปัจจุบัน เพื่อให้ย้ายไปที่อื่นก็ยังใช้งานได้ครับ

╭────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮  
╭────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮  
╭────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮  
│ ✓ Edit project_html_to_excel\server.js: // พาธไฟล์ที่ต้องการบันทึก... => // พาธไฟล์ที่จะบันทึก (อยู่ในโ...
│
│ │  
│ 12 app.use(bodyParser.json()); │  
│ 13 app.use(bodyParser.urlencoded({ extended: true })); │  
│ 14 │  
│ 15 - // พาธไฟล์ที่ต้องการบันทึก
│
│ 16 - const EXCEL_PATH = 'C:\\Users\\User\\jsd12\\week-03\\html\\register.xlsx'; │  
│ 15 + // พาธไฟล์ที่จะบันทึก (อยู่ในโฟลเดอร์เดียวกับ server.js)
│
│ 16 + const EXCEL_PATH = path.join(\_\_dirname, 'register.xlsx'); │  
│ 17 │  
│ 18 app.post('/save-excel', (req, res) => { │  
│ 19 try { │  
╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯  
✦ ผมได้รวบรวมไฟล์ทั้งหมดไว้ให้คุณที่โฟลเดอร์ project_html_to_excel แล้วครับ

วิธีการนำไปใช้งานที่อื่น:

1.  Copy โฟลเดอร์ project_html_to_excel ไปวางในที่ที่ต้องการ
2.  เปิด Terminal / Git Bash ในโฟลเดอร์นั้น
3.  รันคำสั่งเดิม:
    - npm install (เพื่อติดตั้ง Library ที่จำเป็นจากไฟล์ package.json)
    - node server.js (เพื่อเริ่มการทำงาน)
4.  ไฟล์ register.xlsx จะถูกสร้างขึ้นในโฟลเดอร์เดียวกันนั้นทันที เมื่อคุณกดบันทึกข้อมูลครับ

ข้อมูลในโปรเจกต์:

- index_register_noai.html: หน้าฟอร์มลงทะเบียน
- index_register_noai_show.html: หน้าพรีวิวข้อมูลและปุ่มบันทึก
- server.js: ระบบหลังบ้านสำหรับเขียนไฟล์ Excel
- package.json: ข้อมูล Library ที่ต้องใช้ (Express, XLSX, ฯลฯ)

ยินดีให้บริการครับ! หากมีอะไรสงสัยเพิ่มเติมสอบถามได้เลยครับ
