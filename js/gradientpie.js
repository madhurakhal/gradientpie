/**
 * Orginal source code
 * http://bl.ocks.org/NPashaP/9999786
 * author: Madhu Rakhal Magar
 * rakhal.madhu@gmail.com
 * MIT License
 */
!function(){
	var gradPie={};
	var pie = d3.layout.pie().sort(null).value(function(d) {return d.value;});

	createGradients = function(defs, colors, r){
		var gradient = defs.selectAll('.gradient')
			.data(colors).enter().append("radialGradient")
			.attr("id", function(d,i){return "gradient" + i;})
			.attr("gradientUnits", "userSpaceOnUse")
			.attr("cx", "0").attr("cy", "0").attr("r", r).attr("spreadMethod", "pad");

		gradient.append("stop").attr("offset", "0%").attr("stop-color", function(d){ return d;});

		gradient.append("stop").attr("offset", "30%")
			.attr("stop-color",function(d){ return d;})
			.attr("stop-opacity", 1);

		gradient.append("stop").attr("offset", "70%")
			.attr("stop-color",function(d){ return "black";})
			.attr("stop-opacity", 1);
	}

	gradPie.draw = function(id, data, cx, cy, r){
		var total = data.map(function(d) {return d.value }).reduce(function(prev, next) { return prev + next }, 0);

		var gPie = d3.select("#"+id).append("g")
			.attr("transform", "translate(" + cx + "," + cy + ")");

		createGradients(gPie.append("defs"), data.map(function(d){ return d.color; }), 2.5*r);

		gPie.selectAll("path").data(pie(data))
			.enter()
			.append("g")
			.append("path").attr("fill", function(d,i){ return "url(#gradient"+ i+")";})
			.attr("d", d3.svg.arc().outerRadius(r))
			.each(function(d) {
				this._current = d;
			})
			.on("mouseover", function() {
					var target = d3.select(this);
					var d = target.datum();
					var dgre = (d.endAngle-d.startAngle) / 2 + d.startAngle;
					var dis = 5;
					var x = d3.round(Math.sin(dgre),15) * dis;
					var y = -d3.round(Math.cos(dgre),15) * dis;

					target
						.transition()
						.duration(500)
						.attr("transform", "translate("+(x)+", "+(y)+")")
						.ease("bounce");
			  }).on("mouseout", function() {
			     d3.select(this)
			     .transition()
			        .duration(400)
			        .attr("transform", "translate("+(0)+", "+(0)+")") ;
			  });

			gPie.selectAll('g')
				.append("text")
				.text(function(d) {
					var val = d.value / total;
					return Math.floor(val * 100) + '%';
				})
				.attr('transform', function(d) {
					var ang = (d.endAngle  + d.startAngle) / 2;
					var dis = 40 + r;
					var x = d3.round(Math.sin(ang),15) * dis;
					var y = -d3.round(Math.cos(ang),15) * dis;
					return 'translate(' +  x + ',' +  y  + ')'
				})
			gPie.selectAll('g')
				.append('line')
				.attr('stroke', function(d) {
					return d.data.color;
				})
				.attr('stroke-width', 1)
				.attr('x1', function(d) {
					var ang = (d.endAngle  + d.startAngle) / 2;
					var dis = r;
					var x = d3.round(Math.sin(ang),15) * dis;
					return x;
				})
				.attr('y1', function(d) {
					var ang = (d.endAngle  + d.startAngle) / 2;
					var dis = r;
					var y = -d3.round(Math.cos(ang),15) * dis;
					return y;
				})
				.attr('x2', function(d) {
					var ang = (d.endAngle  + d.startAngle) / 2;
					var dis = r + 30;
					var x = d3.round(Math.sin(ang),15) * dis;
					return x;
				})
				.attr('y2', function(d) {
					var ang = (d.endAngle  + d.startAngle) / 2;
					var dis = r + 30;
					var y = -d3.round(Math.cos(ang),15) * dis;
					return y;
				})
	}
	this.gradPie = gradPie;
}();
