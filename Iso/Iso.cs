using System;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using Isos.Utility;
namespace Isos
{
      [Serializable]
    public class IsoPiece
    {
        public int X { get; set; }
        public int Y { get; set; }
        public bool PointUp { get; set; }

        public IsoPiece(int x, int y, bool pointUp)
        {
            X = x;
            Y = y;
            PointUp = pointUp;
        }
    }
    public class Iso
    {
        public const double multiplyer = 0.6;
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
        public int Y { get; set; }
        [IntrinsicProperty]
        public int X { get; set; }
        public List<Block> Blocks=new List<Block>(); 

        public Iso(int _x, int _y,   string _color,RaphaelPaper _context)
        {
            X = _x;
            Y = _y;  
            

            Color = _color;
            Selected = false;
            Neighbors = false;
            Glow = false;
            HighlightedNeighbors = false;





            RaphaelPaperSet element;

            
            if (Math.Random() * 100 < 70) {
                Block block = new Block((float)Math.Min(Math.Random(), 0.6f), (float)Math.Min(Math.Random(), 0.6f), Color);
                Blocks.Add(block);
                element = block.build(_context, X, Y);



                block.LeftWall.MouseOver(e =>
                {
                    element.Attribute(new RaphaelElementAttributes() { StrokeWidth =  3 });
                });
                block.LeftWall.MouseOut(e =>
                {
                    element.Attribute(new RaphaelElementAttributes() { StrokeWidth = 1 });
                });
                block.LeftWall.MouseDown(e =>
                {
                    block.Click(Wall.Left);
                });



                block.RightWall.MouseOver(e =>
                {
                    element.Attribute(new RaphaelElementAttributes() { StrokeWidth = 3 });
                });
                block.RightWall.MouseOut(e =>
                {
                    element.Attribute(new RaphaelElementAttributes() { StrokeWidth =1});
                });
                block.RightWall.MouseDown(e =>
                {
                    block.Click(Wall.Right);
                });




                block.TopWall.MouseOver(e =>
                {
                    element.Attribute(new RaphaelElementAttributes() { StrokeWidth = 3 });
                });
                block.TopWall.MouseOut(e =>
                {
                    element.Attribute(new RaphaelElementAttributes() { StrokeWidth = 1 });
                });
                block.TopWall.MouseDown(e =>
                {
                    block.Click(Wall.Top);
                });


                  
            }

             
         
        }
          
 
       
    }
    public enum Wall {Left,Right,Top}
}