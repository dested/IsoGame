////////////////////////////////////////////////////////////////////////////////
// Triangles.Program
var $Triangles_$Program = function() {
};
$Triangles_$Program.$main = function() {
	$(function() {
		new $Triangles_TriangleGame();
	});
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.TriangleMove
var $Triangles_$TriangleMove = function(location, color) {
	this.location = null;
	this.color = null;
	this.location = location;
	this.color = color;
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.RaphaelBoundingBox
var $Triangles_RaphaelBoundingBox = function() {
};
$Triangles_RaphaelBoundingBox.createInstance = function() {
	return $Triangles_RaphaelBoundingBox.$ctor();
};
$Triangles_RaphaelBoundingBox.$ctor = function() {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.x2 = 0;
	$this.y2 = 0;
	$this.width = 0;
	$this.height = 0;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.Shapes
var $Triangles_Shapes = function() {
};
$Triangles_Shapes.filterToShape = function(neighbors, goodOne) {
	for (var $t1 = 0; $t1 < $Triangles_Shapes.$shapes.length; $t1++) {
		var trianglePiecese = $Triangles_Shapes.$shapes[$t1];
		for (var $t2 = 0; $t2 < trianglePiecese.length; $t2++) {
			var trianglePiece = trianglePiecese[$t2];
			var startX = trianglePiece.x;
			//0
			var startY = trianglePiece.y;
			//1
			var perfectTriangles = [];
			perfectTriangles.add(goodOne);
			for (var $t3 = 0; $t3 < trianglePiecese.length; $t3++) {
				var piece = trianglePiecese[$t3];
				if (!ss.referenceEquals(piece, trianglePiece)) {
					for (var $t4 = 0; $t4 < neighbors.length; $t4++) {
						var neighbor = neighbors[$t4];
						//          6           6
						var nX = neighbor.x - goodOne.x;
						//          7           6
						var nY = neighbor.y - goodOne.y;
						//  0             1          1             1
						if (nX + startX === piece.x && nY + startY === piece.y && piece.pointUp === neighbor.pointUp) {
							perfectTriangles.add(neighbor);
							break;
						}
					}
				}
			}
			if (perfectTriangles.length === trianglePiecese.length) {
				//good
				return perfectTriangles;
			}
		}
	}
	return [];
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.Triangle
var $Triangles_Triangle = function(_x, _y, pointUp, _color) {
	this.$spacing = 19;
	this.$transitionToColor = null;
	this.transitioning = 0;
	this.selected = false;
	this.neighbors = false;
	this.highlightedNeighbors = false;
	this.glow = false;
	this.color = null;
	this.pointUp = false;
	this.y = 0;
	this.x = 0;
	this.element = null;
	this.def = 0;
	this.$myXxx = 0;
	this.$myYyy = 0;
	this.x = _x;
	this.y = _y;
	this.pointUp = pointUp;
	this.color = _color;
	this.selected = false;
	this.neighbors = false;
	this.glow = false;
	this.highlightedNeighbors = false;
};
$Triangles_Triangle.prototype = {
	inBounds: function(_x, _y) {
		_x -= $Triangles_TriangleGame.offset.x;
		_y -= $Triangles_TriangleGame.offset.y;
		if (this.pointUp) {
			var x = this.x / 2;
			var y = this.y;
			var __x = x * 60 + x * this.$spacing - this.$spacing / 2;
			var __y = y * $Triangles_Triangle.triangleLength + ss.Int32.div(y * this.$spacing, 2);
			return $Triangles_Utility_Help.isPointInTriangle($Triangles_Utility_Point.$ctor(_x, _y), $Triangles_Utility_Point.$ctor(ss.Int32.trunc(__x), __y), $Triangles_Utility_Point.$ctor(ss.Int32.trunc(__x + 30), __y + $Triangles_Triangle.triangleLength), $Triangles_Utility_Point.$ctor(ss.Int32.trunc(__x - 30), __y + $Triangles_Triangle.triangleLength));
		}
		else {
			var x1 = (this.x - 1) / 2;
			var y1 = this.y;
			var __x1 = x1 * 60 + x1 * this.$spacing;
			var __y1 = y1 * $Triangles_Triangle.triangleLength + ss.Int32.div(y1 * this.$spacing, 2);
			return $Triangles_Utility_Help.isPointInTriangle($Triangles_Utility_Point.$ctor(_x, _y), $Triangles_Utility_Point.$ctor(ss.Int32.trunc(__x1 + 30), __y1 + $Triangles_Triangle.triangleLength), $Triangles_Utility_Point.$ctor(ss.Int32.trunc(__x1), __y1), $Triangles_Utility_Point.$ctor(ss.Int32.trunc(__x1 + 60), __y1));
		}
	},
	getLikeNeighbors: function(_board) {
		var hitmap = new Array(_board.length);
		for (var x = 0; x < _board.length; x++) {
			hitmap[x] = new Array(_board[x].length);
		}
		return $Triangles_Triangle.startLikeNeighbors(_board, this.x, this.y, this.color, hitmap);
	},
	isNeighbor: function(_x, _y) {
		var neighs;
		neighs = (this.pointUp ? $Triangles_Triangle.$pointUpNeighbors : $Triangles_Triangle.$pointDownNeighbors);
		for (var i = 0; i < neighs.length; i++) {
			if (this.x + neighs[i].x === _x && this.y + neighs[i].y === _y) {
				return true;
			}
		}
		return false;
	},
	getCurrentColor: function() {
		var increase = 15;
		if (this.transitioning + increase >= 100) {
			this.color = this.$transitionToColor;
			this.transitioning = 0;
		}
		if (this.transitioning > 0) {
			return $Triangles_Utility_Help.getColor(this.color, this.$transitionToColor, this.transitioning += increase);
		}
		return this.color;
	},
	highlightNeighbors: function(_board) {
		var neighs;
		if (this.pointUp) {
			neighs = $Triangles_Triangle.$pointUpNeighbors;
		}
		else {
			neighs = $Triangles_Triangle.$pointDownNeighbors;
		}
		for (var j = 0; j < _board.length; j++) {
			for (var k = 0; k < _board[j].length; k++) {
				_board[j][k].highlightedNeighbors = false;
			}
		}
		for (var i = 0; i < neighs.length; i++) {
			var cX = this.x + neighs[i].x;
			var cY = this.y + neighs[i].y;
			if (cX >= 0 && cX < _board.length && cY >= 0 && cY < _board[0].length) {
				_board[cX][cY].highlightedNeighbors = true;
			}
		}
	},
	getNeighbors: function(_board) {
		var neighs;
		if (this.pointUp) {
			neighs = $Triangles_Triangle.$pointUpNeighbors;
		}
		else {
			neighs = $Triangles_Triangle.$pointDownNeighbors;
		}
		var result = [];
		for (var i = 0; i < neighs.length; i++) {
			var cX = this.x + neighs[i].x;
			var cY = this.y + neighs[i].y;
			if (cX >= 0 && cX < _board.length && cY >= 0 && cY < _board[0].length) {
				if (ss.isValue(_board[cX][cY].color)) {
					result.add(_board[cX][cY]);
				}
			}
		}
		return result;
	},
	transitionTo: function(_toColor) {
		this.$transitionToColor = _toColor;
		this.transitioning = 1;
	},
	draw: function(_context) {
		var strokeStyle = '';
		var lineWidth = 0;
		//worst code
		if (this.neighbors) {
			strokeStyle = '#A3ECFF';
		}
		else if (this.selected) {
			strokeStyle = '#FAFAFA';
		}
		else if (this.glow) {
			strokeStyle = 'gold';
		}
		else {
			strokeStyle = 'black';
		}
		if (this.neighbors) {
			lineWidth = 4;
		}
		else if (this.selected) {
			lineWidth = 5;
		}
		else if (this.glow) {
			lineWidth = 4;
		}
		else if (this.highlightedNeighbors) {
			strokeStyle = '#FcFcFc';
			lineWidth = 2;
		}
		else {
			lineWidth = 3;
		}
		var currentColor = this.getCurrentColor();
		if (ss.isNullOrUndefined(currentColor)) {
			if (ss.isValue(this.element)) {
				this.element.remove();
			}
			this.element = null;
			return;
		}
		//  _context.ShadowColor ="black";
		//  _context.ShadowBlur = 20;
		//  _context.ShadowOffsetX = ((mouseX - TriangleGame.Offset.X - TriangleGame.Size.X / 2.0) / TriangleLength / 2)*5;
		//  _context.ShadowOffsetY = ((mouseY - TriangleGame.Offset.Y - TriangleGame.Size.Y / 2.0) / TriangleLength)*5;
		var fillStyle = currentColor;
		if (ss.isNullOrUndefined(this.element)) {
			if (this.pointUp) {
				var x = this.x / 2;
				var y = this.y;
				var xxx = x * 60 + x * this.$spacing - this.$spacing / 2 + $Triangles_TriangleGame.offset.x;
				var yyy = y * $Triangles_Triangle.triangleLength + ss.Int32.div(y * this.$spacing, 2) + $Triangles_TriangleGame.offset.y;
				if (this.selected) {
					//  ctx.rotate((cur+=3)*Math.PI/180); 
				}
				this.element = _context.path('M' + xxx + ' ' + yyy + 'L' + (xxx + 30) + ' ' + (yyy + $Triangles_Triangle.triangleLength) + 'L' + (xxx - 30) + ' ' + (yyy + $Triangles_Triangle.triangleLength) + 'L' + xxx + ' ' + yyy);
				this.$myXxx = xxx;
				this.$myYyy = yyy;
			}
			else {
				var x1 = (this.x - 1) / 2;
				var y1 = this.y;
				var xxx1 = x1 * 60 + x1 * this.$spacing + $Triangles_TriangleGame.offset.x;
				var yyy1 = y1 * $Triangles_Triangle.triangleLength + ss.Int32.div(y1 * this.$spacing, 2) + $Triangles_TriangleGame.offset.y;
				if (this.selected) {
					//  ctx.rotate((cur+=3)*Math.PI/180); 
				}
				this.element = _context.path('M' + xxx1 + ' ' + yyy1 + 'L' + (xxx1 + 60) + ' ' + yyy1 + 'L' + (xxx1 + 30) + ' ' + (yyy1 + $Triangles_Triangle.triangleLength) + 'L' + xxx1 + ' ' + yyy1);
				this.$myXxx = xxx1;
				this.$myYyy = yyy1;
			}
			this.element.attr({ 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
			this.element.mousedown(Function.mkdel(this, function(e) {
				var pointer = $Triangles_Utility_Help.getCursorPosition(e);
				$Triangles_TriangleGame.instance.mouseDown(pointer, this);
			}));
			this.element.mouseover(Function.mkdel(this, function(e1) {
				$Triangles_TriangleGame.instance.mouseOver(this);
			}));
			var touched;
			this.element.touchstart(Function.mkdel(this, function(e2) {
				var pointer1 = $Triangles_Utility_Help.getCursorPosition(e2);
				touched = true;
				window.setTimeout(Function.mkdel(this, function() {
					if (touched) {
						pointer1.right = true;
						$Triangles_TriangleGame.instance.mouseDown(pointer1, this);
					}
				}), 500);
				//right click
				$Triangles_TriangleGame.instance.mouseDown(pointer1, this);
				e2.preventDefault();
			}));
			this.element.touchend(function(e3) {
				touched = false;
				e3.preventDefault();
			});
			this.element.touchmove(Function.mkdel(this, function(e4) {
				$Triangles_TriangleGame.instance.mouseOver(this);
				e4.preventDefault();
			}));
		}
		lineWidth *= 2;
		this.element.attr({ fill: fillStyle, 'stroke-width': lineWidth, stroke: strokeStyle });
		//
		//
		//                        if (Glow) {
		//
		//
		//                        _context.LineWidth = 8;
		//
		//
		//                        if (transitioning > 0) _context.StrokeStyle = "white";
		//
		//
		//                        else _context.StrokeStyle = "black";
		//
		//
		//                        _context.Stroke();
		//
		//
		//                        _context.LineWidth = 4;
		//
		//
		//                        _context.StrokeStyle = "gold";
		//
		//
		//                        _context.Stroke();
		//
		//
		//                        } else if (Selected) {
		//
		//
		//                        _context.Stroke();
		//
		//
		//                        _context.LineWidth = 4;
		//
		//
		//                        _context.StrokeStyle = "black";
		//
		//
		//                        _context.Stroke();
		//
		//
		//                        } else
		//
		//
		//                        _context.Stroke();
		//
		//
		//                        
		//
		//
		//                        if (( Neighbors || HighlightedNeighbors ) && !Glow) {
		//
		//
		//                        _context.LineWidth = 2;
		//
		//
		//                        _context.StrokeStyle = "#345782";
		//
		//
		//                        _context.Stroke();
		//
		//
		//                        }
		//
		//
		//                        if (Neighbors) {
		//
		//
		//                        _context.StrokeStyle = "black";
		//
		//
		//                        _context.LineWidth = 9;
		//
		//
		//                        _context.Stroke();
		//
		//
		//                        
		//
		//
		//                        _context.StrokeStyle = "white";
		//
		//
		//                        _context.LineWidth = 4;
		//
		//
		//                        _context.Stroke();
		//
		//
		//                        }
	},
	pop: function() {
		this.color = null;
	}
};
$Triangles_Triangle.startLikeNeighbors = function(_board, _x, _y, _color, _hitMap) {
	//log("x: " + _x + " y: " + _y + "   color: " + _color); 
	var items = [];
	if (_x >= 0 && _x < _board.length && _y >= 0 && _y < _board[0].length) {
		if (_hitMap[_x][_y]) {
			return items;
		}
		_hitMap[_x][_y] = true;
		if (ss.referenceEquals(_board[_x][_y].color, _color)) {
			items.add(_board[_x][_y]);
		}
		else {
			return items;
		}
		if (_board[_x][_y].pointUp) {
			for (var l = 0; l < $Triangles_Triangle.$pointUpNeighbors.length; l++) {
				var neighs = $Triangles_Triangle.$pointUpNeighbors[l];
				items.addRange($Triangles_Triangle.startLikeNeighbors(_board, _x + neighs.x, _y + neighs.y, _color, _hitMap));
			}
		}
		else {
			for (var l1 = 0; l1 < $Triangles_Triangle.$pointDownNeighbors.length; l1++) {
				var neighs1 = $Triangles_Triangle.$pointDownNeighbors[l1];
				items.addRange($Triangles_Triangle.startLikeNeighbors(_board, _x + neighs1.x, _y + neighs1.y, _color, _hitMap));
			}
		}
	}
	return items;
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.TriangleGame
var $Triangles_TriangleGame = function() {
	this.$boardHeight = 10;
	this.$boardWidth = 21;
	this.$drawTick = 0;
	this.$myCanvas = null;
	this.$myFirstSelected = null;
	this.$myTriangleGrid = null;
	this.$myTriangleList = null;
	$Triangles_TriangleGame.instance = this;
	this.$myCanvas = $Triangles_Utility_CanvasInformation.create$1(document.getElementById('cnvGameBoard'), $Triangles_TriangleGame.size.x, $Triangles_TriangleGame.size.y);
	$Triangles_Utility_Extensions.addEvent(this.$myCanvas.canvas, 'contextmenu', function(evt) {
		evt.preventDefault();
	});
	this.$init();
	window.setInterval(Function.mkdel(this, this.$drawBoard), 16);
};
$Triangles_TriangleGame.prototype = {
	mouseOver: function(triangle) {
		for (var l = 0; l < this.$myTriangleList.length; l++) {
			this.$myTriangleList[l].glow = false;
			if (ss.referenceEquals(this.$myTriangleList[l], triangle)) {
				this.$myTriangleList[l].glow = true;
			}
		}
	},
	mouseDown: function(pointer, triangle) {
		var selected = null;
		if (!pointer.right) {
			for (var l = 0; l < this.$myTriangleList.length; l++) {
				this.$myTriangleList[l].highlightedNeighbors = false;
				if (ss.referenceEquals(this.$myTriangleList[l], triangle)) {
					if (this.$myTriangleList[l].selected === true) {
						this.$myFirstSelected = null;
						this.$myTriangleList[l].selected = false;
						continue;
					}
					if (this.$myTriangleList[l].neighbors) {
						this.$popNeighborTriangles(this.$myTriangleList[l]);
					}
					else {
						(selected = this.$myTriangleList[l]).selected = true;
					}
				}
				else {
					this.$myTriangleList[l].selected = false;
				}
				this.$myTriangleList[l].neighbors = false;
			}
			if (ss.isValue(selected)) {
				if (ss.isValue(selected.color)) {
					if (ss.isNullOrUndefined(this.$myFirstSelected) || !this.$myFirstSelected.isNeighbor(selected.x, selected.y)) {
						this.$myFirstSelected = selected;
						selected.highlightNeighbors(this.$myTriangleGrid);
					}
					else {
						var c2 = this.$myFirstSelected.color;
						this.$myFirstSelected.transitionTo(selected.color);
						selected.transitionTo(c2);
						selected.selected = false;
						this.$myFirstSelected = null;
					}
				}
			}
			else {
				this.$myFirstSelected = null;
			}
		}
		else {
			var neighbors = [];
			this.$myFirstSelected = null;
			var goodOne = null;
			for (var l1 = 0; l1 < this.$myTriangleList.length; l1++) {
				if (ss.referenceEquals(this.$myTriangleList[l1], triangle)) {
					if (!this.$myTriangleList[l1].neighbors) {
						goodOne = this.$myTriangleList[l1];
						neighbors = goodOne.getLikeNeighbors(this.$myTriangleGrid);
					}
				}
				this.$myTriangleList[l1].selected = this.$myTriangleList[l1].highlightedNeighbors = this.$myTriangleList[l1].neighbors = false;
			}
			neighbors = $Triangles_Shapes.filterToShape(neighbors, goodOne);
			for (var i = 0; i < neighbors.length; i++) {
				neighbors[i].neighbors = true;
			}
		}
	},
	$popNeighborTriangles: function(center) {
		var toPop = center.getLikeNeighbors(this.$myTriangleGrid);
		toPop = $Triangles_Shapes.filterToShape(toPop, center);
		for (var $t1 = 0; $t1 < toPop.length; $t1++) {
			var triangle = toPop[$t1];
			this.$myTriangleGrid[triangle.x][triangle.y].pop();
		}
	},
	$dropTriangles: function() {
		if (this.$drawTick % 1 !== 0) {
			return;
		}
		var moves = [];
		var didPointUp = false;
		var bad = { $: true };
		while (bad.$) {
			bad.$ = false;
			var noMoves = true;
			for (var y = this.$boardHeight - 1; y >= 0; y--) {
				var poppedThisRow = { $: false };
				for (var x = ss.Int32.div(this.$boardWidth, 2); x >= 0; x--) {
					noMoves = this.$popTris(x, y, didPointUp, noMoves, poppedThisRow, bad);
				}
				for (var x1 = ss.Int32.div(this.$boardWidth, 2); x1 < this.$boardWidth; x1++) {
					noMoves = this.$popTris(x1, y, didPointUp, noMoves, poppedThisRow, bad);
				}
				if (poppedThisRow.$ && true) {
					return;
				}
			}
			if (noMoves && didPointUp) {
				break;
			}
			didPointUp = true;
		}
	},
	$popTris: function(x, y, didPointUp, noMoves, poppedThisRow, bad) {
		var current = this.$myTriangleGrid[x][y];
		if (ss.isNullOrUndefined(current.color) && current.transitioning === 0) {
			if (!current.pointUp && didPointUp) {
				return noMoves;
			}
			if (y === 0 && !current.pointUp) {
				current.transitionTo($Triangles_Utility_Help.getRandomColor());
				return noMoves;
			}
			var neighbors = current.getNeighbors(this.$myTriangleGrid);
			var $t1 = $Triangles_Utility_Extensions.takeRandom($Triangles_Triangle).call(null, neighbors);
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var neighbor = $t1[$t2];
				if (neighbor.y === current.y) {
					if (!neighbor.pointUp && current.pointUp) {
						current.transitionTo(neighbor.color);
						neighbor.color = null;
						noMoves = false;
						poppedThisRow.$ = true;
						break;
					}
				}
				else if (neighbor.y < current.y) {
					current.transitionTo(neighbor.color);
					neighbor.color = null;
					noMoves = false;
					poppedThisRow.$ = true;
					break;
				}
			}
			if (ss.isNullOrUndefined(current.color) && current.transitioning === 0) {
				if (y === 0) {
					current.transitionTo($Triangles_Utility_Help.getRandomColor());
				}
				else {
					bad.$ = true;
				}
			}
		}
		return noMoves;
	},
	$init: function() {
		this.$myTriangleList = [];
		this.$myTriangleGrid = new Array(this.$boardWidth);
		for (var x = 0; x < this.$boardWidth; x++) {
			this.$myTriangleGrid[x] = new Array(this.$boardHeight);
		}
		for (var y = 0; y < this.$boardHeight; y++) {
			for (var x1 = 0; x1 < this.$boardWidth; x1++) {
				var off = ((y % 2 === 0) ? 1 : 0);
				var off2 = (x1 + off) % 2 === 0;
				var tri = new $Triangles_Triangle(x1, y, off2, $Triangles_Utility_Help.getRandomColor());
				this.$myTriangleGrid[x1][y] = tri;
				this.$myTriangleList.add(tri);
			}
		}
	},
	$drawBoard: function() {
		this.$drawTick++;
		this.$dropTriangles();
		this.$myCanvas.canvas.style.backgroundColor = '#343434';
		for (var l = 0; l < this.$myTriangleList.length; l++) {
			this.$myTriangleList[l].draw(this.$myCanvas.context);
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.TrianglePiece
var $Triangles_TrianglePiece = function() {
};
$Triangles_TrianglePiece.$ctor = function(x, y, pointUp) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.pointUp = false;
	$this.x = x;
	$this.y = y;
	$this.pointUp = pointUp;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.Utility.CanvasInformation
var $Triangles_Utility_CanvasInformation = function(context, domCanvas) {
	this.context = null;
	this.jCanvas = null;
	this.canvas = null;
	this.context = context;
	this.jCanvas = domCanvas;
	this.canvas = domCanvas[0];
};
$Triangles_Utility_CanvasInformation.create = function(w, h) {
	var canvas = document.createElement('canvas');
	return $Triangles_Utility_CanvasInformation.create$1(canvas, w, h);
};
$Triangles_Utility_CanvasInformation.create$1 = function(canvas, w, h) {
	if (w === 0) {
		w = 1;
	}
	if (h === 0) {
		h = 1;
	}
	return new $Triangles_Utility_CanvasInformation(Raphael(canvas, w, h), $(canvas));
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.Utility.Extensions
var $Triangles_Utility_Extensions = function() {
};
$Triangles_Utility_Extensions.addEvent = function(element, eventName, listener) {
	if (!!ss.isValue(element.addEventListener)) {
		element.addEventListener(eventName, listener, false);
	}
	else {
		element.attachEvent(eventName, function() {
			listener(window.event);
		});
	}
};
$Triangles_Utility_Extensions.upsideDown = function(items) {
	var pieces = [];
	var highest = 0;
	for (var $t1 = 0; $t1 < items.length; $t1++) {
		var trianglePiece = items[$t1];
		if (trianglePiece.y > highest) {
			highest = trianglePiece.y;
		}
	}
	for (var $t2 = 0; $t2 < items.length; $t2++) {
		var trianglePiece1 = items[$t2];
		pieces.add($Triangles_TrianglePiece.$ctor(trianglePiece1.x, highest - trianglePiece1.y, !trianglePiece1.pointUp));
	}
	return pieces;
};
$Triangles_Utility_Extensions.inverse = function(items) {
	var pieces = [];
	for (var $t1 = 0; $t1 < items.length; $t1++) {
		var trianglePiece = items[$t1];
		pieces.add($Triangles_TrianglePiece.$ctor(trianglePiece.x, trianglePiece.y, !trianglePiece.pointUp));
	}
	return pieces;
};
$Triangles_Utility_Extensions.takeRandom = function(T) {
	return function(items) {
		var ls = items.clone();
		ls.sort(function(a, b) {
			return ss.Int32.trunc(Math.round(Math.random()) - 0.5);
		});
		return ls;
		//
		///*
		//
		//foreach (var item in items) {
		//
		//yield return item;
		//
		//}
		//
		//yield break;
		//
		//#1#
		//
		//
		//
		//;
		//
		//List<bool> used=new List<bool>();
		//
		//for (int i = 0; i < items.Count; i++) {
		//
		//used[i] = false;
		//
		//}
		//
		//
		//
		//int usedCount = 0;
		//
		//
		//
		//while (usedCount!=items.Count-1) {
		//
		//var cur = ( (int) Math.Random() * items.Count );
		//
		//if (!used[cur]) {
		//
		//used[cur] = true;
		//
		//usedCount++;
		//
		//yield return items[cur];
		//
		//}
		//
		//}
	};
};
$Triangles_Utility_Extensions.withData = function(T, T2) {
	return function(item, data) {
		return new (Type.makeGenericType($Triangles_Utility_ExtraData$2, [T, T2]))(item, data);
	};
};
$Triangles_Utility_Extensions.percent$1 = function(num) {
	return num + '%';
};
$Triangles_Utility_Extensions.percent = function(num) {
	return num + '%';
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.Utility.ExtraData
var $Triangles_Utility_ExtraData$2 = function(T, T2) {
	var $type = function(item, data) {
		this.item = T.getDefaultValue();
		this.data = T2.getDefaultValue();
		this.data = data;
		this.item = item;
	};
	$type.op_Implicit = function(d) {
		return d.item;
	};
	$type.op_Implicit$1 = function(d) {
		return d.data;
	};
	Type.registerGenericClassInstance($type, $Triangles_Utility_ExtraData$2, [T, T2], function() {
		return Object;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'Triangles.Utility.ExtraData$2', $Triangles_Utility_ExtraData$2, 2);
////////////////////////////////////////////////////////////////////////////////
// Triangles.Utility.Help
var $Triangles_Utility_Help = function() {
};
$Triangles_Utility_Help.getColor = function(_start, _end, _percent) {
	if (ss.isNullOrUndefined(_start)) {
		_start = '#FFFFFF';
	}
	var hex2Dec = function(_hex) {
		return parseInt(_hex, 16);
	};
	var dec2Hex = function(_dec) {
		return ((_dec < 16) ? '0' : '') + _dec.toString(16);
	};
	_start = _start.substring(1, 7);
	_end = _end.substring(1, 7);
	var r1 = hex2Dec(_start.substring(0, 2));
	var g1 = hex2Dec(_start.substring(2, 4));
	var b1 = hex2Dec(_start.substring(4, 6));
	var r2 = hex2Dec(_end.substring(0, 2));
	var g2 = hex2Dec(_end.substring(2, 4));
	var b2 = hex2Dec(_end.substring(4, 6));
	var pc = _percent / 100;
	var r = ss.Int32.trunc(Math.floor(r1 + pc * (r2 - r1) + 0.5));
	var g = ss.Int32.trunc(Math.floor(g1 + pc * (g2 - g1) + 0.5));
	var b = ss.Int32.trunc(Math.floor(b1 + pc * (b2 - b1) + 0.5));
	return '#' + dec2Hex(r) + dec2Hex(g) + dec2Hex(b);
};
$Triangles_Utility_Help.getCursorPosition = function(ev) {
	if (!!(ev.originalEvent && ev.originalEvent.targetTouches && ev.originalEvent.targetTouches.length > 0)) {
		ev = ev.originalEvent.targetTouches[0];
	}
	return $Triangles_Utility_Pointer.$ctor(0, 0, ss.Nullable.unbox(Type.cast((!!ev.wheelDelta ? (ev.wheelDelta / 40) : (!!ev.detail ? -ev.detail : 0)), ss.Int32)), ev.button === 2);
};
$Triangles_Utility_Help.getRandomColor = function() {
	return $Triangles_Utility_Help.colors[ss.Int32.trunc(Math.random() * $Triangles_Utility_Help.colors.length)];
};
$Triangles_Utility_Help.isPointInTriangle = function(_s, _a, _b, _c) {
	var asX = _s.x - _a.x;
	var asY = _s.y - _a.y;
	var sAb = (_b.x - _a.x) * asY - (_b.y - _a.y) * asX > 0;
	if ((_c.x - _a.x) * asY - (_c.y - _a.y) * asX > 0 === sAb) {
		return false;
	}
	if ((_c.x - _b.x) * (_s.y - _b.y) - (_c.y - _b.y) * (_s.x - _b.x) > 0 !== sAb) {
		return false;
	}
	return true;
};
$Triangles_Utility_Help.log = function(_cont) {
	var console = $('#txtConsole');
	var text = console.val();
	console.val(text + _cont + '\n');
	console.scrollTop(console[0].scrollHeight - console.height());
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.Utility.Point
var $Triangles_Utility_Point = function() {
};
$Triangles_Utility_Point.$ctor = function(x, y) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.x = x;
	$this.y = y;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.Utility.Pointer
var $Triangles_Utility_Pointer = function() {
};
$Triangles_Utility_Pointer.$ctor = function(x, y, delta, right) {
	var $this = $Triangles_Utility_Point.$ctor(x, y);
	$this.delta = 0;
	$this.right = false;
	$this.delta = delta;
	$this.right = right;
	return $this;
};
Type.registerClass(null, 'Triangles.$Program', $Triangles_$Program, Object);
Type.registerClass(null, 'Triangles.$TriangleMove', $Triangles_$TriangleMove, Object);
Type.registerClass(global, 'Triangles.RaphaelBoundingBox', $Triangles_RaphaelBoundingBox, Object);
Type.registerClass(global, 'Triangles.Shapes', $Triangles_Shapes, Object);
Type.registerClass(global, 'Triangles.Triangle', $Triangles_Triangle, Object);
Type.registerClass(global, 'Triangles.TriangleGame', $Triangles_TriangleGame, Object);
Type.registerClass(global, 'Triangles.TrianglePiece', $Triangles_TrianglePiece, Object);
Type.registerClass(global, 'Triangles.Utility.CanvasInformation', $Triangles_Utility_CanvasInformation, Object);
Type.registerClass(global, 'Triangles.Utility.Extensions', $Triangles_Utility_Extensions, Object);
Type.registerClass(global, 'Triangles.Utility.Help', $Triangles_Utility_Help, Object);
Type.registerClass(global, 'Triangles.Utility.Point', $Triangles_Utility_Point, Object);
Type.registerClass(global, 'Triangles.Utility.Pointer', $Triangles_Utility_Pointer);
$Triangles_Shapes.$triforce = [$Triangles_TrianglePiece.$ctor(1, 0, true), $Triangles_TrianglePiece.$ctor(0, 1, true), $Triangles_TrianglePiece.$ctor(2, 1, true)];
$Triangles_Shapes.$circle = [$Triangles_TrianglePiece.$ctor(0, 0, true), $Triangles_TrianglePiece.$ctor(1, 0, false), $Triangles_TrianglePiece.$ctor(2, 0, true), $Triangles_TrianglePiece.$ctor(0, 1, false), $Triangles_TrianglePiece.$ctor(1, 1, true), $Triangles_TrianglePiece.$ctor(2, 1, false)];
$Triangles_Shapes.$bigTriforce = [$Triangles_TrianglePiece.$ctor(2, 0, true), $Triangles_TrianglePiece.$ctor(1, 1, true), $Triangles_TrianglePiece.$ctor(3, 1, true), $Triangles_TrianglePiece.$ctor(0, 2, true), $Triangles_TrianglePiece.$ctor(2, 2, true), $Triangles_TrianglePiece.$ctor(4, 2, true)];
$Triangles_Shapes.$biggerTriforce = [$Triangles_TrianglePiece.$ctor(3, 0, true), $Triangles_TrianglePiece.$ctor(2, 1, true), $Triangles_TrianglePiece.$ctor(4, 1, true), $Triangles_TrianglePiece.$ctor(1, 2, true), $Triangles_TrianglePiece.$ctor(3, 2, true), $Triangles_TrianglePiece.$ctor(5, 2, true), $Triangles_TrianglePiece.$ctor(0, 3, true), $Triangles_TrianglePiece.$ctor(2, 3, true), $Triangles_TrianglePiece.$ctor(4, 3, true), $Triangles_TrianglePiece.$ctor(6, 3, true)];
$Triangles_Shapes.$evenBiggerTriforce = [$Triangles_TrianglePiece.$ctor(4, 0, true), $Triangles_TrianglePiece.$ctor(3, 1, true), $Triangles_TrianglePiece.$ctor(5, 1, true), $Triangles_TrianglePiece.$ctor(2, 2, true), $Triangles_TrianglePiece.$ctor(4, 2, true), $Triangles_TrianglePiece.$ctor(6, 2, true), $Triangles_TrianglePiece.$ctor(1, 3, true), $Triangles_TrianglePiece.$ctor(3, 3, true), $Triangles_TrianglePiece.$ctor(5, 3, true), $Triangles_TrianglePiece.$ctor(7, 3, true), $Triangles_TrianglePiece.$ctor(0, 4, true), $Triangles_TrianglePiece.$ctor(2, 4, true), $Triangles_TrianglePiece.$ctor(4, 4, true), $Triangles_TrianglePiece.$ctor(6, 4, true), $Triangles_TrianglePiece.$ctor(8, 4, true)];
$Triangles_Shapes.$shapes = [];
$Triangles_Shapes.$shapes.add($Triangles_Shapes.$triforce);
$Triangles_Shapes.$shapes.add($Triangles_Shapes.$bigTriforce);
$Triangles_Shapes.$shapes.add($Triangles_Shapes.$biggerTriforce);
$Triangles_Shapes.$shapes.add($Triangles_Shapes.$evenBiggerTriforce);
$Triangles_Shapes.$shapes.add($Triangles_Shapes.$circle);
$Triangles_Shapes.$shapes.add($Triangles_Utility_Extensions.inverse($Triangles_Shapes.$circle));
var uShapes = [];
for (var $t1 = 0; $t1 < $Triangles_Shapes.$shapes.length; $t1++) {
	var trianglePiecese = $Triangles_Shapes.$shapes[$t1];
	uShapes.add($Triangles_Utility_Extensions.upsideDown(trianglePiecese));
}
$Triangles_Shapes.$shapes.addRange(uShapes);
$Triangles_Shapes.$shapes.sort(function(a, b) {
	return ((b.length > a.length) ? 1 : ((b.length < a.length) ? -1 : 0));
});
$Triangles_Triangle.muliplyer = 0.6;
$Triangles_Triangle.triangleLength = 60;
$Triangles_Triangle.$pointUpNeighbors = [$Triangles_Utility_Point.$ctor(-1, 0), $Triangles_Utility_Point.$ctor(1, 0), $Triangles_Utility_Point.$ctor(-2, 0), $Triangles_Utility_Point.$ctor(2, 0), $Triangles_Utility_Point.$ctor(0, -1), $Triangles_Utility_Point.$ctor(-1, -1), $Triangles_Utility_Point.$ctor(1, -1), $Triangles_Utility_Point.$ctor(0, 1), $Triangles_Utility_Point.$ctor(-1, 1), $Triangles_Utility_Point.$ctor(1, 1), $Triangles_Utility_Point.$ctor(-2, 1), $Triangles_Utility_Point.$ctor(2, 1)];
$Triangles_Triangle.$pointDownNeighbors = [$Triangles_Utility_Point.$ctor(-1, 0), $Triangles_Utility_Point.$ctor(1, 0), $Triangles_Utility_Point.$ctor(-2, 0), $Triangles_Utility_Point.$ctor(2, 0), $Triangles_Utility_Point.$ctor(0, 1), $Triangles_Utility_Point.$ctor(-1, 1), $Triangles_Utility_Point.$ctor(1, 1), $Triangles_Utility_Point.$ctor(0, -1), $Triangles_Utility_Point.$ctor(-1, -1), $Triangles_Utility_Point.$ctor(1, -1), $Triangles_Utility_Point.$ctor(-2, -1), $Triangles_Utility_Point.$ctor(2, -1)];
$Triangles_TriangleGame.instance = null;
$Triangles_TriangleGame.offset = $Triangles_Utility_Point.$ctor(160, 70);
$Triangles_TriangleGame.size = $Triangles_Utility_Point.$ctor(1100, 850);
$Triangles_Utility_CanvasInformation.$blackPixel = null;
$Triangles_Utility_Help.colors = ['#FF0000', '#00FF00', '#0000FF', '#880088', '#888800', '#008888'];
$Triangles_$Program.$main();
