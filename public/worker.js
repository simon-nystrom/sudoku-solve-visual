var sudokuGrid = [
    [8,0,0,0,0,0,0,0,0],
    [0,0,3,6,0,0,0,0,0],
    [0,7,0,0,9,0,2,0,0],
    
    [0,5,0,0,0,7,0,0,0],
    [0,0,0,0,4,5,7,0,0],
    [0,0,0,1,0,0,0,3,0],
    
    [0,0,1,0,0,0,0,6,8],
    [0,0,8,5,0,0,0,1,0],
    [0,9,0,0,0,0,4,0,0]
];


var solutionPlayback = [];


onmessage = function(e) {
    solve(sudokuGrid);
}

function solve(grid) {
    var start = new Date().getTime();
    solve1(grid, 0, 0);
    console.log(grid);
    console.log(new Date().getTime() - start);
    
    console.log(solutionPlayback.length);
    
    
    for(var i = 0; i < solutionPlayback.length; i += 10000) {
        postMessage(solutionPlayback.slice(i, i + 10000));
    }
    postMessage("end");
    


    
}

function cloneGrid(grid) {
    var newGrid = [[],[],[],[],[],[],[],[],[]];
    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            newGrid[i][j] = grid[i][j];
        }
    }
    return newGrid;
}


function solve1(grid, row, col) {
    if(grid[row][col] === 0) {
        for(var num = 1; num <= 9; num++) {
            if(insert(grid, row, col, num)) {
                grid[row][col] = num;
                solutionPlayback.push(cloneGrid(grid));
                if(col < 8) {
                    if(!solve1(grid, row, col + 1)) {
                        grid[row][col] = 0;
                    }    
                } else {
                    if(row < 8) {
                        if(!solve1(grid, row + 1, 0)) {
                            grid[row][col] = 0;
                        } 
                    }
                }
            }
        }
    } else {
        if(col < 8) {
            solve1(grid, row, col + 1);
        } else {
            if(row < 8) {
                solve1(grid, row + 1, 0);
            }
        }
    }
    
    return isGridFilled(grid);
    
}

function isGridFilled(grid) {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid.length; j++) {
            if(grid[i][j] === 0) {
                return false;
            } 
        }
    }
    return true;
}

function fitsSquare(grid, row, col, num) {
    
    //top 3 squares
    if(col <= 2 && row <= 2) {
        for(var i = 0; i <= 2; i++) {
            for(var j = 0; j <= 2; j++) {
                if(grid[i][j] === num) {
                    return false;
                }
            }   
        }
    } else if (col <= 5 && row <= 2) {
        for(var i = 0; i <= 2; i++) {
            for(var j = 3; j <= 5; j++) {
                if(grid[i][j] === num) {
                    return false;
                }
            }   
        }
    } else if (row <= 2) {
        for(var i = 0; i <= 2; i++) {
            for(var j = 6; j <= 8; j++) {
                if(grid[i][j] === num) {
                    return false;
                }
            }   
        }     
    }
    //middle 3 squares
    else if(col <= 2 && row <= 5) {
        for(var i = 3; i <= 5; i++) {
            for(var j = 0; j <= 2; j++) {
                if(grid[i][j] === num) {
                    return false;
                }
            }   
        }        
    } else if(col <= 5 && row <= 5) {
        for(var i = 3; i <= 5; i++) {
            for(var j = 3; j <= 5; j++) {
                if(grid[i][j] === num) {
                    return false;
                }
            }   
        } 
    } else if(row <= 5) {
        for(var i = 3; i <= 5; i++) {
            for(var j = 6; j <= 8; j++) {
                if(grid[i][j] === num) {
                    return false;
                }
            }   
        }         
    }
        
    //bottom 3
    else if(col <= 2 && row <= 8) {
        for(var i = 6; i <= 8; i++) {
            for(var j = 0; j <= 2; j++) {
                if(grid[i][j] === num) {
                    return false;
                }
            }   
        }        
    } else if(col <= 5 && row <= 8) {
        for(var i = 6; i <= 8; i++) {
            for(var j = 3; j <= 5; j++) {
                if(grid[i][j] === num) {
                    return false;
                }
            }   
        } 
    } else if(row <= 8) {
        for(var i = 6; i <= 8; i++) {
            for(var j = 6; j <= 8; j++) {
                if(grid[i][j] === num) {
                    return false;
                }
            }   
        }         
    }   
    
    
    return true;
}

function fitsRow(grid, row, num) {
    for (var i = 0; i < grid.length; i++) {
        if(grid[row][i] === num) {
            return false;
        }
    }
    return true;
}

function fitsColumn(grid, col, num) {
    for(var i = 0; i < grid.length; i++) {
        if(grid[i][col] === num) {
            return false;
        }
    }
    return true;
}

function insert(grid, row, col, num) {
    return fitsSquare(grid, row, col, num) && fitsRow(grid, row, num) && fitsColumn(grid, col, num);
}