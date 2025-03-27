import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

// Ensure this API runs in a Node.js runtime (not Edge)
export const runtime = "node";

export async function POST(
  request: NextRequest,
  { params }: { params: { listingId: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { listingId } = params;

  if (!listingId) {
    return NextResponse.json({ error: "Invalid Id" }, { status: 400 });
  }

  let favoriteIds = new Set(currentUser.favoriteIds || []);
  favoriteIds.add(listingId);

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds: Array.from(favoriteIds) },
  });

  return NextResponse.json(user, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { listingId: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { listingId } = params;

  if (!listingId) {
    return NextResponse.json({ error: "Invalid Id" }, { status: 400 });
  }

  let favoriteIds = new Set(currentUser.favoriteIds || []);
  favoriteIds.delete(listingId);

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds: Array.from(favoriteIds) },
  });

  return NextResponse.json(user, { status: 200 });
}
