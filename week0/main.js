let play_change=false;
let night_mode=false;
//转换歌曲时间的函数
function time_change(time) {
    let time_num=parseFloat(time);
    let min=Math.floor(time_num/60);
    let sec=Math.floor(time_num-min*60);
    if(sec<10) {
        sec="0"+sec.toString();
    }
    else {
        sec=sec.toString()
    }
    return "0"+min.toString()+":"+sec;
}

audio.addEventListener("canplay",()=>{
    time_info.innerHTML=time_change(audio.currentTime)+"/"+time_change(audio.duration)
})
audio.addEventListener("pause",()=>{
    play_button.innerHTML="<svg t=\"1657520876829\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"4132\" width=\"200\" height=\"200\"><path d=\"M224 938.713333a53.58 53.58 0 0 1-53.333333-53.433333V138.72a53.333333 53.333333 0 0 1 80.886666-45.666667l618.666667 373.28a53.333333 53.333333 0 0 1 0 91.333334l-618.666667 373.28a53.16 53.16 0 0 1-27.553333 7.766666z m0.046667-810.666666a10.98 10.98 0 0 0-5.333334 1.42 10.466667 10.466667 0 0 0-5.38 9.253333v746.56a10.666667 10.666667 0 0 0 16.18 9.133333l618.666667-373.28a10.666667 10.666667 0 0 0 0-18.266666l-618.666667-373.28a10.386667 10.386667 0 0 0-5.446666-1.586667z\" fill=\"#ffffff\" p-id=\"4133\"></path></svg>"
})
audio.addEventListener("play",()=>{
    play_button.innerHTML="<svg t=\"1657521279735\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"5117\" width=\"200\" height=\"200\"><path d=\"M247.731946 0a49.546389 49.546389 0 0 0-49.546389 49.546389v924.907222a49.546389 49.546389 0 0 0 99.092779 0V49.546389a49.546389 49.546389 0 0 0-49.54639-49.546389zM776.268054 0a49.546389 49.546389 0 0 0-49.54639 49.546389v924.907222a49.546389 49.546389 0 0 0 99.092779 0V49.546389a49.546389 49.546389 0 0 0-49.546389-49.546389z\" p-id=\"5118\" fill=\"#ffffff\"></path></svg>"
})
play_button.addEventListener("click",()=>{
    if(play_change) {
        audio.pause();
        play_change=false;
        record.style.animationPlayState="paused"
    }else {
        audio.play();
        play_change=true;
        record.style.animationPlayState="running"
    }
})
audio.addEventListener("timeupdate",()=>{
    time_info.innerHTML=time_change(audio.currentTime)+"/"+time_change(audio.duration);
    over_loading.style.width=document.documentElement.clientWidth*(audio.currentTime/audio.duration)+"px";
})
audio.addEventListener("ended",()=>{
    audio.play();
    play_change=true;
    record.style.animationPlayState="running"
})
loading_ball.addEventListener("click",(e)=>{
    let x=e.clientX;
    audio.currentTime=(x/document.documentElement.clientWidth)*audio.duration;
})
change_model.addEventListener("click",()=>{
    if(night_mode) {
        body.style.background="#f0f0f0";
        body.style.color="black";
        loading_ball.style.background="white";
        record.style.borderColor="darkgray"
        night_mode=false;
    }
    else {
        body.style.background="#575757";
        body.style.color="#b2b2b2";
        loading_ball.style.background="gray";
        record.style.borderColor="#343434 "
        night_mode=true;
    }


})
ball.onmousedown=()=>{
    document.onmousemove=(e)=>{
        let x=e.clientX;
        over_loading.style.width=x+"px";
    }
    document.onmouseup = (e) => {
        let x=e.clientX;
        audio.currentTime=(x/document.documentElement.clientWidth)*audio.duration;
        document.onmousemove = null;
        document.onmouseup = null;
        document.onmousedown = null;
    }
}
