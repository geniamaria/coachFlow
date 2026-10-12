import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function toFloat(value: unknown) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const parsed = Number(value);

  return Number.isNaN(parsed) ? null : parsed;
}

// GET - buscar uma meta pelo ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const goalId = Number(id);

    if (Number.isNaN(goalId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const goal = await prisma.goal.findUnique({
      where: { id: goalId },
    });

    if (!goal) {
      return NextResponse.json(
        { error: "Meta não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(goal);
  } catch (error) {
    console.error("Erro ao buscar meta:", error);

    return NextResponse.json(
      { error: "Erro ao buscar meta" },
      { status: 500 }
    );
  }
}

// PUT - atualizar meta
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const goalId = Number(id);

    if (Number.isNaN(goalId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const body = await request.json();

    const goal = await prisma.goal.update({
      where: { id: goalId },
      data: {
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

    return NextResponse.json(goal);
  } catch (error) {
    console.error("Erro ao atualizar meta:", error);

    return NextResponse.json(
      { error: "Não foi possível atualizar a meta" },
      { status: 500 }
    );
  }
}

// DELETE - eliminar meta
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const goalId = Number(id);

    if (Number.isNaN(goalId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    await prisma.goal.delete({
      where: { id: goalId },
    });

    return NextResponse.json({
      message: "Meta eliminada com sucesso",
    });
  } catch (error) {
    console.error("Erro ao eliminar meta:", error);

    return NextResponse.json(
      { error: "Meta não encontrada ou não foi possível eliminar" },
      { status: 404 }
    );
  }
}