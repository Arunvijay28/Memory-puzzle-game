
const colors = ['#ff4136', '#2ecc40', '#0074d9', '#ffdc00', '#7fdbff', '#f012be', '#ff815b', '#b10cd9', '#ff69b4'];
const simonButtons = document.querySelectorAll('.btn-smn');

let posplused;
let playing=false;
let level=0;
let simonpattern=[]
startbtn=document.querySelector('start')
resetbtn=document.querySelector('reset')

const setlevel=(lvl)=>{
  level=lvl
}

simonButtons.forEach((btn, i) => {
  btn.style.setProperty('--data-c', colors[i]); // Set background color
  btn.style.setProperty('--i', i); // Set custom property (if needed)

  btn.addEventListener('click', handleplayerclick)
});

function reset(){
  posplused=0;
  setlevel(0)
  playing=false
  simonpattern=[]
}

const hrg=0;  // random accessing among the 9 elements
const addsimonpattern=()=>{
  simonpattern.push(hrg);
}

function playsimonpattern(){
  playing=true          // showing the color
  i=0
    const interval=setInterval(() => {
        const sbtn=simonButtons[simonpattern[i]]
        sbtn.setAttribute('ilum','true')

        setTimeout(()=>btn.remo);
        i++

      if (i>=simonpattern.length){
        playing=false
        clearInterval(interval)
      }
    }, 600);
}

function handleplayerclick(event){
    const mbtn=event.target.style.getproperty('--i')
    if (mbtn==simonpattern[posplused]){posplused++}

    if (posplused>=simonpattern.length){
      setlevel(level+1)
      posplused=0
      addsimonpattern()
      playsimonpattern()

    }

    alert('you lost')
}
const handlestart=()=>{
  reset()
  addsimonpattern()
  playsimonpattern()
}




startbtn.addEventListener('click',handlestart)
resetbtn.addEventListener('click',handlereset)



window.addEventListener("beforeunload",()=>{
  simonButtons.forEach((btn)=>{
    btn.removeEventListener('click',()=>{})
  })
  startbtn.removeEventListener('click',()=>{})
  resetbtn.removeEventListener('click',()=>{})
})

