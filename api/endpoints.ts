

// export const AuthEndpoint = axios.create({
//   baseURL: API_URL + "auth",
//   withCredentials: true,
//   method: "post",
// });
// export const CardEndpoint = axios.create({
//   baseURL: API_URL + "cards",
//   withCredentials: true,
// });

// axios.defaults.withCredentials = true;
export class ErrorResponse {
  message: string | string[];
  statusCode: number;
}
