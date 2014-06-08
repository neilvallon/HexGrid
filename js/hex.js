/*!
 * Copyright (c) 2014 Neil Vallon (http://neil.vallon.me)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

function HexNode(x, y, row, grid) {
	this.row = row;
	this.grid = grid;

	this.node = $("<div><div class='hexagon'></div></div>");

	this.sides = {
		"top-left": {"x":x-(!row.even), "y":y-1},
		"top-right": {"x":x+row.even, "y":y-1},
		"right": {"x":x+1, "y":y},
		"bottom-right": {"x":x+row.even, "y":y+1},
		"bottom-left": {"x":x-(!row.even), "y":y+1},
		"left": {"x":x-1, "y":y}
	};
}

HexNode.prototype.open = function(side, row) {
	var c = row? row + "-" : "";
	c += side;

	if(this.sides[c] !== undefined) {
		this.node.addClass(c);
		return true;
	}
	return false;
};

HexNode.prototype.openAdjacent = function(side, row) {
	switch(side) {
	case "left":
		side = "right";
		break;
	case "right":
		side = "left";
		break;
	default:
		return false;
	}
	switch(row) {
	case "top":
		row = "bottom";
		break;
	case "bottom":
		row = "top";
		break;
	}
	return this.open(side, row);
};

HexNode.prototype.openWall = function(side, row) {
	var c = row? row + "-" : "";
	c += side;

	var sideCord = this.sides[c];
	if(sideCord === undefined) {
		return false;
	}

	var sideNode = this.grid.find(sideCord.x, sideCord.y);
	if(sideNode === undefined) {
		return false;
	}

	this.node.addClass(c);
	sideNode.openAdjacent(side, row);
	return true;
};

HexNode.prototype.neighbors = function() {
	var ret = {};
	for(k in this.sides) {
		var s = this.sides[k];
		var n = this.grid.find(s.x, s.y);
		if(n !== undefined) {
			ret[k] = n;
		}
	}
	return ret;
}

function HexRow(y, n, grid) {
	this.grid = grid;
	this.even = y % 2 === 0;

	this.nodes = [];
	for(var i=0; i<n; i++) {
		this.nodes.push(new HexNode(i, y, this, grid));
	}

	this.html = $("<div class='hexrow'></div>")
		.append(this.nodes.map(function(n) { return n.node; }));
};

function HexGrid(x, y) {
	y = y || x;

	this.hrows = [];
	for(var i=0; i<y; i++) {
		this.hrows.push(new HexRow(i, x, this));
	}

	this.html = this.hrows.map(function(r) { return r.html; });
};

HexGrid.prototype.find = function(x, y) {
	return this.hrows[y]? this.hrows[y].nodes[x] : undefined;
};
