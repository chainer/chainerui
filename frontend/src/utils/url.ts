import { ProjectId, ResultId } from '../store/types';

export const urlForPlot = (projectId: ProjectId): string => `/projects/${projectId}`;

export const urlForResultDetail = (projectId: ProjectId, resultId: ResultId): string =>
  `/projects/${projectId}/results/${resultId}`;
