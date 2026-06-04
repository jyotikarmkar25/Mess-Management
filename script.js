const API_KEY = "AQ.Ab8RN6LUupNVThTNpBRGLnXXLhNXOwzqVBa-XYcgwEIgNvicXQ";

let pass = localStorage.getItem("pass") || "1234";

function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  const savedUser = localStorage.getItem("user") || "vikky";
  const savedPass = localStorage.getItem("pass") || "1234";

  if (u === savedUser && p === savedPass) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
  } else {
    document.getElementById("msg").innerText = " Wrong Username or Password";
  }
}


function show(id) {
  document.querySelectorAll(".main section").forEach(sec => {
    sec.classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
}

let foods = JSON.parse(localStorage.getItem("foods")) || [];

function addFood() {
  const input = document.getElementById("foodInput");

  if (!input.value.trim()) return;

  foods.push(input.value.trim());
  localStorage.setItem("foods", JSON.stringify(foods));

  input.value = "";
  renderFood();
}

function renderFood() {
  const list = document.getElementById("foodList");
  const count = document.getElementById("foodCount");

  list.innerHTML = "";

  foods.forEach((food, i) => {
    list.innerHTML += `
      <li>
        ${food}
        <button onclick="deleteFood(${i})">delete</button>
      </li>
    `;
  });

  count.innerText = foods.length;
}

function deleteFood(index) {
  foods.splice(index, 1);
  localStorage.setItem("foods", JSON.stringify(foods));
  renderFood();
}

renderFood();

let menuData = JSON.parse(localStorage.getItem("menu")) || {};

function saveMenu() {
  const day = document.getElementById("day").value;

  menuData[day] = {
    breakfast: document.getElementById("b").value,
    lunch: document.getElementById("l").value,
    dinner: document.getElementById("d").value
  };

  localStorage.setItem("menu", JSON.stringify(menuData));

  document.getElementById("menuBox").innerText = " Menu Saved Successfully";
}

function saveTime() {
  const bt = document.getElementById("bt").value;
  const lt = document.getElementById("lt").value;
  const dt = document.getElementById("dt").value;

  document.getElementById("timeBox").innerHTML = `
     Breakfast: ${bt} <br>
     Lunch: ${lt} <br>
     Dinner: ${dt}
  `;
}

function changePass() {
  const oldP = document.getElementById("oldP").value;
  const newP = document.getElementById("newP").value;

  if (oldP === pass) {
    pass = newP;
    localStorage.setItem("pass", pass);
    document.getElementById("passMsg").innerText = " Password Updated";
  } else {
    document.getElementById("passMsg").innerText = " Wrong Old Password";
  }
}

const img = document.getElementById("img");
const preview = document.getElementById("preview");
const result = document.getElementById("result");

img.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.style.display = "block";
  };

  reader.readAsDataURL(file);
  result.innerHTML = " Image selected. Click Analyze button.";
});

function goBack() {
    document.querySelectorAll(".main section").forEach(sec =>{
        sec.classList.add("hidden");
    });
    document.getElementById("summary").classList.remove("hidden");
}

function removeImage() {
    const img = document.getElementById("preview");
    const input = document.getElementById("img");
    const result = document.getElementById("result");

    img.src = "";
    img.style.display = "none";

    input.value = "";

    result.innerHTML = "Image remove.Upload again to anayze.";
}

async function analyzeFood() {
  const file = document.getElementById("img").files[0];

  if (!file) {
    alert(" Please select an image first");
    return;
  }

  result.innerHTML = " Analyzing food image...";

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(
      `https://api.spoonacular.com/food/images/analyze?apiKey=${API_KEY}`,
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();

    showResult(data);

  } catch (err) {
    console.log(err);
    result.innerHTML = " API Error or Invalid Key";
  }
}

function showResult(data) {

  result.innerHTML = `
    <h3> Food Detected</h3>
    <p> Name: ${data.category?.name || "Unknown"}</p>
    <p> Confidence: ${data.category?.probability || "N/A"}</p>

    <hr>

    <p> This API detects food type only</p>
    <p> For calories/protein → use Nutrition API</p>
  `;
}