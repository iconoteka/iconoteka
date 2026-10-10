import { h } from "vue";

const p = {"thin":{"stroke":"M12 2C14.8 2 17.3 3.1 19.1 4.9L18.753 5.247C17.043 3.528 14.666 2.475 12 2.475Z"},"ultralight":{"stroke":"M12 2C14.8 2 17.3 3.1 19.1 4.9L18.412 5.588C16.788 3.952 14.53 2.95 12 2.95Z"},"light":{"stroke":"M12 2C14.8 2 17.3 3.1 19.1 4.9L18.071 5.929C16.533 4.376 14.395 3.425 12 3.425Z"},"regular":{"stroke":"M12 2C14.8 2 17.3 3.1 19.1 4.9L17.73 6.27C16.278 4.801 14.259 3.9 12 3.9Z"},"medium":{"stroke":"M12 2C14.8 2 17.3 3.1 19.1 4.9L17.363 6.638C16 5.263 14.113 4.412 12 4.412L12 2Z"},"semibold":{"stroke":"M12 2C14.8 2 17.3 3.1 19.1 4.9L17 7C15.737 5.717 13.975 4.933 12 4.933Z"},"bold":{"stroke":"M12 2C14.8 2 17.3 3.1 19.1 4.9L16.636 7.364C15.466 6.176 13.834 5.45 12 5.45Z"}};
const f = null;

export default {
  name: "Loader13",
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
