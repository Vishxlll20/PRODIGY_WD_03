// script.js

document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.getElementById("restart");
    let isXTurn = true;
    let board = Array(9).fill(null);

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(e) {
        const index = e.target.dataset.index;
        if (board[index] || checkWinner()) return;

        const currentMark = isXTurn ? "X" : "O";
        board[index] = currentMark;
        e.target.textContent = currentMark;
        e.target.classList.add(currentMark);

        const winner = checkWinner();
        if (winner) {
            highlightWinner(winner);
            alert(`${currentMark} wins!`);
            return;
        }

        isXTurn = !isXTurn;
    }

    function checkWinner() {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return pattern;
            }
        }
        return null;
    }

    function highlightWinner(winningPattern) {
        winningPattern.forEach(index => {
            cells[index].classList.add("winning-cell");
        });
    }

    function restartGame() {
        board.fill(null);
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("X", "O", "winning-cell");
            cell.style.backgroundColor = "";
            cell.style.color = "";
        });
        isXTurn = true;
    }

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    restartButton.addEventListener("click", restartGame);
});
