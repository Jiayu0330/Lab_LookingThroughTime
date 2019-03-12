var dataP = d3.json("gradeDataTime.json");

var drawGraph = function(data) //data is an object
{
  var svg = d3.select
}


var updateDay = function(dayChange)
{
  var day = document.getElementById("dayNumber").textContent;
  day = day + dayChange;

  dataP.then(function(data)
  {
    updateGraph(data[day - 1])
  })
}

dataP.then(function(data)
{
  drawGraph(data[0]);
},
function(err)
{
  console.log(err);
});
