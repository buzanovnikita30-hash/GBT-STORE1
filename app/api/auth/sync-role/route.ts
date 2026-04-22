import { NextResponse } from "next/server";

import { resolveRoleByEmail } from "@/lib/auth/resolveRole";
import { createAdminClient, createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const admin = createAdminClient();
  let userId: string | null = null;
  let userEmail: string | null = null;

  const {
    data: { user: cookieUser },
  } = await supabase.auth.getUser();

  if (cookieUser) {
    userId = cookieUser.id;
    userEmail = cookieUser.email ?? null;
  } else {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : null;

    if (token) {
      const { data: tokenUserData } = await admin.auth.getUser(token);
      if (tokenUserData.user) {
        userId = tokenUserData.user.id;
        userEmail = tokenUserData.user.email ?? null;
      }
    }
  }

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = resolveRoleByEmail(userEmail);

  const { error } = await admin
    .from("profiles")
    .update({
      role,
      email: userEmail,
      last_seen: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) {
    return NextResponse.json({ error: "Failed to sync role" }, { status: 500 });
  }

  return NextResponse.json({ role });
}

