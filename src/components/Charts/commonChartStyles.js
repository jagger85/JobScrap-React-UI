const fontColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--font')
  .trim()
const fontSizeS = getComputedStyle(document.documentElement)
  .getPropertyValue('--s')
  .trim()
const fontSizeXS = getComputedStyle(document.documentElement)
  .getPropertyValue('--xs')
  .trim()

export const commonTitleStyle = {
  textStyle: {
    color: '#b7b7b7',
    fontSize: 16,
    fontWeight: 'bold',
  },
}

export const commonLegendStyle = {
  orient: 'horizontal',
  left: 'center',
  bottom: '0',
  padding: [0, 0, 10, 0],
  textStyle: {
    color: '#b7b7b7',
    fontSize: 12,
  },
}

export const commonLabelStyle = {
  color: '#b7b7b7',
  fontSize: 12,
  fontWeight: 'normal',
}

export const chartColors = [
  '#1985a1', // Primary color
  '#8e44ad', // Purple
  '#00c8ff', // Secondary color
  '#5cb85c', // Success color
  '#f0ad4e', // Warning color
  '#d9534f', // Error color
  '#2ecc71', // Green
  '#e67e22', // Orange
  '#3498db', // Blue
  '#f1c40f', // Yellow
  '#e74c3c', // Red
  '#9b59b6', // Violet
]
