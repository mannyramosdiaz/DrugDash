

function Info() {
    //select drop down information
    var selector = d3.select("#selDataset");
    
    d3.csv("../csv Data/states.csv").then((data) => {

        //console.log(data)

        var stateNames = data;

        stateNames.forEach((state) => {
            //console.log(state.state)
            selector
            .append("option")
            .text(state.state)
            .property("value", state.state);
        });

        var fvalue = stateNames[0];

        pieCharts2(fvalue);
        lineCharts2(fvalue);
        bubbleCharts(fvalue);

    });
}

Info();

function pieCharts2(state) {
    let pieLoc = "https://cors-anywhere.herokuapp.com/https://calm-fortress-78674.herokuapp.com/api/v1.0/drugdata"
    //let bubbleLoc = "/api/v1.0/drugdata"

    d3.json(pieLoc).then((response) => {
        //console.log(JSON.stringify(response));
        var states = response;

        var resultsArray = states.filter(stateobj => stateobj.state == state && stateobj.year == 2018);
        if (resultsArray.length > 0) {
            var result =resultsArray[0];
            //console.log(result)
            //console.log(JSON.stringify(result));
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
        //console.log(JSON.stringify(data,null,2))
        Plotly.newPlot("linePlot", data, layout)
        
    })
}

function bubbleCharts(state) {
    let bubbleLoc = "https://cors-anywhere.herokuapp.com/https://calm-fortress-78674.herokuapp.com/api/v1.0/drugdata"
    //let bubbleLoc = "/api/v1.0/drugdata"

    d3.json(bubbleLoc).then((response) => {
        //console.log(response);

        var states = response;
        console.log(states)
        var resultsArray = states.filter(stateobj => stateobj.state == state);
        resultsArray.sort((state1, state2) => state1.year - state2.year)

        
        var yearArray = [];
        var drugArray = ['Cocain', 'Heroin', 'Non-Heroin Opioid'];
        var odcokeArray = [];
        var odherArray = [];
        var odopiArray = [];
        var deathArray = [];

        resultsArray.forEach(stateobj => {
            yearArray.push(stateobj.year)
            odcokeArray.push(stateobj.coke_per)
            odherArray.push(stateobj.her_per)
            odopiArray.push(stateobj.opi_per)
            deathArray.push(stateobj.opi_od)
            console.log(stateobj)
        })

        let bubble1 = {
            x: yearArray,
            y: deathArray,
            mode: "markers",
            marker: {
                size: odopiArray,
                sizeref: .5,
                colorscale: "Jet"
            }
        };



        let bubbleChart = [bubble1];
        var layoutBubble = {
            height: 600,
            width: 1000
        };

        Plotly.newPlot("bubblePlot",bubbleChart, layoutBubble)
        
    })
};

//chart
function optionChanged(newstate) {
    pieCharts2(newstate);
    lineCharts2(newstate);
    bubbleCharts(newstate);
}