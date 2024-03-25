const container=document.querySelector(".container");
const start=document.querySelector(".start");
let board=25  ;   // 3x3 tiles
let titles=0;
container.style.setProperty('--i',Math.sqrt(board));
console.log(container.getAttribute('--i'))
switch(board){
    case 9:
        titles=4;
        break
    case 16:
        titles=7;
        break
    case 25:
        titles=10;
        break
    default:
        titles=7;
        break;
}

for(let i=0;i<board;i++){
    const div=document.createElement('button');
    div.className=`board`;
    div.id=`${i}`;
    container.appendChild(div);
}

const matrix=[]

const matrixrandomgenerate=()=>{
    for(let i=0;i<titles;i++){
        a=(Math.floor(Math.random()*((board-1)-0+1))+0);
        if(!matrix.includes(a)){
            matrix.push(a);
        }
        else{
            i--;
        }
    }
}

const handlestart= () =>{   
    console.log(matrix);
    const size = matrix.length;
    for(let i=0;i<size;i++){
        for(let j=0;j<board;j++){
            if (container.children[j].id == matrix[i]){
                container.children[j].setAttribute('ilum','true');
                setTimeout(()=>{
                    container.children[j].removeAttribute('ilum');
                },1000);
            }
        }
    }
}
matrixrandomgenerate();
start.addEventListener("click",handlestart)