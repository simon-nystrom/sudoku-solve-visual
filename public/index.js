var index = 0;
var solutions = [];
var intervalTimer = 500;
var timer;

var previousGrid = [];

var timeSlider = document.getElementById('slider');
var step = document.getElementById('step');
var button = document.getElementById('button');

var initialMessage = true;

if(window.Worker) {
    var worker = new Worker('worker.js');
    worker.postMessage("start");
    worker.onmessage = function(event) {
        if(initialMessage) {
            initialMessage = false;
            document.getElementById("status").innerHTML = "Receiving solution snapshots, execution initially slowed down...";     
            solutions = event.data;
            previousGrid = solutions[0];
            timer = setInterval(function() {
                if(index < solutions.length) {
                    updateTable(solutions[index++]);  
                }
            }, intervalTimer);
        } else {
            clearInterval(timer);
            solutions = solutions.concat(event.data);
            timer = setInterval(function() {
                if(index < solutions.length) {
                    updateTable(solutions[index++]);  
                }
            }, intervalTimer);
            if(event.data === "end") {
                
                document.getElementById("status").innerHTML = "Reached a solution in " + (solutions.length - 1) + " steps."
                document.getElementById("warning").hidden=true;
                timeSlider.removeAttribute("disabled");
                step.removeAttribute("disabled");
                button.removeAttribute("disabled");
                solutions.pop();
                
            }
        }
    }      
}

function goto() {
    var value = document.getElementById("step").value;
    if(value >= 0 && value < solutions.length) {
        index = value;
    }
    return false;
}


function updateTimer(time) {
    clearInterval(timer);
    intervalTimer = time;
    timer = setInterval(function () {
        if(index < solutions.length) {
            updateTable(solutions[index++]);    
        }
    }, intervalTimer);
}


function updateTable(grid) {
    var table = document.getElementsByTagName('tbody');
    
    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            if(grid[i][j] != 0) {
                table[0].children[i].children[j].innerHTML = grid[i][j];               
            } else {
                table[0].children[i].children[j].innerHTML = '';
            }

        }
    }
    
}

function findDiff(previousGrid, currentGrid) {
    

    
}
