const cellElements = document.querySelectorAll('[data-cell]')
const board = document.querySelector('[data-board]')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessage = document.querySelector('[data-winning-message]')
const restartButton = document.querySelector('[data-restart-button]')

let isCircleTurn

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// start game witch X

function startGame(){
    winningMessage.classList.remove('show-winning-message')
    for (const cell of cellElements){
        cell.classList.remove('x', 'circle')
    }
    isCircleTurn = false
    board.classList.remove('x', 'circle')
    board.classList.add('x')
    for (const cell of cellElements){
        cell.addEventListener("click", handleClick, { once: true })
    }
}

function checkForDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle')
    })
}

function endGame(isDraw){
    winningMessageTextElement.innerText = isDraw ? "Empate!" :  `Jogador ${isCircleTurn? 'Circle' : 'X'} Venceu!`
    winningMessage.classList.add('show-winning-message')
}

function checkForWin(currentPlayer){
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer)
        })
    })
}

function swapTurns(){
    isCircleTurn = !isCircleTurn
    board.classList.remove('x', 'circle')
    board.classList.add(isCircleTurn? 'circle': 'x')
}

function handleClick(e){
    const cell = e.target
    const classToAdd = isCircleTurn ? 'circle' : 'x'
    cell.classList.add(classToAdd)

    const isWin = checkForWin(classToAdd)
    const isDraw = checkForDraw()
    if(isWin){
        endGame(false)
    } else if (isDraw){
        endGame(true)
    }else{
        swapTurns()
    }
}

startGame()
restartButton.addEventListener("click", startGame)
