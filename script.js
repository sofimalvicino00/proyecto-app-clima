const urlBase = `https://api.openweathermap.org/data/2.5/weather` // API CALL codigo que sacamos de la pagina de openweathermap en la parte de API calls que hay tres opciones de codigo y elegimos la primera, que igualmente la cortamos despues va a decir sergie porque
// Lo que falta de la url de arriba que cortamos        ?q={city name}&appid={API key}
const API_KEY = "1f9de78a45bedbca364298d797f4fb27" // Pegas la API key que creaste en la pag 
const  diffKelvin = 273.15 // Que es la diferencia con los grados kelvin (no toy entendiendo mucho por ahora)

document.getElementById("searchButton").addEventListener("click", ()=> { // Vamos a escuchar el click y vamos a hacer una funcion de flecha
    const city = document.getElementById("cityInput").value; // Primero queremos seleccionar el valor del input o sea que ciudad escribieron
    if(city){ // En el caso de que la ciudad exista y sea valida
        fetchWeather(city) // Llamar a API para que nos de la informacion del clima de esa ciudad, llamamos a la funcion que hace eso
    }else{
        alert("Ingrese una ciudad valida")
    }
})


// Funcion que agarra la informacion del clima
function fetchWeather(city){
    fetch (`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`) // vamos a reemplazar donde decia {city name} por el nuestra constante city donde va a estar el valor del input por ende la ciudad que escriban y lo mismo hacemos con {API key} que lo reemplazamos con el nombre de la constante donde pusimos nuestra key. Y de esta manera ya tenemos el codigo para que llame al clima!. A lo ultimo agregamos esto: &lang=es para poner los datos en español, seria lang de lenguaje y es por español.
    .then(data => data.json()) // Promesa?
    .then(data => showWeatherData(data)) // Promesa?
}

//Funcion que muestre los datos del clima
function showWeatherData(data){ // Va a recibir la data de la funcion de arriba 

    const divResponseData = document.getElementById("responseData")
    divResponseData.innerHTML = ""

    const cityName = data.name // De la informacion que nos envia vamos a sacar el nombre de la ciudad y del postaman sacamos el nombre de la ciudad que esta puesto con "name"
    const countryName = data.sys.country // Tambien vamos a sacar del postman el nombre del pais, que esta dentro de sys
    const temp = data.main.temp // Hacemos lo mismo con la temperatura que esta dentro de main
    const humidity = data.main.humidity // Hacemos lo mimso con la humedad que tambien esta dentro de main
    // Podemos poner un monton de cosas mas, pero vamos a empezar solo por esto pero por ultimo vamos a poner la descripcion que es lo que nosortos pusimos que sea en ESPAÑOL (es)
    const description = data.weather^[0].description // Que esta dentro de weather la descripcion, y ponemos [0] ya que puede tener varios climas ya que es un array weather
    const icon = data.weather[0].icon // Ahora hay que ver como vemos el icono....


    // Ahora lo que hay que hacer es empezar a generar cada uno de estos textos e imagenes para poder asignarlos al div
    const cityInfo = document.createElement("h2")
    cityInfo.textContent = `${cityName},${countryName}` // Ponemos text content porque como dice el nombre sera un contenido escrito

    const tempInfo = document.createElement("p")
    tempInfo.textContent = `La temperatura es: ${Math.floor(temp-diffKelvin)}ºC` // Recordemos que hay que hacer la diferencia con los kelvon.... para eso le vamos a hacer un Math floor (redondeo hacia abajo) para que no ponga el numero completo gigante si no que haga un redondeo hacia abajo!!! Entonces hacemos la temp redondeada menos la dif con kelvin, y no nos olvidamos de poner al final grados centigrados 

    const humidityInfo = document.createElement("p")
    humidityInfo.textContent = `La humedad es del: ${humidity}%` 

    const iconInfo = document.createElement("img") // En este caso vamos a crear una imagen
    iconInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`// Src para poner de donde viene!!! Y en los bactics vamos a poner la url y el icono pero primero vamos a VERIFICAR en la documentacion como poner una imagen

    const descriptionInfo = document.createElement("p")
    descriptionInfo.textContent = `La descripcion meteorologica es: ${description}`

    // Ahora vamos a agregarle los elementos 
    divResponseData.appendChild(cityInfo)
    divResponseData.appendChild(tempInfo)
    divResponseData.appendChild(humidityInfo)
    divResponseData.appendChild(iconInfo)
    divResponseData.appendChild(descriptionInfo)
}


// Como hacemos para descargar una imagen????? vamos a openweathermap a la parte de API, List of weather Conditions y entramos a weather conditions codes!!!!
// Y ahi nos aparecera How to get icon URL: Junto con una url y la lista de codigos 
// https://openweathermap.org/img/wn/10d@2x.png : y despues del @ es el codigo del icono que haya que poner
// Tambien tenemos que cambiar 10d ya que el codigo del icono que tenemos que poner en este caso es: 02d, entonces ponemos ${icon}