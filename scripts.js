function getEndingBalance(
    startingYear,
    annualInvestment,
    initialInvestment,
    expenseRatio,
    lengthOfInvestment,
    taxRate,
    shouldAdjustForInflation
) {
    let balance = 0.0;
    let principal = 0.0;
    let totalFees = 0.0;

    for (let i = 0; i < lengthOfInvestment; i++) {
        balance += balance * annualData[startingYear + i].stockReturns;
        balance += annualInvestment;
        principal += annualInvestment;

        const fees = balance * (expenseRatio / 100.0);
        totalFees += fees;
        balance -= fees;

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

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
});

const config = {
    type: 'line',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: "#f00",
            borderColor: "#0f0",
            data: [
                7,
                3,
                7,
            ],
            fill: false,
        }, {
            label: "My Second dataset",
            fill: false,
            backgroundColor: "#00f",
            borderColor: "#ff0",
            data: [
                1,
                2,
                3,
                4
            ],
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Chart.js Line Chart'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        animation: {
            duration: 0
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Month'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }]
        }
    }
};

let chart;

function initGraph() {
    const context = document.getElementById("canvas");
    chart = new Chart(context, config);
}

/*
* TODO
- invalidateGraph
- Graph styling
- Input defaults
- Input memory
*/
function invalidateGraph() {
    config.data.labels.push(Math.floor(Math.random() * 10));

    config.data.datasets.forEach(function(dataset) {
        dataset.data.push(Math.floor(Math.random() * 69));
    });

    chart.update();
}

function calculate() {
    const annualInvestment = Number(document.getElementById("annual-investment").value);
    const initialInvestment = Number(document.getElementById("initial-investment").value);
    const expenseRatio = Number(document.getElementById("expense-ratio").value);
    const lengthOfInvestment = Number(document.getElementById("length-of-investment").value);
    const taxRate = Number(document.getElementById("tax-rate").value);
    const shouldAdjustForInflation = Boolean(document.getElementById("adjust-for-inflation").checked);

    let endingBalances = [];
    for (let i = 1926; i <= (2021 - lengthOfInvestment); i++) {
        const result = getEndingBalance(
            i,
            annualInvestment,
            initialInvestment,
            expenseRatio,
            lengthOfInvestment,
            taxRate,
            shouldAdjustForInflation,
        );
        endingBalances.push(result.endingBalance);
    }

    const principal = formatter.format(initialInvestment + annualInvestment * lengthOfInvestment);
    const worstCase = formatter.format(Math.min(...endingBalances));
    const bestCase = formatter.format(Math.max(...endingBalances));
    const averageCase = formatter.format(endingBalances.reduce((xs, x) => xs + x) / endingBalances.length);

    document.getElementById("principal").innerHTML = `${principal}`;
    document.getElementById("worst-case").innerHTML = `${worstCase}`;
    document.getElementById("best-case").innerHTML = `${bestCase}`;
    document.getElementById("average-case").innerHTML = `${averageCase}`;
    document.getElementById("time-periods-tested").innerHTML = `${2021 - 1926 - lengthOfInvestment}`;

    invalidateGraph();
}

// "Main"
window.onload = function() {
    initGraph();
    calculate();
};