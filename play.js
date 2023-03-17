//游戏成绩
var highest=0;
var score=0;
var speed=1;

(function dataup(){
    document.getElementById("highest").innerHTML="最高成绩:"+highest;
    document.getElementById("score").innerHTML="成绩:"+score;
    document.getElementById("speed").innerHTML="速度:"+speed;
})();



//游戏数据
var canvas;//画布
var api;//canvas的api
var row=14,column=25,width=30,height=30;
var grid=[];//游戏表格
for(var i=0;i<row;i++){//初始化游戏表格
    grid.push([]);
    for(var j=0;j<column;j++){
        grid[i].push("white");
    }   
}
var set={//方块总集
    //正Z
    0:{
        color:"red", 
        0:{x:column/2-1,y:0},
        1:{x:column/2,y:0},
        2:{x:column/2,y:1},
        3:{x:column/2+1,y:1}
    },
    //反Z
    1:{
        color:"yellow",
        0:{x:column/2+1,y:0},
        1:{x:column/2,y:0},
        2:{x:column/2,y:1},
        3:{x:column/2-1,y:1}
    },
    //田
    2:{
        color:"blue",
        0:{x:column/2-1,y:0},
        1:{x:column/2,y:0},
        2:{x:column/2-1,y:1},
        3:{x:column/2,y:1}
    },
    //L
    3:{
        color:"brown",
        0:{x:column/2-1,y:0},
        1:{x:column/2-1,y:1},
        2:{x:column/2-1,y:2},
        3:{x:column/2,y:2}
    },
    //7
    4:{
        color:"purple",
        0:{x:column/2,y:0},
        1:{x:column/2,y:1},
        2:{x:column/2,y:2},
        3:{x:column/2-1,y:2}
    },
    //1
    5:{
        color:"green",
        0:{x:column/2,y:0},
        1:{x:column/2,y:1},
        2:{x:column/2,y:2},
        3:{x:column/2,y:3}
    },
    //
    6:{
        oolor:"orange",
        0:{x:column/2,y:0},
        1:{x:column/2-1,y:1},
        2:{x:column/2,y:1},
        3:{x:column/2+1,y:1}
    }
};
//当前操作的方块
var current;
function initblock(){
    current=Object.assign({},set[Math.floor(Math.random()*Object.keys(set).length)]);
}


//画布设置
(function initCanvas(row,column,width,height){
    //创建画布
    canvas=document.createElement("canvas");
    canvas.width=column*width;
    canvas.height=row*height;
    canvas.style.border="1px solid black";
    //获取api
    api=canvas.getContext("2d");
    //绘制路径(先设置路径，再设置笔画，最后画出来)
    api.beginPath();
    for(var i=1;i<row;i++){
        api.moveTo(0,i*height);
        api.lineTo(canvas.width,i*height);
    }
    for(var i=1;i<column;i++){
        api.moveTo(i*width,0);
        api.lineTo(i*width,canvas.height);
    }
    api.closePath();
    api.strokeStyle="grey";
    api.lineWidth=0.4;
    api.stroke()
    //把弄好的画布加进去;
    document.getElementsByTagName("body")[0].append(canvas);
})(row,column,width,height);

//方块移动
function down(){
    var flag=true;//可否掉落
    //判断可否掉落
    for(var i=0;i<Object.keys(current).length;i++){
        if(current[i].y>=row-1){
            flag=false;
            break;
        }
        if(grid[current[i].y+1][current[i].x]!="white"){
            flag=false;
            break;
        }
    }
    //可以掉落则更改坐标
    if(flag){
        for(var i=0;i<Object.keys(current).length;i++){
            var tem=current[i];
            tem.y++;
        }
        for(var i=0;i<Object.keys(current).length;i++){
            var tem=current[i];
            api.fillstyle=colors(tem.color);
            api.fillRect(tem.x*width+1,tem.y*length+1,width-2,length-1);
        }
    }
    //不可以就固定方块
    else{
        for(var i=0;i<Object.keys(current).length;i++){
            var tem=current[i];
            if(tem.y<2){
                return ;
            }
            grid
        }
        //判断一行是否已满并且生成新方块
        // fulljudge();
        initblock();
    }
}