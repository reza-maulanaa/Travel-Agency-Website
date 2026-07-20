"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createTrip(formData: FormData) {
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const duration = String(formData.get("duration") ?? "").trim();
  const image_url = String(formData.get("image_url") ?? "").trim();
  const whatsapp_number = String(formData.get("whatsapp_number") ?? "").trim();

  const price = Number(formData.get("price"));
  const max_slots = Number(formData.get("max_slots"));
  const available_slots = Number(formData.get("available_slots"));

  if (!title) {
    throw new Error("Judul wajib diisi");
  }

  await supabase.from("trips").insert({
    title,
    description,
    duration,
    image_url,
    whatsapp_number: whatsapp_number || "6287811165612",
    price: Number.isFinite(price) ? price : 0,
    max_slots: Number.isFinite(max_slots) ? max_slots : 0,
    available_slots: Number.isFinite(available_slots) ? available_slots : 0,
  });

  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}
