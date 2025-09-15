import { useCallback, useEffect, useRef, useState } from "react";

export default function useFloatingApplyAnchor() {
  const wrapRef = useRef(null);
  // const [anchorEl, setAnchorEl] = useState(null);
  const [btnTop, setBtnTop] = useState(0);
  const [btnShow, setBtnShow] = useState(false);
  const hideTimerRef = useRef(null);

  // const updatePos = useCallback(() => {
  //   if (!wrapRef.current || !anchorEl) return;
  //   const wr = wrapRef.current.getBoundingClientRect();
  //   const ar = anchorEl.getBoundingClientRect();
  //   setBtnTop(ar.top - wr.top + ar.height / 2);
  // }, [anchorEl]);

  const showApplyAtEl = useCallback((el) => {
    if (!el || !wrapRef.current) return;
    const wr = wrapRef.current.getBoundingClientRect();
    const ar = el.getBoundingClientRect();
    setBtnTop(ar.top - wr.top + ar.height / 2);
    // setAnchorEl(el);
    setBtnShow(true);

    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setBtnShow(false), 2000);
  }, []);


  // TODO: add scroll and resize event listeners
  // useEffect(() => {
  //   if (!btnShow) return;
  //   const onAnyScroll = () => updatePos();
  //   const onResize = () => updatePos();
  //   // window.addEventListener("scroll", onAnyScroll, true);
  //   // window.addEventListener("resize", onResize);
  //   return () => {
  //     // window.removeEventListener("scroll", onAnyScroll, true);
  //     // window.removeEventListener("resize", onResize);
  //   };
  // }, [btnShow, updatePos]);

  useEffect(() => () => hideTimerRef.current && clearTimeout(hideTimerRef.current), []);

  return { wrapRef, btnTop, btnShow, showApplyAtEl, setBtnShow };
}



