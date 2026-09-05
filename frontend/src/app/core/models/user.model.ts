// core/models/user.model.ts
import { Role } from './role.enum';

export interface User {
    id?: number;
    name: string;
    email: string;
    role: Role;
    emailVerified?: boolean;
    devenirVendeur?: boolean;
    estTransporteur?: boolean;

    // KYC
    kycStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
    kycSubmittedAt?: string;

    // Stats vendeur (renvoyées par /users/me selon le rôle)
    animalsCount?: number;
    pendingHealthValidationCount?: number;
    monthlySalesCount?: number;

    // Stats acheteur
    activeOrdersCount?: number;
    completedOrdersCount?: number;

    createdAt?: string;
    updatedAt?: string;
}
