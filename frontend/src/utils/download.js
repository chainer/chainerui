import * as moment from 'moment';
import html2canvas from 'html2canvas';
import renderPyTmpl from './render.py.tmpl';

export const generateDownloadFileName = (exportName, ext) =>
  `${exportName}_${moment().format('YYYYMMDDHHmmss')}.${ext}`;

export const downloadFile = (fileName, dataURL) => {
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataURL);
  downloadAnchorNode.setAttribute('download', fileName);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export const downloadObjectAsCode = (exportObj, exportName) => {
  const fileName = generateDownloadFileName(exportName, 'py');
  const renderPy = renderPyTmpl.replace(/\${rendered_log}/, JSON.stringify(exportObj, null, '  '));
  const blobUrl = URL.createObjectURL(new Blob([renderPy], { type: 'text/plain' }));
  downloadFile(fileName, blobUrl);
};

export const downloadChartAsPng = async (chartDOMNode, exportName) => {
  const ext = 'png';
  const imageType = `image/${ext}`;
  const fileName = generateDownloadFileName(exportName, ext);

  const canvasElem = await html2canvas(chartDOMNode);
  const dataURL = canvasElem.toDataURL(imageType);
  downloadFile(fileName, dataURL);
};
