import { AxiosResponse } from "axios";

import type { User } from "@shared/types";

import { useLoginData } from "@/auth/AuthContext";
import { axiosInstance, getJWTHeader } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { generateQueryKey } from "@/react-query/key-factories";

// query function
async function getUser(userId: number, userToken: string) {
    const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
        `/user/${userId}`,
        {
            headers: getJWTHeader(userToken),
        }
    );

    return data.user;
}

export function useUser() {
    const queryClient = useQueryClient();

    const { userId, userToken } = useLoginData();

    // call useQuery to update user data from server
    const { data: user } = useQuery({
        enabled: !!userId,
        queryKey: generateQueryKey(userId, userToken),
        queryFn: () => getUser(userId, userToken),
        staleTime: Infinity,
    });

    // meant to be called from useAuth
    function updateUser(newUser: User): void {
        queryClient.setQueryData(
            generateQueryKey(newUser.id, newUser.token),
            newUser
        );
    }

    // meant to be called from useAuth
    function clearUser() {
        queryClient.removeQueries({
            queryKey: [queryKeys.user],
        });
    }

    return { user, updateUser, clearUser };
}
