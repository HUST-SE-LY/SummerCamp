const video=document.getElementById("video")
const pauseButton=document.querySelector(".svg_container");
const pause_word=document.querySelector(".pause_word")
let judgePause=true;
pauseButton.addEventListener("click",()=>{
  changeVideoState();
})
function changeVideoState() {
  if(judgePause) {
    video.pause();
    pauseButton.innerHTML="<svg class=\"pause_svg\" viewBox=\"0 0 32 32\">\n" +
        "\t\t\t<path d=\"M7.5,2.6c0,0-0.6,0-1.2,0.1L5,3.9v24.3l1.2,1.2h1.3l21.8-12.8v-1.3L7.5,2.6z\"></path>\n" +
        "\t\t</svg>"
    judgePause=false;
    pause_word.innerText="PLAY"

  }
  else {
    video.play();
    pauseButton.innerHTML="<svg class=\"pause_svg\" viewBox=\"0 0 11 13\"><path fill-rule=\"evenodd\" fill=\"rgb(255, 255, 255)\" d=\"M10.000,13.000 L8.000,13.000 C7.448,13.000 7.000,12.552 7.000,12.000 L7.000,1.000 C7.000,0.448 7.448,0.000 8.000,0.000 L10.000,0.000 C10.552,0.000 11.000,0.448 11.000,1.000 L11.000,12.000 C11.000,12.552 10.552,13.000 10.000,13.000 ZM3.000,13.000 L1.000,13.000 C0.448,13.000 -0.000,12.552 -0.000,12.000 L-0.000,1.000 C-0.000,0.448 0.448,0.000 1.000,0.000 L3.000,0.000 C3.552,0.000 4.000,0.448 4.000,1.000 L4.000,12.000 C4.000,12.552 3.552,13.000 3.000,13.000 Z\"></path></svg>"
    pause_word.innerText="PAUSE"
    judgePause=true;
  }
}