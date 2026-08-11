window.siteVisualLayouts = (() => {
  const number = (value, fallback) => Number.isFinite(Number(value)) ? Number(value) : fallback;
  const clamp = (value, limit) => Math.max(-limit, Math.min(limit, value));

  function transform(index, count, config = {}) {
    console.log("[siteVisualLayouts.transform] " + index);
    const layout = config.layout || "clean";
    const center = index - (count - 1) / 2;
    const maxRotation = Math.abs(number(config.maxRotation, 20));
    let rotation = 0, x = 0, y = 0, scale = 1;

    if (layout === "fan") {
      const step = count === 2 ? number(config.rotationStep, 30) : number(config.rotationStep, 10);
      rotation = count === 2 ? (index ? step / 2 : -step / 2) : clamp(center * step, maxRotation);
      y = Math.abs(center) * number(config.offsetStep, 6);
    } else if (layout === "stagger") {
      const direction = index % 2 ? 1 : -1;
      rotation = direction * number(config.rotationStep, 5);
      x = direction * number(config.offsetStep, 8);
    } else if (layout === "hero") {
      rotation = clamp(center * number(config.rotationStep, 8), maxRotation);
      scale = Math.abs(center) < 0.5 ? 1.06 : 0.94;
      y = Math.abs(center) * number(config.offsetStep, 8);
    } else if (layout === "custom") {
      rotation = number(config.rotations?.[index], 0);
      x = number(config.offsets?.[index]?.x, 0);
      y = number(config.offsets?.[index]?.y, 0);
      scale = number(config.scales?.[index], 1);
    }

    return { rotation, x, y, scale, zIndex: count - Math.round(Math.abs(center)) };
  }

  function style(index, count, config) {
    const value = transform(index, count, config);
    return `--visual-rotate:${value.rotation}deg;--visual-x:${value.x}px;--visual-y:${value.y}px;--visual-scale:${value.scale};--visual-z:${value.zIndex}`;
  }

  return { transform, style };
})();
