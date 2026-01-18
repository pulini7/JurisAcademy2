import { createClient } from '@supabase/supabase-js';

// Valores devem vir de variáveis de ambiente em produção
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xxxbrbbhfrhislmojbvs.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_pK21me0lhbLhXB109o6H_w_8w2tE9cx';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);