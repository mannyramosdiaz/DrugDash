

function Info() {
    //select drop down information
    var selector = d3.select("#selDataset");
    
    d3.csv("../csv Data/states.csv").then((data) => {

        //console.log(data)

        var stateNames = data;

        stateNames.forEach((state) => {
            console.log(state.state)
            selector
            .append("option")
            .text(state.state)
            .property("value", state.state);
        });

        var fvalue = stateNames[0];

        pieCharts2(fvalue);
        lineCharts2(fvalue);

    });
}

Info();

function pieCharts2(state) {
    let pieLoc = "https://cors-anywhere.herokuapp.com/https://calm-fortress-78674.herokuapp.com/api/v1.0/drugdata"
    //let bubbleLoc = "/api/v1.0/drugdata"

    d3.json(pieLoc).then((response) => {
        console.log(JSON.stringify(response));
        var states = response;

        var resultsArray = states.filter(stateobj => stateobj.state == state && stateobj.year == 2018);
        if (resultsArray.length > 0) {
            var result =resultsArray[0];
            console.log(result)
            console.log(JSON.stringify(result));
            var values = [result.coke_od, result.her_od, result.opi_od];
            
            
            let pie = {
                values: values,
                labels: ['Cocain OD', 'Heroin OD', 'Non-Heroin Opiod OD'],
                type: 'pie' 
            };
    
            let pieChart = [pie];
            var layoutpie = {
                height: 400,
                width: 400
            };
    
            Plotly.newPlot("piePlot",pieChart, layoutpie)
            }
        else { 

        }

        
    })
}

function lineCharts2(state) {
    let lineLoc = "https://cors-anywhere.herokuapp.com/https://calm-fortress-78674.herokuapp.com/api/v1.0/drugvunemployment"
    //let bubbleLoc = "/api/v1.0/drugdata"

    d3.json(lineLoc).then((response) => {
        console.log(response);

        var states = response;

        var resultsArray = states.filter(stateobj => stateobj.state == state);
        resultsArray.sort((state1, state2) => state1.year - state2.year)

        

        
        var yearArray = [];
        var unempArray = [];
        var odrateArray = [];

        resultsArray.forEach(stateobj => {
            yearArray.push(stateobj.year)
            unempArray.push(stateobj.unemployment_rate)
            odrateArray.push(stateobj.OD_perctage)
        })

        var Unemployeement = {
            x: yearArray,
            y: unempArray,
            type: 'scatter',
            name: 'Unemployment Rate'
        };

        var ODRate = {
            x: yearArray,
            y: odrateArray,
            type: 'scatter',
            name: 'OD Rate % to total Deaths'
        };

        var layout = {
            title: "Unemployment vs OD Rate"
        }

        var data = [Unemployeement, ODRate];
        console.log(JSON.stringify(data,null,2))
        Plotly.newPlot("linePlot", data, layout)
        
    })
}

function bubbleCharts() {
    let bubbleLoc = "https://cors-anywhere.herokuapp.com/https://calm-fortress-78674.herokuapp.com/api/v1.0/drugdata"
    //let bubbleLoc = "/api/v1.0/drugdata"

    d3.json(bubbleLoc).then((response) => {
        //console.log(response);

        var states = response;

        var resultsArray = states.filter(stateobj => stateobj.state == state);
        resultsArray.sort((state1, state2) => state1.year - state2.year)

        
        var yearArray = [];
        var unempArray = [];
        var odrateArray = [];

        resultsArray.forEach(stateobj => {
            yearArray.push(stateobj.year)
            unempArray.push(stateobj.unemployment_rate)
            odrateArray.push(stateobj.OD_perctage)
        })

        let bubble = {
            x: ["Alabama", "California", "Arizona", "Virginia"],
            y: yearArray,
            mode: "markers",
            marker: {
                size: [5,6,7,8,9],
                sizeref: 0.25,
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


function optionChanged(newstate) {
    pieCharts2(newstate);
    lineCharts2(newstate);
}