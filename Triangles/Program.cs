using jQueryApi;
namespace Triangles
{
    internal class Program
    {
        private static void Main()
        {

            var raph=Raphael.CreatePaper("canvas", 12, 12);
            raph.Clear();

            jQuery.OnDocumentReady(() => { new TriangleGame(); });
        }
    }
}