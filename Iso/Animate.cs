using System;
using System.Html;
namespace Isos
{
    public static class Animate
    {
        #region AnimationSpeed enum

        public enum AnimationSpeed
        {
            Slow = 60,
            Medium = 40,
            Fast = 20
        }

        #endregion

        public static void Between(float start, float end, float step, AnimationSpeed speed, Action<float> run)
        {
            Action callback = null;
            if (start < end)
            {
                callback = () =>
                {
                    run(start);
                    if (start >= end)
                    {
                        run(end);
                        return;
                    }
                    start += step;
                    Window.SetTimeout(callback, (int)speed);
                };
            }
            else
            {
                callback = () =>
                {
                    run(start);
                    if (start <= end)
                    {
                        run(end);
                        return;
                    }
                    start -= step;
                    Window.SetTimeout(callback, (int)speed);
                };
            }
            Window.SetTimeout(callback, (int)speed);
        }
    }
}