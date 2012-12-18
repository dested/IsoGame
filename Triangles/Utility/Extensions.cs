using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace Triangles.Utility
{
    public static class Extensions
    {
        [InlineCode("{o}")]
        public static dynamic Me(this object o)
        {
            return o;
        }

        public static TrianglePiece[] UpsideDown(this TrianglePiece[] items)
        {
            List<TrianglePiece> pieces = new List<TrianglePiece>();
            int highest = 0;
            foreach (var trianglePiece in items)
            {
                if (trianglePiece.Y > highest)
                    highest = trianglePiece.Y;
            }

            foreach (var trianglePiece in items)
            {
                pieces.Add(new TrianglePiece(trianglePiece.X, highest - trianglePiece.Y, !trianglePiece.PointUp));
            }

            return pieces.Array();
        }
        public static TrianglePiece[] Inverse(this TrianglePiece[] items)
        {
            List<TrianglePiece> pieces = new List<TrianglePiece>();
            foreach (var trianglePiece in items) {
                pieces.Add(new TrianglePiece(trianglePiece.X, trianglePiece.Y, !trianglePiece.PointUp));
            }

            return pieces.Array();
        }

        [InlineCode("{o}")]
        [IgnoreGenericArguments]
        public static T Me<T>(this object o)
        {
            return default( T );
        }

        [InlineCode("{o}")]
        [IgnoreGenericArguments]
        public static T[] Array<T>(this List<T> o)
        {
            return new T[0];
        }

        public static List<T> TakeRandom<T>(this List<T> items)
        {
            var ls = new List<T>(items);

            ls.Sort((a, b) => { return (int) ( Math.Round(Math.Random()) - 0.5 ); });
            return ls;
/*
/*
            foreach (var item in items) {
                yield return item;
            }
            yield break;
#1#

            ;
            List<bool> used=new List<bool>();
            for (int i = 0; i < items.Count; i++) {
                used[i] = false;
            }

            int usedCount = 0;

            while (usedCount!=items.Count-1) {
                var cur = ( (int) Math.Random() * items.Count );
                if (!used[cur]) {
                    used[cur] = true;
                    usedCount++;
                    yield return items[cur];
                }
            }
*/
        }

        public static ExtraData<T, T2> WithData<T, T2>(this T item, T2 data)
        {
            return new ExtraData<T, T2>(item, data);
        }

        public static string Percent(this int num)
        {
            return num + "%";
        }

        public static string Percent(this double num)
        {
            return num + "%";
        }
    }
}