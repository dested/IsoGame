using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using Triangles.Utility;
namespace Triangles
{
    public class Triangle
    {
        private const int TriangleLength = 60;
        private static readonly Point[] UpsideDownNeighbors = new Point[] {
                                                                                  new Point(-1, +0),
                                                                                  new Point(+1, +0),
                                                                                  new Point(-2, +0),
                                                                                  new Point(+2, +0),
                                                                                  new Point(+0, -1),
                                                                                  new Point(-1, -1),
                                                                                  new Point(+1, -1),
                                                                                  new Point(+0, +1),
                                                                                  new Point(-1, +1),
                                                                                  new Point(+1, +1),
                                                                                  new Point(-2, +1),
                                                                                  new Point(+2, +1)
                                                                          };
        private static Point[] RightSideUpNeighbors = new Point[] {
                                                                          new Point(-1, +0),
                                                                          new Point(+1, +0),
                                                                          new Point(-2, +0),
                                                                          new Point(+2, +0),
                                                                          new Point(+0, +1),
                                                                          new Point(-1, +1),
                                                                          new Point(+1, +1),
                                                                          new Point(+0, -1),
                                                                          new Point(-1, -1),
                                                                          new Point(+1, -1),
                                                                          new Point(-2, -1),
                                                                          new Point(+2, -1)
                                                                  };
        private string transitionToColor;
        private int transitioning;
        [IntrinsicProperty]
        public bool Selected { get; set; }
        [IntrinsicProperty]
        public bool Neighbors { get; set; }
        [IntrinsicProperty]
        public bool HighlightedNeighbors { get; set; }
        [IntrinsicProperty]
        public bool Glow { get; set; }
        [IntrinsicProperty]
        public string Color { get; set; }
        [IntrinsicProperty]
        public bool UpsideDown { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
        [IntrinsicProperty]
        public int X { get; set; }

        public Triangle(int _x, int _y, bool upsideDown, string _color)
        {
            X = _x;
            Y = _y;
            UpsideDown = upsideDown;
            Color = _color;
            Selected = false;
            Neighbors = false;
            Glow = false;
            HighlightedNeighbors = false;
        }

        public bool inBounds(int _x, int _y)
        {
            _x -= TriangleGame.Offset.X;
            _y -= TriangleGame.Offset.Y;
            if (UpsideDown) {
                var x = ( X ) / 2.0;
                int y = Y;
                return Help.IsPointInTriangle(new Point(_x, _y),
                                              new Point((int) ( x * TriangleLength ), y * TriangleLength),
                                              new Point((int) ( x * TriangleLength + TriangleLength / 2 ), y * TriangleLength + TriangleLength),
                                              new Point((int) ( x * TriangleLength - TriangleLength / 2 ), y * TriangleLength + TriangleLength)
                        );
            } else {
                var x = ( X - 1 ) / 2.0;
                int y = Y;
                return Help.IsPointInTriangle(new Point(_x, _y),
                                              new Point((int) ( x * TriangleLength + TriangleLength / 2 ), y * TriangleLength + TriangleLength),
                                              new Point((int) ( x * TriangleLength ), y * TriangleLength),
                                              new Point((int) ( x * TriangleLength + TriangleLength ), y * TriangleLength));
            }
        }

        public List<Triangle> getLikeNeighbors(Triangle[][] _board)
        {
            var hitmap = new bool[_board.Length][];
            for (var x = 0; x < _board.Length; x++) {
                hitmap[x] = new bool[_board[x].Length];
            }

            return startLikeNeighbors(_board, X, Y, Color, hitmap);
        }

        public bool isNeighbor(int _x, int _y)
        {
            Point[] neighs;
            neighs = UpsideDown ? UpsideDownNeighbors : RightSideUpNeighbors;

            for (var i = 0; i < neighs.Length; i++) {
                if (X + neighs[i].X == _x && Y + neighs[i].Y == _y) return true;
            }
            return false;
        }

        public static List<Triangle> startLikeNeighbors(Triangle[][] _board, int _x, int _y, string _color, bool[][] _hitMap)
        {
            //log("x: " + _x + " y: " + _y + "   color: " + _color); 
            var items = new List<Triangle>();
            if (_x >= 0 && _x < _board.Length && _y >= 0 && _y < _board[0].Length) {
                if (_hitMap[_x][_y]) return items;

                _hitMap[_x][_y] = true;

                if (_board[_x][_y].Color == _color) items.Add(_board[_x][_y]);
                else return items;

                if (_board[_x][_y].UpsideDown) {
                    for (var l = 0; l < UpsideDownNeighbors.Length; l++) {
                        var neighs = UpsideDownNeighbors[l];

                        items.AddRange(startLikeNeighbors(_board, _x + neighs.X, _y + neighs.Y, _color, _hitMap));
                    }
                } else {
                    for (var l = 0; l < RightSideUpNeighbors.Length; l++) {
                        var neighs = RightSideUpNeighbors[l];
                        items.AddRange(startLikeNeighbors(_board, _x + neighs.X, _y + neighs.Y, _color, _hitMap));
                    }
                }
            }

            return items;
        }

        public string GetCurrentColor()
        {
            if (transitioning + 10 >= 100) {
                Color = transitionToColor;
                transitioning = 0;
            }

            if (transitioning > 0) return Help.getColor(Color, transitionToColor, transitioning += 5);

            return Color;
        }

        public void HighlightNeighbors(Triangle[][] _board)
        {
            Point[] neighs;
            if (UpsideDown) neighs = UpsideDownNeighbors;
            else neighs = RightSideUpNeighbors;

            for (var j = 0; j < _board.Length; j++) {
                for (var k = 0; k < _board[j].Length; k++) {
                    _board[j][k].HighlightedNeighbors = false;
                }
            }

            for (var i = 0; i < neighs.Length; i++) {
                var cX = X + neighs[i].X;
                var cY = Y + neighs[i].Y;

                if (cX >= 0 && cX < _board.Length && cY >= 0 && cY < _board[0].Length) _board[cX][cY].HighlightedNeighbors = true;
            }
        }

        public void TransitionTo(string _toColor)
        {
            transitionToColor = _toColor;
            transitioning = 1;
        }

        public void Draw(CanvasContext2D _context)
        {
            _context.Save();
            _context.BeginPath();
            //worst code
            if (Neighbors) _context.StrokeStyle = "#0C00CC";
            else {
                if (Selected) _context.StrokeStyle = "#FAFAFA";
                else {
                    if (Glow) _context.StrokeStyle = "gold";
                    else _context.StrokeStyle = "black";
                }
            }
            if (Neighbors) _context.LineWidth = 9;
            else {
                if (Selected) _context.LineWidth = 7;
                else {
                    if (Glow) _context.LineWidth = 5;
                    else if (HighlightedNeighbors) {
                        _context.StrokeStyle = "#FcFcFc";
                        _context.LineWidth = 6;
                    } else _context.LineWidth = 3;
                }
            }

            _context.FillStyle = GetCurrentColor();
            if (UpsideDown) {
                var x = ( X ) / 2.0;
                var y = Y;

                _context.Translate(x * TriangleLength, y * TriangleLength);

                if (Selected) {
                    //  ctx.rotate((cur+=3)*Math.PI/180); 
                }

                _context.MoveTo(0, 0);
                _context.LineTo(TriangleLength / 2, TriangleLength);
                _context.LineTo(-TriangleLength / 2, TriangleLength);
                _context.LineTo(0, 0);
            } else {
                var x = ( X - 1 ) / 2.0;
                var y = Y;
                _context.Translate(x * TriangleLength, y * TriangleLength);

                if (Selected) {
                    //  ctx.rotate((cur+=3)*Math.PI/180); 
                }

                _context.MoveTo(0, 0);
                _context.LineTo(TriangleLength, 0);
                _context.LineTo(TriangleLength / 2, TriangleLength);
                _context.LineTo(0, 0);
            }

            _context.Fill();

            if (Glow) {
                _context.LineWidth = 8;
                if (transitioning > 0) _context.StrokeStyle = "white";
                else _context.StrokeStyle = "black";
                _context.Stroke();
                _context.LineWidth = 4;
                _context.StrokeStyle = "gold";
                _context.Stroke();
            } else
                _context.Stroke();

            if (( Neighbors || HighlightedNeighbors ) && !Glow) {
                _context.LineWidth = 2;
                _context.StrokeStyle = "#345782";
                _context.Stroke();
            }
            if (Neighbors) {
                _context.StrokeStyle = "black";
                _context.LineWidth = 9;
                _context.Stroke();

                _context.StrokeStyle = "white";
                _context.LineWidth = 4;
                _context.Stroke();
            }
            _context.Restore();
        }
    }
}