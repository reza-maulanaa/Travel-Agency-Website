"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function deleteTrip(id: string) {
  const supabase = await createClient();
  await supabase.from("trips").delete().eq("id", id);
  revalidatePath("/admin/dashboard");
}
