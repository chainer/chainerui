import moment from 'moment';
import html2canvas from 'html2canvas';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const renderPyTmpl = require('./render.py.tmpl').default;

export const generateDownloadFileName = (exportName: string, ext: string): string =>
  `${exportName}_${moment().format('YYYYMMDDHHmmss')}.${ext}`;

export const downloadFile = (fileName: string, dataURL: string): void => {
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataURL);
  downloadAnchorNode.setAttribute('download', fileName);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export const downloadObjectAsCode = (exportObj: object, exportName: string): void => {
  const fileName = generateDownloadFileName(exportName, 'py');
  const renderPy = renderPyTmpl.replace(/\${rendered_log}/, JSON.stringify(exportObj, null, '  '));
  const blobUrl = URL.createObjectURL(new Blob([renderPy], { type: 'text/plain' }));
  downloadFile(fileName, blobUrl);
};

export const downloadChartAsPng = async (
  chartDOMNode: HTMLElement,
  exportName: string
): Promise<void> => {
  const ext = 'png';
  const imageType = `image/${ext}`;
  const fileName = generateDownloadFileName(exportName, ext);

  const canvasElem = await html2canvas(chartDOMNode);
  const dataURL = canvasElem.toDataURL(imageType);
  downloadFile(fileName, dataURL);
};
