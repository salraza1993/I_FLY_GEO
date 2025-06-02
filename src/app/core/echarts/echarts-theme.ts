// echarts-theme.ts

export const theme = {
  color: [
    '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
    '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'
  ],
  backgroundColor: 'transparent',
  textStyle: {
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    textStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333'
    },
    subtextStyle: {
      fontSize: 14,
      color: '#666'
    }
  },
  legend: {
    textStyle: {
      color: 'red'
    }
  },
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderColor: '#555',
    textStyle: {
      color: '#fff',
      fontSize: 14
    }
  },
  grid: {
    containLabel: true,
    left: '3%',
    right: '4%',
    bottom: '3%',
    backgroundColor: 'transparent'
  }
};