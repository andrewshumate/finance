const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
});

window.onload = function () {
    const isChecked = localStorage.getItem("adjust-for-inflation");
    if (isChecked != null) {
        document.getElementById("adjust-for-inflation").checked = isChecked === "true";
    }

    initGraph();
    calculate();
};

function calculate() {
    const annualInvestment = getAndSaveNumber("annual-investment");
    const initialInvestment = getAndSaveNumber("initial-investment");
    const costOfLeverage = getAndSaveNumber("expense-ratio");
    const lengthOfInvestment = getAndSaveNumber("length-of-investment");
    const taxRate = getAndSaveNumber("tax-rate");
    const shouldAdjustForInflation = getAndSaveBoolean("adjust-for-inflation");
    const leverage = getAndSaveNumber("leverage");

    let endingBalances = [];
    let results = [];
    for (let i = 1926; i <= 2021 - lengthOfInvestment; i++) {
        const result = getEndingBalance(
            i,
            annualInvestment,
            initialInvestment,
            costOfLeverage,
            lengthOfInvestment,
            taxRate,
            shouldAdjustForInflation,
            leverage
        );
        endingBalances.push(result.endingBalance);
        results.push(result);
    }

    const principal = initialInvestment + annualInvestment * lengthOfInvestment;
    const worstCase = formatter.format(Math.min(...endingBalances));
    const bestCase = formatter.format(Math.max(...endingBalances));
    const medianCase = formatter.format(endingBalances.sort((a, b) => a - b)[Math.floor(endingBalances.length / 2)]);

    document.getElementById("principal").innerHTML = `${formatter.format(principal)}`;
    document.getElementById("worst-case").innerHTML = `${worstCase}`;
    document.getElementById("best-case").innerHTML = `${bestCase}`;
    document.getElementById("average-case").innerHTML = `${medianCase}`;
    document.getElementById("starting-years-tested").innerHTML = `${2021 - 1926 - lengthOfInvestment}`;

    invalidateGraph(results, principal, shouldAdjustForInflation);
}

function getEndingBalance(
    startingYear,
    annualInvestment,
    initialInvestment,
    costOfLeverage,
    lengthOfInvestment,
    taxRate,
    shouldAdjustForInflation,
    leverage
) {
    let balance = initialInvestment;
    let principal = initialInvestment;
    let totalFees = 0.0;

    for (let i = 0; i < lengthOfInvestment; i++) {
        principal += annualInvestment;
        balance += annualInvestment;
        balance += balance * getAnnualPercentChange(leverage, costOfLeverage / 100)[startingYear + i];

        if (shouldAdjustForInflation) {
            balance *= 1 - annualData[startingYear + i].inflationRate;
            principal *= 1 - annualData[startingYear + i].inflationRate;
        }
    }

    const profit = balance - (initialInvestment + annualInvestment * lengthOfInvestment);
    const taxes = profit * (taxRate / 100);
    balance -= taxes;

    return {
        startingYear: startingYear,
        principal: principal,
        endingBalance: balance,
        taxes: taxes,
        fees: totalFees,
    };
}

// Without leverage
const DAILY_DATE_TO_PERCENT_CHANGE_MAP = (function () {
    const timestamps = DATA.chart.result[0].timestamp;
    const closingPrices = DATA.chart.result[0].indicators.adjclose[0].adjclose;
    const dateToPercentChangeMap = new Map();
    let previousClosingPrice = closingPrices[0];

    for (let i = 1; i < timestamps.length; i++) {
        const date = new Date(timestamps[i] * 1000);
        const closingPrice = closingPrices[i];
        const percentChange = (closingPrice - previousClosingPrice) / previousClosingPrice;
        dateToPercentChangeMap.set(date, percentChange);
        previousClosingPrice = closingPrice;
    }

    return [...dateToPercentChangeMap];
})();

// With leverage
let previousLeverage = null;
let previousCostOfLeverage = null;
let cache = null;
function getAnnualPercentChange(leverage, costOfLeverage) {
    function getAnnualPercentChange_(year) {
        const thisYearsDailyPercentChanges = DAILY_DATE_TO_PERCENT_CHANGE_MAP.filter(
            (entry) => year === entry[0].getYear() + 1900
        );

        let balance = 100.0;
        for (let i = 0; i < thisYearsDailyPercentChanges.length; i++) {
            let thisDaysPercentChange = thisYearsDailyPercentChanges[i][1];
            thisDaysPercentChange *= leverage;
            thisDaysPercentChange -= costOfLeverage / thisYearsDailyPercentChanges.length;
            balance += balance * thisDaysPercentChange;
        }

        const result = (balance - 100.0) / 100.0;
        // console.log(`${year} had an annual return of ${(result * 100).toFixed(2)}%`);
        return result;
    }

    if (cache != null && previousLeverage === leverage && previousCostOfLeverage === costOfLeverage) {
        return cache;
    }

    const result = {};
    for (let i = 1926; i < 2022; i++) {
        const x = getAnnualPercentChange_(i);
        result[i] = x;
    }

    cache = result;
    previousLeverage = leverage;
    previousCostOfLeverage = costOfLeverage;

    return result;
}
