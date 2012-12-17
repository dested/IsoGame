using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using Triangles.Utility;
namespace Triangles
{
    internal class TriangleGame
    {
        public static Point Offset = new Point(160, 70);
        public static Point Size = new Point(1100, 850);
        private List<Triangle> myAllTriangles;
        private CanvasInformation myCanvas;
        private Triangle myFirstSelected;
        private Triangle[][] myTriangles;

        public TriangleGame()
        {
            myCanvas = CanvasInformation.Create((CanvasElement) Document.GetElementById("cnvGameBoard"), Size.X, Size.Y);

            myCanvas.Context.LineCap = LineCap.Round;
            myCanvas.Context.LineJoin = LineJoin.Round;

            myCanvas.Canvas.AddEventListener("contextmenu", (evt) => { evt.PreventDefault(); }, false);

            myCanvas.JCanvas.MouseDown(_ae => {
                                           var pointer = Help.GetCursorPosition(myCanvas.Canvas, _ae);

                                           Triangle selected = null;

                                           if (pointer.Right) {
                                               var neighbors = new List<Triangle>();

                                               for (var l = 0; l < myAllTriangles.Count; l++) {
                                                   myAllTriangles[l].Neighbors = false;
                                                   if (myAllTriangles[l].inBounds(pointer.X, pointer.Y)) {
                                                       if (!myAllTriangles[l].Neighbors)
                                                           neighbors = myAllTriangles[l].getLikeNeighbors(myTriangles);
                                                   }
                                               }

                                               for (var i = 0; i < neighbors.Count; i++) {
                                                   neighbors[i].Neighbors = true;
                                               }
                                           } else {
                                               for (int l = 0; l < myAllTriangles.Count; l++) {
                                                   myAllTriangles[l].Selected = myAllTriangles[l].HighlightedNeighbors = myAllTriangles[l].Neighbors = false;
                                                   if (myAllTriangles[l].inBounds(pointer.X, pointer.Y)) ( selected = myAllTriangles[l] ).Selected = true;
                                               }

                                               if (selected != null) {
                                                   if (myFirstSelected == null || !myFirstSelected.isNeighbor(selected.X, selected.Y)) {
                                                       myFirstSelected = selected;

                                                       selected.HighlightNeighbors(myTriangles);
                                                   } else {
                                                       var c2 = myFirstSelected.Color;
                                                       myFirstSelected.TransitionTo(selected.Color);
                                                       selected.TransitionTo(c2);

                                                       selected.Selected = false;
                                                       myFirstSelected = null;
                                                   }
                                               }
                                           }
                                       });
            myCanvas.JCanvas.MouseMove(_ae => {
                                           var pointer = Help.GetCursorPosition(myCanvas.Canvas, _ae);

                                           for (var l = 0; l < myAllTriangles.Count; l++) {
                                               myAllTriangles[l].Glow = false;
                                               if (myAllTriangles[l].inBounds(pointer.X, pointer.Y)) myAllTriangles[l].Glow = true;
                                           }
                                       });

            init();
            Window.SetInterval(drawBoard, 1000 / 30);
        }

        private void init()
        {
            myAllTriangles = new List<Triangle>();
            var boardWidth = 13;
            var boardHeight = 6;

            myTriangles = new Triangle[boardWidth][];

            for (var x = 0; x < boardWidth; x++) {
                myTriangles[x] = new Triangle[boardHeight];
            }

            for (var y = 0; y < boardHeight; y++) {
                for (var x = 0; x < boardWidth; x++) {
                    var off = ( ( ( y % 2 ) == 0 ) ? 1 : 0 );
                    var off2 = ( ( x + off ) % 2 ) == 0;

                    var tri = new Triangle(x, y, off2, Help.GetRandomColor());

                    myTriangles[x][y] = tri;

                    myAllTriangles.Add(tri);
                }
            }
        }

        private void drawBoard()
        {
            myCanvas.Context.Save();
            myCanvas.Context.Save();
            myCanvas.Context.FillStyle = "#222222";
            myCanvas.Context.FillRect(0, 0, Size.X, Size.Y);
            myCanvas.Context.Restore();

            myCanvas.Context.Translate(Offset.X, Offset.Y);

            var specials = new List<Triangle>();
            var specials2 = new List<Triangle>();
            var specials3 = new List<Triangle>();

            for (int l = 0; l < myAllTriangles.Count; l++) {
                if (myAllTriangles[l].Selected || myAllTriangles[l].Neighbors)
                    specials.Add(myAllTriangles[l]);
                else if (myAllTriangles[l].Glow) specials3.Add(myAllTriangles[l]);
                if (myAllTriangles[l].HighlightedNeighbors)
                    specials2.Add(myAllTriangles[l]);

                else myAllTriangles[l].Draw(myCanvas.Context);
            }

            //drawing happens sequentially, and it will draw over our highlight, so we draw those last.
            for (int l = 0; l < specials2.Count; l++) {
                specials2[l].Draw(myCanvas.Context);
            }
            for (int l = 0; l < specials.Count; l++) {
                specials[l].Draw(myCanvas.Context);
            }
            for (int l = 0; l < specials3.Count; l++) {
                specials3[l].Draw(myCanvas.Context);
            }

            myCanvas.Context.Restore();
        }
    }
}