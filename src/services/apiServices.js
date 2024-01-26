import { axiosConfig } from "@/config/axiosConfig";

export const getUserRepos = async (userName) => {
  try {
    const response = await axiosConfig.get(`/users/${userName}/repos`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getUsersNextScroll = async ({ sincer }) => {
  try {
    const response = await axiosConfig.get(
      `/users?page=100&per_page=10&since=${sincer}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
