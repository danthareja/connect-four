var Board = (function MakeBoard(EVT) {
    var $board;

    EVT.on("init", init);
    EVT.on("render", render);

    function init() {
        $board = document.querySelector("[rel=js-board]");
        $board.addEventListener("click", handleBoardClick);
    }

    function handleBoardClick(event) {
        if (!event.target.matches("[rel*=js-cell]")) return;

        event.preventDefault();

        let parent = event.target.parentElement;
        let columnIndex = Array.from(parent.children).findIndex(function matchTarget(child){
            return child == event.target;
        });

        EVT.emit('play', columnIndex);
    }

    // Takes a board array and returns the corresponding HTML string
    function template(board) {
        var html = "";

        board.forEach(function renderRow(row) {
            html += `<div class="board-row">`;
            
            row.forEach(function renderCell(cell, i) {
                let classNames = "board-cell"
                if (cell == 1) classNames += " red";
                if (cell == 2) classNames += " yellow";

                html += `<div class="${classNames}" rel="js-cell-${i}"></div>`;
            });

            html += `</div>`;
        });

        return html;
    }

    function render(board) {
        $board.innerHTML = template(board);
    }
    
    var publicAPI = {};
    
    return publicAPI
})(EVT);
