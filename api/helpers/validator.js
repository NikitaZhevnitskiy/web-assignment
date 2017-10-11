//TODO: more validation

exports.isValid = function (input) {
    const line = input.trim();
    if(line && line!=='unidentified' && !~line.indexOf(' ')) {return true;}
    return false;
};