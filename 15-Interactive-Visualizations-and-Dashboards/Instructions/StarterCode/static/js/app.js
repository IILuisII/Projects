$(document).ready(function() {
    loadDataID();
});

function loadDataID() {
    $.ajax({
        type: 'GET',
        url: "samples.json",
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            data["names"].forEach(function(id) {
                let ids = `<option>${id}</option>`;
                $('#selDataset').append(ids);

            });
            let first = data["names"][0]
            optionChanged(first);
        }
    });
}

function demographicInfo(id) {
    $.ajax({
        type: 'GET',
        url: "samples.json",
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            let metaData = data["metadata"].filter(x => x.id == id)[0];
            $('#sample-metadata').empty();
            Object.entries(metaData).forEach(function([key, value]) {
                let label = `<p><b>${key.toUpperCase()}</b> : ${value} </p>`;
                $('#sample-metadata').append(label);
            });
        }
    });
}

function loadBar(id) {
    $.ajax({
        type: 'GET',
        url: "samples.json",
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            let sample = data["samples"].filter(x => x.id == id)[0];
            let plotData = sample["otu_ids"].map(function(e, i) {
                return [e, sample["sample_values"][i]];
            });
            let sortedData = plotData.sort((a, b) => b[1] - a[1]);
            xAxis = sortedData.map(x => x[1]).slice(0, 10).reverse()
            yAxis = sortedData.map(x => "OTU " + x[0]).slice(0, 10).reverse()

            var traces = [{
                type: 'bar',
                x: xAxis,
                y: yAxis,
                marker: { color: `#014D65` },
                orientation: 'h'
            }];

            var layout = {
                title: 'OTU Ids to Values'
            };

            Plotly.newPlot('bar', traces, layout);
        }
    });
}

function loadBubble(id) {
    $.ajax({
        type: 'GET',
        url: "samples.json",
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            let sample = data["samples"].filter(x => x.id == id)[0];

            var trace1 = {
                x: sample["otu_ids"],
                y: sample["sample_values"],
                mode: 'markers',
                marker: {
                    size: sample["sample_values"].map(x => x * 0.75),
                    color: sample["otu_ids"],
                    colorscale: "Greens"
                }
            };

            var data = [trace1];

            var layout = {
                title: 'OTU Ids to Values',
                showlegend: false,
            };

            Plotly.newPlot('bubble', data, layout);
        }
    });
}

function loadGauge(id) {
    $.ajax({
        type: 'GET',
        url: "samples.json",
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            let sampleData = data["metadata"].filter(x => x.id == id)[0];

            var data = [{
                domain: { x: [0, 1], y: [0, 1] },
                value: sampleData.wfreq,
                title: { text: "Belly Button Washing Frequency" },
                type: "indicator",
                mode: "gauge+number+delta",
                gauge: {
                    bar: { color: "#E74C3C", opacity: 0.5 },
                    axis: { range: [null, 9], barcolor: "darkblue" },
                    steps: [
                        { range: [0, 10], color: "#014D65" },
                    ]
                }

            }];
            var layout = {
                width: 600,
                height: 500,
                margin: { t: 20, b: 40, l: 100, r: 100 }
            };
            Plotly.newPlot("gauge", data, layout);
        }
    });
}

function optionChanged(id) {
    demographicInfo(id);
    loadBar(id);
    loadBubble(id);
    loadGauge(id);
}