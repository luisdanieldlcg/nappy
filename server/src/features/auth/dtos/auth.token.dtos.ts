export class RefreshTokenDTO {
  // Id of the user belonging to this token
  id: string;
  // Issued At
  iat: number;
  // Expiration Time.
  exp: number;
  // The token itself
  token: string;
}
