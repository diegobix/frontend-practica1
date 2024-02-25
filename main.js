const avisado = window.localStorage.getItem("avisado");
if (avisado === null) {
  alert("Debes permitir la reproduccion automatica de video.");
  window.localStorage.setItem("avisado", "true");
}

const fetchLesson = async () => {
  const res = await fetch("https://funny-cobra-98.deno.dev/lesson");
  const data = await res.text();

  return data;
};

const text = document.querySelector(".texto");
const btn = document.querySelector("#btn-next");

btn.addEventListener("mouseover", () => {
  randomPos();
});

const addLesson = async () => {
  const new_span = text.appendChild(document.createElement("span"));
  new_span.textContent = await fetchLesson();
};

btn.addEventListener("click", async () => {
  await addLesson();
  nextLesson(0.3);
});

let elem_count = 0;
const nextLesson = (transition_time) => {
  elem_count++;

  document.querySelectorAll(".slider span").forEach((elem) => {
    elem.style.transition = `${transition_time}s`;
    elem.style.transform = `translateY(${-100 * elem_count}%)`;
  });
};

const randomPos = () => {
  const x = Math.floor(Math.random() * (window.innerWidth - 200));
  const y = Math.floor(Math.random() * (window.innerHeight - 200));
  console.log(x, y);
  btn.style.top = `${y}px`;
  btn.style.left = `${x}px`;
};
