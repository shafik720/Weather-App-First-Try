
const wrapper = document.querySelector('.wrapper'),
inputField = wrapper.querySelector('.body-input input'),
btn = wrapper.querySelector('.app-footer button'),
infoText = document.querySelector('.body-header-text'),
locationBtn = document.querySelector('.app-footer button'),
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

    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3f2f9bc259ce45af21bda8132115c015`
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

       
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3f2f9bc259ce45af21bda8132115c015`;
    
    fetchApi(api);
}

function fetchApi(api){
    bodyHeader.classList.add('pending');
    infoText.innerText = 'Getting Weather Information....';

    fetch(api)
    .then(response=>response.json())
    .then(data=>console.log(data));
}