//TODO: make more validation

module.exports = function() {

    var ValidatorService = {
        isValid: function (input) {
            if(input && input!=='unidentified'){
                return true;
            } else {
                return false;
            }
        }
    };
    return ValidatorService;
};