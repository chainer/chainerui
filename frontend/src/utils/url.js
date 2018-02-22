export const urlForPlot = (projectId) => `/projects/${projectId}`;

export const urlForResultDetail = (projectId, resultId) => (
  `/projects/${projectId}/results/${resultId}`
);

export const urlForResultImage = (projectId, resultId) => (
  `/projects/${projectId}/results/${resultId}/images`
);
