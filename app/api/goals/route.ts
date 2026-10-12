import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function toFloat(value: unknown) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const parsed = Number(value);

  return Number.isNaN(parsed) ? null : parsed;
}

// GET - listar metas (opcionalmente filtradas por cliente)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clientIdParam = searchParams.get("clientId");
    const clientId = clientIdParam ? Number(clientIdParam) : null;

    const goals = await prisma.goal.findMany({
      where: clientId && !Number.isNaN(clientId) ? { clientId } : undefined,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    });

    return NextResponse.json(goals);
  } catch (error) {
    console.error("Erro ao buscar metas:", error);

    return NextResponse.json(
      { error: "Erro ao buscar metas" },
      { status: 500 }
    );
  }
}

// POST - criar meta
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const goal = await prisma.goal.create({
      data: {
        clientId: Number(body.clientId),
        title: body.title,
        metric: body.metric || null,
        startValue: toFloat(body.startValue),
        targetValue: toFloat(body.targetValue),
        currentValue: toFloat(body.currentValue),
        unit: body.unit || null,
        deadline: body.deadline || null,
        status: body.status || "Em progresso",
        notes: body.notes || null,
      },
    });

    return NextResponse.json(goal, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar meta:", error);

    return NextResponse.json(
      { error: "Erro ao criar meta" },
      { status: 500 }
    );
  }
}