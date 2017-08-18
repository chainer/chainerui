const state = {
  data: require('./sample_api_response.json'),
  config: {
    axes: {
      x: {
        axisName: 'x',
        xKey: 'epoch',
        scale: 'auto',
        range: [0, 100],
      },
      yLeft: {
        axisName: 'yLeft',
        scale: 'auto',
        range: [0.0, 1.0],
        lines: [
          {
            resultID: 12,
            logID: 123,
            logKey: 'main_loss',
          },
        ]
      },
      yRight: {},
    },
    colors: {
      12: { // resultID
        123: '#ABCDEF', /// logID : color
      }
    },
  },
};

