import type { CSSProperties, RefObject } from "react";

export interface UseStickyAnywhereOptions {
  /**
   * Offset from the top of the viewport (in pixels).
   * When specified, the element sticks to the top.
   * Mutually exclusive with `bottom`.
   */
  top?: number;

  /**
   * Offset from the bottom of the viewport (in pixels).
   * When specified, the element sticks to the bottom.
   * Mutually exclusive with `top`.
   */
  bottom?: number;

  /**
   * z-index applied to the element when in sticky (fixed) state.
   * @default 1
   */
  zIndex?: number;

  /**
   * When true, sticky behavior is disabled and the element stays in normal flow.
   * @default false
   */
  disabled?: boolean;
}

export interface UseStickyAnywhereReturn<
  SentinelElement extends HTMLElement = HTMLDivElement,
  StickyElement extends HTMLElement = HTMLDivElement
> {
  /**
   * Ref to attach to a sentinel/placeholder element.
   * This element marks the original position and preserves layout space when sticky.
   */
  sentinelRef: RefObject<SentinelElement>;

  /**
   * Ref to attach to the sticky content element.
   */
  stickyRef: RefObject<StickyElement>;

  /**
   * Whether the element is currently in sticky (fixed) state.
   */
  isSticky: boolean;

  /**
   * Style to apply to the sticky content element.
   * Includes position:fixed and dimensional properties when sticky.
   */
  stickyStyle: CSSProperties;

  /**
   * Style to apply to the sentinel element.
   * Preserves the original layout space when the content is in sticky state.
   */
  placeholderStyle: CSSProperties;
}
