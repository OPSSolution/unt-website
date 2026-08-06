export interface AdminIdentity {
  id: string;
  email?: string;
}

declare global {
  namespace Express {
    interface Request {
      admin?: AdminIdentity;
    }
  }
}

export {};
