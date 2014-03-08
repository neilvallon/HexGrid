function HexNode() {
	this.node = $("<div><div class='hexagon'></div></div>");
};

function HexRow(n) {
	this.nodes = [];
	for(var i=0; i<n; i++) {
		this.nodes.push(new HexNode);
	}

	this.html = $("<div class='hexrow'></div>")
		.append(this.nodes.map(function(n) { return n.node; }));
};

function HexGrid(x, y) {
	y = y || x;

	this.hrows = [];
	for(var i=0; i<y; i++) {
		this.hrows.push(new HexRow(x));
	}

	this.html = this.hrows.map(function(r) { return r.html; });
};

$(function(){
	$(".hexMaze").each(function() {
		var g = new HexGrid(25);
		$(this).html(g.html);
	});
});
