var hour = 0;
var minute = 10;
var second = 0;
var cur_state = "";
var cur_time = 1500;

function changeColor(){
    var date = new Date();
    let num = date.getHours();
    hour = ("0" + num).slice(-2);
    num = date.getMinutes();
    minute = ("0" + num).slice(-2);
    num = date.getSeconds();
    second = ("0" + num).slice(-2);
    let color = "#"+hour+''+minute+''+second;
    var html = document.getElementsByTagName('html')[0];
    html.style.cssText = "--bk-color:"+color;
}

function getTime(){
    
    changeColor();

    if(cur_state == "working"){
        cur_time -= 1;
        if(cur_time <= 0){
            cur_time = 300;
            cur_state = "resting";
        }
    }else
    if(cur_state == "resting"){
        cur_time -= 1;
        if(cur_time <= 0){
            cur_time = 1500;
            cur_state = "working";
        }
    }
    updateTimer();
    updateColorLabel();
}

window.onload = function() {
    document.getElementById("start").addEventListener("click", started);
    document.getElementById("stop").addEventListener("click", stopped);
    setInterval(getTime, 1000);
}

function started(){
    cur_state = "working";
}

function stopped(){
    cur_state = "";
    cur_time = 1500;
}

function updateTimer(){
    let min = Math.floor(cur_time/60);
    min = ("0" + min).slice(-2);
    let sec = Math.floor(cur_time%60);
    sec = ("0" + sec).slice(-2);
    display.innerHTML = min+':'+sec;
    if(cur_state == "working"){
        msg.innerHTML = "Currently working...";
    }else if(cur_state == "resting"){
        msg.innerHTML = "Take a break!";
    }else{
        msg.innerHTML = "!";
    }
}

function updateColorLabel(){
    bkcl.innerHTML = '#'+hour+':'+minute+':'+second;
}