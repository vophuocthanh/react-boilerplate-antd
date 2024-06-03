import axiosClient from '@/api/axiosClient'
import { IUser } from '@/interface/users'

export interface IUserListResponse {
  users: IUser[]
  total: number
  limit: number
  offset: number
}

export const usersAPI = {
  getUsers(params: { limit: number; offset: number }): Promise<IUserListResponse> {
    const { limit, offset } = params
    const url = `/users/?limit=${limit}&offset=${offset}`
    return axiosClient.get(url)
  },
  getUserDetails(id: number): Promise<IUser> {
    const url = `/users/${id}`
    return axiosClient.get(url)
  },
  putUser(id: number, user: IUser): Promise<IUser> {
    const url = `/users/${id}`
    return axiosClient.put(url, user)
  },
  deleteUser(id: number): Promise<IUser> {
    const url = `/users/${id}`
    return axiosClient.delete(url)
  }
}
