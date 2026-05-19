import type { RequestByEtap } from '../interfaces';

export const sendRequestByEtap = async (requestByEtap: RequestByEtap[]): Promise<boolean> => {
  let isCompleted = false;

  requestByEtap.forEach((request) => {
    if (request.body instanceof FormData) {
      request.fetchFunction(request.body);
    } else {
      request.body?.forEach((item) => {
        request.fetchFunction(item);
      });
    }
  });

  if (requestByEtap.every((request) => request.isCompleted)) {
    isCompleted = true;
  }

  return isCompleted;
};
