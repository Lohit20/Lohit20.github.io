const card = document.getElementById("card");

document.addEventListener("mousemove", (e) => {
  let x = (window.innerWidth / 2 - e.clientX) / 20;
  let y = (window.innerHeight / 2 - e.clientY) / 20;

  card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

card.addEventListener("mouseleave", () => {
  card.style.transform = "rotateY(0deg) rotateX(0deg)";
});