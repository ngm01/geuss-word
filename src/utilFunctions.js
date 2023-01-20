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
    // FAKE API CALL
    getTodaysWord: function() {
        return new Promise((resolve, reject) => {
            setTimeout(resolve({word: 'ALTER'}), Math.random() * 1000)
          })
    },
    getWordFromArray: function(array) {
        return array.flatMap(letter => letter.letter).join('');
    }
}

export default utils;