import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type TransactionType = 'aufladen' | 'abbuchen' | 'bonus';

export async function processTransaction(
  customerId: string,
  amount: number,
  type: TransactionType,
  employeeId: string
) {
  const supabase = createClientComponentClient();
  
  // Get current balance
  const { data: balanceData } = await supabase
    .from('customer_balances')
    .select('balance')
    .eq('customer_id', customerId)
    .single();

  const currentBalance = balanceData?.balance || 0;
  let newBalance = currentBalance;

  // Calculate new balance
  if (type === 'aufladen' || type === 'bonus') {
    newBalance = currentBalance + amount;
  } else if (type === 'abbuchen') {
    newBalance = currentBalance - amount;
  }

  // Check for negative balance
  if (newBalance < 0) {
    throw new Error('Guthaben reicht nicht aus');
  }

  // Process bonus
  if (type === 'aufladen' && amount >= 50) {
    const bonusAmount = Math.floor(amount / 50) * 5;
    await createTransaction(customerId, bonusAmount, 'bonus', employeeId);
    newBalance += bonusAmount;
  }

  // Update balance
  await supabase
    .from('customer_balances')
    .upsert({
      customer_id: customerId,
      balance: newBalance,
      updated_at: new Date().toISOString()
    });

  // Create transaction record
  return createTransaction(customerId, amount, type, employeeId);
}

async function createTransaction(
  customerId: string,
  amount: number,
  type: TransactionType,
  employeeId: string
) {
  const supabase = createClientComponentClient();
  
  return supabase
    .from('transactions')
    .insert({
      customer_id: customerId,
      employee_id: employeeId,
      amount,
      type,
      previous_balance: 0, // Will be updated in trigger
      new_balance: 0 // Will be updated in trigger
    });
}
