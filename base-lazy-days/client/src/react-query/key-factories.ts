import { queryKeys } from "./constants";

export const generateQueryKey = (userId: number, userToken: string) => {
    return [queryKeys.user, userId, userToken];
};
