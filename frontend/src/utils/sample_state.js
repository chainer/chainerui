const state = {
  entities: {
    results: {
      123: {},
      124: {},
    }
  },
  config: {
    axes: {
      xAxis: {
        axisName: 'xAxis',
        xAxisKey: 'epoch',
        scale: 'linear',
        // range: [0, 100],
      },
      yLeftAxis: {
        axisName: 'yLeftAxis',
        scale: 'linear',
        // range: [0.0, 1.0],
        lines: [
          {
            resultId: 12,
            logKey: 'main_loss',
            config: {
              color: '#ABCDEF'
            }
          },
        ]
      },
      yRightAxis: {},
    },
  },
};

