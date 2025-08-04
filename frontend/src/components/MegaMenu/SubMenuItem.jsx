import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { clsx } from "clsx";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const SubMenuItem = ({ sub, onClose, scrollRef }) => {
  const submenuRef = useRef(null);
  const submenuTimerRef = useRef(null);
  const triggerRef = useRef(null);

  const [openUpward, setOpenUpward] = useState(false);
  const [isSubHovered, setIsSubHovered] = useState(false);
  const [isReadyToShow, setIsReadyToShow] = useState(false);

  useLayoutEffect(() => {
    if (!isSubHovered || !submenuRef.current || !scrollRef.current || !triggerRef.current) return;

    const containerRect = scrollRef.current.getBoundingClientRect();
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const spaceBelowVisible = containerRect.bottom - triggerRect.bottom;
    const spaceAboveVisible = triggerRect.top - containerRect.top;
    // const submenuHeight = submenuRef.current.scrollHeight;
    const submenuHeight = submenuRef.current.getBoundingClientRect().height;

    if (submenuHeight <= spaceBelowVisible) {
      setOpenUpward(false);
    } else if (submenuHeight <= spaceAboveVisible) {
      setOpenUpward(true);
    } else {
      // fallback: открываем вниз даже если не помещается
      setOpenUpward(false);
    }

    setIsReadyToShow(true);
  }, [isSubHovered, scrollRef]);

  const handleMouseEnter = () => {
    submenuTimerRef.current = setTimeout(() => {
      setIsSubHovered(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(submenuTimerRef.current);
    setIsSubHovered(false);
    setIsReadyToShow(false);
  };

  return (
    <div
      className="relative my-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/catalog/${sub.slug}`}
        ref={triggerRef}
        onClick={onClose}
        className={clsx(
          "pr-5 hover:text-orange-500 flex items-center",
          isSubHovered && "text-orange-500"
        )}
      >
        <span>{sub.name}</span>
        {sub.children?.length > 0 && (
          <div className="w-[12px] text-gray-600">
            <ChevronRightIcon />
          </div>
        )}
      </Link>

      {sub.children?.length > 0 && isSubHovered && (
        <div
          ref={submenuRef}
          className={clsx(
            "absolute w-full bg-white shadow-2xl rounded-md p-4 z-50 max-h-52 overflow-y-auto",
            !isReadyToShow && "invisible",
            isReadyToShow && (openUpward ? "bottom-full" : "top-full")
          )}
        >
          <ul className="space-y-2 text-xs">
            {sub.children.map((nested) => (
              <li key={nested.id}>
                <Link
                  to={`/catalog/${nested.slug}`}
                  onClick={onClose}
                  className="hover:text-orange-500 block"
                >
                  {nested.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubMenuItem;