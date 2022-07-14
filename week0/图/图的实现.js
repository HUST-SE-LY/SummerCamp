class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;//用于将键值转换为字符串
        this.table = {}//;存放键值对,保存为table[key]={key,value}
    }

    hasKey(key) {//判断字典是否含有key
        return this.table[this.toStrFn(key)] != null;//将传入键字符串化后查看table[key]是否存在
    }

    set(key, value) {//根据键值对设置键和值
        if (key != null && value != null) {
            const tableKey = this.toStrFn(key);//字符串化key值
            this.table[tableKey] = new ValuePair(tableKey, value);//给table对象设置table属性
            return true;
        }
        return false;//传入值不正确返回false
    }

    remove(key) {//从字典里删除键值对
        if (this.hasKey(this.toStrFn(key))) {
            delete this.table[this.toStrFn(key)];//删除table中的key属性
            return true
        }
        return false;//找不到要删除的key值就delete
    }

    get(key) {//从字典中检索值
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair.value;
    }

    keyValues() {
        return Object.values(this.table);//ES7方法，返回table中所有ValuePair对象
    }

    keys() {
        return this.keyValues().map(valuePair => valuePair.key);//获取所有的key值
    }

    values() {
        return this.keyValues().map(valuePair => valuePair.value);//获取了所有的value值
    }

    forEach(callbackFn) {
        const valuePairs = this.keyValues(); // 获取全部键值对
        for (let i = 0; i < valuePairs.length; i++) { // 遍历每一个键值对
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value); // 执行要对键值对进行的回调操作
            if (result === false) {
                break; // 出现错误即退出
            }
        }
    }

    size() {
        return Object.keys(this.table).length;//返回字典中值的个数
    }

    isEmpty() {
        return this.size() === 0;//判断字典是否为空
    }

    clear() {
        this.table = {};//清空字典
    }

    toString() {
        if (this.isEmpty()) {//如果为空则返回空字符串
            return '';
        }
        const valuePairs = this.keyValues();//获取全部键值对
        let objString = `${valuePairs[0].toString()}`; // 对第一个键值对字符串化
        for (let i = 1; i < valuePairs.length; i++) {
            objString = `${objString},${valuePairs[i].toString()}`; // 将剩下的键值对依次字符串化并拼接起来
        }
        return objString; // 返回拼接的结果
    }


}

//字符串转换函数
function defaultToString(key) {
    if (key === null) {
        return "NULL"
    } else if (key === undefined) {
        return "UNDEFINED"
    } else if (typeof key === 'string' || key instanceof String) {
        return `${key}`;
    }
    return key.toString();
}

//ValuePair类
class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

    toString() {
        return `#${this.key} : ${this.value}`//重写toString方法让其输出键值对
    }
}

//上面为字典类的实现
class Graph {
    constructor(isDirected = true) {
        this.isDirected = isDirected; // 判断是否为有向图,默认为true
        this.vertices = []; // 存放所有节点的名字
        this.adjList = new Dictionary(); // 用字典储存邻接表,使用节点名字作为键，邻接节点列表作为值
    }

    addVertex(v) {//向图中添加节点的方法
        if (!this.vertices.includes(v)) { // 如果图中不存在该节点
            this.vertices.push(v); // 将节点加入vertices数组
            this.adjList.set(v, []); // 加入节点，邻接列表为空（需要加边方法）
        }
    }

    addEdge(v, w) {//给v,w添加有向边的方法
        if (!this.adjList.get(v)) {
            this.addVertex(v); // 如果不存在v元素对应的数组（因为数组已经在创建节点时候初始化了）就创建v节点
        }
        if (!this.adjList.get(w)) {
            this.addVertex(w); // 如果不存在w元素对应的数组（因为数组已经在创建节点时候初始化了）就创建w节点
        }
        this.adjList.get(v).push(w); // 将v的邻接节点列表中加入w
        if (!this.isDirected) {
            this.adjList.get(w).push(v); // 如果为无向图还需要在w的邻接表中加入v
        }
    }

    getVertices() {//返回节点列表
        return this.vertices;
    }

    getAdjList() {//返回邻接表
        return this.adjList;
    }
    toString() {//打印邻接表
        let res="";
        for(let i in this.vertices) {
            res+=`${this.vertices[i]}->`;
            let neighbors=this.adjList.get(this.vertices[i]);
            for(let j in neighbors){
                res+=`${neighbors[j]} `;
            }
            res+="\n";
        }
        return res
    }
}
//Colors属性用于标记节点的访问状态
const Colors = {
    WHITE: 0,//表示该节点还没被访问
    GREY: 1,//表示该节点被访问过，但并未被探索过。
    BLACK: 2,//表示该节点被探索过
}
const initializeColor=(vertices)=>{
    const color={};
    for(let i in vertices) {
        color[vertices[i]]=Colors.WHITE;//将每个节点初始化为白色
    }
    return color;
}
//广度优先搜索
const bfs=(graph,startVertex,callback)=>{
    const vertices=graph.getVertices();//获取图的所有节点
    const adjList=graph.getAdjList();//获取图的邻接表
    const color=initializeColor(vertices);//将所有节点初始化为未被访问
    const queue=[];//创建一个队列（数组模拟）
    queue.push(startVertex);//将首节点入队
    while(queue.length) {
        const v=queue.shift();//队头元素出队
        color[v]=Colors.GREY;//将该元素标记为被访问过
        const neighbors=adjList.get(v);//获取该元素所有的邻接节点
        for(let i in neighbors) {
            const w=neighbors[i];//依次得到邻接节点
            if(color[w]===Colors.WHITE) {//邻接节点还没被访问过
                queue.push(w);//入队
                color[w]=Colors.GREY;//将该邻接节点标记为已被访问避免重复访问
            }
        }
        color[v]=Colors.BLACK;//该节点被探索过
        if(callback) {//执行要对探索过的节点执行的回调操作
            callback(v);
        }
    }
}
//测试bfs
//     let graph=new Graph();
//     let vertices=["A",'B','C','D','E','F','G'];
//     for(let i in vertices) {
//         graph.addVertex(vertices[i]);
//     }
//     graph.addEdge("A",'B');
//     graph.addEdge("A",'C');
//     graph.addEdge("A",'D');
//     graph.addEdge("B",'E');
//     graph.addEdge("C",'E');
//     graph.addEdge("C",'F');
//     graph.addEdge("D",'F');
//     graph.addEdge("E",'G');
//     graph.addEdge("F",'G');
//
//     bfs(graph,"A",(v)=>{
//         console.log(v)
//     })
//
//深度优先搜索
function dfs(graph,callback){
    const vertices=graph.getVertices();//获取所有节点
    const adjList=graph.getAdjList();//获取邻接表
    const color=initializeColor(vertices);//初始化所有节点为未访问状态
    for(let i in vertices) {
        if(color[vertices[i]]===Colors.WHITE) {//如果第一个节点没有访问过
            dfsVisit(vertices[i],color,adjList,callback);//开始访问
        }
    }
}
function dfsVisit(v,color,adjList,callback) {
    color[v]=Colors.GREY;//将节点状态设置为已访问
    const neighbors=adjList.get(v);//获取所有邻接节点
    if(callback) {
        callback(v);//执行需要对访问元素执行的操作
    }
    for(let i in neighbors) {
        let w = neighbors[i];
        if(color[w]===Colors.WHITE) {//如果有未访问的邻接节点
           dfsVisit(w, color,adjList,callback);//继续向下访问
        }
    }
    color[v]=Colors.BLACK;//下面的所有邻接节点都访问过了之后将元素状态设置未已探索
}
//深度优先搜索测试
// let graph=new Graph();
//     let vertices=["A",'B','C','D','E','F','G'];
//     for(let i in vertices) {
//         graph.addVertex(vertices[i]);
//     }
//     graph.addEdge("A",'B');
//     graph.addEdge("A",'C');
//     graph.addEdge("A",'D');
//     graph.addEdge("B",'E');
//     graph.addEdge("C",'E');
//     graph.addEdge("C",'F');
//     graph.addEdge("D",'F');
//     graph.addEdge("E",'G');
//     graph.addEdge("F",'G');
//
//     dfs(graph,(v)=>{
//         console.log(v)
//     })


