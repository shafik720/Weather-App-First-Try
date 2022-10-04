
const wrapper = document.querySelector('.wrapper'),
inputField = wrapper.querySelector('.body-input input'),
btn = wrapper.querySelector('.app-footer button'),
infoText = document.querySelector('.body-header-text'),
bodyHeader = document.querySelector('.body-header');


inputField.addEventListener('keyup',e=>{
    if(e.key == 'Enter' && inputField.value != ''){
        requestApi(inputField.value);
        inputField.value = '';
    }
})

function requestApi(city){
    // const key = '3f2f9bc259ce45af21bda8132115c015';
    bodyHeader.classList.add('pending');
    infoText.innerText = 'Getting Weather Information....';
    
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3f2f9bc259ce45af21bda8132115c015`;
    
    fetch(api)
    .then(response=>response.json())
    .then(data=>console.log(data));
}