function Piece(x, y) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.id = "c_" + (x * puzzle.infos.piecesCount + y);
}

Piece.prototype.eventHandler = function(e) {
    if (!document.body.classList.contains('moving')) {
        this.pieceTouched();
    }
    e.preventDefault();
    e.stopPropagation();
};

Piece.prototype.pieceTouched = function() {    
	var elm = puzzle.piecesElements[this.id];	
	if (hasClass(elm, 'selected')) {
		elm.className = 'piece';
		return;
	} else {
		var alreadySelected = document.getElementsByClassName('selected');
		if (alreadySelected.length > 0) {							
			var selectedPiece = this.getById(alreadySelected[0].id);
			puzzle.infos.movesCount++;
			document.body.classList.add('moving');
			this.originalX = this.x;
			this.originalY = this.y;
			this.x = selectedPiece.x;
			this.y = selectedPiece.y;
			selectedPiece.originalX = selectedPiece.x;
			selectedPiece.originalY = selectedPiece.y;
			selectedPiece.x = this.originalX;
			selectedPiece.y = this.originalY;
			this.reposition();
			alreadySelected[0].className = 'piece';
			selectedPiece.reposition();						
			localStorage['puzzleTiles'] = JSON.stringify(puzzle.pieces);			
		} else {
			elm.className = elm.className + " selected";			
		}
	}
};

Piece.prototype.reposition = function() {
    var x, y, oldX, oldY, peekX, peekY, elm;

    function realReposition(e) {
        e.stopPropagation();
        elm.classList.remove('peek');
        elm.style.webkitTransform = 'translateX(' + x + 'px) translateY(' + y + 'px)';
        elm.style.transform = 'translateX(' + x + 'px) translateY(' + y + 'px)';
        elm.removeEventListener('transitionend', realReposition);
        elm.removeEventListener('webkitTransitionEnd', realReposition);
    }

    elm = puzzle.piecesElements[this.id];
    x = this.x * (puzzle.width / puzzle.infos.piecesCount);
    y = this.y * (puzzle.height / puzzle.infos.piecesCount);
    // move 1% in the right direction before doing the real move, to avoid
    // ugly flickering with Firefox OS
    elm.addEventListener('transitionend', realReposition);
    elm.addEventListener('webkitTransitionEnd', realReposition);
    oldX = this.originalX * (puzzle.width / puzzle.infos.piecesCount);
    oldY = this.originalY * (puzzle.height / puzzle.infos.piecesCount);

    peekX = Math.round(oldX + (x - oldX) / 100);
    peekY = Math.round(oldY + (y - oldY) / 100);
    elm.classList.add('peek');
    elm.offsetLeft; // Force browser to acknowledge it needs to make a transition
    elm.style.webkitTransform = 'translateX(' + peekX + 'px) translateY(' + peekY + 'px)';
    elm.style.transform = 'translateX(' + peekX + 'px) translateY(' + peekY + 'px)';
};

Piece.prototype.getById = function(id){
	for (var i = 0; i < puzzle.pieces.length; i++) {
		for (var j = 0; j < puzzle.pieces[i].length; j++) {
			var piece = puzzle.pieces[i][j];
			if (piece.id === id) {
				return piece;
			}
		}
	}
};