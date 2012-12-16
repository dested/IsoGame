using System;
using jQueryApi;
namespace Triangles
{
    public static class Help
    {
        /***********************************************
*
* Function    : getColor
*
* Parameters  :	start - the start color (in the form "RRGGBB" e.g. "FF00AC")
*			end - the end color (in the form "RRGGBB" e.g. "FF00AC")
*			percent - the percent (0-100) of the fade between start & end
*
* returns	  : color in the form "#RRGGBB" e.g. "#FA13CE"
*
* Description : This is a utility function. Given a start and end color and
*		    a percentage fade it returns a color in between the 2 colors
*
* Author	  : Open Source
*
*************************************************/
        public static string[] colors = {"#FF3700", "#7654FF", "#77FFB6", "#DAc42a", "#Ca2dFA"};

        public static string getColor(string _start, string _end, int _percent)
        {
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

            var pc = _percent / 100;

            var r = (int) Math.Floor(r1 + ( pc * ( r2 - r1 ) ) + .5);
            var g = (int) Math.Floor(g1 + ( pc * ( g2 - g1 ) ) + .5);
            var b = (int) Math.Floor(b1 + ( pc * ( b2 - b1 ) ) + .5);

            return ( "#" + dec2Hex(r) + dec2Hex(g) + dec2Hex(b) );
        }

        public static Pointer GetCursorPosition(jQueryEvent ev)
        {
            if (ev.Me().originalEvent && ev.Me().originalEvent.targetTouches && ev.Me().originalEvent.targetTouches.length > 0) ev = ev.Me().originalEvent.targetTouches[0];

            if (ev.PageX.Me() != null && ev.PageY.Me() != null)
                return new Pointer(ev.PageX, ev.PageY, ev.Me().wheelDelta ? ev.Me().wheelDelta / 40 : ev.Me().detail ? -ev.Me().detail : 0, ev.Which == 3);
            //if (ev.x != null && ev.y != null) return new { x: ev.x, y: ev.y };
            return new Pointer(ev.ClientX, ev.ClientY, ev.Me().wheelDelta ? ev.Me().wheelDelta / 40 : ev.Me().detail ? -ev.Me().detail : 0, ev.Which == 3);
        }

/************************************************/

        public static string get_random_color()
        {
            return colors[(int) ( Math.Random() * ( colors.Length ) )];
        }

        public static bool isPointInTriangle(Point _s, Point _a, Point _b, Point _c)
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

        public static void Log(object o)
        {
            /*
function log(_cont) {
    var console = $("#txtConsole");

    var text = console.val();

    console.val(text + _cont + "\n");

    console.scrollTop(
                    console[0].scrollHeight - console.height()
                );
}

*/
        }
    }
}