const list = document.querySelectorAll(".hero_icon");
const heroImg = document.querySelector(".hero_img");
const heroDescribeHead=document.querySelector(".hero_des_p1");
const heroDescribeBody=document.querySelector(".hero_des_p2");
const heroName=document.querySelectorAll(".hero_name");

function getList(data) {
  for (let i in list) {
    let name = data.name[i];
    let hero_name=heroName[i].innerHTML;
    list[i].style.backgroundImage = "url('https://d1u1mce87gyfbn.cloudfront.net/hero/" + name + "/icon-portrait.png')";
    list[i].addEventListener("mouseover", () => {
          imgRend(data, name);
          describeRend(data,hero_name,i);
        })
  }
}

function imgRend(data, name) {
  heroImg.style.backgroundImage = "url('https://d1u1mce87gyfbn.cloudfront.net/hero/" + name + "/full-portrait.png')";

}

function describeRend(data,hero_name,i) {
  heroDescribeHead.innerText=hero_name;
  heroDescribeBody.innerText=data.des[i];
}
fetch("./hero.json").then(res => {
  return res.json()
}).then(data => {
  getList(data);
})