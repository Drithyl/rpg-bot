module.exports.isDefined = function(value) {
    return value != null;
};

module.exports.isBoolean = function(value) {
    return value === true || value === false;
};

module.exports.isString = function(value) {
    return typeof value === "string";
};

module.exports.isNonEmptyString = function(value) {
    return exports.isString(value) && value !== "";
};

module.exports.isStringWithLength = function(value, minLength, maxLength) {
    return exports.isString(value) && value.length >= minLength && value.length <= maxLength;
};

module.exports.isNonEmptyArray = function(value) {
    return Array.isArray(value) && value.length > 0;
};

module.exports.isParsableNumber = function(value) {
    if (value === undefined || value === null) {
        return false;
    }

    if (value === "") {
        return false;
    }

    if (isNaN(Number(value)) === true) {
        return false;
    }

    return true;
};

module.exports.isDiscordId = function(value) {
    return exports.isStringWithLength(value, 17, 19) === true && exports.isParsableNumber(value) === true;
};

module.exports.isFunction = function(value) {
    return typeof value === "function";
};
