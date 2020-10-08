
function bubbleCharts() {
    let bubbleLoc = "../Static/drug_data2.json"
    //let bubbleLoc = "/api/v1.0/drugdata"

    d3.json(bubbleLoc).then(function(response){
        console.log(response);
//need to fix this to get the data correct to show 
        let bubble = {
            x: response.state,
            y: response.coke_od,
            mode: "markers",
            text: response.state,
            marker: {
                color: response.coke_od,
                size: response.her_od,
                sizeref: 8,
                sizemode: "area",
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
}


bubbleCharts();