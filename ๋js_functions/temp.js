// import module readline จาก Node.js
// ใช้สำหรับรับ input จาก Terminal
import readline from "readline";

// สร้าง interface สำหรับรับค่า input และแสดง output
const rl = readline.createInterface({
  input: process.stdin, // รับค่าจาก keyboard
  output: process.stdout, // แสดงผลใน terminal
});

// ฟังก์ชันสำหรับแปลงอุณหภูมิ - เพิ่ม parameter 'ytel' และคืนค่ากลับไปด้วย
function convertTemperature(value, unit, autor, ytel) {
  if (unit === "C") {
    return {
      result: (value * 9) / 5 + 32,
      author: autor,
      ytel: ytel // ส่งเบอร์โทรกลับไปใน object
    };
  } else if (unit === "F") {
    return {
      result: ((value - 32) * 5) / 9,
      author: autor,
      ytel: ytel // ส่งเบอร์โทรกลับไปใน object
    };
  } else {
    return null;
  }
}

// เริ่มรับค่าจากผู้ใช้
rl.question("Enter temperature value: ", (tempInput) => {
  const temp = parseFloat(tempInput);

  rl.question("Enter unit (C/F): ", (unitInput) => {
    const unit = unitInput.trim().toUpperCase();

    rl.question("Enter the name of the person who entered the information: ", (autorInput) => {
      const autor = autorInput.trim().toUpperCase();

      rl.question("Phone Number (numbers only): ", (ytelInput) => {
        // ตัดตัวอักษรที่ไม่ใช่ตัวเลขออก (\D หมายถึง non-digit)
        const ytel = ytelInput.replace(/\D/g, '');

        // เรียกใช้ฟังก์ชันแปลงค่า (ส่ง ytel ไปด้วย)
        const conversionData = convertTemperature(temp, unit, autor, ytel);

        // ตรวจสอบผลลัพธ์
        if (conversionData === null) {
          console.log("❌ Invalid unit! Please use C or F");
        } else {
          // แสดงผลลัพธ์
          if (unit === "C") {
            console.log(`Result: ${temp}°C = ${conversionData.result.toFixed(2)}°F ผู้คีย์ข้อมูล = ${conversionData.author} เบอร์โทรติดต่อ = ${conversionData.ytel}`);
          } else {
            console.log(`Result: ${temp}°F = ${conversionData.result.toFixed(2)}°C ผู้คีย์ข้อมูล = ${conversionData.author} เบอร์โทรติดต่อ = ${conversionData.ytel}`);
          }
        }

        rl.close();
      });
    });
  });
});
