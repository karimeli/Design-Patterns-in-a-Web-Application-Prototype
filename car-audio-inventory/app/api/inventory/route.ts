// Location: app/api/inventory/route.ts
import { NextRequest, NextResponse } from "next/server";
import { InventoryController } from "../../../controller/InventoryController";

export async function GET() {
  return NextResponse.json(InventoryController.getInventory());
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    if (!body || typeof body !== "object" || !("type" in body) || typeof body.type !== "string") {
      return NextResponse.json({ error: "A component type is required" }, { status: 400 });
    }

    const item = InventoryController.addComponent(body.type);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create component";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}