let arr = [4, 6, 8, 5, 9, -1, 17, 5, 23, 11, 6];
heapSort(arr);
console.log(arr)

//编写一个堆排序
function heapSort(arr) {

    let temp;
    //1.将无序序列构成一个堆，根据升序降序需求选择大顶堆或小顶堆
//最后一个值的序号为arr.length-1，根据顺序存储二叉树，
//n节点的左子树为2*n+1,右子树为2*n+2，
//那么最后一个非叶子节点的值应该为Math.floor((arr.length-1-1)/2)
//= Math.floor((arr.length)/2 -1)
//=Math.floor(arr.length / 2) - 1
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        adjustHeap(arr, i, arr.length)
    }
    //2.将堆顶元素与末尾元素交换，将最大元素“沉”到数组末端
    //3.重新调整结构，使其满足堆条件，然后继续交换堆顶元素和当前末尾元素,
    //  反复执行调整+交换步骤，直到整个序列有序
    for (let j = arr.length - 1; j > 0; j--) {
        //交换
        temp = arr[j];
        arr[j] = arr[0];
        arr[0] = temp;
        adjustHeap(arr, 0, j);
    }
}

//将一个数组(二叉树),调整成一个大顶堆
/**
 * 将以i对应的非叶子节点的树调整成一个大顶堆
 * @param {要调整的数组} arr
 * @param {表示非叶子节点在数组中的索引} i
 * @param {对多少个元素进行调整，length是在逐渐减少} length
 */
function adjustHeap(arr, i, length) {
    let temp = arr[i];//先取出当前元素的值，保存在临时变量
    //开始调整
    //说明 调整非叶子节点的顺序时从下到上，从左到右
    //从最下层开始，逐层将大的值往上提
    //1.k=i*2+1是i节点的左子节点
    for (let k = i * 2 + 1; k < length; k = k * 2 + 1) {
        if (k + 1 < length && arr[k] < arr[k + 1]) {
            //说明左子节点的值小于右子节点的值
            k++//k指向右子节点
        }
        if (arr[k] > temp) {
            //如果子节点大于父节点
            arr[i] = arr[k]//把较大的值赋给当前节点
//i指向k，继续循环比较，使的以当前i顶点的二叉树满足大顶堆的条件
//k为i节点的左子节点或右子节点，因为从下往上调整的，
//我们可以认为左子节点树或右子节点树已经是一个大顶堆，
//当这个大顶堆的顶点被某值X替换后，大顶堆被破坏结构，
//此时我们需要从原来的大顶堆右边节点树找到一个位置，将X放入该位置，从而重新形成大顶堆结构
//其实是从把最右边的一排节点逐层上移，X被安放在最右边的一排节点中合适的位置
            i = k;
        } else {
            break;//调整非叶子节点的顺序时从下到上，从左到右,所以可以中断
        }
        //当for选好结束后，我们已经将以i为父节点的树的最大值，放在了最顶上（局部）
        arr[i] = temp;//将temp值放到调整后的位置
    }
}