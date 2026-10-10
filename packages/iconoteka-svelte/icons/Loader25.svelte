<script>
  let { weight = "regular", variant = "stroke", size = 24, ...rest } = $props();

  const p = {"thin":{"stroke":"M12 2C17.6 2 22 6.4 22 12L21.5 12C21.5 6.675 17.325 2.475 12 2.475Z"},"ultralight":{"stroke":"M12 2C17.6 2 22 6.4 22 12L21.017 12C21.017 6.942 17.05 2.95 12 2.95Z"},"light":{"stroke":"M12 2C17.6 2 22 6.4 22 12L20.533 12C20.533 7.208 16.775 3.425 12 3.425Z"},"regular":{"stroke":"M12 2C17.6 2 22 6.4 22 12L20.05 12C20.05 7.475 16.5 3.9 12 3.9Z"},"medium":{"stroke":"M12 2C17.6 2 22 6.4 22 12L19.533 12C19.533 7.758 16.217 4.417 12 4.417Z"},"semibold":{"stroke":"M12 2C17.6 2 22 6.4 22 12L19.017 12C19.017 8.042 15.933 4.933 12 4.933Z"},"bold":{"stroke":"M12 2C17.6 2 22 6.4 22 12L18.5 12C18.5 8.325 15.65 5.45 12 5.45Z"}};
  const f = null;

  const w = $derived(p[weight] || p.regular);
  const d = $derived(w[variant] || (variant === "fill" ? f : null) || w.stroke);
</script>

<svg width={size} height={size} viewBox="0 0 24 24" fill="none"
     xmlns="http://www.w3.org/2000/svg" {...rest}>
  <path d={d} fill="currentColor" />
</svg>
