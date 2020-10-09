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
        stacked(fvalue);

    });
}

Info();

function pieCharts2(state) {
    let pieLoc = "../json/drug_data2.json"
    //let bubbleLoc = "https://cors-anywhere.herokuapp.com/https://calm-fortress-78674.herokuapp.com/api/v1.0/drugdata"

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
    let lineLoc = "../json/drug_unemployment2.json"
    //let bubbleLoc = "https://cors-anywhere.herokuapp.com/https://calm-fortress-78674.herokuapp.com/api/v1.0/drugvunemployment"

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
    let bubbleLoc = "../json/drug_data2.json"
    //let bubbleLoc = "https://cors-anywhere.herokuapp.com/https://calm-fortress-78674.herokuapp.com/api/v1.0/drugdata"

    d3.json(bubbleLoc).then((response) => {
        //console.log(response);

        var states = response;
        //console.log(states)
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
            //console.log(stateobj)
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

        let bubble2 = {
            x: yearArray,
            y: deathArray,
            mode: "markers",
            marker: {
                size: odherArray,
                sizeref: .5,
                colorscale: "Jet"
            }
        };

        let bubble3 = {
            x: yearArray,
            y: deathArray,
            mode: "markers",
            marker: {
                size: odcokeArray,
                sizeref: .5,
                colorscale: "Jet"
            }
        };

        let bubbleChart = [bubble1, bubble2, bubble3];
        var layoutBubble = {
            title: 'OD Deaths by Year verses % OD by Drug Type',
            showlegend: false,
            height: 600,
            width: 1000,
            xaxis: {
                dtick: 1
            }
        };

        Plotly.newPlot("bubblePlot",bubbleChart, layoutBubble)
        
    })
};

function stacked(state) {

    d3.csv("../csv Data/Stress_final.csv").then((response) => {
        //console.log(response)

        var states = response;
        //console.log(states)
        var resultsArray = states.filter(stateobj => stateobj.Region == state);


        var regionvalue = [];
        var drugvalue = [];
        var eatvalue = [];
        var nothingvalue = [];
        var othervalue = [];
        var friendsvalue = [];
        var workoutvalue = [];

        resultsArray.forEach(stateobj => {
            drugvalue.push(stateobj.Drugs_Drinking)
            eatvalue.push(stateobj.Eat)
            nothingvalue.push(stateobj.Nothing)
            othervalue.push(stateobj.Other)
            friendsvalue.push(stateobj.Talk_to_Friends)
            workoutvalue.push(stateobj.Work_out)
            regionvalue.push(stateobj.Region)
            //console.log(stateobj)
        })

        var trace1 = {
            x: regionvalue,
            y: drugvalue,
            name: 'Drugs & Drinking',
            type: 'bar'
          };
          
          var trace2 = {
            x: regionvalue,
            y: eatvalue,
            name: 'Eat',
            type: 'bar'
          };

          var trace3 = {
            x: regionvalue,
            y: nothingvalue,
            name: 'Do Nothing',
            type: 'bar'
          };

          var trace4 = {
            x: regionvalue,
            y: othervalue,
            name: 'Other',
            type: 'bar'
          };

          var trace5 = {
            x: regionvalue,
            y: friendsvalue,
            name: 'Friends',
            type: 'bar'
          };

          var trace6 = {
            x: regionvalue,
            y: workoutvalue,
            name: 'Work Out',
            type: 'bar'
          };


          
          var data = [trace1, trace2, trace3, trace4, trace5, trace6];
          
          var layout = {barmode: 'stack'};
          
          Plotly.newPlot('stacked', data, layout);


    })
};


//chart
function optionChanged(newstate) {
    pieCharts2(newstate);
    lineCharts2(newstate);
    bubbleCharts(newstate);
    stacked(newstate);
}