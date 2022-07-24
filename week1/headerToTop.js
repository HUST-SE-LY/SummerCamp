const head=document.querySelector(".main_header");
const body=document.querySelector(".body");
const topHead=document.querySelector(".topHeader")
body.addEventListener("mousewheel",()=>{
  if(topHead.getBoundingClientRect().top<=-40) {
    changeHeader()
  }
  else {
    headerToBegin()
  }
})
function changeHeader() {
  head.className="head_fixed"
}
function headerToBegin() {
  head.className="main_header"
}