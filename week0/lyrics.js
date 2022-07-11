//处理歌词的获取，同步等问题

//每句歌词可以解析为时间和歌词内容，创建一个歌词类
class lyrics_model {
    constructor(time,lyrics) {
        this.time=time;
        this.lyrics=lyrics;
    }
}
//存储每句歌词的数组
let list=[];

//从歌曲文件中时间节点转换成以秒制时间的函数
function add_obj(sentence){
    let result_time=sentence.match(/(\d+):(\d+)\.(\d+)/g)[0];
    let time_array=result_time.split(":");
    let time_actual=parseInt(time_array[0])*60+parseFloat(time_array[1]);
    return time_actual;
}

//将歌词渲染到页面上
function list_render() {
    for(let i in list) {
        let lyrics_content=document.createElement("p");
        lyrics_content.className="lyrics_p"
        lyrics_content.innerText=list[i].lyrics;
        lyrics_list.appendChild(lyrics_content);
    }
}

//控制歌词同步
function center_lyrics(list) {
    console.log("ok")
    for(let i in list) {
        let p=document.querySelectorAll(".lyrics_p");
        if(list[i].time===audio.currentTime) {
           p[i].style.fontSize="50px";
        }else {
            p[i].style.fontSize="16px";
        }
    }
}
//fetch获取歌词文件
fetch("./lyrics.txt").then(res=>{
    return res.text();
}).then(data=>{
    let each_sentence=data.toString().split("\\n");
    each_sentence.pop();//去除由末尾换行符造成的空字符串
    for(let i in each_sentence){
        let time=add_obj(each_sentence[i]);
        let jp_lyrics=each_sentence[i].split("]")[1];
        list.push(new lyrics_model(time,jp_lyrics));
    }
    return list;//下面将对歌曲list进行操作
}).then(list=>{
    list_render(list);
    audio.addEventListener("timeupdate",()=>{
        for(let i in list) {
            let p=document.querySelectorAll(".lyrics_p");
            if(parseFloat(list[i].time)<parseFloat(audio.currentTime)) {
                if(i>=1) {
                    p[i-1].style.fontSize="16px";
                }
                p[i].style.fontSize="50px";
            }
        }
    })
})
