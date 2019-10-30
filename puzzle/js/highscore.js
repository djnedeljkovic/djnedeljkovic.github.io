var highscore = {
	holder: [],
	holderMaxLength: 5,
	/* returns true in case of new highscore */
	addHighScore: function(score) {
		if (highscore.holder.length === 0) {			
			highscore.holder.push(score);
			highscore.saveToLocalStorage();
			return true;
		}
		var tempScore;
		for (i = 0; i < highscore.holderMaxLength; i++) {
			tempScore = highscore.holder[i];
			if (tempScore) {
				if (score.timeSpent < tempScore.timeSpent || (score.timeSpent === tempScore.timeSpent && score.movesNum < tempScore.movesNum)) {
					highscore.holder.splice(i, 0, score);
					if (highscore.holder.length > highscore.holderMaxLength) {
						highscore.holder.pop();
					}
					highscore.saveToLocalStorage();
					return true;
				}
			}
		}
		if (highscore.holder.length < highscore.holderMaxLength) {
			highscore.holder.push(score);
			highscore.saveToLocalStorage();
			return true;
		} else {
			return false;
		}
	},
	initHighscore: function() {
        if (localStorage['highscore']) {
            highscore.holder = JSON.parse(localStorage['highscore']);
        }
	},
	saveToLocalStorage: function() {
		localStorage['highscore'] = JSON.stringify(highscore.holder);		
	},
	displayHighScores: function() {
		var returnValue = "High score list: ";
		var tempScore;
		for (i = 0; i < highscore.holder.length; i++) { 
			tempScore = highscore.holder[i];
			returnValue += "\n" + (i + 1) + ". Moves: " + tempScore.movesNum + " Time: " + tempScore.timeSpent;
		}
		return returnValue;
	}
}