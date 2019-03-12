var dataP = d3.json("gradeDataTime.json");

var drawGraph = function(data) //data is an object
{
  var width = 400;
  var height = 300;
  var barWidth = width/data.grades.length;

  var svg = d3.select("svg")
              .attr("width", width)
              .attr("height", height)

  svg.selectAll("rect")
     .data(data.grades)
     .enter()
     .append("rect")
     .attr("x", function(d,i) {return i * barWidth;} )
     .attr("y", function(d) {return height - d.grade*3;} )
     .attr("width", barWidth)
     .attr("height", function(d) {return d.grade*3;} )
     .attr("fill", "black")
     .attr("stroke", "white")
     .attr("stroke-width", 2);
}

var updateGraph = function(data)
{
  var width = 400;
  var height = 300;
  var barWidth = width/data.grades.length

  d3.select("svg")
    .selectAll("rec")
    .data(data.grades)
    .attr("x", function(d,i) {return i * barWidth;} )
    .attr("y", function(d) {return height - d.grade*3;} )
    .attr("width", barWidth)
    .attr("height", function(d) {return d.grade*3;} );

}


var updateDay = function(dayChange)
{
  var day = Number(document.getElementById("dayNumber").textContent); //get from the paragrph
  day = day + Number(dayChange);

  dataP.then(function(data)
  {
    updateGraph(data[day - 1])
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
  drawGraph(data[0]);
},
function(err)
{
  console.log(err);
});
