import { Role } from './role.enum';

export interface JwtResponse {
  token: string;
  id: number;
  email: string;
  role: Role;
  name: string;
}
