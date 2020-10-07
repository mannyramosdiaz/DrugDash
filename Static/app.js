
// test APIs and confirm data
url = "https://cors-anywhere.herokuapp.com/https://calm-fortress-78674.herokuapp.com/api/v1.0/drugvunemployment"

d3.json(url).then((data) => {
    console.log(data)
});
// test APIs and confirm data
url2 = "https://cors-anywhere.herokuapp.com/https://calm-fortress-78674.herokuapp.com/api/v1.0/drugdata"

d3.json(url2).then((data2) => {
 
    console.log(data2)
});



function Data(state) {
    
    d3.json(url).then((data) => {
        //console.log(data) check data

        // set variables & filter data to state selection
        var states = data.state;
        var resultArray = data.filter(sampobj => sampobj.state == state);
        var result = resultArray[0];
        var CHART = d3.select("#sample-metadata");
        
        
    });
}
// Line chart
function Charts(state){
    d3.json(url).then((data) => {
        var states = data.state;
        var resultArray = states.filter(sampObj => sampObj.id == state);
        var result = resultArray[0];
        var years = result.year;
        var od_percent = result.OD_perctage;
        var un_percent = result.unemployment_rate;

        var yvalues1 = od_percent;
        var yvalues2 = un_percent;
        //set line data
        var lineData = [
            {
                y: yvalues1, yvalues2,
                x: years,
                type: "line",
                
            }
        ];
        // set line format
        var lineLayout = {
            title: "OD Rates vs Unemployment Rate",
            margin: { t:30, 1:159}
        };
        // line chart
        Plotly.newPlot("line", lineData, lineLayout);
    });
    //pie chart of % types of OD in the state selected
    d3.json(url2).then((data2) => {
        var states = data2.state;
        var resultArray = states.filter(sampObj => sampObj.id == state);
        var result = resultArray[0];
        var coke_percent = result.coke_per;
        var her_percent = result.her_per;
        var opi_percent = result.opi_per;

        var piedata = [{
            values: [coke_percent, her_percent, opi_percent],
            labels: ['Cocain OD', 'Herion OD', 'Non-herion Opiant'],
            type: 'pie'
          }];
          
          var pielayout = {
            height: 400,
            width: 500
          };
          
          Plotly.newPlot('myDiv', piedata, pielayout);

});

function Info() {
    //select drop down information
    var selector = d3.select("#selDataset");
    // pull sample numbers from json
    d3.json(url).then((data) => {
        var states = data.state;
        //populate drop down items
        states.forEach((state) => {
            selector
                .append("option")
                .text(state)
                .property("value", state);
        });
        // set first number in sample as starter
        var fvalue = states[0];
        Charts(fvalue);
        Data(fvalue);

    });
}


function optionChanged(newstate) {
    Charts(newstate);
    Data(newstate);
}

Info();