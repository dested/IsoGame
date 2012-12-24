using System;
using System.Html;
using System.Runtime.CompilerServices;
namespace Triangles
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class Raphael
    {
        [ScriptName("svg")]
        public static bool SVGSupported { get; set; }
        public static string Type { get; set; }
        public static bool Vml { get; set; }

        [InlineCode("Raphael({element},{width},{height})")]
        public static RaphaelPaper CreatePaper(string element, float width, float height)
        {
            return default( RaphaelPaper );
        }

        [InlineCode("Raphael({element},{width},{height})")]
        public static RaphaelPaper CreatePaper(Element element, float width, float height)
        {
            return default( RaphaelPaper );
        }

        [InlineCode("Raphael({x},{y},{width},{height},{callback})")]
        public static RaphaelPaper CreatePaper(float x, float y, float width, float height, Action callback = null)
        {
            return default( RaphaelPaper );
        }

        public static float Angle(float x1, float y1, float x2, float y2, float x3 = 0, float y3 = 0)
        {
            return default( float );
        }

        public static RaphaelAnimation Animation(RaphaelElementAttributes @params, float ms, string easing, Action callback)
        {
            return default( RaphaelAnimation );
        }

        public static RaphaelPointInformation BezierBBox(float p1x, float p1y, float c1x, float c1y, float c2x, float c2y, float p2x, float p2y)
        {
            return default( RaphaelPointInformation );
        }

        public static RaphaelLongColorInformation Color(string clr)
        {
            return default( RaphaelLongColorInformation );
        }

        public static string CreateUUID()
        {
            return default( string );
        }

        public static float Deg()
        {
            return default( float );
        }

        //easing_formulas
        //el
        public static RaphaelLongPointInformation FindDotsAtSegment(float p1x, float p1y, float c1x, float c1y, float c2x, float c2y, float p2x, float p2y, float t)
        {
            return default( RaphaelLongPointInformation );
        }

        //fn
        //format replaced wtih string.format
        //fullfill
        //getColor
        //getColor.reset
        public static RaphaelPoint getPointAtLength(string path, float length)
        {
            return default( RaphaelPoint );
        }

        public static RaphaelColorInformation GetRGB(string colour)
        {
            return default( RaphaelColorInformation );
        }

        public static string GetSubpath(string path, float from, float to)
        {
            return default( string );
        }

        public static float GetTotalLength(string path)
        {
            return default( float );
        }

        [ScriptName("hsb")]
        public static string HSB(float h, float s, float b)
        {
            return default( string );
        }

        [ScriptName("hsb2rgb")]
        public static RaphaelColorInformation HSB2RGB(float h, float s, float b)
        {
            return default( RaphaelColorInformation );
        }

        [ScriptName("hsl")]
        public static string HSL(float h, float s, float l)
        {
            return default( string );
        }

        [ScriptName("hsl2rgb")]
        public static RaphaelColorInformation HSL2RGB(float h, float s, float l)
        {
            return default( RaphaelColorInformation );
        }

        //is
        [ScriptName("isBBoxIntersect")]
        public static bool IsBBoxIntersect(string bbox1, string bbox2)
        {
            return default( bool );
        }

        [ScriptName("isPointInsideBBox")]
        public static bool IsPointInsideBBox(string bbox1, float x, float y)
        {
            return default( bool );
        }

        [ScriptName("mapPath")]
        public static bool MapPath(string path, RaphaelMatrix matrix)
        {
            return default( bool );
        }

        [ScriptName("matrix")]
        public static RaphaelMatrix Matrix(float a, float b, float c, float d, float e, float f)
        {
            return default( RaphaelMatrix );
        }

        [ScriptName("parsePathString")]
        public static RaphaelPoint[] ParsePathString(string pathString)
        {
            return default( RaphaelPoint[] );
        }

        [ScriptName("parsePathString")]
        public static RaphaelPoint[] ParseTransformString(string tstring)
        {
            return default( RaphaelPoint[] );
        }

        [ScriptName("path2curve")]
        public static RaphaelPoint[] Path2Curve(string pathString)
        {
            return default( RaphaelPoint[] );
        }

        [ScriptName("pathBBox")]
        public static RaphaelBoundingBox PathBBox(string path)
        {
            return default( RaphaelBoundingBox );
        }

        public static RaphaelPointIntersection[] PathIntersection(string path1, string path2)
        {
            return default( RaphaelPointIntersection[] );
        }

        public static RaphaelPoint[] PathToRelative(string pathString)
        {
            return default( RaphaelPoint[] );
        }

        public static RaphaelPoint[] PathToRelative(RaphaelPoint[] pathString)
        {
            return default( RaphaelPoint[] );
        }

        public static float Rad(float deg)
        {
            return default( float );
        }

        //registerFont
        [ScriptName("rgb")]
        public static string RGB(float r, float g, float b)
        {
            return default( string );
        }

        [ScriptName("rgb2hsb")]
        public static RaphaelColorHSB RGB2HSB(float r, float g, float b)
        {
            return default( RaphaelColorHSB );
        }

        [ScriptName("rgb2hsl")]
        public static RaphaelColorHSL RGB2HSL(float r, float g, float b)
        {
            return default( RaphaelColorHSL );
        }

        public static void SetWindow(WindowInstance newWin) {}

        public static float SnapTo(float step, float value, float tolerance)
        {
            return default( float );
        }

        public static float SnapTo(float[] values, float value, float tolerance)
        {
            return default( float );
        }

        //st
        public static RaphaelMatrix ToMatrix(string path, string transform)
        {
            return default( RaphaelMatrix );
        }

        public static RaphaelMatrix ToMatrix(string path, string[] transform)
        {
            return default( RaphaelMatrix );
        }

        public static string TransformPath(string path, string transform)
        {
            return default( string );
        }

        public static string TransformPath(string path, string[] transform)
        {
            return default( string );
        }
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [Serializable]
    public class RaphaelPointIntersection
    {
        public float X { get; set; }
        public float Y { get; set; }
        public float T1 { get; set; }
        public float T2 { get; set; }
        public float Segment1 { get; set; }
        public float Segment2 { get; set; }
        public RaphaelPoint[] Bez1 { get; set; }
        public RaphaelPoint[] Bez2 { get; set; }
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [Serializable]
    public class RaphaelLongColorInformation
    {
        [ScriptName("r")]
        public float Red { get; set; }
        [ScriptName("g")]
        public float Green { get; set; }
        [ScriptName("b")]
        public float Blue { get; set; }
        public string Hex { get; set; }
        public bool Error { get; set; }
        [ScriptName("h")]
        public float Hue { get; set; }
        [ScriptName("s")]
        public float Saturation { get; set; }
        [ScriptName("v")]
        public float Brightness { get; set; }
        [ScriptName("l")]
        public float Lightness { get; set; }
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [Serializable]
    public class RaphaelColorHSL
    {
        [ScriptName("h")]
        public float Hue { get; set; }
        [ScriptName("s")]
        public float Saturation { get; set; }
        [ScriptName("l")]
        public float Luminosity { get; set; }
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [Serializable]
    public class RaphaelColorHSB
    {
        [ScriptName("h")]
        public float Hue { get; set; }
        [ScriptName("s")]
        public float Saturation { get; set; }
        [ScriptName("b")]
        public float Brightness { get; set; }
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [Serializable]
    public class RaphaelColorInformation
    {
        [ScriptName("r")]
        public float Red { get; set; }
        [ScriptName("g")]
        public float Green { get; set; }
        [ScriptName("b")]
        public float Blue { get; set; }
        public string Hex { get; set; }
        public bool Error { get; set; }
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [Serializable]
    public class RaphaelLongPointInformation : RaphaelPoint
    {
        public RaphaelPoint M { get; set; }
        public RaphaelPoint N { get; set; }
        public RaphaelPoint Start { get; set; }
        public RaphaelPoint End { get; set; }
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [Serializable]
    public class RaphaelPointInformation
    {
        public RaphaelPoint Min { get; set; }
        public RaphaelPoint Max { get; set; }
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class RaphaelPaper
    {
        [IntrinsicProperty]
        public float Top { get; set; }
        [IntrinsicProperty]
        public float Bottom { get; set; }
        [IntrinsicProperty]
        public Raphael Raphael { get; set; }

        public void Add(params RaphaelTypedElementAttributes[] elements) //todo
        {}

        public void Clear() {}
        public void Circle(float x, float y, float radius) {}
        public void Ellipse(float x, float y, float rx, float ry) {}

        public RaphaelPaper ForEach(Action<RaphaelElement> action)
        {
            return default( RaphaelPaper );
        }

        public RaphaelElement GetByID(string ID)
        {
            return default( RaphaelElement );
        }

        public RaphaelElement GetElementByPoint(float x, float y)
        {
            return default( RaphaelElement );
        }

        public RaphaelFont GetFont(string family, string weight = null, string style = null, string stretch = null)
        {
            return default( RaphaelFont );
        }

        public RaphaelElement Path(string pathString)
        {
            return default( RaphaelElement );
        }

        public RaphaelElement Print(float x, float y, string @string, RaphaelFont font, float size = 16, string origin = "middle", float letter_spacing = 0)
        {
            return default( RaphaelElement );
        }

        public RaphaelElement Rect(float x, float y, float width, float height, float radius = 0)
        {
            return default( RaphaelElement );
        }

        public void Remove() {}

        [ScriptName("renderfix")]
        public void RenderFix() {}

        public void Safari() {}

        public RaphaelPaperSet Set()
        {
            return default( RaphaelPaperSet );
        }

        public RaphaelPaperSet SetStart()
        {
            return default( RaphaelPaperSet );
        }

        public RaphaelPaperSet SetFinish()
        {
            return default( RaphaelPaperSet );
        }

        public void SetSize(float width, float height) {}
        public void SetViewBox(float x, float y, float width, float height, bool fit) {}

        public RaphaelElement Text(float x, float y, string text)
        {
            return default( RaphaelElement );
        }
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class RaphaelPaperSet
    {
        public void Push(params RaphaelElement[] elements) {}
        public void Clear() {}
        public void Exclude(RaphaelElement element) {}

        public RaphaelPaper ForEach(Action<RaphaelElement> action)
        {
            return default( RaphaelPaper );
        }

        public RaphaelElement Pop()
        {
            return default( RaphaelElement );
        }

        public RaphaelElement[] Splice(int index, int count, params RaphaelElement[] insertion)
        {
            return default( RaphaelElement[] );
        }

        [ScriptName("attr")]
        public void Attributes(RaphaelElementAttributes attributes) {}
    }
    [IgnoreNamespace]
    [Serializable]
    [Imported(IsRealType = false)]
    public class RaphaelTypedElementAttributes : RaphaelElementAttributes
    {
        public string Type { get; set; }
    }
    [IgnoreNamespace]
    [Serializable]
    [Imported(IsRealType = false)]
    public class RaphaelElementAttributes
    {
        public object Fill { get; set; }
        [ScriptName("arrow-end")]
        public string ArrowEnd { get; set; }
        [ScriptName("clip-rect")]
        public string ClipRect { get; set; }
        [ScriptName("cursor")]
        public string Cursor { get; set; }
        [ScriptName("cx")]
        public float CX { get; set; }
        [ScriptName("cy")]
        public float CY { get; set; }
        [ScriptName("fill-opacity")]
        public float FillOpacity { get; set; }
        public string Font { get; set; }
        [ScriptName("font-family")]
        public string FontFamily { get; set; }
        [ScriptName("font-size")]
        public float FontSize { get; set; }
        [ScriptName("font-weight")]
        public string FontWeight { get; set; }
        public float Height { get; set; }
        public string Href { get; set; }
        public float Opacity { get; set; }
        public string Path { get; set; }
        [ScriptName("r")]
        public float R { get; set; }
        [ScriptName("r")]
        public float Radius { get; set; }
        [ScriptName("rx")]
        public float RX { get; set; }
        [ScriptName("rx")]
        public float RadiusX { get; set; }
        [ScriptName("ry")]
        public float RY { get; set; }
        [ScriptName("ry")]
        public float RadiusY { get; set; }
        [ScriptName("src")]
        public string SRC { get; set; }
        public string Stroke { get; set; }
        [ScriptName("stroke-dasharray")]
        public string StrokeDashArray { get; set; }
        [ScriptName("stroke-linecap")]
        public RaphaelLineCap StrokeLineCap { get; set; }
        [ScriptName("stroke-linejoin")]
        public RaphaelLineJoin StrokeLineJoin { get; set; }
        [ScriptName("stroke-miterlimit")]
        public RaphaelLineJoin StrokeMiterLimit { get; set; }
        [ScriptName("stroke-opacity")]
        public float StrokeOpacity { get; set; }
        [ScriptName("stroke-width")]
        public float StrokeWidth { get; set; }
        public string Target { get; set; }
        public string Text { get; set; }
        [ScriptName("text-anchor")]
        public string TextAnchor { get; set; }
        public string Title { get; set; }
        public string Transform { get; set; }
        public float Width { get; set; }
        public float X { get; set; }
        public float Y { get; set; }
    }
    [Imported]
    [IgnoreNamespace]
    [NamedValues]
    public enum RaphaelLineCap
    {
        Butt,
        Square,
        Round
    }
    [Imported]
    [IgnoreNamespace]
    [NamedValues]
    public enum RaphaelLineJoin
    {
        Bevel,
        Round,
        Miter
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class RaphaelFont {}
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class RaphaelElement
    {
        [ScriptName("id")]
        public string ID { get; set; }
        public RaphaelMatrix Matrix { get; private set; }
        public RaphaelElement Next { get; private set; }
        public Element Node { get; private set; }
        public RaphaelElement Prev { get; private set; }
        public Raphael Raphael { get; private set; }
        public RaphaelPaper Paper { get; private set; }

        public RaphaelElement Animate()
        {
            return default( RaphaelElement );
        }

//todo
        public RaphaelElement AnimateWith()
        {
            return default( RaphaelElement );
        }

//todo
        [ScriptName("attr")]
        public RaphaelElement Attribute(string attrName, string value)
        {
            return default( RaphaelElement );
        }

        [ScriptName("attr")]
        public string Attribute(string attrName)
        {
            return default( string );
        }

        [ScriptName("attr")]
        public string[] Attribute(params string[] attrNames)
        {
            return default( string[] );
        }

        [ScriptName("attr")]
        public void Attribute(RaphaelElementAttributes attributes) {}

        public RaphaelElement Click(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        public RaphaelElement Drag(ElementEventListener onMove, ElementEventListener onStart, ElementEventListener onEnd) //todo
        {
            return default( RaphaelElement );
        }

        public void Data<T>(string key, T value) {}

        public T Data<T>(string key)
        {
            return default( T );
        }

        [ScriptName("dblclick")]
        public RaphaelElement DoubleClick(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        [ScriptName("getBBox")]
        public RaphaelBoundingBox GetBoundingBox(bool isWithoutTransform = false)
        {
            return default( RaphaelBoundingBox );
        }

        [ScriptName("getBBox")]
        public RaphaelPoint GetPointAtLength(float length)
        {
            return default( RaphaelPoint );
        }

        public string GetSubpath(float from, float to)
        {
            return default( string );
        }

        public float GetTotalLength()
        {
            return default( float );
        }

        public RaphaelElement Glow(RaphaelGlowProperties glow)
        {
            return default( RaphaelElement );
        }

        public RaphaelElement Hide()
        {
            return default( RaphaelElement );
        }

        public void Hover(ElementEventListener f_in, ElementEventListener f_out) {}

        public RaphaelElement InsertAfter(RaphaelElement element)
        {
            return default( RaphaelElement );
        }

        public RaphaelElement InsertBefore(RaphaelElement element)
        {
            return default( RaphaelElement );
        }

        public bool IsPointInside(float x, float y)
        {
            return default( bool );
        }

        [ScriptName("mousedown")]
        public RaphaelElement MouseDown(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        [ScriptName("mousemove")]
        public RaphaelElement MouseMove(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        [ScriptName("mouseout")]
        public RaphaelElement MouseOut(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        [ScriptName("mouseover")]
        public RaphaelElement MouseOver(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        [ScriptName("mouseup")]
        public RaphaelElement MouseUp(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        public void OnDragOver(Action<RaphaelElement> handler) {}

        public RaphaelElement Pause(RaphaelAnimation animation = null)
        {
            return default( RaphaelElement );
        }

        public void Remove() {}

        public RaphaelElement RemoveData(string key = null)
        {
            return default( RaphaelElement );
        }

        public RaphaelElement Resume(RaphaelAnimation animation = null)
        {
            return default( RaphaelElement );
        }

        public RaphaelElement Rotate(float def, float cx = 0, float cy = 0)
        {
            return default( RaphaelElement );
        }

        public RaphaelElement Scale(float sx, float sy, float cx = 0, float cy = 0)
        {
            return default( RaphaelElement );
        }

        public void SetTime(RaphaelAnimation animation, int value) {}

        public int Status(RaphaelAnimation animation)
        {
            return default( int );
        }

        public void Status(RaphaelAnimation animation, int value) {}

        public RaphaelAnimation[] Status()
        {
            return default( RaphaelAnimation[] );
        }

        public RaphaelElement ToBack()
        {
            return default( RaphaelElement );
        }

        public RaphaelElement ToFront()
        {
            return default( RaphaelElement );
        }

        public RaphaelElement Stop(RaphaelAnimation animation)
        {
            return default( RaphaelElement );
        }

        [ScriptName("touchcancel")]
        public RaphaelElement TouchCancel(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        [ScriptName("touchend")]
        public RaphaelElement TouchEnd(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        [ScriptName("touchmove")]
        public RaphaelElement TouchMove(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        [ScriptName("touchstart")]
        public RaphaelElement TouchStart(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        public RaphaelElement Transform(string tstr)
        {
            return default( RaphaelElement );
        }

        public string Transform()
        {
            return default( string );
        }

        [ScriptName("untouchcancel")]
        public RaphaelElement UnTouchCancel(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        [ScriptName("untouchend")]
        public RaphaelElement UnTouchEnd(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        [ScriptName("untouchmove")]
        public RaphaelElement UnTouchMove(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        [ScriptName("untouchstart")]
        public RaphaelElement UnTouchStart(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        [ScriptName("unclick")]
        public RaphaelElement UnClick(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        [ScriptName("undrag")]
        public RaphaelElement UnDrag()
        {
            return default( RaphaelElement );
        }

        [ScriptName("undblclick")]
        public RaphaelElement UnDoubleClick(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        [ScriptName("unmousedown")]
        public RaphaelElement UnMouseDown(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        [ScriptName("unmousemove")]
        public RaphaelElement UnMouseMove(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        [ScriptName("unmouseout")]
        public RaphaelElement UnMouseOut(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        [ScriptName("unmouseover")]
        public RaphaelElement UnMouseOver(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        [ScriptName("unmouseup")]
        public RaphaelElement UnMouseUp(ElementEventListener handler)
        {
            return default( RaphaelElement );
        }

        [ScriptName("unhover")]
        public void UnHover(ElementEventListener f_in, ElementEventListener f_out) {}
    }
    [Serializable]
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class RaphaelAnimation
    {
        public RaphaelAnimation Delay(float delay)
        {
            return default( RaphaelAnimation );
        }

        public RaphaelAnimation Repeat(float repeat)
        {
            return default( RaphaelAnimation );
        }
    }
    [Serializable]
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class RaphaelGlowProperties
    {
        [ScriptName("offsetx")]
        public float OffsetX { get; set; }
        [ScriptName("offsety")]
        public float OffsetY { get; set; }
        public float Opacity { get; set; }
        public bool Fill { get; set; }
        public float Width { get; set; }
        public string Color { get; set; }
    }
    [Serializable]
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class RaphaelMatrix
    {
        public RaphaelMatrix Add(float a, float b, float c, float d, float e, float f, RaphaelMatrix matrix)
        {
            return default( RaphaelMatrix );
        }

        public RaphaelMatrix Clone()
        {
            return default( RaphaelMatrix );
        }

        public RaphaelMatrix Invert()
        {
            return default( RaphaelMatrix );
        }

        public void Rotate(float a, float x, float y) {}
        public void Scale(float x, float y = 0, float cx = 0, float cy = 0) {}
        public void Split(float dx, float dy, float scaleX, float scaleY, float sHear, float rotate, bool isSimple) {}

        public string ToTransformString()
        {
            return default( string );
        }

        public void Translate(float x, float y) {}

        public float X(float x, float y)
        {
            return default( float );
        }

        public float Y(float x, float y)
        {
            return default( float );
        }
    }
    [Serializable]
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class RaphaelPoint
    {
        public float X { get; set; }
        public float Y { get; set; }
        public float Alpha { get; set; }
    }
    [Serializable]
    public class RaphaelBoundingBox
    {
        public float X { get; set; }
        public float Y { get; set; }
        public float X2 { get; set; }
        public float Y2 { get; set; }
        public float Width { get; set; }
        public float Height { get; set; }
    }
}