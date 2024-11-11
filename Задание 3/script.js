let websocket;
const infoOutput = document.querySelector('.info_output');
const chatOutput = document.querySelector('.chat_output');
const btnSend = document.querySelector('.send');
const btnGeolocation = document.querySelector('.geolocation');
const input = document.querySelector('.input');
function connect() {
    let select;
    websocket = new WebSocket('wss://echo.websocket.org/');

    websocket.onopen = () => {
        infoOutput.innerText = 'Соединение установлено';
    };

    websocket.onerror = () => {
        infoOutput.innerText = 'Произошла ошибка';
    };

    websocket.onmessage = (e) => {
        if (select) {
            writeToChat(e.data, true);
        }
    };

    btnSend.addEventListener('click', sendMessage);
    btnGeolocation.addEventListener('click', getLocation);


    function sendMessage() {
       if (!input.value) {
           return;
       }
       select = true;
       websocket.send(input.value);
       writeToChat(input.value, false);
       input.value = '';
    }

    function writeToChat(message, isRec) {
        let messageHTML = `<div class='${isRec ? 'rec' : 'sent'}'>${message}</div>`;
        chatOutput.innerHTML += messageHTML;
    }

    function getLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
        }
        else {
            writeToChat('Ваш браузер не поддерживает функцию определения местоположения',false);
        }
    }
    function locationSuccess(data) {
        let link = `https://yandex.ru/maps/?pt=${data.coords.longitude},${data.coords.latitude}&z=18&l=map`;
        let linkHTML = `<a class='link' href='${link}' target='_blank'>Ваша гео-локация</a>`;
        websocket.send(linkHTML);
        select = false;
        writeToChat(linkHTML,false);
    }

    function locationError() {
        writeToChat('Произошла ошибка',false);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    connect();
});
