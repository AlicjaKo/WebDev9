var intervalId; 

document.getElementById('start').addEventListener('click', function() {

    setWhen();
});

function setWhen() {
    var when = document.getElementById("when").value;

    document.getElementById('error').innerText="";

    localStorage.removeItem('savedEvent');
    localStorage.setItem('savedEvent', when);



    countTime(when);

    clearInterval(intervalId);

    
    intervalId = setInterval(function() {
        countTime(when);
    }, 1000);
}

function countTime(savedEvent) {
    var eventDate = dayjs(savedEvent);
    var now = dayjs();
    var diference = eventDate.diff(now, 'second');

    if (diference < 0) 
    {
        document.getElementById('error').innerText = "The past event cannot be saved";
    } 
    else 
    {
        var days = Math.floor(diference / (60 * 60 * 24));
        var hours = Math.floor((diference % (60 * 60 * 24)) / (60 * 60));
        var minutes = Math.floor((diference % (60 * 60)) / 60);
        var seconds = diference % 60;

        var ZDays = days.toString().padStart(2, '0');
        var ZHours = hours.toString().padStart(2, '0');
        var ZMinutes = minutes.toString().padStart(2, '0');
        var ZSeconds = seconds.toString().padStart(2, '0');

        document.getElementById('day').innerText = ZDays;
        document.getElementById('hour').innerText = ZHours;
        document.getElementById('minute').innerText = ZMinutes;
        document.getElementById('second').innerText = ZSeconds;
    }
}

window.onload = function() {
    var savedEvent = localStorage.getItem('savedEvent');
    if (savedEvent) {
        var outputElement = document.getElementById('error');
        outputElement.textContent = "Saved event: " + savedEvent;

        countTime(savedEvent);

        intervalId = setInterval(function() {
            countTime(savedEvent);
        }, 1000);
    }
};