import { h } from "vue";

const p = {"thin":{"stroke":"M12.25 21.5L11.75 21.5L11.75 2.5L12.25 2.5ZM6.6 17.1L1.5 12L6.6 6.9L6.95 7.25L2.175 12L6.95 16.75ZM17.425 6.9L22.525 12L17.425 17.1L17.075 16.75L21.85 12L17.075 7.25Z"},"ultralight":{"stroke":"M11.5 21.5L11.5 2.5L12.5 2.5L12.5 21.5ZM17.475 6.95L22.525 12L17.475 17.05L16.775 16.375L21.175 12L16.775 7.625ZM6.55 17.05L1.5 12L6.55 6.95L7.25 7.625L2.825 12L7.25 16.375Z"},"light":{"stroke":"M11.25 21.5L11.25 2.5L12.75 2.5L12.75 21.5ZM6.5 17L1.5 12L6.5 7L7.525 8.025L3.5 12L7.525 15.975ZM17.5 7L22.5 12L17.5 17L16.475 15.975L20.525 12L16.475 8.025Z"},"regular":{"stroke":"M11 21.5L11 2.5L13 2.5L13 21.5ZM6.45 16.95L1.5 12L6.45 7.05L7.825 8.4L4.15 12L7.825 15.6ZM17.55 7.05L22.5 12L17.55 16.95L16.175 15.6L19.85 12L16.175 8.4Z"},"medium":{"stroke":"M10.708 2.5L13.292 2.5L13.292 21.5L10.708 21.5ZM6.475 17.125L1.375 12L6.475 6.875L8 8.4L4.175 12L8 15.6ZM17.525 6.875L22.625 12L17.525 17.125L16 15.6L19.825 12L16 8.4Z"},"semibold":{"stroke":"M10.417 2.5L13.583 2.5L13.583 21.5L10.417 21.5ZM6.35 16.15L1.85 12L6.35 7.85ZM17.65 7.85L22.15 12L17.65 16.15Z"},"bold":{"stroke":"M10.125 2.5L13.875 2.5L13.875 21.5L10.125 21.5ZM7.025 16.475L1.5 12L7.025 7.525ZM16.975 7.525L22.5 12L16.975 16.475Z"}};
const f = null;

export default {
  name: "FlipHorizontal",
  props: {
    weight:  { type: String, default: "regular" },
    variant: { type: String, default: "stroke" },
    size:    { type: [Number, String], default: 24 }
  },
  setup(props, { attrs }) {
    return () => {
      const w = p[props.weight] || p.regular;
      const d = w[props.variant] || (props.variant === "fill" ? f : null) || w.stroke;
      return h(
        "svg",
        { width: props.size, height: props.size, viewBox: "0 0 24 24",
          fill: "none", xmlns: "http://www.w3.org/2000/svg", ...attrs },
        [h("path", { d, fill: "currentColor" })]
      );
    };
  }
};
