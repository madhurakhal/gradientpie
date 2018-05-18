	gobalData = data
			if(debug) console.log('knob data =', data)
			if(debug) data = [{label: "Asteroids@Home" , data: [0]}, {label: "Collatz Conjecture" , data: [0]}]

			// If we don’t have data for the graph, show a message indicating why this is the case
			if((data == undefined) || (data.length == 0)){
				$('#knobs-body').empty().append($('<p>').text(
						'There is too little data to project the projects’ payout ratio. '
						+ 'Do some research and check back later.'
					)
				)
				return
			} else {
				$('#knobs-body p').remove()
			}
      // Possible to break if number of projects is more than colors length should fixed it
			var colors = ['#3366CC', '#DC3912', '#FF9900', "#109618", "#990099", "#109118", "#880099", "#100610", "#990049" ]
			var knobs = $('#knobs');
			knobs.empty();
			var knobs_width = knobs.innerWidth() - 20; // subtracted padding
			var knobs_height = knobs_width < 350 ?  knobs_width * 0.6 : knobs_width * 0.4;
      var word = data.reduce(function(prev, next) { return prev.length >= next.label.length ? prev : next.label; }, '');
			var lineWidth = 10;
			var textWidth = getTextWidth(word, '10pt arial');
			var padding = 8
			var total = lineWidth + textWidth + padding;
			var radius = (knobs_height - 80) / 2;
			var halfWidth = knobs_width / 2;
      $('#knobs-body').css({'height': knobs_height + 'px'})
			var svg = d3.select("#knobs").append("svg").attr("width", knobs_width).attr("height", knobs_height);
			svg.append("g").attr("id","researchpie");

			var stupidData = true
			for(var i=0; i<data.length; i++)
				stupidData &= data[i].data[0] == 0

			// If we received stupidData, pretend that each project is contributes an equal share.
			if(stupidData)
				for(var i=0; i<data.length; i++)
					data[i].data = [1/data.length]

      // Preparing data for gradient Pie
			var data = data.map(function(d, i) {
        var col = null;
        try {
          col = colors[i];
        } catch(err) {
          if (debug) console.log('generation random color', err);
          col = getRandomColor();
        }
				return {
					label: d.label,
					color: col,
					value: d.data.pop()
				};
			});

			gradPie.draw("researchpie", data, knobs_width / 2 - total / 2, knobs_height / 2 ,  radius);
			var legend = svg.append("g")
				 .attr("class","legend")
				 .attr("transform","translate(" + -textWidth + ", 20)")
				 .style("font-size","12px")
				 .attr('height', 100)
				 .attr('width', 100)
			legend.selectAll('g').data(data)
						.enter()
						.append('g')
						.each(function(d, i) {
							var g = d3.select(this);
							g.append('rect')
								.attr('x', knobs_width - 20)
								.attr('y', i * 20)
								.attr('height', 10)
								.attr('width', 10)
								.style('fill', data[i]['color'])

							g.append('text')
								.attr('x', knobs_width - 5)
								.attr('y', i * 20 + 8)
								.style('fill', data[i]['color'])
								.text(data[i]['label'])
						});
