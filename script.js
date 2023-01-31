/*const btn=document.getElementById("btn_add");
btn.addEventListener("click",addnumbers);
function addnumbers(){
   const number1=  parseInt(document.getElementById("number1").value);
   const number2= parseInt(document.getElementById("number2").value);
  const sum= number1+number2;
  const resultDiv=document.getElementById("result");
  resultDiv.innerHTML=sum;
}
*/
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            console.log("lat:" + lat + "long: " + long);
            const data = await getWeatherdata(lat, long);
            renderWeatherdata(data);
            var map = L.map('map').setView([20.9716, 80.5946], 5);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            let marker = L.marker([lat, long]).addTo(map);
            marker.bindPopup(data.name).openPopup();

            map.on('click', async function(e) {
                console.log("Lat : " + e.latlng.lat + "Long : " + e.latlng.lng);

                const data = await getWeatherdata(e.latlng.lat, e.latlng.lng);
                renderWeatherdata(data);


            })


            //console.log(data);

        })
    }
}

getLocation();

//var map = L.map('map').setView([51.505, -0.09], 13);

async function getWeatherdata(lat, long) {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ddfaba4398b491fa4ef3e29a5e934c6e`;

    let response = await fetch(api);
    let data = await response.json();
    //console.log(data);
    return data;
}

function renderWeatherdata(data) {
    document.getElementById("name").innerHTML = "City : " + data.name;
    document.getElementById("temp").innerHTML = "Temperature : " + data.main.temp;
    document.getElementById("temp_min").innerHTML = "Min Temperature : " + data.main.temp_min;
    document.getElementById("temp_max").innerHTML = "Max Temperature : " + data.main.temp_max;
    document.getElementById("humidity").innerHTML = "Humidity : " + data.main.humidity;
}