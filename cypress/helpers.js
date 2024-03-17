export function hexToRGB(hex) {
  const r = parseInt(hex.split("#")[1].substring(0, 2), 16);
  const g = parseInt(hex.split("#")[1].substring(2, 4), 16);
  const b = parseInt(hex.split("#")[1].substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}
