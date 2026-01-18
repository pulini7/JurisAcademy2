import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xxxbrbbhfrhislmojbvs.supabase.co';
const supabaseAnonKey = 'sb_publishable_pK21me0lhbLhXB109o6H_w_8w2tE9cx';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);