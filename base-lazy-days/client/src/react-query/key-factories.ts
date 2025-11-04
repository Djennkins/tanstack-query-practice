import { queryKeys } from "./constants";

export const generateQueryKey = (userId: number, userToken: string) => {
    return [queryKeys.user, userId, userToken];
};

export const generateUserAppointmentsQueryKey = (
    userId: number,
    userToken: string
) => {
    return [queryKeys.appointments, queryKeys.user, userId, userToken];
};
