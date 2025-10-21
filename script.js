class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = {
            X: 0,
            O: 0,
            draw: 0
        };
        
        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerText = document.getElementById('current-player-text');
        this.gameMessage = document.getElementById('game-message');
        this.resetGameBtn = document.getElementById('reset-game');
        this.resetScoreBtn = document.getElementById('reset-score');
        this.scoreX = document.getElementById('score-x');
        this.scoreO = document.getElementById('score-o');
        this.scoreDraw = document.getElementById('score-draw');
        
        this.addEventListeners();
        this.updateDisplay();
    }
    
    addEventListeners() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.resetGameBtn.addEventListener('click', () => this.resetGame());
        this.resetScoreBtn.addEventListener('click', () => this.resetScore());
    }
    
    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.makeMove(index);
        this.checkResult();
    }
    
    makeMove(index) {
        this.board[index] = this.currentPlayer;
        this.cells[index].textContent = this.currentPlayer;
        this.cells[index].classList.add(this.currentPlayer.toLowerCase());
        
        // Add click animation
        this.cells[index].style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.cells[index].style.transform = 'scale(1)';
        }, 150);
    }
    
    checkResult() {
        let roundWon = false;
        let winningCombination = null;
        
        for (let i = 0; i < this.winningConditions.length; i++) {
            const [a, b, c] = this.winningConditions[i];
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                roundWon = true;
                winningCombination = this.winningConditions[i];
                break;
            }
        }
        
        if (roundWon) {
            this.handleWin(winningCombination);
            return;
        }
        
        if (!this.board.includes('')) {
            this.handleDraw();
            return;
        }
        
        this.switchPlayer();
    }
    
    handleWin(winningCombination) {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        
        // Highlight winning cells
        winningCombination.forEach(index => {
            this.cells[index].classList.add('winning');
        });
        
        this.showMessage(`Player ${this.currentPlayer} Wins! 🎉`);
        this.updateScoreDisplay();
        
        // Auto-reset after 3 seconds
        setTimeout(() => {
            this.resetGame();
        }, 3000);
    }
    
    handleDraw() {
        this.gameActive = false;
        this.scores.draw++;
        this.showMessage("It's a Draw! 🤝", 'draw');
        this.updateScoreDisplay();
        
        // Auto-reset after 3 seconds
        setTimeout(() => {
            this.resetGame();
        }, 3000);
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateDisplay();
    }
    
    showMessage(message, type = '') {
        this.gameMessage.textContent = message;
        this.gameMessage.className = `game-message ${type}`;
        this.gameMessage.classList.remove('hidden');
    }
    
    hideMessage() {
        this.gameMessage.classList.add('hidden');
    }
    
    updateDisplay() {
        this.currentPlayerText.textContent = `Player ${this.currentPlayer}'s Turn`;
        this.currentPlayerText.style.color = this.currentPlayer === 'X' ? '#e53e3e' : '#3182ce';
    }
    
    updateScoreDisplay() {
        this.scoreX.textContent = this.scores.X;
        this.scoreO.textContent = this.scores.O;
        this.scoreDraw.textContent = this.scores.draw;
    }
    
    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
            cell.style.transform = 'scale(1)';
        });
        
        this.hideMessage();
        this.updateDisplay();
    }
    
    resetScore() {
        this.scores = { X: 0, O: 0, draw: 0 };
        this.updateScoreDisplay();
        this.resetGame();
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});

// Add some fun keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
        // Press 'R' to reset game
        document.getElementById('reset-game').click();
    } else if (e.key === 'c' || e.key === 'C') {
        // Press 'C' to clear scores
        document.getElementById('reset-score').click();
    }
});

// Add visual feedback for button presses
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousedown', () => {
        btn.style.transform = 'translateY(0px) scale(0.98)';
    });
    
    btn.addEventListener('mouseup', () => {
        btn.style.transform = 'translateY(-2px) scale(1)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(-2px) scale(1)';
    });
});