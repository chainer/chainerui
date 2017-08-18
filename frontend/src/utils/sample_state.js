const state = {
  data: require('./sample_api_response.json'),
  config: {
    axes: {
      x: {
        axisKey: 'epoch',
        scale: 'auto',
      },
      yLeft: {
        scale: 'auto',
        lines: [
          {
            resultID: 12,
            logID: 123,
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

