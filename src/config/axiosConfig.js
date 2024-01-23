import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    Authorization: "Bearer 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",
  },
});
