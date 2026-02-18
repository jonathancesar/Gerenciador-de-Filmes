export interface IUserSuccessResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}
