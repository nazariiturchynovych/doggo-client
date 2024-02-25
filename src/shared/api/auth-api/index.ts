import { AuthenticationApi } from '@/shared/api/auth-api/authetication-api.ts';

export const authenticationApi = new AuthenticationApi();
export * from './models/requests.ts'
export * from './models/dtos.ts'