export default function openModal(modalNum, group) {
    var modal = document.getElementById("myModal" + group + modalNum);
    modal.style.display = "block";
}