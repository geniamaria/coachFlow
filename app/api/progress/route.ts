import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function toFloat(value: unknown) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const parsed = Number(value);

  return Number.isNaN(parsed) ? null : parsed;
}

// GET - listar registos de progresso (opcionalmente filtrados por cliente)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clientIdParam = searchParams.get("clientId");
    const clientId = clientIdParam ? Number(clientIdParam) : null;

    const progress = await prisma.progress.findMany({
      where: clientId && !Number.isNaN(clientId) ? { clientId } : undefined,
      orderBy: [{ date: "asc" }, { id: "asc" }],
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Erro ao buscar progresso:", error);

    return NextResponse.json(
      { error: "Erro ao buscar progresso" },
      { status: 500 }
    );
  }
}

// POST - criar registo de progresso
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const progress = await prisma.progress.create({
      data: {
        clientId: Number(body.clientId),
        date: body.date,
        weight: toFloat(body.weight),
        bodyFat: toFloat(body.bodyFat),
        chest: toFloat(body.chest),
        waist: toFloat(body.waist),
        hip: toFloat(body.hip),
        arm: toFloat(body.arm),
        thigh: toFloat(body.thigh),
        notes: body.notes || null,
      },
    });

    return NextResponse.json(progress, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar registo de progresso:", error);

    return NextResponse.json(
      { error: "Erro ao criar registo de progresso" },
      { status: 500 }
    );
  }
}
