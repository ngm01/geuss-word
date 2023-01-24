import { answers } from "./words/allowed_answers";
import { guesses } from "./words/allowed_guesses";

const utils = {
    isAlpha: function(str) {
        // TODO: need to intercept the "command" key (which produces str = 'Meta')
        // so user can do things like reload page
        if(typeof str !== 'string') return false;
        return /^[A-Z]$/i.test(str);
    },
    isEnterOrDelete: function(key) {
        const upperCase = key.toUpperCase();
        return upperCase === 'ENTER' || upperCase === 'BACKSPACE';
    },
    getTodaysWord: function() {
        const rando = Math.floor(Math.random() * (answers.length - 0) + 0)
        return new Promise((resolve, reject) => {
            setTimeout(resolve({word: answers[rando]}), Math.random() * 1000)
          })
    },
    isAllowedGuess: function(guess) {
        return guesses.includes(this.getWordFromArray(guess));
    },
    getWordFromArray: function(array) {
        return array.flatMap(letter => letter.letter).join('');
    }
}

export default utils;