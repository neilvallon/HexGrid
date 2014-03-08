$(function(){
	$(".hexMaze").each(function() {
		var g = new HexGrid(25);
		$(this).html(g.html);
	});
});
