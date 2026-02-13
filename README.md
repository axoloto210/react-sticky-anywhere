# react-sticky-anywhere

**English** | [日本語](#日本語)

Make HTML elements stick to the viewport even when parent elements have `overflow` settings.

While CSS `position: sticky` is ideal for sticky behavior, it has a constraint: elements with `position: sticky` stick to the nearest ancestor with an `overflow` value other than `visible` (the default).

When changing the ancestor's `overflow` would significantly break the design, this library enables sticky behavior without modifying `overflow` settings.

**Note:** If no ancestors have restrictive `overflow` settings, use native CSS `position: sticky`. Use this library only when native sticky is not available.

**react-sticky-anywhere** uses the [Intersection Observer API](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API) to monitor element position and `position: fixed` for display, achieving sticky behavior independent of ancestor overflow settings.

## Usage

```tsx
import { useStickyAnywhere } from "react-sticky-anywhere";

function Header() {
  const { sentinelRef, stickyRef, isSticky, stickyStyle, placeholderStyle } =
    useStickyAnywhere({ top: 0 });

  return (
    <>
      <div ref={sentinelRef} style={placeholderStyle} />
      <header ref={stickyRef} style={{ ...stickyStyle, background: "#fff" }}>
        {isSticky ? "Stuck!" : "Not stuck"}
      </header>
    </>
  );
}
```

### Specify sticky position from bottom

```tsx
const { sentinelRef, stickyRef, stickyStyle, placeholderStyle } =
  useStickyAnywhere({ bottom: 10 });
```

---

## 日本語
HTML要素を親要素に `overflow` 設定があったとしても、ビューポートに追従させることができます。

CSS の`position: sticky`で追従させるのが望ましいですが、`position:sticky`が指定された要素は、その祖先要素のうち`overflow: visible`(デフォルト値)以外の値をもつ最も近いものに粘着するという制約があります。

祖先要素の`overflow`を変更すると大幅にデザインが崩れてしまう場合などに、`overflow`を変更せずに追従を実現します。

**注意:** 祖先要素に制限的な `overflow` がない場合には、CSSの`position: sticky`を使用してください。
本ライブラリはネイティブの sticky が使えない場合にのみ使用してください。

**react-sticky-anywhere** は [Intersection Observer API](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API) で要素の位置を監視し、`position: fixed` で固定表示することで、祖先要素の overflow に依存せずにビューポートに追従できるようにしています。

## 使い方

```tsx
import { useStickyAnywhere } from "react-sticky-anywhere";

function Header() {
  const { sentinelRef, stickyRef, isSticky, stickyStyle, placeholderStyle } =
    useStickyAnywhere({ top: 0 });

  return (
    <>
      <div ref={sentinelRef} style={placeholderStyle} />
      <header ref={stickyRef} style={{ ...stickyStyle, background: "#fff" }}>
        {isSticky ? "追従" : "通常表示"}
      </header>
    </>
  );
}
```

### 追従位置を下端を基準に指定

```tsx
const { sentinelRef, stickyRef, stickyStyle, placeholderStyle } =
  useStickyAnywhere({ bottom: 10 });
```
