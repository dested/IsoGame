using System;
using System.Html;
using jQueryApi;
namespace Triangles.Utility
{
    public static class Help
    {
        public static string[] colors = {"#FF0000", "#00FF00", "#0000FF", "#880088", "#888800", "#008888"};

        public static string getColor(string _start, string _end, int _percent)
        {
            if (_start == null) _start = "#FFFFFF";
            var hex2Dec = new Func<string, int>((_hex) => { return ( int.Parse(_hex, 16) ); });
            var dec2Hex = new Func<int, string>((_dec) => { return ( _dec < 16 ? "0" : "" ) + _dec.ToString(16); });

            _start = _start.Substring(1, 7);
            _end = _end.Substring(1, 7);

            var r1 = hex2Dec(_start.Substring(0, 2));
            var g1 = hex2Dec(_start.Substring(2, 4));
            var b1 = hex2Dec(_start.Substring(4, 6));

            var r2 = hex2Dec(_end.Substring(0, 2));
            var g2 = hex2Dec(_end.Substring(2, 4));
            var b2 = hex2Dec(_end.Substring(4, 6));

            var pc = _percent / 100.0;

            var r = (int) Math.Floor(r1 + ( pc * ( r2 - r1 ) ) + .5);
            var g = (int) Math.Floor(g1 + ( pc * ( g2 - g1 ) ) + .5);
            var b = (int) Math.Floor(b1 + ( pc * ( b2 - b1 ) ) + .5);

            return ( "#" + dec2Hex(r) + dec2Hex(g) + dec2Hex(b) );
        }

        public static Pointer GetCursorPosition(Element element, jQueryEvent ev)
        {
            if (ev.Me().originalEvent && ev.Me().originalEvent.targetTouches && ev.Me().originalEvent.targetTouches.length > 0) ev = ev.Me().originalEvent.targetTouches[0];

            var offsetX = 0;
            var offsetY = 0;

            if (element.OffsetParent != null) {
                do {
                    offsetX += element.OffsetLeft;
                    offsetY += element.OffsetTop;
                } while (( element = element.OffsetParent ) != null);
            }

            if (ev.PageX.Me() != null && ev.PageY.Me() != null)
                return new Pointer(ev.PageX - offsetX, ev.PageY - offsetY, ev.Me().wheelDelta ? ev.Me().wheelDelta / 40 : ev.Me().detail ? -ev.Me().detail : 0, ev.Which == 3);
            return new Pointer(ev.ClientX - offsetX, ev.ClientY - offsetY, ev.Me().wheelDelta ? ev.Me().wheelDelta / 40 : ev.Me().detail ? -ev.Me().detail : 0, ev.Which == 3);
        }

        public static string GetRandomColor()
        {
            return colors[(int) ( Math.Random() * ( colors.Length ) )];
        }

        public static bool IsPointInTriangle(Point _s, Point _a, Point _b, Point _c)
        {

            {
                var asX = _s.X - _a.X;
                var asY = _s.Y - _a.Y;
                var sAb = ( _b.X - _a.X ) * asY - ( _b.Y - _a.Y ) * asX > 0;
                if (( _c.X - _a.X ) * asY - ( _c.Y - _a.Y ) * asX > 0 == sAb) return false;
                if (( _c.X - _b.X ) * ( _s.Y - _b.Y ) - ( _c.Y - _b.Y ) * ( _s.X - _b.X ) > 0 != sAb) return false;
                return true;
            }
        }

        public static void Log(object _cont)
        {
            var console = jQuery.Select("#txtConsole");

            var text = console.GetValue();

            console.Value(text + _cont + "\n");

            console.ScrollTop(
                    console[0].ScrollHeight - console.GetHeight()
                    );
        }
    }
}