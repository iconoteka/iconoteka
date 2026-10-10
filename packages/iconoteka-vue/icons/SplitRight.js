import { h } from "vue";

const p = {"thin":{"stroke":"M10.95 11.75L20.225 2.475L16.4 2.475L16.4 2L21 2L21 6.6L20.525 6.6L20.525 2.8L11.375 12L20.525 21.2L20.525 17.4L21 17.4L21 22L16.4 22L16.4 21.525L20.225 21.525L10.95 12.25L3 12.25L3 11.75L10.95 11.75Z"},"ultralight":{"stroke":"M10.825 11.525L19.575 2.775L16.15 2.925L16.15 2L21 2L21 6.825L20.075 6.825L20.225 3.45L11.7 12L20.225 20.55L20.075 17.175L21 17.175L21 22L16.175 22L16.175 21.075L19.575 21.225L10.825 12.475L3 12.475L3 11.525L10.825 11.525Z"},"light":{"stroke":"M10.75 11.275L18.625 3.4L17.225 2L21 2L21 5.775L19.625 4.4L12.05 12L19.625 19.6L21 18.225L21 22L17.225 22L18.625 20.6L10.75 12.725L3 12.725L3 11.275L10.75 11.275Z"},"regular":{"stroke":"M10.625 11.05L17.875 3.825L16.05 2L21 2L21 6.95L19.2 5.15L12.375 12L19.2 18.85L21 17.05L21 22L16.05 22L17.875 20.2L10.625 12.95L3 12.95L3 11.05L10.625 11.05Z"},"medium":{"stroke":"M10.525 10.775L17.325 3.975L15.35 2L21 2L21 7.65L19.025 5.7L12.725 12L19.025 18.3L21 16.35L21 22L15.35 22L17.325 20.025L10.525 13.225L3 13.225L3 10.775L10.525 10.775Z"},"semibold":{"stroke":"M10.375 10.525L16.775 4.125L14.65 2L21 2L21 8.375L18.875 6.225L13.1 12L18.875 17.775L21 15.625L21 22L14.65 22L16.8 19.85L10.425 13.475L3 13.475L3 10.525L10.375 10.525Z"},"bold":{"stroke":"M10.275 10.25L16.25 4.3L13.925 2L21 2L21 9.075L18.7 6.75L13.45 11.975L18.725 17.25L21 14.925L21 22L13.925 22L16.275 19.675L10.325 13.75L3 13.75L3 10.25L10.275 10.25Z"}};
const f = null;

export default {
  name: "SplitRight",
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
