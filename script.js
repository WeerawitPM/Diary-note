let button_hover = document.getElementById("button_hover");
let icon_hover = document.getElementById("icon_hover");

button_hover.addEventListener("mouseover", function () {
    icon_hover.classList.remove("fa-plus");
    icon_hover.classList.add("fa-pencil");
});

button_hover.addEventListener("mouseout", function () {
    icon_hover.classList.remove("fa-pencil");
    icon_hover.classList.add("fa-plus");
});

////////////////////////////////////////////////////////////////

let diaryData = [];
const jsonData = localStorage.getItem("diaryData");

if (jsonData) {
    diaryData = JSON.parse(jsonData);
    showDiary();
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
        cancelButtonColor: "#d33",
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
            let diaryList = document.getElementById("diaryList");
            diaryList.innerHTML = "";
            showDiary();
        }
    });
}

function showDiary() {
    let diaryList = document.getElementById("diaryList");

    for (let i = 0; i < diaryData.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("mb-3");
        card.classList.add("mx-2")
        card.style.maxWidth = "48%";
        card.style.minWidth = "20%";
        if (diaryData[i].imageDiary) {
            card.innerHTML = `
            <div class="card-header text-end">
                <button class="fa fa-edit fs-5 btn border-0 btn-sm" onclick="editDiary(${i})"></button>
                <button class="fa fa-trash fs-5 btn border-0 btn-sm" onclick="deleteDiary(${i})"></button>
            </div>
            <img src="${diaryData[i].imageDiary}"
                class="card-img-top card-img-bottom" alt="...">
            <div class="card-body">
                <h4 class="card-title">${diaryData[i].titleDiary}</h4>
                <pre class="card-text fs-6">${diaryData[i].diary}</pre>
            </div>
            `;
        } else {
            card.innerHTML = `
            <div class="card-header text-end">
                <button class="fa fa-edit fs-5 btn border-0 btn-sm" onclick="editDiary(${i})"></button>
                <button class="fa fa-trash fs-5 btn border-0 btn-sm" onclick="deleteDiary(${i})"></button>
            </div>
            <div class="card-body">
                <h4 class="card-title">${diaryData[i].titleDiary}</h4>
                <pre class="card-text fs-6">${diaryData[i].diary}</pre>
            </div>
            `;
        }
        diaryList.appendChild(card);
    }
}

function deleteDiary(index) {
    Swal.fire({
        title: "ต้องการลบไดอารี่นี้ใช่หรือไม่?",
        text: "การลบไดอารี่นี้จะไม่สามารถกู้คืนได้",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
    }).then((result) => {
        if (result.isConfirmed) {
            diaryData.splice(index, 1);
            localStorage.setItem("diaryData", JSON.stringify(diaryData));
            let diaryList = document.getElementById("diaryList");
            diaryList.innerHTML = "";
            showDiary();
        }
    });
}

function editDiary(index) {
    Swal.fire({
        title: "Edit Diary",
        html: `
            <input type="text" id="titleDiary" class="form-control form-control-lg mb-3" placeholder="หัวข้อไดอารี่" value="${diaryData[index].titleDiary}">
            <input type="url" id="imageDiary" class="form-control form-control-lg mb-3" placeholder="ลิ้งค์รูปภาพ" value="${diaryData[index].imageDiary}">
            <textarea type="text" id="diary" class="form-control form-control-lg" placeholder="เนื้อหาไดอารี่">${diaryData[index].diary}</textarea>
        `,
        confirmButtonText: "Edit",
        showCancelButton: true,
        cancelButtonColor: "#d33",
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
            diaryData[index] = result.value;
            localStorage.setItem("diaryData", JSON.stringify(diaryData));
            Swal.fire({
                title: "Success",
                text: "แก้ไขไดอารี่สำเร็จแล้ว",
                icon: "success",
                confirmButtonText: "Ok",
            });
            let diaryList = document.getElementById("diaryList");
            diaryList.innerHTML = "";
            showDiary();
        }
    });
}

function searchDiary() {
    let searchInput = document.getElementById("searchInput").value;
    let diaryList = document.getElementById("diaryList");
    diaryList.innerHTML = "";

    for (let i = 0; i < diaryData.length; i++) {
        if (searchInput == diaryData[i].titleDiary) {
            let card = document.createElement("div");
            card.classList.add("card");
            card.classList.add("mb-3");
            card.classList.add("mx-2")
            card.style.maxWidth = "48%";
            card.style.minWidth = "20%";
            if (diaryData[i].imageDiary) {
                card.innerHTML = `
                <div class="card-header text-end">
                    <button class="fa fa-edit fs-5 btn border-0 btn-sm" onclick="editDiary(${i})"></button>
                    <button class="fa fa-trash fs-5 btn border-0 btn-sm" onclick="deleteDiary(${i})"></button>
                </div>
                <img src="${diaryData[i].imageDiary}"
                    class="card-img-top card-img-bottom" alt="...">
                <div class="card-body">
                    <h4 class="card-title">${diaryData[i].titleDiary}</h4>
                    <pre class="card-text fs-6">${diaryData[i].diary}</pre>
                </div>
                `;
            } else {
                card.innerHTML = `
                <div class="card-header text-end">
                    <button class="fa fa-edit fs-5 btn border-0 btn-sm" onclick="editDiary(${i})"></button>
                    <button class="fa fa-trash fs-5 btn border-0 btn-sm" onclick="deleteDiary(${i})"></button>
                </div>
                <div class="card-body">
                    <h4 class="card-title">${diaryData[i].titleDiary}</h4>
                    <pre class="card-text fs-6">${diaryData[i].diary}</pre>
                </div>
                `;
            }
            diaryList.appendChild(card);
        }
    }
}