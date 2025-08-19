import { useCallback, useEffect, useState } from "react";

export default function useScrollState(ref) {
  const [canScroll, setCanScroll] = useState(false);
  const [canUp, setCanUp] = useState(false);
  const [canDown, setCanDown] = useState(false);

  const recompute = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const scrollable = max > 1;
    setCanScroll(scrollable);
    setCanUp(scrollable && el.scrollTop > 0);
    setCanDown(scrollable && el.scrollTop < max - 1);
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Первый расчёт и подписки
    const t = setTimeout(recompute, 0);
    const onScroll = () => recompute();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", recompute);
    return () => {
      clearTimeout(t);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", recompute);
    };
  }, [recompute, ref]);

  return { canScroll, canUp, canDown, recompute };
}