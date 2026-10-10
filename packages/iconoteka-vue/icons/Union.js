import { h } from "vue";

const p = {"thin":{"stroke":"M2.5 2.5L16 2.5L16 8L21.5 8L21.5 21.5L8 21.5L8 16L2.5 16ZM3 15.525L8.5 15.525L8.5 21.025L21 21.025L21 8.475L15.5 8.475L15.5 2.975L3 2.975Z","fill":"M2.5 2.5L16 2.5L16 8L21.5 8L21.5 21.5L8 21.5L8 16L2.5 16Z"},"ultralight":{"stroke":"M2.5 2.5L16 2.5L16 8L21.5 8L21.5 21.5L8 21.5L8 16L2.5 16ZM3.425 15.125L8.925 15.125L8.925 20.625L20.575 20.625L20.575 8.875L15.075 8.875L15.075 3.375L3.425 3.375Z","fill":"M2.5 2.5L16 2.5L16 8L21.5 8L21.5 21.5L8 21.5L8 16L2.5 16Z"},"light":{"stroke":"M2.5 2.5L16 2.5L16 8L21.5 8L21.5 21.5L8 21.5L8 16L2.5 16ZM3.825 14.7L9.325 14.7L9.325 20.2L20.175 20.2L20.175 9.3L14.675 9.3L14.675 3.8L3.825 3.8Z","fill":"M2.5 2.5L16 2.5L16 8L21.5 8L21.5 21.5L8 21.5L8 16L2.5 16Z"},"regular":{"stroke":"M2.5 2.5L16 2.5L16 8L21.5 8L21.5 21.5L8 21.5L8 16L2.5 16ZM4.25 14.3L9.75 14.3L9.75 19.8L19.75 19.8L19.75 9.7L14.25 9.7L14.25 4.2L4.25 4.2Z","fill":"M2.5 2.5L16 2.5L16 8L21.5 8L21.5 21.5L8 21.5L8 16L2.5 16Z"},"medium":{"stroke":"M2.5 2.5L16 2.5L16 8L21.5 8L21.5 21.5L8 21.5L8 16L2.5 16ZM4.775 13.775L10.275 13.775L10.275 19.275L19.225 19.275L19.225 10.225L13.725 10.225L13.725 4.725L4.775 4.725Z","fill":"M2.5 2.5L16 2.5L16 8L21.5 8L21.5 21.5L8 21.5L8 16L2.5 16Z"},"semibold":{"stroke":"M2.5 2.5L16.675 2.5L16.675 7.325L21.5 7.325L21.5 21.5L7.325 21.5L7.325 16.675L2.5 16.675ZM5.275 13.95L10.1 13.95L10.1 18.775L18.725 18.775L18.725 10.05L13.9 10.05L13.9 5.225L5.275 5.225Z","fill":"M2.5 2.5L16.675 2.5L16.675 7.325L21.5 7.325L21.5 21.5L7.325 21.5L7.325 16.675L2.5 16.675Z"},"bold":{"stroke":"M2.5 2.5L16.5 2.5L16.5 7.5L21.5 7.5L21.5 21.5L7.5 21.5L7.5 16.5L2.5 16.5ZM5.8 13.25L10.8 13.25L10.8 18.25L18.2 18.25L18.2 10.75L13.2 10.75L13.2 5.75L5.8 5.75Z","fill":"M2.5 2.5L16.5 2.5L16.5 7.5L21.5 7.5L21.5 21.5L7.5 21.5L7.5 16.5L2.5 16.5Z"}};
const f = null;

export default {
  name: "Union",
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
