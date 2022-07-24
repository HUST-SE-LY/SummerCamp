const wrap=document.querySelector(".wrap");
const left_tab=document.querySelector(".left_tab_mobile");
const tab_aside=document.querySelector(".tab_aside");
const tab_list=document.querySelectorAll(".aside_list");
const aside_inner=document.querySelectorAll(".aside_inner")
let judgeTab=true;
left_tab.addEventListener("click",(e)=>{
  tabChange();
  e.stopPropagation()
})
body.addEventListener("click",()=>{
  tabChange();
  if(wrap.style.display==="block") {
    wrap.style.display="none";
  }
  if(gameList.style.display==="block") {
    gameList.style.display="none";
  }
})
console.log()
tab_list[0].addEventListener("click",(e)=>{
  aside_inner[0].style.display="block"
  e.stopPropagation();
})
tab_list[2].addEventListener("click",(e)=>{
  aside_inner[1].style.display="block"
  e.stopPropagation();
})
tab_list[4].addEventListener("click",(e)=>{
  aside_inner[2].style.display="block"
  e.stopPropagation();
})
tab_list[5].addEventListener("click",(e)=>{
  aside_inner[3].style.display="block"
  e.stopPropagation();
})
tab_list[6].addEventListener("click",(e)=>{
  aside_inner[4].style.display="block"
  e.stopPropagation();
})
function tabChange() {
  if(judgeTab) {
    tab_aside.style.display="block";
    wrap.style.display="block";
    judgeTab=false
  }
  else {
    tab_aside.style.display="none";
    wrap.style.display="none";
    for(let i = 0; i<aside_inner.length;i++) {
      aside_inner[i].style.display="none"
    }
    judgeTab=true;
  }
}
