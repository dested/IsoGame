using System;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using CommonWebLibraries;
using Isos.Utility;
using WebLibraries;
using jQueryApi;
namespace Isos
{
    public class IsoGame
    {
        public static IsoGame Instance;
        public static Point Offset = new Point(50, 60);
        public static Point Size = new Point(1800, 1350);
        private int boardHeight = (int)(7 * 2 / Iso.multiplyer);
        private int boardWidth = (int)(9 *2/ Iso.multiplyer);
        private CanvasInformation myCanvas;
        private Iso[][] myIsoGrid;
        private List<Iso> myIsoList;

        public IsoGame()
        {
            Instance = this;
            var stats = new XStats();
            Document.Body.InsertBefore(stats.Element,Document.Body.ChildNodes[0]);
            jQuery.Select(".xstats").CSS("position", "absolute");

            myCanvas = CanvasInformation.Create(Document.GetElementById("cnvGameBoard"), Size.X, Size.Y);
         //   myCanvas.Canvas.AddEvent("contextmenu", (evt) => { evt.PreventDefault(); });





            init();
            myCanvas.Canvas.Style.BackgroundColor = "#C6F3FF";
            KeyboardJS.Instance().Bind.Key("ctrl",
                                           () =>
                                           {
                                               for (int l = 0; l < myIsoList.Count; l++)
                                               {
                                                   var iso = myIsoList[l];
                                                   foreach (var block in iso.Blocks)
                                                   {
                                                       block.HorizontalLength = 1;
                                                       block.Color = iso.Color;
                                                       block.VerticalLength = 1;
                                                       block.build(myCanvas.Context, iso.X, iso.Y);
                                                   }
                                               }
                                           },
                                           () =>
                                           {

                                           });
            KeyboardJS.Instance().Bind.Key("up",
                                           () => {
                                               int tot = 0;
                                               Window.SetInterval(() => {
                                                                      tot++;

                                                                      for (int x = 0; x < myIsoGrid.Length; x++) {
                                                                          int x1 = x;
                                                                          float curf = tot % 10 < 5 ? .1f : -.1f;
                                                                          Window.SetTimeout(() => {

                                                                                                for (int y = 0; y < myIsoGrid[x1].Length; y++) {
                                                                                                    var iso = myIsoGrid[x1][y];
                                                                                                    foreach (var block in iso.Blocks) {
                                                                                                        block.VerticalLength += curf;
                                                                                                        block.Color = iso.Color;
                                                                                                        block.build(myCanvas.Context, iso.X, iso.Y);
                                                                                                    }

                                                                                                }

                                                                                            },
                                                                                            x * 100);
                                                                      }



                                               }, (int) ( myIsoGrid.Length*100*.7 ));
                                           },
                                           () =>
                                           {

                                           });
            KeyboardJS.Instance().Bind.Key("shift",
                                           () =>
                                           {
                                               for (int l = 0; l < myIsoList.Count; l++)
                                               {
                                                   var iso = myIsoList[l];
                                                   foreach (var block in iso.Blocks) {
                                                       block.Color = iso.Color;
                                                       block.HorizontalLength = (float) Math.Random();
                                                       block.VerticalLength = (float)Math.Random();
                                                       block.build(myCanvas.Context, iso.X, iso.Y);
                                                   }
                                               }
                                           },
                                           () =>
                                           {

                                           });



        }

        public void mouseOver(Iso Iso)
        {

            for (var l = 0; l < myIsoList.Count; l++)
            {
                myIsoList[l].Glow = false;
                if (myIsoList[l] == Iso) myIsoList[l].Glow = true;
            }
        }

        public void mouseDown(Pointer pointer, Iso Iso)
        {

            Iso selected = null;

            if (!pointer.Right)
            {
             }
            else
            {
 
            }
        }

 
 
 
        private void init()
        {
            myIsoList = new List<Iso>();

            myIsoGrid = new Iso[boardWidth][];

            for (var x = 0; x < boardWidth; x++)
            {
                myIsoGrid[x] = new Iso[boardHeight];
            }



            for (var y = 0; y < boardHeight; y++)
            {
                for (var x = 0; x < boardWidth; x++)
                {
                    Block.buildBottomEmpty(myCanvas.Context, x, y);
                }
            }


            for (var y = 0; y < boardHeight; y++)
            {
                for (var x = 0; x < boardWidth; x++)
                {

                    var tri = new Iso(x, y, Help.GetRandomColor(), myCanvas.Context);

                    myIsoGrid[x][y] = tri;

                    myIsoList.Add(tri);
                }
            }
            Window.ScrollTo(0,0);
        }

        
    }
}