var tableData = data;

$(document).ready(function() {
    // Load
    StateFilter();
    CountryFilter();
    ShapeFilter();
    buildTable();

    //Event Listeners
    $('#filter-btn').on("click", function(event) {
        event.preventDefault();
        buildTable();
    });
    $('#form').on("submit", function(event) {
        event.preventDefault();
        buildTable();
    });
    $('#stateFilter, #countryFilter, #shapeFilter').on("change", function(event) {
        event.preventDefault();
        buildTable();
    });
});

// Filters
function StateFilter() {
    var states = [...new Set(tableData.map(x => x.state))];
    states.sort();

    states.forEach(function(state) {
        let idunno = `<option>${state}</option>`
        $('#stateFilter').append(idunno);
    });
}

function CountryFilter() {
    var countries = [...new Set(tableData.map(x => x.country))];
    countries.sort();

    countries.forEach(function(country) {
        let idunno = `<option>${country}</option>`
        $('#countryFilter').append(idunno);
    });
}

function ShapeFilter() {
    var shapes = [...new Set(tableData.map(x => x.shape))];
    shapes.sort();

    shapes.forEach(function(shape) {
        let idunno = `<option>${shape}</option>`
        $('#shapeFilter').append(idunno);
    });
}

// Table
function buildTable() {

    var inputValue = $('#datetime').val();
    var stateFilter = $('#stateFilter').val();
    var countryFilter = $('#countryFilter').val();
    var shapeFilter = $('#shapeFilter').val();

    var sub_data = tableData;
    if (inputValue !== "") {
        sub_data = tableData.filter(x => x.datetime === inputValue);
    }
    if (stateFilter != "All") {
        sub_data = sub_data.filter(x => x.state === stateFilter);
    }
    if (countryFilter != "All") {
        sub_data = sub_data.filter(x => x.country === countryFilter);
    }
    if (shapeFilter != "All") {
        sub_data = sub_data.filter(x => x.shape === shapeFilter);
    }

    // Clear
    $('#ufo-table').DataTable().clear().destroy();
    $('#ufo-table tbody').empty();
    sub_data.forEach(function(thing) {
        let row = "<tr>"
        Object.entries(thing).forEach(function([key, value]) {
            row += `<td>${value}</td>`;
        });
        row += "</tr>";
        $('#ufo-table tbody').append(row);
    });
}