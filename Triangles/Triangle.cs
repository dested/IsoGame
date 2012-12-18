using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using Triangles.Utility;
namespace Triangles
{
    public static class Shapes
    {
        private static TrianglePiece[] Triforce = {
                                                          new TrianglePiece(1, 0, true),
                                                          new TrianglePiece(0, 1, true),
                                                          new TrianglePiece(2, 1, true),
                                                  };


        private static TrianglePiece[] Circle = {
                                                          new TrianglePiece(0, 0, true),
                                                          new TrianglePiece(1, 0, false),
                                                          new TrianglePiece(2, 0, true),

                                                          new TrianglePiece(0, 1, false),
                                                          new TrianglePiece(1, 1, true),
                                                          new TrianglePiece(2, 1, false),
};

        private static TrianglePiece[] BigTriforce = {
                                                          new TrianglePiece(2, 0, true),
                                                          
                                                          new TrianglePiece(1, 1, true),
                                                          new TrianglePiece(3, 1, true),
                                                          
                                                          new TrianglePiece(0, 2, true),
                                                          new TrianglePiece(2, 2, true),
                                                          new TrianglePiece(4, 2, true),
                                                  };

        private static TrianglePiece[] BiggerTriforce = {
                                                          new TrianglePiece(3, 0, true),
                                                          
                                                          new TrianglePiece(2, 1, true),
                                                          new TrianglePiece(4, 1, true),

                                                          new TrianglePiece(1, 2, true),
                                                          new TrianglePiece(3, 2, true),
                                                          new TrianglePiece(5, 2, true),

                                                          new TrianglePiece(0, 3, true),
                                                          new TrianglePiece(2, 3, true),
                                                          new TrianglePiece(4, 3, true),
                                                          new TrianglePiece(6, 3, true),
                                                  };
        private static TrianglePiece[] EvenBiggerTriforce = {
                                                          new TrianglePiece(4, 0, true),
                                                          
                                                          new TrianglePiece(3, 1, true),
                                                          new TrianglePiece(5, 1, true),

                                                          new TrianglePiece(2, 2, true),
                                                          new TrianglePiece(4, 2, true),
                                                          new TrianglePiece(6, 2, true),

                                                          new TrianglePiece(1, 3, true),
                                                          new TrianglePiece(3, 3, true),
                                                          new TrianglePiece(5, 3, true),
                                                          new TrianglePiece(7, 3, true),

                                                          new TrianglePiece(0, 4, true),
                                                          new TrianglePiece(2, 4, true),
                                                          new TrianglePiece(4, 4, true),
                                                          new TrianglePiece(6, 4, true),
                                                          new TrianglePiece(8, 4, true),
                                                  };
        private static List<TrianglePiece[]> shapes = new List<TrianglePiece[]>();

        static Shapes()
        {
            shapes.Add(Triforce);
            shapes.Add(BigTriforce);
            shapes.Add(BiggerTriforce);
            shapes.Add(EvenBiggerTriforce);
            shapes.Add(Circle);
            shapes.Add(Circle.Inverse());

            var uShapes = new List<TrianglePiece[]>();
            foreach (var trianglePiecese in shapes) {
                uShapes.Add(trianglePiecese.UpsideDown());
            }
            shapes.AddRange(uShapes);
            shapes.Sort((a, b) =>
                        b.Length > a.Length ? 1 : b.Length < a.Length ? -1 : 0
                    );
        }

        public static List<Triangle> FilterToShape(List<Triangle> neighbors, Triangle goodOne)
        {
            
            foreach (var trianglePiecese in shapes) {
                foreach (var trianglePiece in trianglePiecese) {
                    var startX = trianglePiece.X; //0
                    var startY = trianglePiece.Y; //1

                    List<Triangle> perfectTriangles = new List<Triangle>();
                    perfectTriangles.Add(goodOne);
                    foreach (var piece in trianglePiecese) {
                        if (piece != trianglePiece) {
                            foreach (var neighbor in neighbors) {
                                //          6           6
                                var nX = neighbor.X - goodOne.X;
                                //          7           6
                                var nY = neighbor.Y - goodOne.Y;

                                //  0             1          1             1
                                if (nX + startX == piece.X && nY + startY == piece.Y && piece.PointUp == neighbor.PointUp) {
                                    perfectTriangles.Add(neighbor);
                                    break;
                                }
                            }
                        }
                    }
                    if (perfectTriangles.Count == trianglePiecese.Length) {
                        //good
                        return perfectTriangles;
                    }
                }
            }
            return new List<Triangle>();
        }
    }
    [Serializable]
    public class TrianglePiece
    {
        public int X { get; set; }
        public int Y { get; set; }
        public bool PointUp { get; set; }

        public TrianglePiece(int x, int y, bool pointUp)
        {
            X = x;
            Y = y;
            PointUp = pointUp;
        }
    }
    public class Triangle
    {
        public const double muliplyer = 0.6;
        public const int TriangleLength = (int) ( 100 * muliplyer );
        private static readonly Point[] PointUpNeighbors = new Point[] {
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
        private static Point[] PointDownNeighbors = new Point[] {
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
        private int spacing = (int) ( 32 * muliplyer );
        private string transitionToColor;
        public int transitioning;
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
        public bool PointUp { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
        [IntrinsicProperty]
        public int X { get; set; }

        public Triangle(int _x, int _y, bool pointUp, string _color)
        {
            X = _x;
            Y = _y;
            PointUp = pointUp;
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
            if (PointUp) {
                var x = ( X ) / 2.0;
                int y = Y;
                var __x = x * TriangleLength + x * spacing - spacing / 2.0;
                var __y = y * TriangleLength + y * spacing / 2;

                return Help.IsPointInTriangle(new Point(_x, _y),
                                              new Point((int) __x, __y),
                                              new Point((int) ( __x + TriangleLength / 2 ), __y + TriangleLength),
                                              new Point((int) ( __x - TriangleLength / 2 ), __y + TriangleLength)
                        );
            } else {
                var x = ( X - 1 ) / 2.0;
                int y = Y;
                var __x = x * TriangleLength + x * spacing;
                var __y = y * TriangleLength + y * spacing / 2;
                return Help.IsPointInTriangle(new Point(_x, _y),
                                              new Point((int) ( __x + TriangleLength / 2 ), __y + TriangleLength),
                                              new Point((int) __x, __y),
                                              new Point((int) ( __x + TriangleLength ), __y));
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
            neighs = PointUp ? PointUpNeighbors : PointDownNeighbors;

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

                if (_board[_x][_y].PointUp) {
                    for (var l = 0; l < PointUpNeighbors.Length; l++) {
                        var neighs = PointUpNeighbors[l];

                        items.AddRange(startLikeNeighbors(_board, _x + neighs.X, _y + neighs.Y, _color, _hitMap));
                    }
                } else {
                    for (var l = 0; l < PointDownNeighbors.Length; l++) {
                        var neighs = PointDownNeighbors[l];
                        items.AddRange(startLikeNeighbors(_board, _x + neighs.X, _y + neighs.Y, _color, _hitMap));
                    }
                }
            }

            return items;
        }

        public string GetCurrentColor()
        {
            var increase = 15;
            if (transitioning + increase >= 100) {
                Color = transitionToColor;
                transitioning = 0;
            }

            if (transitioning > 0) return Help.getColor(Color, transitionToColor, transitioning += increase);

            return Color;
        }

        public void HighlightNeighbors(Triangle[][] _board)
        {
            Point[] neighs;
            if (PointUp) neighs = PointUpNeighbors;
            else neighs = PointDownNeighbors;

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

        public List<Triangle> GetNeighbors(Triangle[][] _board)
        {
            Point[] neighs;
            if (PointUp) neighs = PointUpNeighbors;
            else neighs = PointDownNeighbors;
            List<Triangle> result = new List<Triangle>();

            for (var i = 0; i < neighs.Length; i++) {
                var cX = X + neighs[i].X;
                var cY = Y + neighs[i].Y;

                if (cX >= 0 && cX < _board.Length && cY >= 0 && cY < _board[0].Length) {
                    if (_board[cX][cY].Color != null)
                        result.Add(_board[cX][cY]);
                }
            }
            return result;
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
                        _context.LineWidth = 4;
                    } else _context.LineWidth = 2;
                }
            }

            var currentColor = GetCurrentColor();
            if (currentColor == null) {
                _context.Restore();
                return;
            }
            _context.FillStyle = currentColor;
            if (PointUp) {
                var x = ( X ) / 2.0;
                var y = Y;

                _context.Translate(x * TriangleLength + x * spacing - spacing / 2.0, y * TriangleLength + y * spacing / 2);

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

                _context.Translate(x * TriangleLength + x * spacing, y * TriangleLength + y * spacing / 2);

                if (Selected) {
                    //  ctx.rotate((cur+=3)*Math.PI/180); 
                }

                _context.MoveTo(0, 0);
                _context.LineTo(TriangleLength, 0);
                _context.LineTo(TriangleLength / 2, TriangleLength);
                _context.LineTo(0, 0);
            }

            _context.Fill();

            _context.LineWidth *= 2;
            if (Glow) {
                _context.LineWidth = 8;
                if (transitioning > 0) _context.StrokeStyle = "white";
                else _context.StrokeStyle = "black";
                _context.Stroke();
                _context.LineWidth = 4;
                _context.StrokeStyle = "gold";
                _context.Stroke();
            } else if (Selected) {
                _context.Stroke();
                _context.LineWidth = 4;
                _context.StrokeStyle = "black";
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

        public void Pop()
        {
            Color = null;
        }
    }
}