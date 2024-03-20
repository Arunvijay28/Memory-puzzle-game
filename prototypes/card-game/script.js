const moves=document.getElementById("moves-count")
const time=document.getElementById("time")
const startbtn=document.getElementById("start")
const stopbtn=document.getElementById("stop")

const gamecontainer=document.querySelector(".game-container")

const result=document.getElementById('result')

const controlscontainer=document.querySelector(".controls")


let cards;
let interval;
let firstcard=false;
let secondcard=false;

