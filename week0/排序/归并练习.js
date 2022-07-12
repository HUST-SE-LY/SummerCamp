let arr=[1,3,2,3,1];
let i=0;
function mergeSort(arr) {
    let len=arr.length;
    if(len<2) {
        return arr;
    }
    let middle=Math.floor(len/2);
    let left=arr.slice(0,middle);
    let right=arr.slice(middle);
    return merge(mergeSort(left),mergeSort(right));
}

function merge(left,right) {
    let result=[];
    while(left.length&&right.length) {
        if(left[0]>right[0]) {
            result.push(left.shift());
            i+=right.length;
        } else {
            result.push(right.shift());
        }
    }

    return result.concat(left,right);
}
console.log(mergeSort(arr)+"    "+i)