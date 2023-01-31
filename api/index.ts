import { LoginDTO, LoginResponse } from "./dtos/login_dto";
import { SignupDTO, SignupResponse } from "./dtos/signup_dto";
import { AuthEndpoint } from "./endpoints";
/**
 * @url POST /auth/login
 * @param dto
 * @since 1.0
 */
export const login = (dto: LoginDTO) => {
  return AuthEndpoint.post<LoginResponse>("/login", dto);
};

/**
 * @url POST /auth/signup
 * @param dto
 * @since 1.0
 */
export const signup = (dto: SignupDTO) => {
  return AuthEndpoint.post<SignupResponse>("/signup", dto);
};

/**
 *  @url POST /auth/logout
 *  @since 1.0
 */
export const logout = () => {
  return AuthEndpoint.post("/logout");
};
