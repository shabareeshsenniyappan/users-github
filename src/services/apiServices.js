import { axiosConfig } from "@/config/axiosConfig";

export const getUserDetail = async (userName) => {
  try {
    const response = await axiosConfig.get(`/users/${userName}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getUserfollowers = async (userName) => {
  try {
    const response = await axiosConfig.get(`/users/${userName}/followers`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getUserRepos = async (userName) => {
  try {
    const response = await axiosConfig.get(`/users/${userName}/repos`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axiosConfig.get("/users?page=100&per_page=10");
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
