//深度优先搜索
// var numIslands = function(grid) {
//     let size=grid[0].length;
//     let num=0;
//     for(let i = 0;i<grid.length;i++) {
//         for(let j = 0; j<size;j++) {
//             if(grid[i][j]==="1") {
//                 num++;
//                 dfs(grid,i,j);
//             }
//         }
//     }
//     return num;
// };
// function dfs(grid,i,j) {
//     grid[i][j]='0';
//     if(i<grid.length-1&&grid[i+1][j]==='1') {
//         dfs(grid,i+1,j)
//     }
//     if(i-1>=0&&grid[i-1][j]==='1') {
//         dfs(grid,i-1,j)
//     }
//     if(j<grid[i].length-1&&grid[i][j+1]==='1') {
//         dfs(grid,i,j+1)
//     }
//     if(j-1>=0&&grid[i][j-1]==='1') {
//         dfs(grid,i,j-1);
//     }
//
//
// }
//广度优先搜索
var numIslands = function(grid) {
    let size=grid[0].length;
    let num=0;
    for(let i = 0;i<grid.length;i++) {
        for(let j = 0; j<size;j++) {
            if(grid[i][j]==="1") {
                num++;
                bfs(grid,i,j);
            }
        }
    }
    return num;
};
function bfs(grid,i,j) {
    let queue=[];
    queue.push([i,j]);
    while(queue.length) {
        let array=queue.shift();
        let i=array[0];
        let j=array[1];
        grid[i][j]='0';
        if(i<grid.length-1&&grid[i+1][j]==="1") {
            queue.push([i+1,j]);
        }
        if(i-1>=0&&grid[i-1][j]==='1') {
            queue.push([i-1,j]);
        }
        if(j<grid[i].length-1&&grid[i][j+1]==="1") {
            queue.push([i,j+1]);
        }
        if(j-1>=0&&grid[i][j-1]==='1') {
            queue.push([i,j-1]);
        }

    }
}


console.log(numIslands(grid))