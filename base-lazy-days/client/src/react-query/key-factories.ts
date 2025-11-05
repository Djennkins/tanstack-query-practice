import { queryKeys } from "./constants";

export const generateQueryKey = (userId: number, userToken: string) => {
    //deliberately exclude the userToken from the query key
    // to keep the query key consistent for userId regardless of the userToken
    return [queryKeys.user, userId];
};

export const generateUserAppointmentsQueryKey = (
    userId: number,
    userToken: string
) => {
    return [queryKeys.appointments, queryKeys.user, userId, userToken];
};
