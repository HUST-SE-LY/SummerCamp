## 图，BFS，DFS

### 通过邻接表实现图的思路

邻接表由每个节点和它的邻接节点列表组成

由于邻接表的特点符合储存多个键（节点名）值（节点的邻接节点列表）对的形式，可以用字典来表示邻接表

因此，图的骨架类可以拥有三个属性

- 一个属性用来判断是否为有向图
- 一个属性存储所有的节点
- 一个属性用字典表示邻接表（可以看作图的边）

### 有向图的实现

先声明图的骨架类

```javascript
class Graph {
    constructor(isDirected = true) {
        this.isDirected = isDirected; // 判断是否为有向图,默认为true
        this.vertices = []; // 存放所有节点的名字
        this.adjList = new Dictionary(); // 用字典储存邻接表,使用节点名字作为键，邻接节点列表作为值
    }
}
```

然后再添加实现各种操作的方法

- 向图中添加节点（将传入的节点名存入vertices并在adjList中对该节点初始化）

  ```javascript
  addVertex(v) {//向图中添加节点的方法
      if (!this.vertices.includes(v)) { // 如果图中不存在该节点
          this.vertices.push(v); // 将节点加入vertices数组
          this.adjList.set(v, []); // 加入节点，邻接列表为空（需要加边方法）
      }
  }
  ```

- 为两个节点添加有向边（v->w）

  ```javascript
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
  ```

- 返回节点列表

  ```javascript
  getVertices() {//返回节点列表
      return this.vertices;
  }
  ```

- 返回邻接表

  ```javascript
  getAdjList() {//返回邻接表
      return this.adjList;
  }
  ```

- 将邻接表字符串化

  ```javascript
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
  ```

这样我们基于邻接表完成了图类

图类的完整代码：

```javascript
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
```

### 图的遍历

#### 遍历思路

图的遍历有广度优先搜索（BFS）和深度优先搜索（DFS）两种方式

广度优先搜索类似树的层级遍历，先确定一个顶点，然后访问所有它的邻接节点（访问一层），再访问邻接节点的所有邻接节点（再下一层），依次遍历下去

深度优先搜索类似树的前序遍历，不需要设立顶点，从访问某一个节点开始，访问它的第一个邻接节点，再访问邻接节点的邻接节点...访问完成之后再向上访问其他邻接节点，再重复过程

因为需要避免访问到重复的顶点，因此每个节点最多被访问两次，可以用颜色来表示节点的访问状态

- 白色：还没被访问
- 灰色：已经被访问
- 黑色：已经被探索（所有的邻接节点都被访问过了）

可以创建一个Colors属性来标记

```javascript
const Colors = {
    WHITE: 0,//表示该节点还没被访问
    GREY: 1,//表示该节点被访问过，但并未被探索过。
    BLACK: 2,//表示该节点被探索过
}
```

当开始遍历时，所有节点的颜色都应该是白色，所有应该设置一个初始化颜色的函数

```javascript
const initializeColor=(vertices)=>{
    const color={};
    for(let i in vertices) {
        color[vertices[i]]=Colors.WHITE;//将每个节点初始化为白色
    }
    return color;
}
```

下面对两种遍历方法用代码表示

#### BFS

~~~javascript
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
~~~

#### DFS

```javascript
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
```