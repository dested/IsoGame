////////////////////////////////////////////////////////////////////////////////
// Isos.Program
var $Isos_$Program = function() {
};
$Isos_$Program.$main = function() {
	$(function() {
		new $Isos_IsoGame();
	});
};
////////////////////////////////////////////////////////////////////////////////
// Isos.Animate
var $Isos_Animate = function() {
};
$Isos_Animate.between = function(start, end, step, speed, run) {
	var callback = null;
	if (start < end) {
		callback = function() {
			run(start);
			if (start >= end) {
				run(end);
				return;
			}
			start += step;
			window.setTimeout(callback, speed);
		};
	}
	else {
		callback = function() {
			run(start);
			if (start <= end) {
				run(end);
				return;
			}
			start -= step;
			window.setTimeout(callback, speed);
		};
	}
	window.setTimeout(callback, speed);
};
////////////////////////////////////////////////////////////////////////////////
// Isos.Animate.AnimationSpeed
var $Isos_Animate$AnimationSpeed = function() {
};
$Isos_Animate$AnimationSpeed.prototype = { slow: 60, medium: 40, fast: 20 };
Type.registerEnum(global, 'Isos.Animate$AnimationSpeed', $Isos_Animate$AnimationSpeed, false);
////////////////////////////////////////////////////////////////////////////////
// Isos.Block
var $Isos_Block = function(horizontalRadius, verticalRadius, color) {
	this.$left = null;
	this.$myContext = null;
	this.$right = null;
	this.$startxxx = 0;
	this.$startyyy = 0;
	this.$top = null;
	this.$1$HorizontalLengthField = 0;
	this.$1$VerticalLengthField = 0;
	this.$1$ColorField = null;
	this.$1$RightWallField = null;
	this.$1$LeftWallField = null;
	this.$1$TopWallField = null;
	this.set_horizontalLength(horizontalRadius);
	this.set_verticalLength(verticalRadius);
	this.set_color(color);
};
$Isos_Block.prototype = {
	get_horizontalLength: function() {
		return this.$1$HorizontalLengthField;
	},
	set_horizontalLength: function(value) {
		this.$1$HorizontalLengthField = value;
	},
	get_verticalLength: function() {
		return this.$1$VerticalLengthField;
	},
	set_verticalLength: function(value) {
		this.$1$VerticalLengthField = value;
	},
	get_color: function() {
		return this.$1$ColorField;
	},
	set_color: function(value) {
		this.$1$ColorField = value;
	},
	get_rightWall: function() {
		return this.$1$RightWallField;
	},
	set_rightWall: function(value) {
		this.$1$RightWallField = value;
	},
	get_leftWall: function() {
		return this.$1$LeftWallField;
	},
	set_leftWall: function(value) {
		this.$1$LeftWallField = value;
	},
	get_topWall: function() {
		return this.$1$TopWallField;
	},
	set_topWall: function(value) {
		this.$1$TopWallField = value;
	},
	build: function(context, X, Y) {
		this.$myContext = context;
		var x = X;
		var y = Y;
		var xxx = ((y % 2 === 1) ? ((x + 0.5) * 60) : (x * $Isos_Block.armLength)) + $Isos_IsoGame.offset.x;
		var yyy = y * $Isos_Block.armLength / 4 + $Isos_IsoGame.offset.y;
		this.$startxxx = xxx;
		this.$startyyy = yyy;
		var set = context.set();
		var $t1 = this.buildLeft(context);
		this.set_leftWall($t1);
		set.push($t1);
		var $t2 = this.buildRight(context);
		this.set_rightWall($t2);
		set.push($t2);
		var $t3 = this.buildTop(context);
		this.set_topWall($t3);
		set.push($t3);
		set.mouseover(function(e) {
			set.attr({ 'stroke-width': 3 });
		});
		set.mouseout(function(e1) {
			set.attr({ 'stroke-width': 1 });
		});
		set.attr({ 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
		set.attr({ fill: this.get_color(), 'stroke-width': 1, stroke: 'black' });
		return set;
	},
	buildLeft: function(_context) {
		var xxx = this.$startxxx;
		var yyy = this.$startyyy;
		if (ss.isValue(this.$left)) {
			this.$left.attr('path', String.format('M{0} {1}L{2} {3}L{4} {5}L{6} {7}L{0} {1}', xxx - 30 * this.get_horizontalLength(), yyy, xxx, yyy + 15 * this.get_horizontalLength(), xxx, yyy - 30 * this.get_verticalLength(), xxx - 30 * this.get_horizontalLength(), yyy - 30 * this.get_verticalLength()));
			return null;
		}
		var element = this.$left = _context.path(String.format('M{0} {1}L{2} {3}L{4} {5}L{6} {7}L{0} {1}', xxx - 30 * this.get_horizontalLength(), yyy, xxx, yyy + 15 * this.get_horizontalLength(), xxx, yyy - 30 * this.get_verticalLength(), xxx - 30 * this.get_horizontalLength(), yyy - 30 * this.get_verticalLength()));
		return element;
	},
	buildRight: function(_context) {
		var xxx = this.$startxxx;
		var yyy = this.$startyyy;
		if (ss.isValue(this.$right)) {
			this.$right.attr('path', String.format('M{0} {1}L{2} {3}L{4} {5}L{6} {7}L{0} {1}', xxx + 30 * this.get_horizontalLength(), yyy, xxx, yyy + 15 * this.get_horizontalLength(), xxx, yyy - 30 * this.get_verticalLength(), xxx + 30 * this.get_horizontalLength(), yyy - 30 * this.get_verticalLength()));
			return null;
		}
		var element = this.$right = _context.path(String.format('M{0} {1}L{2} {3}L{4} {5}L{6} {7}L{0} {1}', xxx + 30 * this.get_horizontalLength(), yyy, xxx, yyy + 15 * this.get_horizontalLength(), xxx, yyy - 30 * this.get_verticalLength(), xxx + 30 * this.get_horizontalLength(), yyy - 30 * this.get_verticalLength()));
		return element;
	},
	buildTop: function(_context) {
		var xxx = this.$startxxx;
		var yyy = this.$startyyy;
		yyy -= 30 * this.get_verticalLength();
		if (ss.isValue(this.$top)) {
			this.$top.attr('path', String.format('M{0} {1}L{2} {3}L{4} {5}L{6} {7}L{0} {1}', xxx - 30 * this.get_horizontalLength(), yyy, xxx, yyy - 15 * this.get_horizontalLength(), xxx + 30 * this.get_horizontalLength(), yyy, xxx, yyy + 15 * this.get_horizontalLength()));
			return null;
		}
		var element = this.$top = _context.path(String.format('M{0} {1}L{2} {3}L{4} {5}L{6} {7}L{0} {1}', xxx - 30 * this.get_horizontalLength(), yyy, xxx, yyy - 15 * this.get_horizontalLength(), xxx + 30 * this.get_horizontalLength(), yyy, xxx, yyy + 15 * this.get_horizontalLength()));
		return element;
	},
	click: function(wall) {
		switch (wall) {
			case 0: {
				$Isos_Animate.between(this.get_horizontalLength(), this.get_horizontalLength() + 0.5, 0.0799999982118607, 20, Function.mkdel(this, function(f) {
					this.set_horizontalLength(f);
					if (this.get_verticalLength() < 0.600000023841858) {
						this.set_verticalLength(0.600000023841858);
						return;
					}
					this.buildLeft(this.$myContext);
					this.buildRight(this.$myContext);
					this.buildTop(this.$myContext);
				}));
				break;
			}
			case 1: {
				$Isos_Animate.between(this.get_horizontalLength(), this.get_horizontalLength() - 0.5, 0.0799999982118607, 20, Function.mkdel(this, function(f1) {
					this.set_horizontalLength(f1);
					if (this.get_horizontalLength() < 0.600000023841858) {
						this.set_horizontalLength(0.600000023841858);
						return;
					}
					this.buildLeft(this.$myContext);
					this.buildRight(this.$myContext);
					this.buildTop(this.$myContext);
				}));
				break;
			}
			case 2: {
				$Isos_Animate.between(this.get_verticalLength(), this.get_verticalLength() + 0.5, 0.0799999982118607, 20, Function.mkdel(this, function(f2) {
					this.set_verticalLength(f2);
					if (this.get_horizontalLength() < 0.600000023841858) {
						this.set_verticalLength(0.600000023841858);
						return;
					}
					this.buildLeft(this.$myContext);
					this.buildRight(this.$myContext);
					this.buildTop(this.$myContext);
				}));
				break;
			}
		}
	}
};
$Isos_Block.buildBottomEmpty = function(_context, x, y) {
	var xxx = ((y % 2 === 1) ? ((x + 0.5) * 60) : (x * $Isos_Block.armLength)) + $Isos_IsoGame.offset.x;
	var yyy = y * $Isos_Block.armLength / 4 + $Isos_IsoGame.offset.y;
	var em = _context.set();
	var elem;
	elem = _context.path(String.format('M{0} {1}L{2} {3}L{4} {5}L{6} {7}L{0} {1}', xxx - 30, yyy, xxx, yyy - 15, xxx + 30, yyy, xxx, yyy + 15));
	elem.attr({ fill: 'rgba(0,0,0,0)', 'stroke-width': 1, stroke: 'black' });
	elem.mouseover(function(e) {
		elem.attr({ fill: 'rgba(0,0,0,0)', 'stroke-width': 4, stroke: 'black' });
	});
	elem.mouseout(function(e1) {
		elem.attr({ fill: 'rgba(0,0,0,0)', 'stroke-width': 1, stroke: 'black' });
	});
	em.push(_context.circle(xxx - 30, yyy, 3));
	//            em.Push(_context.Circle(xxx, yyy - ArmLength / 4, 3));
	//            em.Push(_context.Circle(xxx + ArmLength / 2, yyy, 3));
	//            em.Push(_context.Circle(xxx, yyy + ArmLength / 4, 3));
	em.attr({ 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
	em.attr({ fill: 'black', 'stroke-width': 4, stroke: 'black' });
};
////////////////////////////////////////////////////////////////////////////////
// Isos.Iso
var $Isos_Iso = function(_x, _y, _color, _context) {
	this.selected = false;
	this.neighbors = false;
	this.highlightedNeighbors = false;
	this.glow = false;
	this.color = null;
	this.y = 0;
	this.x = 0;
	this.blocks = [];
	this.x = _x;
	this.y = _y;
	this.color = _color;
	this.selected = false;
	this.neighbors = false;
	this.glow = false;
	this.highlightedNeighbors = false;
	var element;
	if (Math.random() * 100 < 70) {
		var block = new $Isos_Block(Math.min(Math.random(), 0.600000023841858), Math.min(Math.random(), 0.600000023841858), this.color);
		this.blocks.add(block);
		element = block.build(_context, this.x, this.y);
		block.get_leftWall().mouseover(function(e) {
			element.attr({ 'stroke-width': 3 });
		});
		block.get_leftWall().mouseout(function(e1) {
			element.attr({ 'stroke-width': 1 });
		});
		block.get_leftWall().mousedown(function(e2) {
			block.click(0);
		});
		block.get_rightWall().mouseover(function(e3) {
			element.attr({ 'stroke-width': 3 });
		});
		block.get_rightWall().mouseout(function(e4) {
			element.attr({ 'stroke-width': 1 });
		});
		block.get_rightWall().mousedown(function(e5) {
			block.click(1);
		});
		block.get_topWall().mouseover(function(e6) {
			element.attr({ 'stroke-width': 3 });
		});
		block.get_topWall().mouseout(function(e7) {
			element.attr({ 'stroke-width': 1 });
		});
		block.get_topWall().mousedown(function(e8) {
			block.click(2);
		});
	}
};
////////////////////////////////////////////////////////////////////////////////
// Isos.IsoGame
var $Isos_IsoGame = function() {
	this.$boardHeight = 23;
	this.$boardWidth = 30;
	this.$myCanvas = null;
	this.$myIsoGrid = null;
	this.$myIsoList = null;
	$Isos_IsoGame.instance = this;
	var stats = new xStats();
	document.body.insertBefore(stats.element, document.body.childNodes[0]);
	$('.xstats').css('position', 'absolute');
	this.$myCanvas = $Isos_Utility_CanvasInformation.create$1(document.getElementById('cnvGameBoard'), $Isos_IsoGame.size.x, $Isos_IsoGame.size.y);
	//   myCanvas.Canvas.AddEvent("contextmenu", (evt) => { evt.PreventDefault(); });
	this.$init();
	this.$myCanvas.canvas.style.backgroundColor = '#C6F3FF';
	KeyboardJS.bind.key('ctrl', Function.mkdel(this, function() {
		for (var l = 0; l < this.$myIsoList.length; l++) {
			var iso = this.$myIsoList[l];
			for (var $t1 = 0; $t1 < iso.blocks.length; $t1++) {
				var block = iso.blocks[$t1];
				block.set_horizontalLength(1);
				block.set_color(iso.color);
				block.set_verticalLength(1);
				block.build(this.$myCanvas.context, iso.x, iso.y);
			}
		}
	}), function() {
	});
	KeyboardJS.bind.key('up', Function.mkdel(this, function() {
		var tot = 0;
		window.setInterval(Function.mkdel(this, function() {
			tot++;
			for (var x = 0; x < this.$myIsoGrid.length; x++) {
				var x1 = { $: x };
				var curf = { $: ((tot % 10 < 5) ? 0.100000001490116 : -0.100000001490116) };
				window.setTimeout(Function.mkdel({ x1: x1, curf: curf, $this: this }, function() {
					for (var y = 0; y < this.$this.$myIsoGrid[this.x1.$].length; y++) {
						var iso1 = this.$this.$myIsoGrid[this.x1.$][y];
						for (var $t2 = 0; $t2 < iso1.blocks.length; $t2++) {
							var block1 = iso1.blocks[$t2];
							block1.set_verticalLength(block1.get_verticalLength() + this.curf.$);
							block1.set_color(iso1.color);
							block1.build(this.$this.$myCanvas.context, iso1.x, iso1.y);
						}
					}
				}), x * 100);
			}
		}), ss.Int32.trunc(this.$myIsoGrid.length * 100 * 0.7));
	}), function() {
	});
	KeyboardJS.bind.key('shift', Function.mkdel(this, function() {
		for (var l1 = 0; l1 < this.$myIsoList.length; l1++) {
			var iso2 = this.$myIsoList[l1];
			for (var $t3 = 0; $t3 < iso2.blocks.length; $t3++) {
				var block2 = iso2.blocks[$t3];
				block2.set_color(iso2.color);
				block2.set_horizontalLength(Math.random());
				block2.set_verticalLength(Math.random());
				block2.build(this.$myCanvas.context, iso2.x, iso2.y);
			}
		}
	}), function() {
	});
};
$Isos_IsoGame.prototype = {
	mouseOver: function(Iso) {
		for (var l = 0; l < this.$myIsoList.length; l++) {
			this.$myIsoList[l].glow = false;
			if (ss.referenceEquals(this.$myIsoList[l], Iso)) {
				this.$myIsoList[l].glow = true;
			}
		}
	},
	mouseDown: function(pointer, Iso) {
		var selected = null;
		if (!pointer.right) {
		}
		else {
		}
	},
	$init: function() {
		this.$myIsoList = [];
		this.$myIsoGrid = new Array(this.$boardWidth);
		for (var x = 0; x < this.$boardWidth; x++) {
			this.$myIsoGrid[x] = new Array(this.$boardHeight);
		}
		for (var y = 0; y < this.$boardHeight; y++) {
			for (var x1 = 0; x1 < this.$boardWidth; x1++) {
				$Isos_Block.buildBottomEmpty(this.$myCanvas.context, x1, y);
			}
		}
		for (var y1 = 0; y1 < this.$boardHeight; y1++) {
			for (var x2 = 0; x2 < this.$boardWidth; x2++) {
				var tri = new $Isos_Iso(x2, y1, $Isos_Utility_Help.getRandomColor(), this.$myCanvas.context);
				this.$myIsoGrid[x2][y1] = tri;
				this.$myIsoList.add(tri);
			}
		}
		window.scrollTo(0, 0);
	}
};
////////////////////////////////////////////////////////////////////////////////
// Isos.IsoPiece
var $Isos_IsoPiece = function() {
};
$Isos_IsoPiece.$ctor = function(x, y, pointUp) {
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
// Isos.RaphaelBoundingBox
var $Isos_RaphaelBoundingBox = function() {
};
$Isos_RaphaelBoundingBox.createInstance = function() {
	return $Isos_RaphaelBoundingBox.$ctor();
};
$Isos_RaphaelBoundingBox.$ctor = function() {
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
// Isos.Wall
var $Isos_Wall = function() {
};
$Isos_Wall.prototype = { left: 0, right: 1, top: 2 };
Type.registerEnum(global, 'Isos.Wall', $Isos_Wall, false);
////////////////////////////////////////////////////////////////////////////////
// Isos.Utility.CanvasInformation
var $Isos_Utility_CanvasInformation = function(context, domCanvas) {
	this.context = null;
	this.jCanvas = null;
	this.canvas = null;
	this.context = context;
	this.jCanvas = domCanvas;
	this.canvas = domCanvas[0];
};
$Isos_Utility_CanvasInformation.create = function(w, h) {
	var canvas = document.createElement('canvas');
	return $Isos_Utility_CanvasInformation.create$1(canvas, w, h);
};
$Isos_Utility_CanvasInformation.create$1 = function(canvas, w, h) {
	if (w === 0) {
		w = 1;
	}
	if (h === 0) {
		h = 1;
	}
	return new $Isos_Utility_CanvasInformation(Raphael(canvas, w, h), $(canvas));
};
////////////////////////////////////////////////////////////////////////////////
// Isos.Utility.Extensions
var $Isos_Utility_Extensions = function() {
};
$Isos_Utility_Extensions.addEvent = function(element, eventName, listener) {
	if (!!ss.isValue(element.addEventListener)) {
		element.addEventListener(eventName, listener, false);
	}
	else {
		element.attachEvent(eventName, function() {
			listener(window.event);
		});
	}
};
$Isos_Utility_Extensions.upsideDown = function(items) {
	var pieces = [];
	var highest = 0;
	for (var $t1 = 0; $t1 < items.length; $t1++) {
		var IsoPiece = items[$t1];
		if (IsoPiece.y > highest) {
			highest = IsoPiece.y;
		}
	}
	for (var $t2 = 0; $t2 < items.length; $t2++) {
		var IsoPiece1 = items[$t2];
		pieces.add($Isos_IsoPiece.$ctor(IsoPiece1.x, highest - IsoPiece1.y, !IsoPiece1.pointUp));
	}
	return pieces;
};
$Isos_Utility_Extensions.inverse = function(items) {
	var pieces = [];
	for (var $t1 = 0; $t1 < items.length; $t1++) {
		var IsoPiece = items[$t1];
		pieces.add($Isos_IsoPiece.$ctor(IsoPiece.x, IsoPiece.y, !IsoPiece.pointUp));
	}
	return pieces;
};
$Isos_Utility_Extensions.takeRandom = function(T) {
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
$Isos_Utility_Extensions.withData = function(T, T2) {
	return function(item, data) {
		return new (Type.makeGenericType($Isos_Utility_ExtraData$2, [T, T2]))(item, data);
	};
};
$Isos_Utility_Extensions.percent$1 = function(num) {
	return num + '%';
};
$Isos_Utility_Extensions.percent = function(num) {
	return num + '%';
};
////////////////////////////////////////////////////////////////////////////////
// Isos.Utility.ExtraData
var $Isos_Utility_ExtraData$2 = function(T, T2) {
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
	Type.registerGenericClassInstance($type, $Isos_Utility_ExtraData$2, [T, T2], function() {
		return Object;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'Isos.Utility.ExtraData$2', $Isos_Utility_ExtraData$2, 2);
////////////////////////////////////////////////////////////////////////////////
// Isos.Utility.Help
var $Isos_Utility_Help = function() {
};
$Isos_Utility_Help.getColor = function(_start, _end, _percent) {
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
$Isos_Utility_Help.getCursorPosition = function(ev) {
	if (!!(ev.originalEvent && ev.originalEvent.targetTouches && ev.originalEvent.targetTouches.length > 0)) {
		ev = ev.originalEvent.targetTouches[0];
	}
	return $Isos_Utility_Pointer.$ctor(0, 0, ss.Nullable.unbox(Type.cast((!!ev.wheelDelta ? (ev.wheelDelta / 40) : (!!ev.detail ? -ev.detail : 0)), ss.Int32)), ev.button === 2);
};
$Isos_Utility_Help.getRandomColor = function() {
	return $Isos_Utility_Help.colors[ss.Int32.trunc(Math.random() * $Isos_Utility_Help.colors.length)];
};
$Isos_Utility_Help.isPointInIso = function(_s, _a, _b, _c) {
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
$Isos_Utility_Help.log = function(_cont) {
	var console = $('#txtConsole');
	var text = console.val();
	console.val(text + _cont + '\n');
	console.scrollTop(console[0].scrollHeight - console.height());
};
////////////////////////////////////////////////////////////////////////////////
// Isos.Utility.Point
var $Isos_Utility_Point = function() {
};
$Isos_Utility_Point.$ctor = function(x, y) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.x = x;
	$this.y = y;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Isos.Utility.Pointer
var $Isos_Utility_Pointer = function() {
};
$Isos_Utility_Pointer.$ctor = function(x, y, delta, right) {
	var $this = $Isos_Utility_Point.$ctor(x, y);
	$this.delta = 0;
	$this.right = false;
	$this.delta = delta;
	$this.right = right;
	return $this;
};
Type.registerClass(null, 'Isos.$Program', $Isos_$Program, Object);
Type.registerClass(global, 'Isos.Animate', $Isos_Animate, Object);
Type.registerClass(global, 'Isos.Block', $Isos_Block, Object);
Type.registerClass(global, 'Isos.Iso', $Isos_Iso, Object);
Type.registerClass(global, 'Isos.IsoGame', $Isos_IsoGame, Object);
Type.registerClass(global, 'Isos.IsoPiece', $Isos_IsoPiece, Object);
Type.registerClass(global, 'Isos.RaphaelBoundingBox', $Isos_RaphaelBoundingBox, Object);
Type.registerClass(global, 'Isos.Utility.CanvasInformation', $Isos_Utility_CanvasInformation, Object);
Type.registerClass(global, 'Isos.Utility.Extensions', $Isos_Utility_Extensions, Object);
Type.registerClass(global, 'Isos.Utility.Help', $Isos_Utility_Help, Object);
Type.registerClass(global, 'Isos.Utility.Point', $Isos_Utility_Point, Object);
Type.registerClass(global, 'Isos.Utility.Pointer', $Isos_Utility_Pointer);
$Isos_Block.armLength = 60;
$Isos_Iso.multiplyer = 0.6;
$Isos_IsoGame.instance = null;
$Isos_IsoGame.offset = $Isos_Utility_Point.$ctor(50, 60);
$Isos_IsoGame.size = $Isos_Utility_Point.$ctor(1800, 1350);
$Isos_Utility_CanvasInformation.$blackPixel = null;
$Isos_Utility_Help.colors = ['#FF0000', '#00FF00', '#0000FF', '#880088', '#888800', '#008888'];
$Isos_$Program.$main();
