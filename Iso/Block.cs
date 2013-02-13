using System;
namespace Isos
{
    public class Block
    {
        public const int ArmLength = (int) ( 100 * Iso.multiplyer );
        private RaphaelElement left;
        private RaphaelPaper myContext;
        private RaphaelElement right;
        private float startxxx;
        private float startyyy;
        private RaphaelElement top;
        public float HorizontalLength { get; set; }
        public float VerticalLength { get; set; }
        public string Color { get; set; }
        public RaphaelElement RightWall { get; set; }
        public RaphaelElement LeftWall { get; set; }
        public RaphaelElement TopWall { get; set; }

        public Block(float horizontalRadius, float verticalRadius, string color)
        {
            HorizontalLength = horizontalRadius;
            VerticalLength = verticalRadius;
            Color = color;

        }

        public RaphaelPaperSet build(RaphaelPaper context, int X, int Y)
        {
            myContext = context;
            var x = X;
            var y = Y;
            var xxx = ( y % 2 == 1 ? ( ( x + 0.5f ) * ArmLength ) : ( x * ArmLength ) ) + IsoGame.Offset.X;
            var yyy = y * ArmLength / 4f + IsoGame.Offset.Y;

            startxxx = xxx;
            startyyy = yyy;
            var set = context.Set();
            set.Push(LeftWall = buildLeft(context));
            set.Push(RightWall = buildRight(context));
            set.Push(TopWall = buildTop(context));

            set.MouseOver(e => { set.Attribute(new RaphaelElementAttributes() {StrokeWidth = 3}); });
            set.MouseOut(e => { set.Attribute(new RaphaelElementAttributes() {StrokeWidth = 1}); });

            set.Attribute(new RaphaelElementAttributes() {StrokeLineCap = RaphaelLineCap.Round, StrokeLineJoin = RaphaelLineJoin.Round});
            set.Attribute(new RaphaelElementAttributes() {Fill = Color, StrokeWidth = 1, Stroke = "black"});

            return set;
        }

        public RaphaelElement buildLeft(RaphaelPaper _context)
        {
            float xxx = startxxx;
            float yyy = startyyy;
            if (left != null) {
                left.Attribute("path",
                               string.Format("M{0} {1}L{2} {3}L{4} {5}L{6} {7}L{0} {1}",
                                             xxx - ArmLength / 2 * HorizontalLength,
                                             yyy,
                                             xxx,
                                             yyy + ArmLength / 4 * HorizontalLength,
                                             xxx,
                                             yyy - ArmLength / 2 * VerticalLength,
                                             xxx - ArmLength / 2 * HorizontalLength,
                                             yyy - ArmLength / 2 * VerticalLength));
                return null;
            }
            var element = left = _context.Path(string.Format("M{0} {1}L{2} {3}L{4} {5}L{6} {7}L{0} {1}",
                                                             xxx - ArmLength / 2 * HorizontalLength,
                                                             yyy,
                                                             xxx,
                                                             yyy + ArmLength / 4 * HorizontalLength,
                                                             xxx,
                                                             yyy - ArmLength / 2 * VerticalLength,
                                                             xxx - ArmLength / 2 * HorizontalLength,
                                                             yyy - ArmLength / 2 * VerticalLength));

            return element;
        }

        public RaphaelElement buildRight(RaphaelPaper _context)
        {
            float xxx = startxxx;
            float yyy = startyyy;

            if (right != null) {
                right.Attribute("path",
                                string.Format("M{0} {1}L{2} {3}L{4} {5}L{6} {7}L{0} {1}",
                                              xxx + ArmLength / 2 * HorizontalLength,
                                              yyy,
                                              xxx,
                                              yyy + ArmLength / 4 * HorizontalLength,
                                              xxx,
                                              yyy - ArmLength / 2 * VerticalLength,
                                              xxx + ArmLength / 2 * HorizontalLength,
                                              yyy - ArmLength / 2 * VerticalLength));
                return null;
            }

            var element = right = _context.Path(string.Format("M{0} {1}L{2} {3}L{4} {5}L{6} {7}L{0} {1}",
                                                              xxx + ArmLength / 2 * HorizontalLength,
                                                              yyy,
                                                              xxx,
                                                              yyy + ArmLength / 4 * HorizontalLength,
                                                              xxx,
                                                              yyy - ArmLength / 2 * VerticalLength,
                                                              xxx + ArmLength / 2 * HorizontalLength,
                                                              yyy - ArmLength / 2 * VerticalLength));

            return element;
        }

        public RaphaelElement buildTop(RaphaelPaper _context)
        {
            float xxx = startxxx;
            float yyy = startyyy;

            yyy -= ArmLength / 2 * VerticalLength;

            if (top != null) {
                top.Attribute("path",
                              string.Format("M{0} {1}L{2} {3}L{4} {5}L{6} {7}L{0} {1}",
                                            xxx - ArmLength / 2 * HorizontalLength,
                                            yyy,
                                            xxx,
                                            yyy - ArmLength / 4 * HorizontalLength,
                                            xxx + ArmLength / 2 * HorizontalLength,
                                            yyy,
                                            xxx,
                                            yyy + ArmLength / 4 * HorizontalLength));
                return null;
            }

            var element = top = _context.Path(string.Format("M{0} {1}L{2} {3}L{4} {5}L{6} {7}L{0} {1}",
                                                            xxx - ArmLength / 2 * HorizontalLength,
                                                            yyy,
                                                            xxx,
                                                            yyy - ArmLength / 4 * HorizontalLength,
                                                            xxx + ArmLength / 2 * HorizontalLength,
                                                            yyy,
                                                            xxx,
                                                            yyy + ArmLength / 4 * HorizontalLength));

            return element;
        }

        public static void buildBottomEmpty(RaphaelPaper _context, int x, int y)
        {
            var xxx = ( y % 2 == 1 ? ( ( x + 0.5f ) * ArmLength ) : ( x * ArmLength ) ) + IsoGame.Offset.X;
            var yyy = y * ArmLength / 4f + IsoGame.Offset.Y;

            var em = _context.Set();

            RaphaelElement elem;
            elem=_context.Path(string.Format("M{0} {1}L{2} {3}L{4} {5}L{6} {7}L{0} {1}",
                                                            xxx - ArmLength / 2 ,
                                                            yyy,
                                                            xxx,
                                                            yyy - ArmLength / 4 ,
                                                            xxx + ArmLength / 2 ,
                                                            yyy,
                                                            xxx,
                                                            yyy + ArmLength / 4 )) ;

            elem.Attribute(new RaphaelElementAttributes() { Fill = "rgba(0,0,0,0)", StrokeWidth =1, Stroke = "black" });
            elem.MouseOver((e) =>
            {
                elem.Attribute(new RaphaelElementAttributes() { Fill = "rgba(0,0,0,0)", StrokeWidth = 4, Stroke = "black" });
            });
            elem.MouseOut((e) =>
            {
                elem.Attribute(new RaphaelElementAttributes() { Fill = "rgba(0,0,0,0)", StrokeWidth = 1, Stroke = "black" });
            });



            em.Push(_context.Circle(xxx - ArmLength / 2, yyy, 3));
            //            em.Push(_context.Circle(xxx, yyy - ArmLength / 4, 3));
            //            em.Push(_context.Circle(xxx + ArmLength / 2, yyy, 3));
            //            em.Push(_context.Circle(xxx, yyy + ArmLength / 4, 3));

            em.Attribute(new RaphaelElementAttributes() {StrokeLineCap = RaphaelLineCap.Round, StrokeLineJoin = RaphaelLineJoin.Round});
            em.Attribute(new RaphaelElementAttributes() {Fill = "black", StrokeWidth = 4, Stroke = "black"});
        }

        public void Click(Wall wall)
        {
            switch (wall) {
                case Wall.Left:
                                       Animate.Between(HorizontalLength,
                                    HorizontalLength + 0.5f,
                                    0.08f,
                                    Animate.AnimationSpeed.Fast,
                                    (f) => {
                                        HorizontalLength = f;

                                        if (VerticalLength < 0.6f)
                                        {
                                            VerticalLength = 0.6f;
                                            return;
                                        }
                                        buildLeft(myContext);
                                        buildRight(myContext);
                                        buildTop(myContext);
                                    });

                    break;
                case Wall.Right:
                    Animate.Between(HorizontalLength,
                                   HorizontalLength - 0.5f,
                                   0.08f,
                                   Animate.AnimationSpeed.Fast,
                                   (f) =>
                                   {
                                       HorizontalLength = f;

                                       if (HorizontalLength < 0.6f)
                                       {
                                           HorizontalLength = 0.6f;
                                           return;
                                       }
                                       buildLeft(myContext);
                                       buildRight(myContext);
                                       buildTop(myContext);
                                   });


                    break;
                case Wall.Top:

                    Animate.Between(VerticalLength,
                                    VerticalLength + 0.5f,
                                    0.08f,
                                    Animate.AnimationSpeed.Fast,
                                    (f) => {
                                        VerticalLength = f;

                                        if (HorizontalLength < 0.6f)
                                        {
                                            VerticalLength = 0.6f;
                                            return;
                                        }
                                        buildLeft(myContext);
                                        buildRight(myContext);
                                        buildTop(myContext);
                                    });

                    break;
            }
        }
    }
}