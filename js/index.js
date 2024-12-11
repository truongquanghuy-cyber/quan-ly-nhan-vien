let danhSachNhanVien = [];

// Hàm lưu dữ liệu vào localStorage
function saveToLocalStorage() {
    localStorage.setItem("DanhSachNhanVien", JSON.stringify(danhSachNhanVien));
}

// Hàm lấy dữ liệu từ localStorage
function loadFromLocalStorage() {
    const data = localStorage.getItem("DanhSachNhanVien");
    if (data) {
        danhSachNhanVien = JSON.parse(data);
    }
}

// Hàm hiển thị danh sách nhân viên trong bảng
function renderTable() {
    const tableBody = document.getElementById("tableDanhSach");
    tableBody.innerHTML = "";

    danhSachNhanVien.forEach((nv, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.xepLoai}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="suaNhanVien(${index})">Sửa</button>
                    <button class="btn btn-danger btn-sm" onclick="xoaNhanVien(${index})">Xóa</button>
                </td>
            </tr>
        `;
    });
}

// Hàm thêm nhân viên
function themNhanVien() {
    const taiKhoan = document.getElementById("tknv").value;
    const hoTen = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const ngayLam = document.getElementById("datepicker").value;
    const chucVu = document.getElementById("chucvu").value;
    const luongCB = parseFloat(document.getElementById("luongCB").value);
    const gioLam = parseFloat(document.getElementById("gioLam").value);

    // Tính tổng lương và xếp loại (giả định đơn giản)
    const tongLuong = chucVu === "Sếp" ? luongCB * 3 : chucVu === "Trưởng phòng" ? luongCB * 2 : luongCB;
    const xepLoai = gioLam >= 192 ? "Xuất sắc" : gioLam >= 176 ? "Giỏi" : gioLam >= 160 ? "Khá" : "Trung bình";

    const nhanVien = { taiKhoan, hoTen, email, ngayLam, chucVu, tongLuong, xepLoai };
    danhSachNhanVien.push(nhanVien);

    saveToLocalStorage();
    renderTable();
    document.getElementById("myModal").reset();
}

// Hàm xóa nhân viên
function xoaNhanVien(index) {
    if (confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
        danhSachNhanVien.splice(index, 1);
        saveToLocalStorage();
        renderTable();
    }
}

// Hàm sửa nhân viên
function suaNhanVien(index) {
    const nhanVien = danhSachNhanVien[index];

    // Điền dữ liệu vào form
    document.getElementById("tknv").value = nhanVien.taiKhoan;
    document.getElementById("name").value = nhanVien.hoTen;
    document.getElementById("email").value = nhanVien.email;
    document.getElementById("datepicker").value = nhanVien.ngayLam;
    document.getElementById("chucvu").value = nhanVien.chucVu;
    document.getElementById("luongCB").value = nhanVien.tongLuong / (nhanVien.chucVu === "Sếp" ? 3 : nhanVien.chucVu === "Trưởng phòng" ? 2 : 1);
    document.getElementById("gioLam").value = nhanVien.xepLoai === "Xuất sắc" ? 192 : nhanVien.xepLoai === "Giỏi" ? 176 : nhanVien.xepLoai === "Khá" ? 160 : 0;

    // Cập nhật nhân viên
    document.getElementById("btnCapNhat").onclick = function () {
        const taiKhoan = document.getElementById("tknv").value;
        const hoTen = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const ngayLam = document.getElementById("datepicker").value;
        const chucVu = document.getElementById("chucvu").value;
        const luongCB = parseFloat(document.getElementById("luongCB").value);
        const gioLam = parseFloat(document.getElementById("gioLam").value);

        const tongLuong = chucVu === "Sếp" ? luongCB * 3 : chucVu === "Trưởng phòng" ? luongCB * 2 : luongCB;
        const xepLoai = gioLam >= 192 ? "Xuất sắc" : gioLam >= 176 ? "Giỏi" : gioLam >= 160 ? "Khá" : "Trung bình";

        danhSachNhanVien[index] = { taiKhoan, hoTen, email, ngayLam, chucVu, tongLuong, xepLoai };
        saveToLocalStorage();
        renderTable();
        document.getElementById("myModal").reset();
    };
}

// Gắn sự kiện cho nút Thêm
document.getElementById("btnThemNV").addEventListener("click", themNhanVien);

// Tải dữ liệu từ localStorage khi trang được load
loadFromLocalStorage();
renderTable();
