var genMaze = function(nodeSet, method, animate) {
	if(nodeSet.length == 0) {
		return;
	}

	var current = (method === "DFS")? nodeSet.pop() : nodeSet.shift();
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

	if(animate) {
		setTimeout(function(){ genMaze(nodeSet, method, animate); }, 10);
	} else {
		genMaze(nodeSet, method, animate);
	}
};

$(function(){
	var method, animate;
	animate = false;

	$("#DFS").click(function() {
		method = 'DFS';
		$("#BFS").removeClass("active");
		$("#DFS").addClass("active");
	}).trigger("click");
	$("#BFS").click(function() {
		method = 'BFS';
		$("#DFS").removeClass("active");
		$("#BFS").addClass("active");
	});

	$("#Ani").click(function() {
		animate ^= true;
		animate? $("#Ani").addClass("active"):$("#Ani").removeClass("active");
	});

	$("#Gen").click(function() {
		$(".hexMaze").each(function() {
			var g = new HexGrid(25);
			$(this).html(g.html);
			genMaze([g.find(12, 12)], method, animate);
		});
	}).trigger("click");
	
});
