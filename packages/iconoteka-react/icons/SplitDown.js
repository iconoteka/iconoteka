import { createElement, forwardRef } from "react";

const p = {"thin":{"stroke":"M12.25 10.95L21.525 20.225L21.525 16.4L22 16.4L22 21L17.4 21L17.4 20.525L21.2 20.525L12 11.375L2.8 20.525L6.6 20.525L6.6 21L2 21L2 16.4L2.475 16.4L2.475 20.225L11.75 10.95L11.75 3L12.25 3L12.25 10.95Z"},"ultralight":{"stroke":"M12.475 10.825L21.225 19.575L21.075 16.175L22 16.175L22 21L17.175 21L17.175 20.075L20.55 20.225L12 11.7L3.45 20.225L6.825 20.075L6.825 21L2 21L2 16.15L2.925 16.15L2.775 19.575L11.525 10.825L11.525 3L12.475 3L12.475 10.825Z"},"light":{"stroke":"M12.725 10.75L20.6 18.625L22 17.225L22 21L18.225 21L19.6 19.625L12 12.05L4.4 19.625L5.775 21L2 21L2 17.225L3.4 18.625L11.275 10.75L11.275 3L12.725 3L12.725 10.75Z"},"regular":{"stroke":"M12.95 10.625L20.175 17.875L22 16.05L22 21L17.05 21L18.85 19.2L12 12.375L5.15 19.2L6.95 21L2 21L2 16.05L3.8 17.875L11.05 10.625L11.05 3L12.95 3L12.95 10.625Z"},"medium":{"stroke":"M13.225 10.525L20.025 17.325L22 15.35L22 21L16.35 21L18.3 19.025L12 12.725L5.7 19.025L7.65 21L2 21L2 15.35L3.975 17.325L10.775 10.525L10.775 3L13.225 3L13.225 10.525Z"},"semibold":{"stroke":"M13.475 10.375L19.875 16.775L22 14.65L22 21L15.625 21L17.775 18.875L12 13.1L6.225 18.875L8.375 21L2 21L2 14.65L4.15 16.8L10.525 10.425L10.525 3L13.475 3L13.475 10.375Z"},"bold":{"stroke":"M13.75 10.275L19.7 16.25L22 13.925L22 21L14.925 21L17.25 18.7L12.025 13.45L6.75 18.725L9.075 21L2 21L2 13.925L4.325 16.275L10.25 10.325L10.25 3L13.75 3L13.75 10.275Z"}};
const f = null;

const SplitDown = forwardRef(function SplitDown(
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

SplitDown.displayName = "SplitDown";

export default SplitDown;
