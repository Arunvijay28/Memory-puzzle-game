const color=['#ff4136', '#2ecc40', '#0074d9', '#ffdc00', '#7fdbff', '#f012be', '#ff815b', '#b10cd9', '#ff69b4'];

const simonButtons=document.querySelectorAll(".btn-smn");

let posplused;
let playing=false;
let simonpattern=[];
const startbtn=document.querySelector(".Start_btn");

simonButtons.forEach((btn,i)=>{
    btn.style.setProperty('--data-c',color[i]);
    btn.style.setProperty('--i',i);
    btn.addEventListener('click',handleplayerclick)
})


function reset(){
    posplused=0;
    playing=false;
    simonpattern=[]
}

const ranind=(min,max)=>{
    return Math.floor(Math.random()*(max-min+1))+min    // return statement is added
}

function addsimonpattern(){
    simonpattern.push(ranind(0,simonButtons.length-1));
    console.log(simonpattern)
}

function playsimonpattern(){
    playing=true
    let i=0;
    const interval=setInterval(()=>{
        const btn=simonButtons[simonpattern[i]];
        console.log(btn);
        btn.setAttribute('ilum','true');
        setTimeout(()=>btn.removeAttribute('ilum'),500);
        i++;

        if (i>=simonpattern.length){
            clearInterval(interval);    // cleared the interval
            playing=false;
        }

    },600)

}
function handlestart(){
    reset()
    addsimonpattern()
    playsimonpattern()
}

startbtn.addEventListener('click',handlestart)

function handleplayerclick(event){
    if (playing) return
    const btnindex=parseInt(event.target.style.getPropertyValue('--i'));

    if (btnindex===simonpattern[posplused]){        // first = was given then === is changed
        posplused++;
    }

    if (posplused>=simonpattern.length){
        posplused=0
        addsimonpattern()
        playsimonpattern()
    }

}

window.addEventListener("beforeunload",()=>{
    simonButtons.forEach((btn)=>{
      btn.removeEventListener('click',()=>{})
    })
    startbtn.removeEventListener('click',()=>{})
    // resetbtn.removeEventListener('click',()=>{})  // supposed to add reset btn
  })
  