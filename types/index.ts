export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: string;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  role: string;
  guthaben: number;
}
