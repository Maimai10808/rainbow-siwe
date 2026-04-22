import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getProfileByWallet, saveProfile } from "@/lib/profile-store";

export async function GET() {
  const session = await getServerSession(authOptions);
  const walletAddress = session?.user?.name;

  if (!walletAddress) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = getProfileByWallet(walletAddress);

  return NextResponse.json({
    walletAddress,
    profile,
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const walletAddress = session?.user?.name;

  if (!walletAddress) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const profile = saveProfile({
    walletAddress,
    name: String(body?.name ?? ""),
    gender: String(body?.gender ?? ""),
    email: String(body?.email ?? ""),
    bio: String(body?.bio ?? ""),
    updatedAt: new Date().toISOString(),
  });

  return NextResponse.json({
    success: true,
    profile,
  });
}
