declare module '@/types' {
  export interface Profile {
    id: string;
    email: string;
    role: 'admin' | 'mitarbeiter' | 'kunde';
    created_at: string;
  }

  export interface Transaction {
    id: string;
    customer_id: string;
    employee_id: string;
    amount: number;
    type: 'aufladen' | 'abbuchen' | 'bonus';
    created_at: string;
    previous_balance: number;
    new_balance: number;
  }
}
