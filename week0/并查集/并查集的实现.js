class DisjointSet {
    constructor(count) {//初始化
        this.parent=new Array(count);//存放所有元素
        for(let i = 0;i<count;i++) {
            this.parent[i]=i;//初始化每一个元素的parent都为自己
        }
    }
    find(p) {//查找元素的顶部parent
        if(this.parent[p]===p) {
            return p;//顶部元素的parent还是指向自己，说明查找到了，直接返回
        }
        this.parent[p]=this.find(this.parent[p]);//递归查找并压缩路径
        return this.parent[p];
    }
    union(p,q) {
        let i=this.find(p);
        let j=this.find(q);
        if(i!==j) {//两个元素不能在一个集合中
            this.parent[i]=j
        }
    }
    isConnected(p,q) {
        return this.find(p)===this.find(q)//顶部元素相同则说明在一个集合内
    }
}




