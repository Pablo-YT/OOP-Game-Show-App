/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor(missed = 0, phrases, activePhrase){
        this.missed = missed;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
        this.isGameOver = false;
    }

        /** 
    * Begins game by selecting a random phrase and displaying it to user */ 

    startGame(){
        let screenOverlay = document.querySelector("#overlay");
        screenOverlay.style.display = 'none';
        return this.activePhrase = this.getRandomPhrase();
        }


    /**
    * Creates phrases for use in game
    * @return {array} An array of phrases that could be used in the game
    */
    createPhrases(){
        let phrases = [
            {
                phrase:  ['the bewildered tourist was lost','the lost puppy was a wet and stinky dog','it was a story as old as time', 'saturday became a cool wet afternoon',  'he was waiting for the rain to stop']
            }
        ]
        return phrases.map(phrase => {return phrase['phrase']})
        
    }
    
    getRandomPhrase(){
        let ranNum = Math.floor(Math.random() * 5);
        return new Phrase(this.createPhrases()[0][ranNum]);
    }

    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    won
    */

    checkForWin(){
        let letters = document.querySelectorAll('#phrase ul li');

        // counter to check times a letter is found
        let lettersFound = 0;
        // variable to check the amount of spaces in the phrase
        let spaceInPhrase = 0;

        letters.forEach(letter => {
            if (letter.className === 'letter show'){
                lettersFound++;
            } 
            if  (letter.className === 'hide space'){
                spaceInPhrase++;
            } 

            if (lettersFound === letters.length - spaceInPhrase){
                return this.gameOver(true);
            }
        });
    }

    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */

    removeLife(){
        const hearts = document.querySelectorAll('.tries img');
        const lostLife = `images/lostHeart.png`;
        let heart = hearts[this.missed].attributes[0].value;

        
        if(heart === "images/liveHeart.png"){
            hearts[this.missed].src = lostLife;
            this.missed++;
        };

        if(this.missed === 5){
            this.gameOver(false);
        };
        
    }

    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon){
        // Variables to change overlay and text
        let gameOverMsg = document.querySelector('#game-over-message');
        let overlay = document.querySelector('#overlay');
        overlay.classList.remove('start');


        // Variables for resetting the game
        const buttons = document.querySelectorAll('.keyrow button');
        const hearts = document.querySelectorAll('.tries img');
        const fullHealth = 'images/liveHeart.png';
        const li = document.querySelectorAll('#phrase ul li');
        
        //Check to see if game is over 
        this.isGameOver = true;

        if (!gameWon){
            this.isGameOver = true;
            overlay.classList.add('lose');
            overlay.classList.remove('win');
            overlay.style.display = 'block';
            gameOverMsg.textContent = 'You Lose!';
        } 

        if (gameWon){
            this.isGameOver = true;
            overlay.classList.add('win');
            overlay.classList.remove('lose');
            overlay.style.display = 'block';
            gameOverMsg.textContent = 'You Win!';
        }


         // if the game is over reset the entire game 
        if (game.isGameOver){
            for (let i = 0; i < li.length; i++){
                li[i].parentNode.removeChild(li[i]);
            }
    
        // Changing back the button classes to the default value
        buttons.forEach(button => {
            button.disabled = false;
            button.classList.remove('chosen');
            button.classList.remove('wrong');
            button.classList.remove('show');
            button.classList.add('key');
        });
            
        // Change the empty hearts back to full
        for (let i = 0; i < hearts.length; i++){
            hearts[i].src = fullHealth;
        };
        
    }
    }

    /**
    * Handles onscreen keyboard button clicks
    * @param (HTMLButtonElement) button - The clicked button element
    */

    handleInteraction(button){
        // Disable the button that is clicked
        button.disabled = true;

        // Check if the letter is in the phrase
        // If it is add class 'chosen' and add the letter to display
        // If not remove a life and add class 'wrong'
        if (!this.activePhrase.checkLetter(button.textContent)){
            button.classList.add('wrong');
            this.removeLife();
        }

        if (this.activePhrase.checkLetter(button.textContent)){
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(button.innerHTML);
            this.checkForWin();
        }
    }
}