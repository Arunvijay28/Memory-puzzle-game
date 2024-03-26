const container = document.querySelector(".container");
const start = document.querySelector(".start");
let n = 3;  // 3x3 tiles
let titles = 0;
let board = 0;
let gridbuttons = []; // Initialize as an empty array

const setcount=(cnt)=>{         // function to setup the counter for checking the titles
    count=cnt;
}

const setnvalue=(ne)=>{
    n=ne;
}
const boardsize = (n=3) => {
    board = n * n;
    switch (board) {
        case 9:
            titles = 4;
            break
        case 16:
            titles = 7;
            break
        case 25:
            titles = 10;
            break
        default:
            titles = 7;
            break;
    }

    container.style.setProperty('--no', Math.sqrt(board));
    container.innerHTML = ''; // Clear container before adding new buttons
    gridbuttons = []; // Clear existing grid buttons array

    for (let i = 0; i < board; i++) {
        const button = document.createElement('button');
        button.className = `board`;
        button.id = `${i}`;
        container.appendChild(button);
        gridbuttons.push(button); // Push the new button into the gridbuttons array
    }

    // Reassign event listeners to the new set of buttons
    gridbuttons.forEach((btn, i) => {
        btn.addEventListener('click', handleplayerclick);
        btn.style.setProperty("--i", i);
    });
}

let user_mat = [];
let matrix = [];

const matrixrandomgenerate = () => {
    matrix = [];
    for (let i = 0; i < titles; i++) {
        a = (Math.floor(Math.random() * ((board - 1) - 0 + 1)) + 0);
        if (!matrix.includes(a)) {
            matrix.push(a);
        } else {
            i--;
        }
    }
}

const showmatrix = () => {
    user_mat = [];
    const size = matrix.length;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < board; j++) {
            if (container.children[j].id == matrix[i]) {
                container.children[j].setAttribute('ilum', 'true');
                setTimeout(() => {
                    container.children[j].removeAttribute('ilum');
                }, 1000);
            }
        }
    }
}

const handlestart = () => {
    matrixrandomgenerate();
    showmatrix();
}

var count = 0;
var mistake_count = 0

const handleplayerclick = (event) => {

    var tostorewrngbtn=0;

    var but_ind = parseInt(event.target.style.getPropertyValue('--i'));
    user_mat.push(but_ind);
    gridbuttons[but_ind].setAttribute('ilum', 'true');
    count += 1;

    // console.log(user_mat);
    // console.log(matrix)
   
    if (count === titles) {
        matrix.sort();
        user_mat.sort();
       
        for (let i = 0; i < titles; i++) {
            if (matrix[i] != user_mat[i]) {
                tostorewrngbtn+=user_mat[i];
                gridbuttons[user_mat[i]].setAttribute('wrng', 'true');
                mistake_count = 1;
                break;
            }
        }

        if (mistake_count === 0) {
            for (let rem = 0; rem < user_mat.length; rem++) {
                gridbuttons[user_mat[rem]].removeAttribute('ilum');
            }
            alert('you won');
            setnvalue(n+1);                 // to increment the value of n
            boardsize(n);
            matrixrandomgenerate();
            showmatrix();
            setcount(0);
            // count=0                    // to set the counter value to 0
            // handlestart();
        }
        // if(mistake_count===1){
        //     gridbuttons.forEach((btn)=>{
        //         btn.removeAttribute('wrng');
        //     })
        // }
    }
}

start.addEventListener("click", handlestart);

// Initial event listener setup
boardsize(); // Call boardsize to create initial board
window.addEventListener("beforeunload", () => {
    gridbuttons.forEach((btn) => {
        btn.removeEventListener('click', handleplayerclick);
    })
    start.removeEventListener('click', handlestart);
})
