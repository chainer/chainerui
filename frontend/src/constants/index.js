export const chartSizeOptions = [
  {
    id: 1,
    name: '640x480',
    width: 640,
    height: 480,
    aspect: 1.333
  },
  {
    id: 2,
    name: '1024x768',
    width: 1024,
    height: 768,
    aspect: 1.333
  },
  {
    id: 3,
    name: '1280x720',
    width: 1280,
    height: 720,
    aspect: 1.778
  },
  {
    id: 4,
    name: 'fluid(16:9)',
    width: '100%',
    height: '100%',
    aspect: 1.778
  }
];

export const pollingOptions = [
  {
    id: 1,
    name: 'stop',
    value: 0
  },
  {
    id: 2,
    name: '5s',
    value: (5 * 1000)
  },
  {
    id: 3,
    name: '10s',
    value: (10 * 1000)
  },
  {
    id: 4,
    name: '15s',
    value: (15 * 1000)
  },
  {
    id: 5,
    name: '20s',
    value: (20 * 1000)
  }
];

export const defaultConfig = {
  axes: {},
  resultsConfig: {},
  lines: {},
  global: {}
};

