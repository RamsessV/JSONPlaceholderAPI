import { jsonApi } from '@/api/jsonApi';
import type { User, UserAPI } from '@/types';


interface Response {
    ok: boolean;
    users?: User[];
}

export const getUsersAction = async (): Promise<Response> => {
  try {
    const { data } = await jsonApi.get<UserAPI[]>('/users');
    const users = data.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      company: user.company.name,
    }));

    return {
      ok: true,
      users,
    };
  } catch (e) {
    return { ok: false };
  }
};
