////////////////////////////////////////////////////////////////////////////////
// Triangles.Program
var $Triangles_$Program = function() {
};
$Triangles_$Program.$main = function() {
	$(function() {
		new $Triangles_$TriangleGame();
	});
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.TriangleGame
var $Triangles_$TriangleGame = function() {
	this.$myAllTriangles = null;
	this.$myCanvas = null;
	this.$myFirstSelected = null;
	this.$myTriangles = null;
	this.$myCanvas = $Triangles_CanvasInformation.create$1(document.getElementById('cnvGameBoard'), 700, 700);
	this.$myCanvas.context.lineCap = 'round';
	this.$myCanvas.context.lineJoin = 'round';
	this.$myCanvas.canvas.addEventListener('contextmenu', function(evt) {
		evt.preventDefault();
	}, false);
	this.$myCanvas.jCanvas.mousedown(Function.mkdel(this, function(_e) {
		var pointer = $Triangles_Help.getCursorPosition(_e);
		var selected = null;
		switch (_e.which) {
			case 1: {
				for (var l = 0; l < this.$myAllTriangles.length; l++) {
					this.$myAllTriangles[l].selected = this.$myAllTriangles[l].highlightedNeighbors = this.$myAllTriangles[l].neighbors = false;
					if (this.$myAllTriangles[l].inBounds(pointer.x, pointer.y)) {
						(selected = this.$myAllTriangles[l]).selected = true;
					}
				}
				if (ss.isValue(selected)) {
					if (ss.isNullOrUndefined(this.$myFirstSelected) || !this.$myFirstSelected.isNeighbor(selected.x, selected.y)) {
						this.$myFirstSelected = selected;
						selected.highlightNeighbors(this.$myTriangles);
					}
					else {
						var c2 = this.$myFirstSelected.color;
						this.$myFirstSelected.transitionTo(selected.color);
						selected.transitionTo(c2);
						selected.selected = false;
						this.$myFirstSelected = null;
					}
				}
				break;
			}
			case 3: {
				var neighbors = [];
				for (var l1 = 0; l1 < this.$myAllTriangles.length; l1++) {
					this.$myAllTriangles[l1].neighbors = false;
					if (this.$myAllTriangles[l1].inBounds(pointer.x, pointer.y)) {
						neighbors = this.$myAllTriangles[l1].getLikeNeighbors(this.$myTriangles);
					}
				}
				for (var i = 0; i < neighbors.length; i++) {
					neighbors[i].neighbors = true;
				}
				break;
			}
			case 2: {
				break;
			}
			default: {
				break;
			}
		}
	}));
	this.$myCanvas.jCanvas.mousemove(Function.mkdel(this, function(_e1) {
		var pointer1 = $Triangles_Help.getCursorPosition(_e1);
		for (var l2 = 0; l2 < this.$myAllTriangles.length; l2++) {
			this.$myAllTriangles[l2].glow = false;
			if (this.$myAllTriangles[l2].inBounds(pointer1.x, pointer1.y)) {
				this.$myAllTriangles[l2].glow = true;
			}
		}
	}));
	this.$init();
	window.setInterval(Function.mkdel(this, this.$drawBoard), 33);
};
$Triangles_$TriangleGame.prototype = {
	$init: function() {
		this.$myAllTriangles = [];
		var boardWidth = 15;
		var boardHeight = 10;
		this.$myTriangles = new Array(boardWidth);
		for (var x = 0; x < boardWidth; x++) {
			this.$myTriangles[x] = new Array(boardHeight);
		}
		for (var y = 0; y < boardHeight; y++) {
			for (var x1 = 0; x1 < boardWidth; x1++) {
				var off = ((y % 2 === 0) ? 1 : 0);
				var off2 = (x1 + off) % 2 === 0;
				var tri = new $Triangles_Triangle(x1, y, off2, $Triangles_Help.get_random_color());
				this.$myTriangles[x1][y] = tri;
				this.$myAllTriangles.add(tri);
			}
		}
	},
	$drawBoard: function() {
		this.$myCanvas.context.save();
		this.$myCanvas.context.save();
		this.$myCanvas.context.fillStyle = 'white';
		this.$myCanvas.context.fillRect(0, 0, $Triangles_$TriangleGame.$size.x, $Triangles_$TriangleGame.$size.y);
		this.$myCanvas.context.restore();
		this.$myCanvas.context.translate($Triangles_$TriangleGame.$offset.x, $Triangles_$TriangleGame.$offset.y);
		var specials = [];
		var specials2 = [];
		for (var l = 0; l < this.$myAllTriangles.length; l++) {
			if (this.$myAllTriangles[l].selected || this.$myAllTriangles[l].glow || this.$myAllTriangles[l].neighbors) {
				specials.add(this.$myAllTriangles[l]);
			}
			else if (this.$myAllTriangles[l].highlightedNeighbors) {
				specials2.add(this.$myAllTriangles[l]);
			}
			else {
				this.$myAllTriangles[l].draw(this.$myCanvas.context);
			}
		}
		//drawing happens sequentially, and it will draw over our highlight, so we draw those last.
		for (var l1 = 0; l1 < specials2.length; l1++) {
			specials2[l1].draw(this.$myCanvas.context);
		}
		for (var l2 = 0; l2 < specials.length; l2++) {
			specials[l2].draw(this.$myCanvas.context);
		}
		this.$myCanvas.context.restore();
	}
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.CanvasInformation
var $Triangles_CanvasInformation = function(context, domCanvas) {
	this.context = null;
	this.jCanvas = null;
	this.canvas = null;
	this.context = context;
	this.jCanvas = domCanvas;
	this.canvas = domCanvas[0];
};
$Triangles_CanvasInformation.get_blackPixel = function() {
	if (ss.isNullOrUndefined($Triangles_CanvasInformation.$blackPixel)) {
		var m = $Triangles_CanvasInformation.create(0, 0);
		m.context.fillStyle = 'black';
		m.context.fillRect(0, 0, 1, 1);
		$Triangles_CanvasInformation.$blackPixel = m.canvas;
	}
	return $Triangles_CanvasInformation.$blackPixel;
};
$Triangles_CanvasInformation.create = function(w, h) {
	var canvas = document.createElement('canvas');
	return $Triangles_CanvasInformation.create$1(canvas, w, h);
};
$Triangles_CanvasInformation.create$1 = function(canvas, w, h) {
	if (w === 0) {
		w = 1;
	}
	if (h === 0) {
		h = 1;
	}
	canvas.width = w;
	canvas.height = h;
	var ctx = canvas.getContext('2d');
	return new $Triangles_CanvasInformation(ctx, $(canvas));
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.Extensions
var $Triangles_Extensions = function() {
};
$Triangles_Extensions.withData = function(T, T2) {
	return function(item, data) {
		return new (Type.makeGenericType($Triangles_ExtraData$2, [T, T2]))(item, data);
	};
};
$Triangles_Extensions.percent$1 = function(num) {
	return num + '%';
};
$Triangles_Extensions.percent = function(num) {
	return num + '%';
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.ExtraData
var $Triangles_ExtraData$2 = function(T, T2) {
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
	Type.registerGenericClassInstance($type, $Triangles_ExtraData$2, [T, T2], function() {
		return Object;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'Triangles.ExtraData$2', $Triangles_ExtraData$2, 2);
////////////////////////////////////////////////////////////////////////////////
// Triangles.Help
var $Triangles_Help = function() {
};
$Triangles_Help.getColor = function(_start, _end, _percent) {
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
	var pc = ss.Int32.div(_percent, 100);
	var r = ss.Int32.trunc(Math.floor(r1 + pc * (r2 - r1) + 0.5));
	var g = ss.Int32.trunc(Math.floor(g1 + pc * (g2 - g1) + 0.5));
	var b = ss.Int32.trunc(Math.floor(b1 + pc * (b2 - b1) + 0.5));
	return '#' + dec2Hex(r) + dec2Hex(g) + dec2Hex(b);
};
$Triangles_Help.getCursorPosition = function(ev) {
	if (!!(ev.originalEvent && ev.originalEvent.targetTouches && ev.originalEvent.targetTouches.length > 0)) {
		ev = ev.originalEvent.targetTouches[0];
	}
	if (!!(ss.isValue(ev.pageX) && ss.isValue(ev.pageY))) {
		return $Triangles_Pointer.$ctor(ev.pageX, ev.pageY, ss.Nullable.unbox(Type.cast((!!ev.wheelDelta ? (ev.wheelDelta / 40) : (!!ev.detail ? -ev.detail : 0)), ss.Int32)), ev.which === 3);
	}
	//if (ev.x != null && ev.y != null) return new { x: ev.x, y: ev.y };
	return $Triangles_Pointer.$ctor(ev.clientX, ev.clientY, ss.Nullable.unbox(Type.cast((!!ev.wheelDelta ? (ev.wheelDelta / 40) : (!!ev.detail ? -ev.detail : 0)), ss.Int32)), ev.which === 3);
};
$Triangles_Help.get_random_color = function() {
	return $Triangles_Help.colors[ss.Int32.trunc(Math.random() * $Triangles_Help.colors.length)];
};
$Triangles_Help.isPointInTriangle = function(_s, _a, _b, _c) {
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
$Triangles_Help.log = function(o) {
	//
	//function log(_cont) {
	//
	//var console = $("#txtConsole");
	//
	//
	//
	//var text = console.val();
	//
	//
	//
	//console.val(text + _cont + "\n");
	//
	//
	//
	//console.scrollTop(
	//
	//console[0].scrollHeight - console.height()
	//
	//);
	//
	//}
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.Point
var $Triangles_Point = function() {
};
$Triangles_Point.$ctor = function(x, y) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.x = x;
	$this.y = y;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.Pointer
var $Triangles_Pointer = function() {
};
$Triangles_Pointer.$ctor = function(x, y, delta, right) {
	var $this = $Triangles_Point.$ctor(x, y);
	$this.delta = 0;
	$this.right = false;
	$this.delta = delta;
	$this.right = right;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Triangles.Triangle
var $Triangles_Triangle = function(_x, _y, upsideDown, _color) {
	this.$transitionToColor = null;
	this.$transitioning = 0;
	this.selected = false;
	this.neighbors = false;
	this.highlightedNeighbors = false;
	this.glow = false;
	this.color = null;
	this.upsideDown = false;
	this.y = 0;
	this.x = 0;
	this.x = _x;
	this.y = _y;
	this.upsideDown = upsideDown;
	this.color = _color;
	this.selected = false;
	this.neighbors = false;
	this.glow = false;
	this.highlightedNeighbors = false;
};
$Triangles_Triangle.prototype = {
	inBounds: function(_x, _y) {
		_x -= $Triangles_$TriangleGame.$offset.x;
		_y -= $Triangles_$TriangleGame.$offset.y;
		if (this.upsideDown) {
			var x = this.x / 2;
			var y = this.y;
			return $Triangles_Help.isPointInTriangle($Triangles_Point.$ctor(_x, _y), $Triangles_Point.$ctor(ss.Int32.trunc(x * 60), y * $Triangles_Triangle.$triangleLength), $Triangles_Point.$ctor(ss.Int32.trunc(x * 60 + 30), y * $Triangles_Triangle.$triangleLength + $Triangles_Triangle.$triangleLength), $Triangles_Point.$ctor(ss.Int32.trunc(x * 60 - 30), y * $Triangles_Triangle.$triangleLength + $Triangles_Triangle.$triangleLength));
		}
		else {
			var x1 = (this.x - 1) / 2;
			var y1 = this.y;
			return $Triangles_Help.isPointInTriangle($Triangles_Point.$ctor(_x, _y), $Triangles_Point.$ctor(ss.Int32.trunc(x1 * 60 + 30), y1 * $Triangles_Triangle.$triangleLength + $Triangles_Triangle.$triangleLength), $Triangles_Point.$ctor(ss.Int32.trunc(x1 * 60), y1 * $Triangles_Triangle.$triangleLength), $Triangles_Point.$ctor(ss.Int32.trunc(x1 * 60 + 60), y1 * $Triangles_Triangle.$triangleLength));
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
		neighs = (this.upsideDown ? $Triangles_Triangle.$upsideDownNeighbors : $Triangles_Triangle.$rightSideUpNeighbors);
		for (var i = 0; i < neighs.length; i++) {
			if (this.x + neighs[i].x === _x && this.y + neighs[i].y === _y) {
				return true;
			}
		}
		return false;
	},
	getCurrentColor: function() {
		if (this.$transitioning + 10 >= 100) {
			this.color = this.$transitionToColor;
			this.$transitioning = 0;
		}
		if (this.$transitioning > 0) {
			return $Triangles_Help.getColor(this.color, this.$transitionToColor, this.$transitioning += 10);
		}
		return this.color;
	},
	highlightNeighbors: function(_board) {
		var neighs;
		if (this.upsideDown) {
			neighs = $Triangles_Triangle.$upsideDownNeighbors;
		}
		else {
			neighs = $Triangles_Triangle.$rightSideUpNeighbors;
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
	transitionTo: function(_toColor) {
		this.$transitionToColor = _toColor;
		this.$transitioning = 1;
	},
	draw: function(_context) {
		_context.save();
		_context.beginPath();
		_context.strokeStyle = (this.neighbors ? 'gold' : (this.selected ? 'green' : (this.glow ? 'gold' : 'black')));
		_context.lineWidth = (this.neighbors ? 9 : (this.selected ? 7 : (this.glow ? 5 : 3)));
		if (this.highlightedNeighbors) {
			_context.strokeStyle = '#352B88';
			_context.lineWidth = 12;
		}
		_context.fillStyle = this.getCurrentColor();
		if (this.upsideDown) {
			var x = this.x / 2;
			var y = this.y;
			_context.translate(x * 60, y * $Triangles_Triangle.$triangleLength);
			if (this.selected) {
				//  ctx.rotate((cur+=3)*Math.PI/180); 
			}
			_context.moveTo(0, 0);
			_context.lineTo(30, 60);
			_context.lineTo(-30, 60);
			_context.lineTo(0, 0);
		}
		else {
			var x1 = (this.x - 1) / 2;
			var y1 = this.y;
			_context.translate(x1 * 60, y1 * $Triangles_Triangle.$triangleLength);
			if (this.selected) {
				//  ctx.rotate((cur+=3)*Math.PI/180); 
			}
			_context.moveTo(0, 0);
			_context.lineTo(60, 0);
			_context.lineTo(30, 60);
			_context.lineTo(0, 0);
		}
		_context.fill();
		_context.stroke();
		if (this.neighbors || this.highlightedNeighbors) {
			_context.lineWidth = 2;
			_context.strokeStyle = '#345782';
			_context.stroke();
		}
		_context.restore();
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
		if (_board[_x][_y].upsideDown) {
			for (var l = 0; l < $Triangles_Triangle.$upsideDownNeighbors.length; l++) {
				var neighs = $Triangles_Triangle.$upsideDownNeighbors[l];
				items.addRange($Triangles_Triangle.startLikeNeighbors(_board, _x + neighs.x, _y + neighs.y, _color, _hitMap));
			}
		}
		else {
			for (var l1 = 0; l1 < $Triangles_Triangle.$rightSideUpNeighbors.length; l1++) {
				var neighs1 = $Triangles_Triangle.$rightSideUpNeighbors[l1];
				items.addRange($Triangles_Triangle.startLikeNeighbors(_board, _x + neighs1.x, _y + neighs1.y, _color, _hitMap));
			}
		}
	}
	return items;
};
Type.registerClass(null, 'Triangles.$Program', $Triangles_$Program, Object);
Type.registerClass(null, 'Triangles.$TriangleGame', $Triangles_$TriangleGame, Object);
Type.registerClass(global, 'Triangles.CanvasInformation', $Triangles_CanvasInformation, Object);
Type.registerClass(global, 'Triangles.Extensions', $Triangles_Extensions, Object);
Type.registerClass(global, 'Triangles.Help', $Triangles_Help, Object);
Type.registerClass(global, 'Triangles.Point', $Triangles_Point, Object);
Type.registerClass(global, 'Triangles.Pointer', $Triangles_Pointer);
Type.registerClass(global, 'Triangles.Triangle', $Triangles_Triangle, Object);
$Triangles_$TriangleGame.$offset = $Triangles_Point.$ctor(50, 20);
$Triangles_$TriangleGame.$size = $Triangles_Point.$ctor(700, 700);
$Triangles_CanvasInformation.$blackPixel = null;
$Triangles_Help.colors = ['#FF3700', '#7654FF', '#77FFB6', '#DAc42a', '#Ca2dFA'];
$Triangles_Triangle.$triangleLength = 60;
$Triangles_Triangle.$upsideDownNeighbors = [$Triangles_Point.$ctor(-1, 0), $Triangles_Point.$ctor(1, 0), $Triangles_Point.$ctor(-2, 0), $Triangles_Point.$ctor(2, 0), $Triangles_Point.$ctor(0, -1), $Triangles_Point.$ctor(-1, -1), $Triangles_Point.$ctor(1, -1), $Triangles_Point.$ctor(0, 1), $Triangles_Point.$ctor(-1, 1), $Triangles_Point.$ctor(1, 1), $Triangles_Point.$ctor(-2, 1), $Triangles_Point.$ctor(2, 1)];
$Triangles_Triangle.$rightSideUpNeighbors = [$Triangles_Point.$ctor(-1, 0), $Triangles_Point.$ctor(1, 0), $Triangles_Point.$ctor(-2, 0), $Triangles_Point.$ctor(2, 0), $Triangles_Point.$ctor(0, 1), $Triangles_Point.$ctor(-1, 1), $Triangles_Point.$ctor(1, 1), $Triangles_Point.$ctor(0, -1), $Triangles_Point.$ctor(-1, -1), $Triangles_Point.$ctor(1, -1), $Triangles_Point.$ctor(-2, -1), $Triangles_Point.$ctor(2, -1)];
$Triangles_$Program.$main();
