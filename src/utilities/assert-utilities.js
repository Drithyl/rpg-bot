const typeUtilities = require("./type-utilities");

module.exports.assertThat = function(booleanExpression, failMessage) {
    if (booleanExpression === false) {
        throw new Error(failMessage);
    }
};

module.exports.assertIsDefined = function(value) {
    if (typeUtilities.isDefined(value) === false) {
        throw new Error(`Expected value to be defined and non-null; instead got ${value}`);
    }
};

module.exports.assertIsBoolean = function(value) {
    if (typeUtilities.isBoolean(value) === false) {
        throw new Error(`Expected value to be a pure boolean; instead got ${value}`);
    }
};

module.exports.assertIsString = function(value) {
    if (typeUtilities.isString(value) === false) {
        throw new Error(`Expected value to be a string; instead got ${value}`);
    }
};

module.exports.assertStringIsNotEmpty = function(value) {
    module.exports.assertIsString(value);
    if (typeUtilities.isNonEmptyString(value) === false) {
        throw new Error("Expected string to not be empty; instead got empty string");
    }
};

module.exports.assertStringHasLength = function(value, minLength, maxLength) {
    module.exports.assertIsString(value);
    if (typeUtilities.isStringWithLength(value, minLength, maxLength) === false) {
        throw new Error(`Expected string to have length between ${minLength} and ${maxLength}; instead got ${value.length}`);
    }
};

module.exports.assertIsDiscordId = function(value) {
    if (typeUtilities.isDiscordId(value) === false) {
        throw new Error(`Expected value to be a valid Discord id; instead got ${value}`);
    }
};

module.exports.assertCommandNameIsValid = function(value) {
    const regex = /^[a-z-_]{1,32}$/;

    exports.assertThat(regex.test(value),
        `Discord command name must be between 1 and 32 characters and contain only lowercase letters or the symbols - and _; instead got ${value}`
    );
};

module.exports.assertIsFunction = function(value) {
    if (typeUtilities.isFunction(value) === false) {
        throw new Error(`Expected value to be a function; instead got ${value}`);
    }
};

module.exports.assertIsFunctionDictionary = function(dictionary) {
    if (typeUtilities.isDefined(dictionary) === false) {
        throw new Error("Expected value to be an object containing only functions, but it is null or undefined");
    }

    for (const key in dictionary) {
        this.assertThat(typeUtilities.isFunction(dictionary[key]),
            `Expected key ${key}'s value to be a function; instead got ${dictionary[key]}`
        );
    }
};

module.exports.assertIsStringDictionary = function(dictionary) {
    if (typeUtilities.isDefined(dictionary) === false) {
        throw new Error("Expected value to be an object containing only strings, but it is null or undefined");
    }

    for (const key in dictionary) {
        this.assertThat(typeUtilities.isString(dictionary[key]),
            `Expected key ${key}'s value to be a string; instead got ${dictionary[key]}`
        );
    }
};

module.exports.assertIsInstanceOf = function(value, prototype) {
    if (value instanceof prototype === false) {
        throw new Error(`Expected value to be an instance of ${prototype}; instead got ${value}`);
    }
};
