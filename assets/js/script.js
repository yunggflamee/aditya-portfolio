// Morph shape dynamically based on screen size

function updateBlob(){

    const blob = document.querySelector(".blob");

    if(!blob) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    const x = Math.floor((w/h)*50);

    blob.style.borderRadius =
    `${x}% ${100-x}% ${x+10}% ${100-x-10}% /
     ${100-x}% ${x}% ${100-x-20}% ${x+20}%`;
}

window.addEventListener("resize", updateBlob);
window.addEventListener("load", updateBlob);