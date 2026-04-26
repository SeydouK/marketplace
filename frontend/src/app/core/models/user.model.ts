import { Role } from './role.enum';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  emailVerified?: boolean;
  kycStatus?: string | null;
  devenirVendeur?: boolean;
  animalsCount?: number;
  pendingHealthValidationCount?: number;
}
