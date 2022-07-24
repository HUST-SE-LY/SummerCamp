const gameList=document.querySelector(".top_game");
const gameButton=document.querySelector(".tab_top_game");
let judgeGameList=true
gameButton.addEventListener("click",(e)=>{
  e.stopPropagation()
  changeGameList();
})
function changeGameList() {
  if(judgeGameList) {
    wrap.style.display="block"
    gameList.style.display="block";
    judgeGameList=false;
  }
  else {
    wrap.style.display="none"
    gameList.style.display="none";
    judgeGameList=true;
  }
}