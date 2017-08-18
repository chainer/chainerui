const state = {
  results: require('./sample_api_response.json'),
  config: {
    axes: {
      xAxis: {
        axisName: 'xAxis',
        xAxisKey: 'epoch',
        scale: 'auto',
        range: [0, 100],
      },
      yLeftAxis: {
        axisName: 'yLeftAxis',
        scale: 'auto',
        range: [0.0, 1.0],
        lines: [
          {
            resultID: 12,
            logKey: 'main_loss',
          },
        ]
      },
      yRightAxis: {},
    },
    colors: {
      12_main_loss: '#ABCDEF', /// lineKey(resultID + logKey): color
    },
  },
};

