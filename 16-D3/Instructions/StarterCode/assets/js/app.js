function getScatter() {

    // Remove area and replace it with chart
    var scatterSvg = d3.select("#scatter").select("svg");

    // clear svg is not empty
    if (!scatterSvg.empty()) {
        scatterSvg.remove();
    }

    // SVG dimensions
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

    var margin = {
        top: 20,
        right: 40,
        bottom: 80,
        left: 100
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    // Create SVG on "scatter"
    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // chartGroup
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Initial Params
    var chosenXAxis = "poverty";
    var chosenYAxis = "healthcare";

    // Update scales
    function xScale(demographicData, chosenXAxis) {
        var xLinearScale = d3.scaleLinear()
            .domain([d3.min(demographicData, d => d[chosenXAxis]) * 0.8,
                d3.max(demographicData, d => d[chosenXAxis]) * 1.2
            ])
            .range([0, width]);

        return xLinearScale;
    }

    function yScale(demographicData, chosenYAxis) {
        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(demographicData, d => d[chosenYAxis])])
            .range([height, 0]);

        return yLinearScale;
    }

    // Update Axis
    function renderXAxis(newXScale, xAxis) {
        var bottomAxis = d3.axisBottom(newXScale);

        xAxis.transition()
            .duration(1500)
            .call(bottomAxis);

        return xAxis;
    }

    function renderYAxis(newYScale, yAxis) {
        var leftAxis = d3.axisLeft(newYScale);

        yAxis.transition()
            .duration(1500)
            .call(leftAxis);

        return yAxis;
    }

    // Update Circles
    function renderXCircles(circlesGroup, newXScale, chosenXAxis) {

        circlesGroup.transition()
            .duration(3000)
            .attr("cx", d => newXScale(d[chosenXAxis]))

        return circlesGroup;
    }

    function renderYCircles(circlesGroup, newYScale, chosenYAxis) {

        circlesGroup.transition()
            .duration(3000)
            .attr("cy", d => newYScale(d[chosenYAxis]));

        return circlesGroup;
    }

    // Text
    function renderXText(textGroup, newXScale, chosenXAxis) {

        textGroup.transition()
            .duration(3000)
            .attr("dx", d => newXScale(d[chosenXAxis]))

        return textGroup;
    }

    function renderYText(textGroup, newYScale, chosenYAxis) {

        textGroup.transition()
            .duration(3000)
            .attr("dy", d => newYScale(d[chosenYAxis]))

        return textGroup;
    }

    // Update tooltip
    function updateToolTipForCircles(chosenXAxis, chosenYAxis, circlesGroup) {

        var xlabel;
        if (chosenXAxis === "poverty") {
            xlabel = "In Poverty %";
        } else if (chosenXAxis === "age") {
            xlabel = "Age (Median)";
        } else {
            xlabel = "Household Income (Median)";
        }

        var ylabel;
        if (chosenYAxis === "healthcare") {
            ylabel = "Lacks Healthcare %";
        } else if (chosenYAxis === "obesity") {
            ylabel = "Obesity %";
        } else {
            ylabel = "Smokes %";
        }

        var toolTip = d3.tip()
            .attr("class", "d3-tip")
            .attr("font-size", "12px")
            .html(function(d) {
                return (`<h5>${d.state}</h5><hr> ${xlabel}: ${d[chosenXAxis]} <br><br> ${ylabel}: ${d[chosenYAxis]}`);
            });

        circlesGroup.call(toolTip);

        circlesGroup.on("mouseover", function(data) {
            toolTip.show(data, this);
            toolTip.style("top", (d3.mouse(this)[1]) + 120 + "px")
                .style("left", (d3.mouse(this)[0]) + 120 + "px")

            d3.select(this)
                .transition()
                .duration(500)
                .attr("fill", "#237EBB")
                .attr("r", "30");
        })

        .on("mouseout", function(data, index) {
            toolTip.hide(data);

            d3.select(this)
                .transition()
                .duration(500)
                .attr("fill", "#004385")
                .attr("r", "15");
        });

        return circlesGroup;
    }

    // function used for updating text group with new tooltip
    function toolTipText(chosenXAxis, chosenYAxis, textGroup) {

        var xlabel;
        if (chosenXAxis === "poverty") {
            xlabel = "In Poverty %";
        } else if (chosenXAxis === "age") {
            xlabel = "Age (Median)";
        } else {
            xlabel = "Household Income (Median)";
        }

        var ylabel;
        if (chosenYAxis === "healthcare") {
            ylabel = "Lacks Healthcare %";
        } else if (chosenYAxis === "obesity") {
            ylabel = "Obesity %";
        } else {
            ylabel = "Smokes %";
        }

        var toolTip = d3.tip()
            .attr("class", "d3-tip")
            .attr("font-size", "12px")
            .html(function(d) {
                return (`<h5>${d.state}</h5><hr> ${xlabel}: ${d[chosenXAxis]} <br><br> ${ylabel}: ${d[chosenYAxis]}`);
            });

        textGroup.call(toolTip);

        textGroup.on("mouseover", function(data) {
                toolTip.show(data, this);
                toolTip.style("top", (d3.mouse(this)[1]) + 120 + "px")
                    .style("left", (d3.mouse(this)[0]) + 120 + "px")

                d3.select(this)
                    .attr("cursor", "default");

                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("fill", "black")
                    .attr("font-size", "12px");
            })
            // onmouseout event
            .on("mouseout", function(data, index) {
                toolTip.hide(data);

                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("fill", "#fff")
                    .attr("font-size", "12px");
            });

        return textGroup;
    }

    // Get CSV file 
    d3.csv("assets/data/data.csv").then(function(demographicData, err) {
        if (err) throw err;

        // Parse data
        demographicData.forEach(function(data) {
            data.poverty = +data.poverty;
            data.age = +data.age;
            data.income = +data.income;
            data.healthcare = +data.healthcare;
            data.obesity = +data.obesity;
            data.smokes = +data.smokes;
        });

        // xLinearScale 
        var xLinearScale = xScale(demographicData, chosenXAxis);

        // yLinearScale
        var yLinearScale = yScale(demographicData, chosenYAxis);

        // Axis
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // Append "g" & "circle"
        var xAxis = chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);


        var yAxis = chartGroup.append("g")
            .call(leftAxis);


        var overallPoints = chartGroup.selectAll("circle")
            .data(demographicData)
            .enter();

        var circlesGroup = overallPoints
            .append("circle")
            .attr("r", "20")
            .attr("fill", "#004385")
            .attr("stroke-width", "3")
            .attr("stroke", "#e95420")
            .attr("opacity", ".8");

        //fly in
        circlesGroup
            .transition()
            .duration(2000)
            .attr("cx", d => xLinearScale(d[chosenXAxis]))
            .attr("cy", d => yLinearScale(d[chosenYAxis]));

        // Abbreviation on circles
        var textGroup = overallPoints
            .append("text")
            .text(function(d) {
                return d.abbr;
            })
            .attr("dx", function(d) {
                return xLinearScale(d[chosenXAxis]);
            })
            .attr("dy", function(d) {
                return yLinearScale(d[chosenYAxis])
            })
            .attr("font-size", "12px")
            .attr("fill", "#e95420")
            .attr("class", "stateText");

        // X Axis labels
        var xlabelsGroup = chartGroup.append("g")
            .attr("transform", `translate(${width / 2}, ${height + 20})`);

        var povertyLabel = xlabelsGroup.append("text")
            .attr("x", 0)
            .attr("y", 20)
            .attr("value", "poverty")
            .attr("class", "aText")
            .classed("active", true)
            .text("In Poverty (%)");

        var ageLabel = xlabelsGroup.append("text")
            .attr("x", 0)
            .attr("y", 40)
            .attr("value", "age")
            .attr("class", "aText")
            .classed("inactive", true)
            .text("Age (Median)");

        var incomeLabel = xlabelsGroup.append("text")
            .attr("x", 0)
            .attr("y", 60)
            .attr("value", "income")
            .attr("class", "aText")
            .classed("inactive", true)
            .text("Household Income (Median)");

        // Y Axis labels
        var ylabelsGroup = chartGroup.append("g")
            .attr("transform", "rotate(-90)");

        var healthcareLabel = ylabelsGroup.append("text")
            .attr("y", 20 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("value", "healthcare")
            .attr("class", "aText")
            .classed("active", true)
            .text("Lacks Healthcare (%)");

        var obesityLabel = ylabelsGroup.append("text")
            .attr("y", 40 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("value", "obesity")
            .attr("class", "aText")
            .classed("inactive", true)
            .text("Obesity %");

        var smokesLabel = ylabelsGroup.append("text")
            .attr("y", 60 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("value", "smokes")
            .attr("class", "aText")
            .classed("inactive", true)
            .text("Smokes %");

        // Get ToolTip
        circlesGroup = updateToolTipForCircles(chosenXAxis, chosenYAxis, circlesGroup);
        textGroup = toolTipText(chosenXAxis, chosenYAxis, textGroup);

        // X axis labels event listener
        xlabelsGroup.selectAll("text")
            .on("click", function() {
                var value = d3.select(this).attr("value");
                if (value !== chosenXAxis) {

                    chosenXAxis = value;

                    // updates x scale for new data
                    xLinearScale = xScale(demographicData, chosenXAxis);

                    // updates x axis with transition
                    xAxis = renderXAxis(xLinearScale, xAxis);

                    // updates circles with new x values
                    circlesGroup = renderXCircles(circlesGroup, xLinearScale, chosenXAxis);

                    //update circle text
                    textGroup = renderXText(textGroup, xLinearScale, chosenXAxis);

                    // updates tooltips with new info
                    circlesGroup = updateToolTipForCircles(chosenXAxis, chosenYAxis, circlesGroup);
                    textGroup = toolTipText(chosenXAxis, chosenYAxis, textGroup);

                    // changes classes to change bold text
                    if (chosenXAxis === "age") {
                        ageLabel
                            .classed("active", true)
                            .classed("inactive", false);
                        povertyLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        incomeLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    } else if (chosenXAxis === "poverty") {
                        ageLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        povertyLabel
                            .classed("active", true)
                            .classed("inactive", false);
                        incomeLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    } else {
                        ageLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        povertyLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        incomeLabel
                            .classed("active", true)
                            .classed("inactive", false);
                    }
                }
            });
        // Y axis labels event listener
        ylabelsGroup.selectAll("text")
            .on("click", function() {
                // get value of selection
                var value = d3.select(this).attr("value");
                if (value !== chosenYAxis) {

                    // replaces chosenXAxis with value
                    chosenYAxis = value;

                    // updates x scale for new data
                    yLinearScale = yScale(demographicData, chosenYAxis);

                    // updates x axis with transition
                    yAxis = renderYAxis(yLinearScale, yAxis);

                    // updates circles with new x values
                    circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);

                    //update circle text
                    textGroup = renderYText(textGroup, yLinearScale, chosenYAxis);

                    // updates tooltips with new info
                    circlesGroup = updateToolTipForCircles(chosenXAxis, chosenYAxis, circlesGroup);
                    textGroup = toolTipText(chosenXAxis, chosenYAxis, textGroup);

                    // changes classes to change bold text
                    if (chosenYAxis === "healthcare") {
                        healthcareLabel
                            .classed("active", true)
                            .classed("inactive", false);
                        obesityLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        smokesLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    } else if (chosenYAxis === "obesity") {
                        healthcareLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        obesityLabel
                            .classed("active", true)
                            .classed("inactive", false);
                        smokesLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    } else {
                        healthcareLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        obesityLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        smokesLabel
                            .classed("active", true)
                            .classed("inactive", false);
                    }
                }
            });
    }).catch(function(error) {
        console.log(error);
    });
}

getScatter();

d3.select(window).on("resize", getScatter);