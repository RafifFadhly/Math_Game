
// untuk mengupdate tanggal
function updateDate() {
    const dateElement = document.getElementById('date');
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    dateElement.textContent = formattedDate;
}

// untuk menampilkan alert jika ingin pindah ke menu ketika soal belum selesai di kerjakan
function pindah(){
    alert("yakin pindah halaman ketika lagi ngerjain soal ?");
    window.location.href = 'index.html';
}

// untuk mengupdate tanggal
updateDate();
setInterval(updateDate, 1000);