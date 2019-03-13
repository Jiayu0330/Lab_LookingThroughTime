var dataP = d3.json("gradeDataTime.json");

var drawGraph = function(data) //data is an object
{
  var screen = {
    width: 440, //ratio: width/height = 1.1
    height: 400 //always change height in updateGraph function as well
  }

  var margins = {
    left: 65, //space for y-axis
    top: 10, //space for stroke
    bottom: 40, //space for stroke
    right: 0 //space for legend
  } //always change margins in updateGraph as well

  var innerPadding = 32; //space between

  var width = screen.width - margins.left - margins.right;
  var height = screen.height - margins.top - margins.bottom;

  var barWidth = width/data.length;

  var xScale = d3.scaleLinear()
                 .domain([0, data.length]) //number of bars (students)
                 .range([margins.left, width]);

  var yScale = d3.scaleLinear()
                 .domain([0, 100])
                 .range([height, margins.top]);

  var colors = d3.scaleOrdinal(d3.schemeSet3);

  var svg = d3.select("svg")
              .attr("width", screen.width)
              .attr("height", screen.height)

  svg.selectAll("rect")
     .data(data)
     .enter()
     .append("rect")
     .attr("x", function(d,i) {return i * barWidth + margins.left;} )
     .attr("y", function(d) {return yScale(d.grade);} )
     .attr("width", barWidth - innerPadding)
     .attr("height", function(d) {return height - yScale(d.grade);} )
     .attr("fill", function(d) {return colors(d.name);} )
     .attr("stroke", "#563866")
     .attr("stroke-width", 2);

  //y-axis
  var yAxis = d3.axisLeft(yScale);

  svg.append("g")
     .classed("yAxis", true)
     .call(yAxis)
     .attr("transform", "translate("+ (margins.left - 32) +", 0)")
     .attr("color", "#563866")
     .style("font-size", "15")
     .style("font-weight", "bold");

  //legend
  var legend = svg.append("g")
                  .classed("legend",true)
                  .attr("transform","translate(0, "+ (height - 85) +")")

  var legendLines = legend.selectAll("g")
                          .data(data)
                          .enter()
                          .append("g")
                          .classed("legendLines",true)
                          .attr("transform",function(d,i) {return "translate("+ (i * barWidth) +", 0)"});

  /*legendLines.append("rect")
                .attr("cx",40)
                .attr("cy",height-250)
                .attr("r",7)
                .attr("fill",function(d) {return colors(d.name)})
                .attr("stroke","#1F3641")
                .attr("stroke-width",3);*/

  legendLines.append("text")
                .attr("x", 78)
                .attr("y", height - 245)
                .text(function(d) {return d.name;} )
                .attr("fill", "#563866")
                .style("font-size", "18")
                .style("font-style", "italic")
                .style("font-weight", "bold");


}

var updateGraph = function(data)
{
  var margins = {
    left: 65, //space for y-axis
    top: 10, //space for stroke
    bottom: 40, //space for stroke
    right: 0 //space for legend
  }

  var height = 400 - margins.top - margins.bottom

  var yScale = d3.scaleLinear()
                 .domain([0, 100])
                 .range([height, margins.top]);

  //only change y-position and height
  d3.select("svg")
    .selectAll("rect")
    .data(data)
    .attr("y", function(d) {return yScale(d.grade);} )
    .attr("height", function(d) {return height - yScale(d.grade);} )
    .transition(1000);

}

var updateDay = function(dayChange)
{
  var day = Number(document.getElementById("dayNumber").textContent); //get from the paragrph
  day = day + Number(dayChange);

  dataP.then(function(data)
  {
    updateGraph(data[day - 1].grades)
    console.log(day - 1);
  },
  function(err)
  {
    console.log(err);
  });

  document.getElementById("dayNumber").innerHTML = day; //update the paragrph
}

dataP.then(function(data)
{
  drawGraph(data[0].grades);
},
function(err)
{
  console.log(err);
});
