const color=['#ff4136', '#2ecc40', '#0074d9', '#ffdc00', '#7fdbff', '#f012be', '#ff815b', '#b10cd9', '#ff69b4'];

const simonButtons=document.querySelectorAll(".btn-smn");
const leveltext=document.querySelector("#score");
const maxleveltext=document.querySelector("#max-score");

var sound1 =new Audio();
sound1.src="sounds/sound_a4.wav";
var sound2 =new Audio();
sound2.src="sounds/sound_b3.wav";
var sound3 =new Audio();
sound3.src="sounds/sound_c3.wav";
var sound4 =new Audio();
sound4.src="sounds/sound_d3.wav";
var sound5 =new Audio();
sound5.src="sounds/sound_d4.wav";
var sound6 =new Audio();
sound6.src="sounds/sound_e3.wav";
var sound7 =new Audio();
sound7.src="sounds/sound_f3.wav";
var sound8 =new Audio();
sound8.src="sounds/sound_f4.wav";
var sound9 =new Audio();
sound9.src="sounds/sound_g4.wav";

let posplused;
let playing=false;
let simonpattern=[];
let level=0;
const startbtn=document.querySelector(".Start_btn");
const resetbtn=document.querySelector(".reset_btn");

simonButtons.forEach((btn,i)=>{
    btn.style.setProperty('--data-c',color[i]);
    btn.style.setProperty('--i',i);
    btn.addEventListener('click',handleplayerclick)
})

const setmaxlevel=(lvl)=>{
    maxleveltext.innerHTML=`Max Score : ${lvl}`;
}
const setlevel=(lvl)=>{
    level=lvl;
    leveltext.innerHTML=`Score : ${level}`;
}

function reset(dis=true){
    posplused=0;
    playing=false;
    setlevel(0);
    simonpattern=[];
    startbtn.disabled=dis;
}

const ranind=(min,max)=>{
    return Math.floor(Math.random()*(max-min+1))+min       
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
            clearInterval(interval);
            playing=false;
        }

    },600)

}

function handlestart(){
    reset()
    addsimonpattern()
    playsimonpattern()
}

const handlerestart=()=>{
    if(playing) return
    if(confirm("Are you want to reset ?")) 
    reset(false)
    
}

startbtn.addEventListener('click',handlestart)
resetbtn.addEventListener('click',handlerestart)


function handleplayerclick(event){
    if (playing) return
    const btnindex=parseInt(event.target.style.getPropertyValue('--i'));

    if (btnindex === simonpattern[posplused]){
        posplused++;

        if (posplused>=simonpattern.length){
            setlevel(level+1);
            setmaxlevel(level);
            posplused=0
            addsimonpattern()
            playsimonpattern()
        }
        return    
    }
    if (simonpattern.length===0) return
    alert("you lost");
    reset(false);

}

window.addEventListener("beforeunload",()=>{
    simonButtons.forEach((btn)=>{
      btn.removeEventListener('click',()=>{})
    })
    startbtn.removeEventListener('click',()=>{})
    resetbtn.removeEventListener('click',()=>{})
  })

maxleveltext.innerHTML=`Max Score :${localStorage.getItem('max-score') || 0}`;