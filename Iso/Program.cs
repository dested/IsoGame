using jQueryApi;
namespace Isos
{
    internal class Program
    {
        private static void Main()
        {
            jQuery.OnDocumentReady(() => { new IsoGame(); });
        }
    }
}