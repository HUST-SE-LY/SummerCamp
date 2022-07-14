class Node {
    constructor(value) {
        this.value=value;
        this.parent=this;
    }
}
function find(node) {//寻找父元素
    if(node.parent===node) {
        return node;
    }
    node.parent=find(node.parent);
}
function union(node1,node2) {//合并节点
   let union1=find(node1);
   let union2=find(node2);
   if(union1===union2) {
       return false;
   }
   union1.parent=union2;
}



