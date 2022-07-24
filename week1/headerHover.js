const game=document.querySelector(".Games");
const heroes=document.querySelector(".Heroes");
const events=document.querySelector(".Events");
const esports=document.querySelector(".Esports");
const media=document.querySelector(".Media");
const news=document.querySelector(".News");
const community=document.querySelector(".Community");
const bottom_line=document.querySelector(".main_header_bottom");
body.addEventListener("mouseover",()=>{
  bottom_line.style.display="none"
})
game.addEventListener("mouseover",(e)=>{
  hoverChange(e,"line_game")
})
heroes.addEventListener("mouseover",(e)=>{
  hoverChange(e,"line_hero")
})
events.addEventListener("mouseover",(e)=>{
  hoverChange(e,"line_event")
})
esports.addEventListener("mouseover",(e)=>{
  hoverChange(e,"line_esports")
})
media.addEventListener("mouseover",(e)=>{
  hoverChange(e,"line_media")
})
news.addEventListener("mouseover",(e)=>{
  hoverChange(e,"line_news")
})
community.addEventListener("mouseover",(e)=>{
  hoverChange(e,"line_community")
})

function hoverChange(e,className) {
  e.stopPropagation();
  bottom_line.style.display="block";
  bottom_line.className=`main_header_bottom ${className}`;
}

