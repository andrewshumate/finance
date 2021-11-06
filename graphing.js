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

function invalidateGraph() {
    config.data.labels.push(Math.floor(Math.random() * 10));

    config.data.datasets.forEach(function(dataset) {
        dataset.data.push(Math.floor(Math.random() * 69));
    });

    chart.update();
}
