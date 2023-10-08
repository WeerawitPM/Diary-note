let button_hover = document.getElementById("button_hover");
let icon_hover = document.getElementById("icon_hover");

button_hover.addEventListener("mouseover", function() {
    icon_hover.classList.remove("fa-plus");
    icon_hover.classList.add("fa-pencil");
});

button_hover.addEventListener("mouseout", function() {
    icon_hover.classList.remove("fa-pencil");
    icon_hover.classList.add("fa-plus");
});

////////////////////////////////////////////////////////////////

let diaryData = [];
const jsonData = localStorage.getItem("diaryData");

if (jsonData) {
    diaryData = JSON.parse(jsonData);
} else {
    // ถ้าไม่มีข้อมูลใน LocalStorage ให้กำหนดให้ budgetData เป็นอาร์เรย์ว่าง
    localStorage.setItem("diaryData", []);
    diaryData = [];
}

function addDiary() {
    Swal.fire({
        title: "Add Diary",
        html: `
            <input type="text" id="titleDiary" class="form-control form-control-lg mb-3" placeholder="หัวข้อไดอารี่">
            <input type="url" id="imageDiary" class="form-control form-control-lg mb-3" placeholder="ลิ้งค์รูปภาพ">
            <textarea type="text" id="diary" class="form-control form-control-lg" placeholder="เนื้อหาไดอารี่"></textarea>
        `,
        confirmButtonText: "Add",
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
            const titleDiary = Swal.getPopup().querySelector("#titleDiary").value;
            const imageDiary = Swal.getPopup().querySelector("#imageDiary").value;
            const diary = Swal.getPopup().querySelector("#diary").value;
            if (!titleDiary) {
                Swal.showValidationMessage(`โปรดกรอกหัวข้อไดอารี่`);
            }
            else if (!diary) {
                Swal.showValidationMessage(`โปรดกรอกเนื้อหาไดอารี่`);
            }
            return { titleDiary: titleDiary, imageDiary: imageDiary, diary: diary };
        },
    }).then((result) => {
        if (result.isConfirmed) {
            diaryData.push(result.value);
            localStorage.setItem("diaryData", JSON.stringify(diaryData));
            Swal.fire({
                title: "Success",
                text: "เพิ่มไดอารี่สำเร็จแล้ว",
                icon: "success",
                confirmButtonText: "Ok",
            });
        }
    });
}