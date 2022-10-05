
const wrapper = document.querySelector('.wrapper'),
inputField = wrapper.querySelector('.body-input input'),
btn = wrapper.querySelector('.app-footer button'),
infoText = document.querySelector('.body-header-text'),
locationBtn = document.querySelector('.app-footer button'),
backIcon = document.querySelector('.app-header span i'),
weatherIcon = document.querySelector('.top-details img'),
historyPart = document.querySelector('.history-part'),
history = document.querySelector('.history'),
weatherCard = historyPart.querySelector('.weather-card'),
cardRight = document.querySelector('.card-right'),
modalSwitch = document.querySelector('.modal-switch'),
modalCloseIcon = document.querySelector('.modal-icon i');
bodyHeader = document.querySelector('.body-header');

let api;

locationBtn.addEventListener('click',()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser doesn't support Geolocation")
    }
})

function onSuccess(position){
    const{latitude, longitude} = position.coords;

    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=3f2f9bc259ce45af21bda8132115c015`
    fetchApi(api);
}

function onError(msg){
    bodyHeader.classList.add('error');
    infoText.innerText = msg.message;
}
 

inputField.addEventListener('keyup',e=>{
    if(e.key == 'Enter' && inputField.value != ''){
        requestApi(inputField.value);
        inputField.value = '';
    }
})

function requestApi(city){           
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3f2f9bc259ce45af21bda8132115c015`;    
    fetchApi(api);
}

function fetchApi(api){
    bodyHeader.classList.add('pending');
    infoText.innerText = 'Getting Weather Information....';

    fetch(api)
    .then(response=>response.json())
    .then(data=>showWeatherData(data));
}

let weathers = JSON.parse(localStorage.getItem('weather') || '[]');

function showWeatherData(data){
    if(data.cod=='404'){
        bodyHeader.classList.replace('pending', 'error');
        infoText.innerText = `${inputField.value} not a valid city`;
        
    }else{
        bodyHeader.classList.remove('pending', 'error');
        wrapper.classList.add('active');

        let {country} = data.sys
        let {name} = data;
        let {main, id} = data.weather[0];
        let {temp, humidity, feels_like } = data.main;
        let imageSrc;

        if(id==200){
            weatherIcon.src = 'Weather Icons/rain.svg';
            imageSrc = weatherIcon.src;            
        }else if(id>=200 && id<=232){
            weatherIcon.src = 'Weather Icons/storm.svg'
            imageSrc = weatherIcon.src;
        }else if(id>=300 && id<=321){
            weatherIcon.src = 'Weather Icons/haze.svg'
            imageSrc = weatherIcon.src;
        }else if(id>=600 && id<=622){
            weatherIcon.src = 'Weather Icons/snow.svg'
            imageSrc = weatherIcon.src;
        }else if(id>=701 && id<=781){
            weatherIcon.src = 'Weather Icons/haze.svg'
            imageSrc = weatherIcon.src;
        }else if(id>=500 && id<=531){
            weatherIcon.src = 'Weather Icons/rain.svg'
            imageSrc = weatherIcon.src;
        }else if(id>=801 && id<=804){
            weatherIcon.src = 'Weather Icons/cloud.svg'
            imageSrc = weatherIcon.src;
        }
        else{
            weatherIcon.src = 'Weather Icons/clear.svg'
            imageSrc = weatherIcon.src;
        }

        document.querySelector('.temp-number').innerText = Math.floor(temp);
        document.querySelector('.weather').innerText = main;
        document.querySelector('.city').innerText = name;
        document.querySelector('.country').innerText = country;
        document.querySelector('.feelsLike').innerText = Math.floor(feels_like);
        document.querySelector('.humidityText').innerText = humidity;
        
        backIcon.addEventListener('click',()=>{
            wrapper.classList.remove('active');
        })

        // --------------------------  Working on Local Storage  ------------------------
        let weatherObj = {city:`${name}`, currentTemp: `${Math.floor(temp)}`, imgSource:`${imageSrc}`, weatherCondition:`${main}`, country: `${country}`, feels:`${Math.floor(feels_like)}`, humidity:`${humidity}`, id:`${id}`};
        weathers.push(weatherObj);
        localStorage.setItem('weather', JSON.stringify(weathers));
        
        showWeatherFromStorage();

        // --------------------------  Working on History part  ------------------------
        // let div = `
        //     <div class="weather-card">
        //     <div class="card-left">
        //         <h4>${name}</h4>
        //         <span>${Math.floor(temp)}</span>° C
        //     </div>
        //     <div class="card-right">
        //         <img src="${imageSrc}" width="50px" alt="">
        //         <p>${main}</p>
        //     </div>
        //     </div>
        // `
        // history.insertAdjacentHTML('afterend', div);
    }
}


function showWeatherFromStorage(){
    document.querySelectorAll('.weather-card').forEach(element=>element.remove());
    weathers.forEach((element, id)=>{
        let div = `
            <div class="weather-card" onclick="showModal(${id})" >
            <div class="card-left">
                <h4>${element.city}</h4>
                <span>${element.currentTemp}</span>° C
            </div>
            <div class="card-right">
            <div class="card-right-first">
                <img src="${element.imgSource}" width="45px" alt="">
                <p>${element.weatherCondition}</p>
            </div>
            
        </div>
            </div>
        `
        history.insertAdjacentHTML('afterend', div);
    })
}

showWeatherFromStorage();

function showModal(any){
    modalSwitch.classList.add('active');
    let  weather = weathers[any];
    document.querySelector('.modal-temp-number').innerText = weather.currentTemp;
    document.querySelector('.modal-weather').innerText = weather.weatherCondition;
    document.querySelector('.modal-city').innerText = weather.city;
    document.querySelector('.modal-country').innerText = weather.country;
    document.querySelector('.modal-feelsLike').innerText = weather.feels;
    document.querySelector('.modal-humidityText').innerText = weather.humidity;
    document.querySelector('.modal-top-details img').src = weather.imgSource;
    console.log(weathers[any]);
}
modalCloseIcon.addEventListener('click',()=>{
    modalSwitch.classList.remove('active');
})


