import { Role } from '../../../core/models/role.enum';

export interface SellerRequest {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: Role;
  emailVerified: boolean;
  kycStatus: string | null;
  devenirVendeur: boolean;
  createdAt: string;
  updatedAt: string;
}
