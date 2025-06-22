import { Session } from "@supabase/supabase-js";

export type Profile = {
  id: string;
  email: string;
  name: string;
};

export type UserModel = {
  session: Session | null;
  profile: Profile | null;
};
