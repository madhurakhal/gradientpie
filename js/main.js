var salesData=[
	{label:"Basic", color:"#3366CC"},
	{label:"Plus", color:"#DC3912"},
	{label:"Lite", color:"#FF9900"},
	{label:"Elite", color:"#109618"},
	{label:"Delux", color:"#990099"}
];

var svg = d3.select("body").append("svg").attr("width", 700).attr("height", 400);

svg.append("g").attr("id","salespie");

gradPie.draw("salespie", randomData(), 200, 200, 160);

function changeData(){
	gradPie.transition("salespie", randomData(), 160);
}

function randomData(){
	return salesData.map(function(d){
		return {label:d.label, value:1000*Math.random(), color:d.color};});
}