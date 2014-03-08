function HexNode() {
	this.node = $("<div><div class='hexagon'></div></div>");
};

HexNode.prototype.sides =
	["top-left", "top-right", "right", "bottom-right", "bottom-left", "left"];

HexNode.prototype.open = function(side, row) {
	var c = row? row + "-" : "";
	c += side;

	if(this.sides.indexOf(c) > -1) {
		this.node.addClass(c);
		return true;
	}
	return false;
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

HexGrid.prototype.find = function(x, y) {
	return this.hrows[y].nodes[x];
};
