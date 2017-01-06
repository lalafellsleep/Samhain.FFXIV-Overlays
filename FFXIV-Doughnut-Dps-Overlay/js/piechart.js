(function ( $ ) {
 	
	var DonutPie = function($self, options) {
		this.$self = $self;
		this.settings = $.extend( $.fn.donutpie.defaults, options );
	};

	DonutPie.prototype.display = function() {
		
		var radius = this.settings.radius / 2;

		this.svg = d3.select(this.$self[0])
			.append("svg")
			.attr("width", radius * 2)
			.attr("height", radius * 2)
			.append("g");

		this.svg.append("g")
			.attr("class", "slices");
		
		this.pie = d3.layout.pie()
			.sort(null)
			.value(function(d){
				return d.hvalue;
			});

		this.arc = d3.svg.arc()
		  .outerRadius(radius * 0.98)
		  .innerRadius(radius * 0.8);

		this.outerArc = d3.svg.arc()
		  .innerRadius(radius * 0.6)
		  .outerRadius(radius * 0.4);

		this.svg.attr("transform", "translate(" + radius + "," + radius + ")");

		var tpClass = this.settings.tooltipClass;
		if (!$('body').hasClass( tpClass )) {
			$('.' + tpClass).remove();
			d3.select("body")
			    .append("div")
			    .attr('class', tpClass )
			    .style("position", "absolute")
			    .style("z-index", "100")
			    .style("visibility", "hidden")
			    .text("");
		}

	};

	DonutPie.prototype.update = function(data) {
		
		// check if all the items has colors.
		var colors = d3.scale.category20().range();
		for (var i = 0; i < data.length; i++) {
			if( data[i]['color'] == undefined ) 
				data[i]['color'] = colors[i];
		};

		var tooltip = this.settings.tooltip;
		var tpClass = "." + this.settings.tooltipClass;
		var arc = this.arc;
		var slice = this.svg.select(".slices").selectAll("path.slice")
		    .data(this.pie(data));

		slice.enter()
		    .insert("path")
		    .style("fill", function(d) { return d.data.color; })
		    .attr("title", function(d) { return d.data.name + " " + Math.round(d.value) + "% ( "+d.data.combat["encdps"]+" DPS)"; })
		    .attr("class", "slice")
		    .on("mouseover", function (d) {
	    	if (tooltip) {
		    	if (d.id != "none") {
			        $(tpClass).html( d.data.name + " " + Math.round(d.value) + "% ( "+d.data.combat["encdps"]+" DPS)" );
			        $(tpClass).css("visibility", "visible");
			    }
		    }
		})
		.on("mousemove", function(d){
			if (tooltip) {
		    	if (d.id != "none") {
		    		$(tpClass).css("top",(d3.event.pageY-10)+"px").css("left",(d3.event.pageX+10)+"px");
			    }
			}
	    })
		.on("mouseout", function () {
			if (tooltip) {		
		    	$(tpClass).html("");
		        $(tpClass).css("visibility", "hidden");
			}
		});

		slice   
		    .transition().duration(1000)
		 	.style("fill", function(d) { return d.data.color; })
		 	.attr("title", function(d) { return d.data.name + " " + Math.round(d.value) + "%"; })
		 	.attrTween("d", function(d) {
		      this._current = this._current || d;
		      var interpolate = d3.interpolate(this._current, d);
		      this._current = interpolate(0);
		      return function(t) {
		        return arc(interpolate(t));
		      };
		    });

		slice.exit()
		    .remove();

	};

	$.fn.donutpie = function(option) {
	  
	    var $this = $(this);
	    var $donutpie = $this.data("donutpie");

	    if(!$donutpie) {
			// init the object
			var options = typeof option == "object" && option;
			$donutpie   = new DonutPie($this, options);
			$this.data("donutpie", $donutpie);
	    }

    	if (typeof option === 'string' && $.fn.donutpie.methods[option]) {
    		$donutpie[option].apply($donutpie, Array.prototype.slice.call(arguments, 1));
    	} else if ( typeof option === 'object' || !option ) {
    		$donutpie.display.apply( $donutpie, option);
    	} else {
    		$.error( 'Method ' +  option + ' does not exist in DonutPie' );
    	}
	   
	};

	$.fn.donutpie.methods = {
		'display': 1, 
		'update': 1
	}

	$.fn.donutpie.defaults = {
	  radius: 200,
	  tooltip : true,
	  tooltipClass : "tooltip"
	};

}( jQuery ));