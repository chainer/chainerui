import * as moment from 'moment';

export const downloadObjectAsJson = (exportObj, exportName) => {
  const fileName = `${exportName}_${moment().format('YYYYMMDDHHmmss')}.json`;
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportObj))}`;
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', fileName);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export const downloadChartAsPng = (chartDOMNode, exportName) => {
  const fileName = `${exportName}_${moment().format('YYYYMMDDHHmmss')}.png`;
  saveSvgAsPng.saveSvgAsPng(chartDOMNode.getElementsByTagName('svg')[0], fileName);
};
