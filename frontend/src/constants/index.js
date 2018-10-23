export const CHAINERUI_VERSION = `v${process.env.VERSION}`;

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

export const logsLimitOptions = [
  {
    id: 1,
    name: '1000',
    value: 1000
  },
  {
    id: 2,
    name: '500',
    value: 500
  },
  {
    id: 3,
    name: '200',
    value: 200
  },
  {
    id: 4,
    name: '100',
    value: 100
  },
  {
    id: 5,
    name: 'Unlimited',
    value: -1
  }
];

export const defaultAxisConfig = {
  yLeftAxis: {
    axisName: 'yLeftAxis',
    logKeysConfig: {
      'main/loss': {
        selected: true
      }
    }
  }
};

export const defaultProjectConfig = {
  axes: defaultAxisConfig,
  resultsConig: {},
  lines: {},
  tableState: {}
};

export const keyOptions = ['epoch', 'iteration', 'episode', 'step', 'elapsed_time'];

export const SCHEDULE_NOW = 'scheduleNow';
export const SCHEDULE_CUSTOM = 'scheduleCustom';
