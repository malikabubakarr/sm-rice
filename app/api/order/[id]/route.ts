// app/api/order/[id]/route.ts
import { NextResponse } from 'next/server';

// Correct handler signature
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Example logic: update order by ID
  // const body = await request.json();
  // await updateOrderInDatabase(id, body);

  return NextResponse.json({ success: true });
}
