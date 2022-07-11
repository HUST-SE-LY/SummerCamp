let isScroll=false;

//处理歌词的获取，同步等问题

//每句歌词可以解析为时间和歌词内容，创建一个歌词类
class lyrics_model {
    constructor(time,jp_lyrics,ch_lyrics) {
        this.time=time;
        this.jp_lyrics=jp_lyrics;
        this.ch_lyrics=ch_lyrics;
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
        let lyrics_content=document.createElement("div");
        lyrics_content.className="lyrics_content";
        let jp_p=document.createElement("p");
        jp_p.className="jp_lyrics";
        let ch_p=document.createElement("p");
        jp_p.innerText=list[i].jp_lyrics;
        if(list[i].ch_lyrics) {
            ch_p.innerText=list[i].ch_lyrics;
            ch_p.className="ch_lyrics"
        }
        lyrics_content.appendChild(jp_p).appendChild(ch_p);
        lyrics_list.appendChild(lyrics_content);
    }
}
//节流
function throttle(callback, wait) {
    // 上一次点击的时间
    let lastTime = 0;
    return function () {    // 如果不return的话会立即执行，return的话就是点击才会调用此方法
        // 获取当前点击的时间
        let nowTime = new Date().getTime()
        if (nowTime - lastTime > wait) {
            callback();
            // 把当前点击的时候  赋值给上一次的时间
            lastTime = nowTime;
        }
    }
}
function scroll_change(){
    isScroll=true;
    setTimeout(()=>{
        isScroll=false
    },10000)
}

//fetch获取歌词文件
fetch("./lyrics.txt").then(res=>{
    return res.text();//获取日文歌词
}).then(data=>{
    fetch("./lyrics_trans.txt").then(res_1=>{
        return res_1.text();//获取中文歌词
    }).then(data_1=>{
        let ch_data=data_1.split("\\n");
        let each_sentence=data.toString().split("\\n");
        each_sentence.pop();//去除由末尾换行符造成的空字符串
        for(let i in each_sentence){
            let time=add_obj(each_sentence[i]);
            if(i>=3){
                let jp_lyrics=each_sentence[i].split("]")[1];
                let ch_lyrics=ch_data[i-3].split("]")[1];
                list.push(new lyrics_model(time,jp_lyrics,ch_lyrics));
            }
            else {
                let jp_lyrics=each_sentence[i].split("]")[1];
                list.push(new lyrics_model(time,jp_lyrics))
            }
        }
        return list
    }).then(list=>{
        list_render(list);
    }).then(()=>{
        let lrc_content=document.querySelectorAll(".lyrics_content");
        for(let i in lrc_content) {
            lrc_content[i].onclick=()=>{
                audio.currentTime=list[i].time;//点击歌词跳转播放
                for(let j=0;j<lrc_content.length;j++) {
                    if(j!==i) {
                        lrc_content[j].style.fontWeight="normal"
                    }
                }//让之前加粗的歌词不再加粗

            }
        }
        audio.addEventListener("timeupdate",()=>{
            for(let i=0;i<list.length;i++) {
                if(i>0) {
                    if(list[i].time>audio.currentTime&&list[i-1].time<audio.currentTime) {
                        lyrics_list.addEventListener("mousewheel",throttle(scroll_change,1000))
                        if(!isScroll) {
                            lyrics_list.scrollTo({
                                top:lrc_content[i].offsetTop-0.5*document.documentElement.clientHeight,
                                behavior:"smooth"
                            })
                        }
                        lrc_content[i-1].style.fontWeight="bold";//播放到的歌词加粗

                        if(i>1) {
                            lrc_content[i-2].style.fontWeight="normal";
                        }
                    }
                    else if(i===list.length-1&&list[i].time<audio.currentTime) {
                        //播放到最后一句
                        lrc_content[i].style.fontWeight="bold"
                        lrc_content[i-1].style.fontWeight="normal";
                    }
                }
            }
        })
    })

})
