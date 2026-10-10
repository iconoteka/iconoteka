import { createElement, forwardRef } from "react";

const p = {"thin":{"stroke":"M12 2C17.6 2 22 6.4 22 12C22 14.8 20.9 17.3 19.1 19.1L18.75 18.75C20.45 17.038 21.5 14.662 21.5 12C21.5 6.675 17.325 2.475 12 2.475L12 2Z"},"ultralight":{"stroke":"M12 2C17.6 2 22 6.4 22 12C22 14.8 20.9 17.3 19.1 19.1L18.412 18.412C20.029 16.782 21.017 14.524 21.017 12C21.017 6.942 17.05 2.95 12 2.95Z"},"light":{"stroke":"M12 2C17.6 2 22 6.4 22 12C22 14.8 20.9 17.3 19.1 19.1L18.071 18.071C19.599 16.527 20.533 14.389 20.533 12C20.533 7.208 16.775 3.425 12 3.425Z"},"regular":{"stroke":"M12 2C17.6 2 22 6.4 22 12C22 14.8 20.9 17.3 19.1 19.1L17.725 17.725C19.163 16.262 20.05 14.25 20.05 12C20.05 7.475 16.5 3.9 12 3.9L12 2Z"},"medium":{"stroke":"M12 2C17.6 2 22 6.4 22 12C22 14.8 20.9 17.3 19.1 19.1L17.365 17.365C18.711 16.001 19.533 14.112 19.533 12C19.533 7.758 16.217 4.417 12 4.417Z"},"semibold":{"stroke":"M12 2C17.6 2 22 6.4 22 12C22 14.8 20.9 17.3 19.1 19.1L17 17C18.253 15.73 19.017 13.97 19.017 12C19.017 8.042 15.933 4.933 12 4.933Z"},"bold":{"stroke":"M12 2C17.6 2 22 6.4 22 12C22 14.8 20.9 17.3 19.1 19.1L16.636 16.636C17.794 15.459 18.5 13.829 18.5 12C18.5 8.325 15.65 5.45 12 5.45Z"}};
const f = null;

const Loader38 = forwardRef(function Loader38(
  { weight = "regular", variant = "stroke", size = 24, ...rest }, ref
) {
  const w = p[weight] || p.regular;
  const d = w[variant] || (variant === "fill" ? f : null) || w.stroke;
  return createElement(
    "svg",
    { ref, width: size, height: size, viewBox: "0 0 24 24", fill: "none",
      xmlns: "http://www.w3.org/2000/svg", ...rest },
    createElement("path", { d, fill: "currentColor" })
  );
});

Loader38.displayName = "Loader38";

export default Loader38;
