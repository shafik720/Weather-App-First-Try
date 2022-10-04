
const wrapper = document.querySelector('.wrapper'),
inputField = wrapper.querySelector('.body-input input'),
btn = wrapper.querySelector('.app-footer button'),
infoText = document.querySelector('.body-header-text'),
locationBtn = document.querySelector('.app-footer button'),
backIcon = document.querySelector('.app-header span i'),
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
    // const key = '3f2f9bc259ce45af21bda8132115c015';
           
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

function showWeatherData(data){
    if(data.cod=='404'){
        bodyHeader.classList.replace('pending', 'error');
        infoText.innerText = `${inputField.value} not found`;
        
    }else{
        bodyHeader.classList.remove('pending', 'error');
        wrapper.classList.add('active');

        let {country, id } = data.sys
        let {name} = data;
        let {main} = data.weather[0];
        let {temp, humidity, feels_like } = data.main;

        document.querySelector('.temp-number').innerText = temp;
        document.querySelector('.weather').innerText = main;
        document.querySelector('.city').innerText = name;
        document.querySelector('.country').innerText = country;
        document.querySelector('.feelsLike').innerText = feels_like;
        document.querySelector('.humidityText').innerText = humidity;
        
        backIcon.addEventListener('click',()=>{
            wrapper.classList.remove('active');
        })
        console.log(data);
        // console.log(country, city, temp)
    }
}