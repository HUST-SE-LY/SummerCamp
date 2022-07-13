class Node {//一个节点有值，左节点，右节点三个属性
    constructor(value,left,right,count) {
        this.value=value?value:0;
        this.left=left?left:null;
        this.right=right?right:null;
        this.count=count?count:1;
    }
}

class BinaryTree {
    constructor(root) {
        this.root = root?root:null;
    }
    insert(value) {
        let new_node=new Node(value);
        if(!this.root) {
            this.root=new_node;//如果树没有根节点,创建的节点就是根节点
        }
        else {//如果树有根节点，开始找位置插入
            let current_node=this.root;//表示当前所在的节点
            let parent_node=null;
            while(true) {
                parent_node=current_node;
                if(value<current_node.value) {//如果值比当前节点值小就更新节点指向到左子节点
                    current_node=current_node.left;
                    if(!current_node) {//如果左子节点为空则说明找到了对应位置，直接插入
                        parent_node.left=new_node;
                        break;
                    }
                }
                else if(value>current_node.value) {//如果值比当前节点值大就更新节点指向到右子节点
                    current_node=current_node.right;
                    if(!current_node) {
                        parent_node.right=new_node
                        break;
                    }
                }
                else if(value===current_node.value) {//如果值相同则进行计数
                    current_node.count++;
                    break;
                }
            }
        }
    }
}
let tree=new BinaryTree();
tree.insert(20);
tree.insert(17);
tree.insert(23);
tree.insert(25);
tree.insert(15);
tree.insert(19);
tree.insert(22);
tree.insert(2);
tree.insert(26);
//递归版本前序遍历
function traversePreOrder(node) {
    if(!node) {
        return;
    }
    console.log(node.value);
    traversePreOrder(node.left);
    traversePreOrder(node.right);
}
//非递归版本前序遍历
function traversePreOrder1(node){
    let stack=[];//存储之前的节点
    while(node||!stack) {
        if(node) {//若还能继续访问左子节点
            console.log(node.value);//打印左子节点的值
            stack.push(node);//将左子节点入栈
            node=node.left;//访问下一个左子节点
        } else {//若左子节点访问完毕
            node=stack.pop();//让栈推出父节点
            node=node.right;//开始访问右节点
        }


    }
}
//递归版本中序遍历
function traverseInOrder(node) {
    if(!node) {
        return;
    }
    traverseInOrder(node.left);
    console.log(node.value);
    traverseInOrder(node.right);
}
//非递归版本中序遍历
function traverseInOrder1(node) {
    let stack=[];
    while(node||stack.length) {
        if(node) {
            stack.push(node);
            node=node.left;
        } else {
            node=stack.pop();
            console.log(node.value);
            node=node.right;
        }
    }
}
//递归版本后序遍历
function traversePostOrder(node) {
    if (!node) {
        return;
    }

    traversePostOrder(node.left);
    traversePostOrder(node.right);
    console.log(node.value);
}
//非递归版本后序遍历
function traversePostOrder1(node) {
    let stack=[];
    let ret=null;
    while(node||stack.length) {
        if(node) {
            stack.push(node);
            node=node.left;
        } else {
            node=stack[stack.length-1];
            if(node.right&&node.right!==ret) {
                node=node.right;
                stack.push(node);
                node=node.left;
            }
            else {
                node=stack.pop();
                console.log(node.value);
                ret=node;
                node=null;
            }
        }
    }
}
//层级遍历
function traverseLevelOrder(node) {
    let queue=[]
    queue.push(node)//根节点入队
    while(queue.length) {
        node=queue.shift();//从前向后取出并去除当前节点
        console.log(node.value);//访问当前节点的值
        if(node.left) {//如果存在左节点
            queue.push(node.left);//左节点入队列
        }
        if(node.right){//如果存在右节点
            queue.push(node.right);//右节点入队列
        }
    }
}
