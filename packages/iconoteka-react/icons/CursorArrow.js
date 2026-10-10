import { createElement, forwardRef } from "react";

const p = {"thin":{"stroke":"M5 22.925L4.5 22.675L4.5 1.125L4.95 0.9L21.475 14.75L21.325 15.3L11.775 16.125L5 22.925ZM4.975 22.275L11.55 15.675L20.875 14.875L4.975 1.55L4.975 22.275Z","fill":"M4.5 23.475L4.5 0.525L22.075 15.275L11.8 16.175L4.5 23.475Z"},"ultralight":{"stroke":"M4.325 22.4L4.325 1.375L5.3 0.925L21.425 14.45L21.1 15.6L11.925 16.375L5.425 22.9L4.325 22.4ZM11.5 15.475L20.275 14.725L5.275 2.15L5.275 21.7L11.5 15.475Z"},"light":{"stroke":"M4.175 22.15L4.175 1.625L5.65 0.925L21.375 14.125L20.875 15.875L12.075 16.65L5.825 22.9L4.175 22.15ZM11.45 15.3L19.675 14.575L5.6 2.75L5.6 21.15L11.45 15.3Z"},"regular":{"stroke":"M6.225 22.875L4 21.9L4 1.875L6 0.95L21.325 13.825L20.65 16.15L12.225 16.9L6.225 22.875ZM5.9 20.575L11.375 15.1L19.1 14.425L5.9 3.35L5.9 20.575Z"},"medium":{"stroke":"M3.825 21.875L3.825 2L6.225 0.9L21.45 13.675L20.725 16.175L12.25 16.925L6.2 22.925L3.825 21.875ZM11.15 14.575L18.05 13.975L6.275 4.15L6.275 19.475L11.15 14.575Z"},"semibold":{"stroke":"M3.65 21.875L3.65 2.125L6.45 0.825L21.55 13.525L20.8 16.175L12.25 16.925L6.175 23L3.65 21.875ZM10.925 14.05L16.975 13.525L6.675 4.975L6.6 18.375L10.925 14.05Z"},"bold":{"stroke":"M6.15 23.05L3.5 21.85L3.5 2.25L6.65 0.775L21.675 13.375L20.875 16.175L12.275 16.95L6.15 23.05ZM6.95 17.275L10.675 13.55L15.925 13.075L7.075 5.8L6.95 17.275Z"}};
const f = p.thin.fill;

const CursorArrow = forwardRef(function CursorArrow(
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

CursorArrow.displayName = "CursorArrow";

export default CursorArrow;
