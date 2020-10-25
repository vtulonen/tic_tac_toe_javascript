const gameBoard = (() => {
    let currentState = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    

    const getStateAtIndex = (index)  => {
      return currentState[index];
    }
    const setStateAtIndex = (index, value) => {
      currentState[index] = value;
    } 

    let board = document.querySelector('#game-board')
  
  const initialize = () => {
    let i=0;
    for (elem of currentState) {
      let square = document.createElement('div');
      square.classList.add('square');
      square.id = 'square-' + i++;
      square.addEventListener("click", game.takeTurn.bind(this, square)); 
      board.appendChild(square);
     
    }
    
  }

  const render = () => {
    let squares = document.querySelectorAll('.square')
    squares.forEach((square,i) => {
      square.textContent = currentState[i];
    });
  }
    
  const restart = () => {
    currentState = [
      '', '', '',
      '', '', '',
      '', '', ''
    ];
    
    render();
  }

    
    
  return {
    initialize,
    setStateAtIndex,
    getStateAtIndex,
    restart,
    render
  };
})();



const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;
  
  


  return {getName, getMark}

}


const game = (() => {
 let player_1;
 let player_2;
 let gameOver = false;
 let turn;
 let turnCount = 0;
 let board = document.getElementById('game-board');
 let overlay = document.getElementById('game-board__overlay');
 


  const restart = () => {
    turn = player_1;
    turnCount = 0;
    gameBoard.restart();
    overlay.textContent = '';
    overlay.classList.remove('winMessage')
  }

  const setPlayers = () => {
    
    let xName = document.getElementById('x-name');
    xName.value === '' ? 
    player_1 = Player('X', 'X') : player_1 = Player(xName.value, 'X');
    let oName = document.getElementById('o-name');
    oName.value === '' ? 
    player_2 = Player('O', 'O') : player_2 = Player(oName.value, 'O');
  }

  const startGame = () => {
    setPlayers();
    
    turn = player_1;
    gameBoard.initialize();
    board.style.opacity = 1;
    document.getElementById('start').style.display = 'none';
    document.getElementById('restart').style.display = 'block';
  }

  

  const takeTurn = (square) => {
    let i = square.id.slice(-1); // to get id as number, we slice all but last element of string, which is the number
    if (gameBoard.getStateAtIndex(i) !== '') { // if square taken
      // do nothing
    } 
    else {
      gameBoard.setStateAtIndex(i, turn.getMark());
      gameBoard.render()

    
      if (checkIfWon()) {
        overlay.classList.add('winMessage');
        overlay.textContent = `${turn.getName()} wins!`;
        
        gameBoard.render();
      } 
      else {
        turnCount++;
        if (checkDraw()) {
          overlay.classList.add('winMessage');
          overlay.textContent = 'draw'; 
        }
        else game.changeTurn();
      }
    }
    
  }

  const changeTurn = () => {
    turn === player_1 ? turn = player_2 : turn = player_1;
  }

  const checkDraw = () => {
    let result = false
    if (turnCount === 9) result = true;
    return result;
  }


  const checkIfWon = () => {
    let winningLines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    
    let result = false;
    winningLines.forEach(line => { 
      let marksInRow = 0;
      line.forEach( index => {
        if (gameBoard.getStateAtIndex(index) === turn.getMark()) marksInRow++;
      });

      if (marksInRow === 3) {
        console.log('win')
        result = true;

      }
    });
   
    return result;
    
  }

  return {player_1, player_2, turn, startGame, takeTurn, changeTurn, restart}
})();


document.getElementById('restart').addEventListener("click", game.restart);
document.getElementById('start').addEventListener("click", game.startGame);




// displayController.render(gameBoard.currentState);

