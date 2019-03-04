export interface User {
  accessToken: string;
  refreshToken: string;
  name: string;
  user_id: number;
  tokenExpiration: Date;
}
