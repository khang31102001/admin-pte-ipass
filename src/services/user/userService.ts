import { get } from "@/api/http";

export class UserService {
  async getAllUsers(): Promise<any> {
    const response = await get("/users");
    return response;
  }

  async getMe(): Promise<any> {
    const response = await get("/users/me");
    return response;
  }

  async updateUser(id: number, data: any): Promise<any> {
    const response = await get(`/users/${id}`, data);
    return response;
  }

  async deleteUser(id: number): Promise<any> {
    const response = await get(`/users/${id}`);
    return response;
  }

  async createUser(data: any): Promise<any> {
    const response = await get("/users", data);
    return response;
  }

  async getUserById(id: number): Promise<any> {
    const response = await get(`/users/${id}`);
    return response;
  }
}

export const userService = new UserService();
