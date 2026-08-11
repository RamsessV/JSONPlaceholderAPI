import { jsonApi } from "@/api/jsonApi"
import type { User } from "@/api/User.type"

export const getUsersAction = async () => {
    const response = await jsonApi.get<User[]>('/users');
    console.log(response.data);
}