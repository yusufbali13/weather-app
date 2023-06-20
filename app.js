const form = document.querySelector("form");
const input = document.querySelector("#input-alani");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target);
  getData();
  e.currentTarget.reset();
});
const getData = async () => {
  const API_KEY = "7d249aae2f4faa3d4dda582d00c60cc6";
  const cityName = input.value;
  const units = "metric";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${units}&lang=tr`;
  try {
    const res = await fetch(URL);
    console.log(res);
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      throw new Error("hata var");
    }
    wheatherTable(data);
  } catch (error) {
    console.log(error);
  }
};
const wheatherTable = (data) => {
  const {
    name,
    sys: { country },
    main: { temp, feels_like, humidity },
    weather: [{ main, description }],
    wind: { speed },
  } = data;
  const container = document.querySelector(".container");
  container.innerHTML = `
  <div class="card p-4 " style="width: 18rem;">
  <!--* Resim Alanı -->
  <img src="" class="card-img-top" alt="...">
  <!--* Şehir-Ulke-Alani -->
  <div class="card-body">
    <h2 class="card-title " id="şehir-adi">${name} </h2><span class="ülke" id="ülke">${country}</span>
  </div>
  <ul class="list-group list-group-flush h3">
    <li class="list-group-item ">
        <div class="div">
              <p class="hava-durumu-derece"> <span id="derece" class="h1">${temp} </span></p> <i class="fa-regular fa-circle"></i>  <i class="fa-solid fa-c"></i>
       </div>
    </li>
    <li class="list-group-item">
  <div class="hava-nasil mt-3">
        <p class="hava-nasil-text text-capitalize" id="hissedilen-hava">${feels_like}</p>
  </div>
  </li>
    <li class="list-group-item">
        <div class="div">
              <p class="hava-durumu-derece"> <span id="hissedilen-derece" class="h1"> ${description} </span></p> <i class="fa-regular fa-circle"></i>  <i class="fa-solid fa-c"></i>
       </div>
    </li>
  </ul>
  <div class="card-body d-flex justify-content-between border  p-4 ">
  <div class="rüzgar-hizi d-flex align-items-center gap-1 ">
  <img src="./nem.jpg" alt="" width="40%" class="mt-4">
               <div class=" mt-4">
                     <div class="d-flex align-items-center">
                          <span class="wind h1" id="rüzgar-hizi">${speed} </span> <strong class="h3 mx-2">km/h</strong>
                    </div>
               </div>
              </div>
  <div class="nem-durumu d-flex align-items-center mx-5  gap-1 ">
        <img src="./rüzgar.png" alt="" width="50%" class="mt-4">
        <div class="d-flex mt-4">
              <span class="wind h1" id="nem-orani">${humidity}</span> <span class="h1">%</span>
        </div>
  </div>
  </div>
  </div>
  `;
  const cardImg = document.querySelector(".card-img-top");
  cardImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
};
