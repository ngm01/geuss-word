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
    }
}

export default utils;