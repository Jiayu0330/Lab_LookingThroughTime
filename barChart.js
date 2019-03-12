var dataP = d3.json("gradeDataTime.json");

var drawGraph = function(data) //data is an object
{
  var svg = d3.select
}

var updateDay = function(dayChange)
{
  var day = Number(document.getElementById("dayNumber").textContent); //get from the paragrph
  day = day + Number(dayChange);
  console.log(day);

  dataP.then(function(data)
  {
    updateGraph(data[day - 1])
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
