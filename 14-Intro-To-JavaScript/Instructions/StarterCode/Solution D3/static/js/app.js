// from data.js
var tableData = data;

// tbody 
tbody = d3.select("tbody")

// loop
function displayData(tables) {
    tbody.text("")
    tables.forEach(function(ufos) {
        new_tr = tbody.append("tr")
        Object.entries(ufos).forEach(function([key, value]) {
            new_td = new_tr.append("td").text(value)
        })
    })
}

displayData(tableData)

// Submit button
var submit = d3.select("#submit");

submit.on("click", function() {
    console.log("hello3")

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Input element
    var dateInput = d3.select("#datetime");
    var stateInput = d3.select("#state");
    var countryInput = d3.select("#country");
    var shapeInput = d3.select("#shape");

    // Value property
    console.log(dateInput.property("value"));
    console.log(stateInput.property("value"));
    console.log(countryInput.property("value"));
    console.log(shapeInput.property("value"));

    // Filters

    var filtered = tableData.filter(ufos => {
        return (ufos.datetime === dateInput.property("value") || !dateInput.property("value")) &&
            (ufos.state === stateInput.property("value") || !stateInput.property("value")) &&
            (ufos.country === countryInput.property("value") || !countryInput.property("value")) &&
            (ufos.shape === shapeInput.property("value") || !shapeInput.property("value"))
    })

    displayData(filtered);
});

var filterInputs = d3.selectAll('.form-control');

// Clear input
function clearEntries() {
    filters = {};

    filterInputs._groups[0].forEach(entry => {
        if (entry.value != 0) {
            d3.select('#' + entry.id).node().value = "";
        }
    });
};

var clearButton = d3.select("#clear");

clearButton.on('click', function() {

    d3.event.preventDefault();
    clearEntries()
});