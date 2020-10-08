
function bubbleCharts() {
    let bubbleLoc = "https://cors-anywhere.herokuapp.com/https://calm-fortress-78674.herokuapp.com/api/v1.0/drugdata"
    //let bubbleLoc = "/api/v1.0/drugdata"

    d3.json(bubbleLoc).then(function(response){
        //console.log(response);

        var states = response.state;
        var totod = response.OD_sum;
        var years = response.year;

        let bubble = {
            x: states,
            y: years,
            mode: "markers",
            marker: {
                size: totod,
                sizeref: 8,
                colorscale: "Jet"
            }
        };

        let bubbleChart = [bubble];
        var layoutBubble = {
            height: 600,
            width: 1000,
        };

        Plotly.newPlot("bubblePlot",bubbleChart, layoutBubble)
        
    })
};


bubbleCharts();



pieCharts();

function pieCharts() {
    let bubbleLoc = "https://cors-anywhere.herokuapp.com/https://calm-fortress-78674.herokuapp.com/api/v1.0/drugdata"
    //let bubbleLoc = "/api/v1.0/drugdata"

    d3.json(bubbleLoc).then(function(response){
        //console.log(response);

        var test = [5,9,10]
        
        let pie = {
            values: test,
            labels: ['Five', 'Nine', 'Ten'],
            type: 'pie',
            
        };

        let pieChart = [pie];
        var layoutpie = {
            height: 400,
            width: 400,
        };

        Plotly.newPlot("piePlot",pieChart, layoutpie)
        
    })
};


pieCharts2();
function pieCharts2() {
    let pieLoc = "https://cors-anywhere.herokuapp.com/https://calm-fortress-78674.herokuapp.com/api/v1.0/drugdata"
    //let bubbleLoc = "/api/v1.0/drugdata"

    d3.json(pieLoc).then((response) => {
        console.log(response);
        var states = response.state;

        var resultsArray = states.filter(stateobj => stateobj.state == "Alaska");
        var results =resultsArray[0];
        var values = [results.coke_od, results.her_od, results.opi_od];
        
        
        let pie = {
            values: values,
            labels: ['Cocain OD', 'Herion OD', 'Non-Herion Opiod OD'],
            type: 'pie' 
            
        };

        let pieChart = [pie];
        var layoutpie = {
            height: 600,
            width: 600,
        };

        Plotly.newPlot("piePlot2",pieChart, layoutpie)
        
    })
}

lineCharts();

function lineCharts() {
    let lineLoc = "https://cors-anywhere.herokuapp.com/https://calm-fortress-78674.herokuapp.com/api/v1.0/drugvunemployment"
    //let bubbleLoc = "/api/v1.0/drugdata"

    d3.json(lineLoc).then(function(response){
        //console.log(response);

        var trace1 = {
            x: [1, 2, 3,4],
            y: [10, 15, 13, 17],
            type: 'scatter'
        };

        var trace2 = {
            x: [1, 2, 3,4],
            y: [16, 5, 11, 9],
            type: 'scatter'
        };

        var data = [trace1, trace2];

        Plotly.newPlot("linePlot", data)
        
    })
};

lineCharts2();

function lineCharts2() {
    let lineLoc = "https://cors-anywhere.herokuapp.com/https://calm-fortress-78674.herokuapp.com/api/v1.0/drugvunemployment"
    //let bubbleLoc = "/api/v1.0/drugdata"

    d3.json(lineLoc).then(function(response){
        console.log(response);

        var states = response.state;

        var resultsArray = states.filter(stateobj => stateobj.state == "Alaska");
        var results =resultsArray[0];
        var years = results.year;
        var unemp = results.unemployment_rate;
        var odrate = results.OD_perctage;

        var Unemployeement = {
            x: [years],
            y: [unemp],
            type: 'scatter'
        };

        var ODRate = {
            x: [years],
            y: [odrate],
            type: 'scatter'
        };

        var data = [Unemployeement, ODRate];

        Plotly.newPlot("linePlot2", data)
        
    })
};

function Info() {
    //select drop down information
    var selector = d3.select("#selDataset");
    // pull sample numbers from json
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;
        //populate drop down items
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        // set first number in sample as starter
        var fvalue = sampleNames[0];
        Charts(fvalue);
        Data(fvalue);

    });
}
