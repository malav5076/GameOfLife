const rowLength=7;
const columnLength=7;
wantToStop=false;
grid=new Array(rowLength);
for(i=0;i<rowLength;i++){
    grid[i]=new Array(columnLength);
}
nextGenGrid=new Array(rowLength);
for(i=0;i<rowLength;i++){
    nextGenGrid[i]=new Array(columnLength);
}
cellStore=new Array(rowLength);
for(i=0;i<rowLength;i++){
    cellStore[i]=new Array(columnLength);
}
for(i=0;i<rowLength;i++){
    for(j=0;j<columnLength;j++){
        grid[i][j]=-1;
        nextGenGrid[i][j]=-1;
    }
}
cellCount=0;
for(i=0;i<rowLength;i++){
    for(j=0;j<columnLength;j++){
        cellStore[i][j]=document.getElementById("b"+cellCount++);
    }
}

function countNeighbours(index1,index2){
    count=0;
    if((index1>=0&&index1<=rowLength-1)&&(index2+1>=0&&index2+1<=columnLength-1)&&(grid[index1][index2+1]==1))       count++;
    if((index1>=0&&index1<=rowLength-1)&&(index2-1>=0&&index2-1<=columnLength-1)&&(grid[index1][index2-1]==1))       count++;
    if((index1+1>=0&&index1+1<=rowLength-1)&&(index2>=0&&index2<=columnLength-1)&&(grid[index1+1][index2]==1))       count++;
    if((index1-1>=0&&index1-1<=rowLength-1)&&(index2>=0&&index2<=columnLength-1)&&(grid[index1-1][index2]==1))       count++;
    if((index1-1>=0&&index1-1<=rowLength-1)&&(index2-1>=0&&index2-1<=columnLength-1)&&(grid[index1-1][index2-1]==1)) count++;
    if((index1-1>=0&&index1-1<=rowLength-1)&&(index2+1>=0&&index2+1<=columnLength-1)&&(grid[index1-1][index2+1]==1)) count++;
    if((index1+1>=0&&index1+1<=rowLength-1)&&(index2+1>=0&&index2+1<=columnLength-1)&&(grid[index1+1][index2+1]==1)) count++;
    if((index1+1>=0&&index1+1<=rowLength-1)&&(index2-1>=0&&index2-1<=columnLength-1)&&(grid[index1+1][index2-1]==1)) count++;
    return count;

}
function stopProcess(){
    wantToStop=true;
    
}

function updateGeneration(){
    for(index1=0;index1<rowLength;index1++){
        for(index2=0;index2<columnLength;index2++){
            grid[index1][index2]=nextGenGrid[index1][index2];
        }
    }
}
function start(){
    if(wantToStop) return;
    else{
        for(index1=0;index1<rowLength;index1++){
            for(index2=0;index2<columnLength;index2++){
                if(grid[index1][index2]==1&&countNeighbours(index1,index2)<2){
                    cellStore[index1][index2].style.backgroundColor="#EFEFEF";
                    nextGenGrid[index1][index2]=0;
            
                }
                else if(grid[index1][index2]==1&&countNeighbours(index1,index2)>3){
                    cellStore[index1][index2].style.backgroundColor="#EFEFEF";
                    nextGenGrid[index1][index2]=0;
        
                }
                else if(grid[index1][index2]==1&&(countNeighbours(index1,index2)==2||countNeighbours(index1,index2)==3)){                    if(countNeighbours(index1,index2+1)==3) {
                        cellStore[index1][index2+1].style.backgroundColor="purple";
                        nextGenGrid[index1][index2+1]=1;
                    }  
                    if(countNeighbours(index1,index2-1)==3)  {
                        cellStore[index1][index2-1].style.backgroundColor="purple";
                        nextGenGrid[index1][index2-1]=1;
                    }
                    if(countNeighbours(index1+1,index2)==3)  {
                    cellStore[index1+1][index2].style.backgroundColor="purple";
                    nextGenGrid[index1+1][index2]=1;
                    }  
                    if(countNeighbours(index1-1,index2)==3)  {
                    cellStore[index1-1][index2].style.backgroundColor="purple";
                    nextGenGrid[index1-1][index2]=1;
                    }  
                    if(countNeighbours(index1-1,index2-1)==3){
                    cellStore[index1-1][index2-1].style.backgroundColor="purple";
                    nextGenGrid[index1-1][index2-1]=1;
                    }  
                    if(countNeighbours(index1-1,index2+1)==3){
                    cellStore[index1-1][index2+1].style.backgroundColor="purple";
                    nextGenGrid[index1-1][index2+1]=1;
                    }  
                    if(countNeighbours(index1+1,index2+1)==3){
                    cellStore[index1+1][index2+1].style.backgroundColor="purple";
                    nextGenGrid[index1+1][index2+1]=1;
                    }   
                    if(countNeighbours(index1+1,index2-1)==3){
                    cellStore[index1+1][index2-1].style.backgroundColor="purple";
                    nextGenGrid[index1+1][index2-1]=1;
                    }
                }
            }
        }
    updateGeneration();
    setTimeout(start,1000);
    }
}    

function clickButton(cell){
    cell.style.backgroundColor="purple";
    index=cell.id.slice(1,cell.id.length);
    index=parseInt(index);
    count=-1;
    for(i=0;i<rowLength;i++){
        for(j=0;j<columnLength;j++){
            count++;
            if(count==index) {
                grid[i][j]=1;
                nextGenGrid[i][j]=1;
            }
        }
    }
}
