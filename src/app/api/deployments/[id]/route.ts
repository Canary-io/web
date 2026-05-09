import { getPool } from "@/lib/db";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const deploymentId = Number(id);

  if (!Number.isInteger(deploymentId) || deploymentId <= 0) {
    return NextResponse.json(
      { error: "Invalid deployment id." },
      { status: 400 },
    );
  }

  const pool = getPool();
  const result = await pool.query("DELETE FROM deployments WHERE id = $1", [
    deploymentId,
  ]);

  if (result.rowCount === 0) {
    return NextResponse.json(
      { error: "Deployment not found." },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true });
}
