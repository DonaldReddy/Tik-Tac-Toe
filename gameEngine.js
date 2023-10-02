var grid;
var nums;
var player = 1
var Haswon = false;

function won() {
    document.getElementById("start").innerText = "Play Again";

    let p = document.getElementById("result");
    p.innerText = `Player ${player} Has WON!! 🎉`;
    Haswon = true
}


function rowSum(row, col) {
    let sum = 0;
    let cnt = 0;

    for (let i = 0; i < 3; i++) {
        if (grid[row][i] != 0) {
            sum += grid[row][i];
            cnt++;
        }
    }

    if (sum == 15 && cnt == 3) {
        return true
    }

    return false
}

function colSum(row, col) {
    let sum = 0;
    let cnt = 0;

    for (let i = 0; i < 3; i++) {
        if (grid[i][col] != 0) {
            sum += grid[i][col];
            cnt++;
        }
    }

    if (sum == 15 && cnt == 3) {
        return true
    }
    return false
}

function diagSum(row, col) {

    if (row == col) {
        let sum = 0;
        let cnt = 0;

        for (let i = 0; i < 3; i++) {
            if (grid[i][i] != 0) {
                sum += grid[i][i];
                cnt++;
            }
        }

        if (sum == 15 && cnt == 3) {
            return true
        }
    }
    return false
}

function revDiagSum(row, col) {
    if ((row + col) === 2) {
        let sum = 0;
        let cnt = 0;

        for (let i = 2; i >= 0; i--) {
            if (grid[2 - i][i] != 0) {
                sum += grid[2 - i][i];
                cnt++;
            }
        }

        if (sum == 15 && cnt == 3) {
            return true
        }
    }
    return false
}

function checkSum(id) {
    let row = Math.floor(id / 3);
    let col = id % 3;
    if (rowSum(row, col) || colSum(row, col) || diagSum(row, col) || revDiagSum(row, col)) {
        won();
    }
}

function insert(id, num) {
    console.log("came");
    let cell = document.getElementById(id);
    cell.innerHTML = "";
    cell.innerText = num;
    checkSum(id);
}



function isNumber(char) {
    return /^\d+$/.test(char);
}


function check(e) {
    let input = document.getElementById(e.id);
    let num = input.value
    if (num && isNumber(num) && num.length === 1 && num != 0 && !nums.includes(Number(num))) {
        let id = e.id.slice(1);
        num = Number(num);
        grid[Math.floor(id / 3)][id % 3] = num;
        console.log(grid);
        nums = nums.concat(num)
        let cell = document.getElementById(id);
        cell.innerHTML = "";
        cell.innerText = num;
        checkSum(id);
        if (player === 1)
            player = 2;
        else
            player = 1
        if (!Haswon) {
            let p = document.getElementById("result");
            p.innerText = `Player ${player} chance`;
        }
    }
    else {
        input.value = "";
        alert(`${num} alredy exist`)
    }
    if (nums.length === 9) {
        document.getElementById("start").innerText = "Play Again";
        let p = document.getElementById("result");
        p.innerText = `TIE 🙅‍♂️`;
        Haswon = true
        setTimeout(() => {
            document.getElementById("start").innerText = "Restart"
        }, 5000);
    }
}

function start() {
    document.getElementById("start").innerText = "Restart"
    let cells = document.getElementsByClassName("cell");
    Haswon = false;
    grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    nums = []
    player = 1
    for (let i = 0; i < 9; i++) {

        cells[i].innerHTML = `<input type="text" id="i${i}" maxlength="1" disabled"/>`
        cells[i].addEventListener("keydown", (e) => {
            if (e.key == "Enter") {
                check(e.target)
            }
        })
        cells[i].children[0].classList.add("active")
        cells[i].children[0].removeAttribute("disabled")
    }
    let p = document.getElementById("result");
    p.innerText = `Player ${player} chance`;
    console.log("clicked");
}