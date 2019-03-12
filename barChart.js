var dataP = d3.json("gradeDataTime.json");

var drawGraph = function(data) //data is an object
{
  
}

dataP.then(function(data)
{
  drawGraph(data[0]);
},
function(err)
{
  console.log(err);
});
