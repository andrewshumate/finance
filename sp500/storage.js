const defaultValues = {
    "annual-investment": 6000,
    "initial-investment": 0,
    "expense-ratio": 0.12,
    "length-of-investment": 35,
    "tax-rate": 0.0,
    leverage: 3.0,
};

function getAndSaveNumber(key) {
    const element = document.getElementById(key);
    let value = element.value;

    if (value) {
        localStorage.setItem(key, value);
    } else {
        value = localStorage.getItem(key) || defaultValues[key];
        element.value = value;
    }

    return Number(value);
}

function getAndSaveBoolean(key) {
    const value = document.getElementById(key).checked;
    localStorage.setItem(key, value);
    return value;
}
