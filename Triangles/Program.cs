using jQueryApi;
namespace Triangles
{
    internal class Program
    {
        private static void Main()
        {
            jQuery.OnDocumentReady(() => { new TriangleGame(); });
        }
    }
}