import { supabase } from "./database";

export class EmailDB {
  constructor() {}

  async create(email: string) {
    const data = await supabase.from("users").insert({ email: email });

    return data;
  }
}
