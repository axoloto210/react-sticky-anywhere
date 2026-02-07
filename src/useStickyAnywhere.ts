import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { UseStickyAnywhereOptions, UseStickyAnywhereReturn } from "./types";

interface Dimensions {
  width: number;
  height: number;
  left: number;
}

export function useStickyAnywhere<
  SentinelElement extends HTMLElement = HTMLDivElement,
  StickyElement extends HTMLElement = HTMLDivElement
>(
  options: UseStickyAnywhereOptions = {}
): UseStickyAnywhereReturn<SentinelElement, StickyElement> {
  const { top, bottom, zIndex = 1, disabled = false } = options;

  const direction: "top" | "bottom" =
    bottom !== undefined && top === undefined ? "bottom" : "top";
  const offset = direction === "top" ? (top ?? 0) : (bottom ?? 0);

  const sentinelRef = useRef<SentinelElement>(null);
  const stickyRef = useRef<StickyElement>(null);
  const isStickyRef = useRef(false);
  const dimensionsRef = useRef<Dimensions | null>(null);

  const [isSticky, setIsSticky] = useState(false);
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);

  useEffect(() => {
    if (disabled || isSticky) return;
    const el = stickyRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dims = { width: rect.width, height: rect.height, left: rect.left };
    dimensionsRef.current = dims;
    setDimensions(dims);
  }, [disabled, isSticky]);

  useEffect(() => {
    if (disabled || typeof window === "undefined") return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const trigger = document.createElement("div");
    trigger.setAttribute("aria-hidden", "true");
    trigger.style.cssText =
      "position:absolute;top:0;left:0;width:1px;height:1px;overflow:hidden;pointer-events:none;visibility:hidden;";
    sentinel.appendChild(trigger);

    const rootMargin =
      direction === "top"
        ? `-${offset}px 0px 0px 0px`
        : `0px 0px -${offset}px 0px`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        const rect = entry.boundingClientRect;
        let shouldStick: boolean;

        if (direction === "top") {
          shouldStick = !entry.isIntersecting && rect.top < offset;
        } else {
          const viewportHeight =
            entry.rootBounds?.height ?? window.innerHeight;
          shouldStick =
            !entry.isIntersecting && rect.top > viewportHeight - offset;
        }

        if (shouldStick !== isStickyRef.current) {
          if (shouldStick) {
            const el = stickyRef.current;
            if (el) {
              const r = el.getBoundingClientRect();
              const dims = {
                width: r.width,
                height: r.height,
                left: r.left,
              };
              dimensionsRef.current = dims;
              setDimensions(dims);
            }
          }
          isStickyRef.current = shouldStick;
          setIsSticky(shouldStick);
        }
      },
      { threshold: 0, rootMargin }
    );

    observer.observe(trigger);

    return () => {
      observer.disconnect();
      trigger.remove();
    };
  }, [direction, offset, disabled]);

  useEffect(() => {
    if (disabled || typeof window === "undefined") return;

    const handleResize = () => {
      if (!isStickyRef.current) {
        const el = stickyRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const dims = {
            width: rect.width,
            height: rect.height,
            left: rect.left,
          };
          dimensionsRef.current = dims;
          setDimensions(dims);
        }
      } else {
        const sentinel = sentinelRef.current;
        if (sentinel) {
          const rect = sentinel.getBoundingClientRect();
          setDimensions((prev) =>
            prev ? { ...prev, width: rect.width, left: rect.left } : prev
          );
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [disabled]);

  const stickyStyle: CSSProperties =
    isSticky && dimensions
      ? {
          position: "fixed",
          ...(direction === "top" ? { top: offset } : { bottom: offset }),
          left: dimensions.left,
          width: dimensions.width,
          zIndex,
        }
      : {};

  const placeholderStyle: CSSProperties =
    isSticky && dimensions
      ? {
          height: dimensions.height,
          visibility: "hidden",
          position: "relative",
          overflow: "hidden",
        }
      : {
          height: 0,
          visibility: "hidden",
          position: "relative",
          overflow: "hidden",
        };

  return {
    sentinelRef,
    stickyRef,
    isSticky: disabled ? false : isSticky,
    stickyStyle: disabled ? {} : stickyStyle,
    placeholderStyle: disabled
      ? {
          height: 0,
          visibility: "hidden",
          position: "relative",
          overflow: "hidden",
        }
      : placeholderStyle,
  };
}
