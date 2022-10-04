
const wrapper = document.querySelector('.wrapper'),
inputField = wrapper.querySelector('.body-input input'),
btn = wrapper.querySelector('.app-footer button')


inputField.addEventListener('keyup',e=>{
    if(e.key == 'Enter' && inputField.value != ''){
        console.log('ok');
    }
})