const config = {
    type: "line",
    data: {
        datasets: [
            {
                label: "Ending balance",
                backgroundColor: "#2196F3",
                borderColor: "#2196F3",
                tension: 0.4,
            },
            {
                label: "Principal",
                order: 999,
                fill: true,
                backgroundColor: "#BDBDBD",
                borderColor: "#BDBDBD",
                radius: 0,
            },
        ],
    },
    options: {
        animation: {
            duration: 0,
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value, index, values) {
                        return formatter.format(value);
                    },
                },
            },
        },
        maintainAspectRatio: false,
    },
};

let chart;

function initGraph() {
    const context = document.getElementById("canvas");
    chart = new Chart(context, config);
}

function invalidateGraph(results, principal, shouldAdjustForInflation) {
    config.data.labels = [];
    config.data.datasets[0].data = [];
    config.data.datasets[1].data = [];

    if (shouldAdjustForInflation) {
        if (config.data.datasets[2] == null) {
            config.data.datasets.push({
                label: "Inflation adjusted principal",
                fill: false,
                backgroundColor: "#000",
                borderColor: "#000",
                data: [],
                tension: 0.4,
            });
        } else {
            config.data.datasets[2].data = [];
        }
    } else if (config.data.datasets[2] != null) {
        config.data.datasets.pop();
    }

    for (let i = 0; i < results.length; i++) {
        config.data.labels.push(results[i].startingYear);

        config.data.datasets[0].data.push(results[i].endingBalance);
        config.data.datasets[1].data.push(principal);
        if (shouldAdjustForInflation) {
            config.data.datasets[2].data.push(results[i].principal);
        }
    }

    chart.update();
}
