const backgroundColors = [
  '#D32F00', // Dark Red
  '#001f66', // Dark Blue
  '#007300', // Dark Green
  '#990099', // Dark Purple
  '#999900', // Dark Yellow
  '#006666', // Dark Cyan
  '#660066', // Dark Magenta
  '#B26600', // Dark Orange
];

export function getRandomBackgroundColor() {
  const randomIndex = Math.floor(Math.random() * backgroundColors.length);
  return backgroundColors[randomIndex];
}
