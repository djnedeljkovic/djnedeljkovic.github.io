var puzzle = {
    infos : {
		piecesCount : null,
		shuffleTimes : null,
		solved : null,
		timeStarted : null,				
		movesCount : null
	},
	piecesElements : null,
	pieces : null,
	height : null,
	width : null,
	img : null,
	canvas : null	
};

function init() {
	var image = document.getElementById('image');	
	var newgame = document.getElementById('newgame');
	var restartgame = document.getElementById('restartgame');
	var highscore = document.getElementById('highscore');

	image.addEventListener('change', function () {
		if (this.files.length) {
			puzzle.init(this.files[0]);
		}
	});
	newgame.addEventListener('mousedown', puzzle.newGame);
	newgame.addEventListener('touchstart', puzzle.newGame);
	restartgame.addEventListener('mousedown', puzzle.restartGame);
	restartgame.addEventListener('touchstart', puzzle.restartGame);
	highscore.addEventListener('mousedown', puzzle.highscore);
	highscore.addEventListener('touchstart', puzzle.highscore);
	if (typeof localStorage['puzzleInfos'] !== 'undefined' &&
		typeof localStorage['puzzleSource'] !== 'undefined' &&
		typeof localStorage['puzzleTiles'] !== 'undefined') {
		puzzle.resumeGame();
	} else {
		showStartScreen();
		var startScreen = document.getElementById('startScreen');
		startScreen.addEventListener("mousedown", function() {
			image.click();
		}, false);
		startScreen.addEventListener("touchend", function() {
			image.click();
		}, false);		
	}

	window.applicationCache.addEventListener('updateready', function (e) {
		if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
			// Browser downloaded a new app cache.
			// Swap it in and reload the page to get the new hotness.
			window.applicationCache.swapCache();
			if (confirm('A new version is available, load it immediately ? (Game progress isn\'t lost)')) {
				window.location.reload();
			}
		} else {
			// Manifest didn't change. Nothing new to serve.
		}
	}, false);
}

function showStartScreen() {
	document.getElementById('startScreen').classList.remove('hidden');
}

function hideStartScreen() {
	document.getElementById('startScreen').classList.add('hidden');
}

puzzle.init = function (file) {
	var fileReader = new FileReader();
	fileReader.onload = function (e) {
		// Store file in localStorage to be able to resume game later.
		localStorage['puzzleSource'] = e.target.result;
	};
	fileReader.readAsDataURL(file);
	puzzle.initVars();
    var imageUrl = window.URL || window.webkitURL;
	puzzle.initElements(imageUrl.createObjectURL(file), file.type, function () {
		hideStartScreen();
		puzzle.shuffle();
	});
	highscore.initHighscore();
};

puzzle.initVars = function () {
	puzzle.infos.solved = false;
	puzzle.infos.piecesCount = 6;
	puzzle.infos.shuffleTimes = 30;
	puzzle.infos.movesCount = 0;		
	puzzle.infos.timeStarted = (new Date()).getTime();
};

puzzle.initElements = function (fileURL, fileType, callback) {
	var puzzleHolder = document.createElement('div');
	puzzleHolder.id = 'puzzleHolder';
	document.getElementById('imageHolder').appendChild(puzzleHolder);	
	puzzle.height = window.innerHeight * 0.9;
	puzzle.width = window.innerWidth;
	puzzle.createPieces();
	puzzle.img = new Image();
    var afterImageLoad = function () {
        puzzle.initialDraw();
		callback();
	};
	puzzle.img.onload = afterImageLoad;
	puzzle.img.src = fileURL;
};

puzzle.resumeGame = function () {
	var puzzleInfos = JSON.parse(localStorage['puzzleInfos']);
	var puzzleTiles = JSON.parse(localStorage['puzzleTiles']);
	var start,
	end,
	fileType,
	fileURL;	
	puzzle.initVars();
	fileURL = localStorage['puzzleSource']
		start = fileURL.indexOf(':') + 1;
	end = fileURL.indexOf(';');
	fileType = fileURL.slice(start, end);
	puzzle.initElements(fileURL, fileType, function () {
		puzzle.infos = puzzleInfos;		
		for (var i = 0; i < puzzleTiles.length; i++) {
			for (var j = 0; j < puzzleTiles[i].length; j++) {
				puzzle.pieces[i][j].x = puzzleTiles[i][j].x;
				puzzle.pieces[i][j].y = puzzleTiles[i][j].y;
				puzzle.pieces[i][j].reposition();
			}
		}
		hideStartScreen();
	});
};

puzzle.initialDraw = function () {
	var transitionEnd = function(e) {
		if (e.target.tagName.toLowerCase() !== 'canvas') {
			return;
		}
		if (puzzle.moving > 0) {
			puzzle.moving--;
		}
		if (!puzzle.moving) {
			document.body.classList.remove('moving');
			puzzle.checkSolved();
		}
	}
	puzzle.initCanvas();
	puzzle.redraw();
	puzzle.moving = 0;
	document.body.addEventListener('transitionend', transitionEnd);
	document.body.addEventListener('webkitTransitionEnd', transitionEnd);
	document.defaultView.addEventListener('resize', function () {
		puzzle.redraw();
	});
};

puzzle.initCanvas = function () {
	if (puzzle.canvas) {
		return puzzle.canvas;
	}
	puzzle.canvas = document.createElement('canvas');
	puzzle.canvas.className = 'hidden';
	puzzle.canvas.id = 'finished';
	puzzle.canvas.addEventListener('mousedown', puzzle.newGame);
	puzzle.canvas.addEventListener('touchstart', puzzle.newGame);
	document.body.appendChild(puzzle.canvas);
	return puzzle.canvas;
};

puzzle.redraw = function () {
	document.body.classList.add('moving');
	var img = puzzle.img;
	var ctx = null;
	var puzzleOrientation = null;
	var imageOrientation = null;
	var canvas = puzzle.canvas;
	puzzle.height = window.innerHeight * 0.9;
	puzzle.width = window.innerWidth;
	canvas.width = puzzle.width;
	canvas.height = puzzle.height;
	ctx = canvas.getContext('2d');
	if (puzzle.width !== puzzle.height) {
		puzzleOrientation = (puzzle.width / puzzle.height) > 1;
	}
	if (img.width !== img.height) {
		imageOrientation = (img.width / img.height) > 1;
	}
	if (puzzleOrientation !== null && imageOrientation !== null &&
		imageOrientation !== puzzleOrientation) {
		// If image orientation and puzzle orientation differ - and we are not
		// drawing to/from a square - we need to rotate the canvas 90 deg to
		// display the image.
		ctx.rotate(90 * Math.PI / 180);
		ctx.translate(0, -canvas.width);
		ctx.drawImage(img, 0, 0, canvas.height, canvas.width);
	} else {
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	}
	for (var i = 0; i < puzzle.pieces.length; i++) {
		for (var j = 0; j < puzzle.pieces[i].length; j++) {
			var piece = puzzle.pieces[i][j];
			var elm = puzzle.piecesElements[piece.id];
			elm.width = puzzle.width / puzzle.infos.piecesCount;
			elm.height = puzzle.height / puzzle.infos.piecesCount;
			var sx = Math.round(i * puzzle.width / puzzle.infos.piecesCount);
			var sy = Math.round(j * puzzle.height / puzzle.infos.piecesCount);
			var sw = Math.round(canvas.width / puzzle.infos.piecesCount);
			var sh = Math.round(canvas.height / puzzle.infos.piecesCount);
			var dw = elm.width;
			var dh = elm.height;
			ctx = elm.getContext('2d');
            try {
			ctx.drawImage(canvas, sx, sy, sw, sh, 0, 0, dw, dh);
            }catch(e){
                alert(e);
                alert('sx:' + sx + " sy:" + sy + " sw:" + sw + "sh:" + sh + " dw:" + dw + " dh:" +dh)
            }
			ctx.strokeRect(0, 0, dw, dh);
			piece.reposition();		
		}
	}

	document.body.classList.remove('moving');
};

puzzle.shuffle = function () {
	var temp;
	for (var d = 0; d < puzzle.infos.shuffleTimes; d++) {		
		var i1 = Math.round(Math.random() * (puzzle.pieces.length - 1));
		var j1 = Math.round(Math.random() * (puzzle.pieces.length - 1));
		var i2 = Math.round(Math.random() * (puzzle.pieces.length - 1));
		var j2 = Math.round(Math.random() * (puzzle.pieces.length - 1));		
		var temp = puzzle.pieces[i1][j1];		
		puzzle.pieces[i1][j1] = puzzle.pieces[i2][j2];
		puzzle.pieces[i2][j2] = temp;
	}
	localStorage['puzzleInfos'] = JSON.stringify(puzzle.infos);
	puzzle.redraw();
};

puzzle.checkSolved = function () {
	if (puzzle.infos.solved) {
		return;
	}
	var solved = true;
	for (var i = 0; i < puzzle.pieces.length; i++) {
		for (var j = 0; j < puzzle.pieces[i].length; j++) {
			var piece = puzzle.pieces[i][j];
			if (i !== piece.x || j !== piece.y) {
				solved = false;
				break;
			}
		}
	}
	if (solved) {
		puzzle.resetStorage();		
		window.navigator.vibrate([100, 50, 100, 50, 100, 50]);
		var timeElapsed = Math.abs((puzzle.infos.timeStarted - (new Date()).getTime()) / 1000); 
		var newHighScore = highscore.addHighScore({
			timeSpent: timeElapsed,
			movesNum: puzzle.infos.movesCount
		});
		var additionalText = "";
		if (newHighScore) {
			additionalText = "NEW HIGH SCORE!!!\n";
		}
		alert(additionalText + 'Congratulations! Puzzle solved! \nNumber of moves: ' + puzzle.infos.movesCount + "\nCompletition time:" + timeElapsed + " seconds");
		puzzle.infos.solved = solved;
	}
};

puzzle.resetStorage = function () {
	delete localStorage['puzzleInfos'];
	delete localStorage['puzzleSource'];
	delete localStorage['puzzleTiles'];
};

puzzle.newGame = function () {
	puzzle.resetStorage();
	var puzzleHolder = document.getElementById('puzzleHolder');
	puzzleHolder.parentNode.removeChild(puzzleHolder, true);
	puzzle.canvas.classList.add('hidden');
	if (typeof puzzle.img.pause !== 'undefined') {
		puzzle.img.pause();
	}
	showStartScreen();
};

puzzle.restartGame = function () {
	for (var i = 0; i < puzzle.pieces.length; i++) {
		for (var j = 0; j < puzzle.pieces[i].length; j++) {
			var piece = puzzle.pieces[i][j];
			piece.x = i;
			piece.y = j;
		}
	}
	puzzle.initVars();
	puzzle.initialDraw();
	puzzle.shuffle();	
	window.navigator.vibrate([200, 50, 200, 50]);
};

puzzle.highscore = function () {
	alert(highscore.displayHighScores());
};


puzzle.createPieces = function () {
	var puzzleHolder = document.getElementById('puzzleHolder');
	var piece,
	elm;

	puzzle.pieces = new Array(puzzle.infos.piecesCount);
	puzzle.piecesElements = {};	
	for (var i = 0; i < puzzle.infos.piecesCount; i++) {
		puzzle.pieces[i] = new Array(puzzle.infos.piecesCount);
		for (var j = 0; j < puzzle.infos.piecesCount; j++) {	
			piece = new Piece(i, j);
			elm = document.createElement('canvas');
			elm.className = 'piece';
			elm.id = piece.id;
			elm.addEventListener('touchstart', piece.eventHandler.bind(piece));
			elm.addEventListener('mousedown', piece.eventHandler.bind(piece));
			puzzleHolder.appendChild(elm);

			puzzle.pieces[i][j] = piece
			puzzle.piecesElements[elm.id] = elm;			
		}
	}
};

window.onload = init;

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}