var genMaze = function(nodeSet) {
	if(nodeSet.length == 0) {
		return;
	}

	var current = nodeSet.pop();
	var neighbors = current.neighbors();

	for(n in neighbors) {
		if(Math.random() < 0.5 || neighbors[n].explored) {
			continue;
		}

		nodeSet.push(neighbors[n]);
		neighbors[n].explored = true;
		
		var split = n.split('-')
		split[1]? current.openWall(split[1], split[0]) : current.openWall(split[0])
	}

	setTimeout(function(){ genMaze(nodeSet); }, 10);
};

$(function(){
	$(".hexMaze").each(function() {
		var g = new HexGrid(25);
		$(this).html(g.html);
		
		genMaze([g.find(12, 12)]);
	});
});
