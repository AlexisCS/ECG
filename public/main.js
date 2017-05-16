var socket = io.connect('http://localhost:8080', { 'forceNew': true });

var ctx = document.getElementById("myChart");
var data = {
    labels: [],
    datasets: [{
        label: "EGC",
        fill: false,
        backgroundColor: "green",
        pointColor: "rgba(0,64,0,1)",
        borderColor: "green",
        data: []
    }]
};
var options = {
    responsive: true,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}

var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});

socket.emit("iniciar", true);

socket.on('data', function(d) {
    data.labels.push(d.label);
    data.datasets[0].data.push(d.data);
    if (data.labels.length >= 25) {
        data.labels.splice(0, 1);
        data.datasets[0].data.splice(0, 1);
    }
    myLineChart.update();
});

socket.on('disconnected', function() {
    data.labels = []
    data.datasets[0].data = [];
    myLineChart.update();
});