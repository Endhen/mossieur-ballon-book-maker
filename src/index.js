import React from "react";
import ReactDOM from "react-dom";

import App from './component/App.jsx'

// TODO Integrate dynamic content
// TODO Integrate differetns languages

console.clear()
ReactDOM.render(<App/>, document.getElementById('app'))

const colors = [
    '#F2C7C7', // red
    '#F2D9EB', // pink
    '#C3C6E5', // purple
    '#A3D0D9', // blue
    '#BAE3D9', // green
]

var pages = document.querySelectorAll('.page')

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}


function setRandomColors(page) {

    var balloonGroups = [
        document.querySelectorAll('.page:nth-child(' + page +  ') .balloon-bottom-left circle'),
        document.querySelectorAll('.page:nth-child(' + page +  ') .balloon-top-left circle'),
        document.querySelectorAll('.page:nth-child(' + page +  ') .balloon-top-right circle'),
        document.querySelectorAll('.page:nth-child(' + page +  ') .balloon'),
    ],  balloonCord = document.querySelectorAll('.page:nth-child(' + page +  ') .balloon-cord');
    
    function applyColor(balloons, color) {
    
        for (let i = 0; i < balloons.length; i++) {
            balloons[i].style.fill = color
        }
        for (let j = 0; j < balloonCord.length; j++) {
            balloonCord[j].style.stroke = color
        }
    }
    
    shuffleArray(colors)
    
    balloonGroups.forEach((balloonGroup, i) => {
        let j =  (i + 1) % colors.length
        applyColor(balloonGroup, colors[j - 1])  
    });
}

function setPageNumber(page) {
    let pageNumber = document.querySelectorAll('.page:nth-child(' + page + ') .page-number')
    pageNumber[0].innerText = page - 1
}

window.onload = function() {

    setLevel()
    pages.forEach((page, i) => {
        page = i + 2
        setRandomColors(page)
        setPageNumber(page)
    })
}



