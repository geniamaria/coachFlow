import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function toFloat(value: unknown) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const parsed = Number(value);

  return Number.isNaN(parsed) ? null : parsed;
}

// GET - buscar um registo de progresso pelo ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const progressId = Number(id);

    if (Number.isNaN(progressId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const progress = await prisma.progress.findUnique({
      where: { id: progressId },
    });

    if (!progress) {
      return NextResponse.json(
        { error: "Registo não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Erro ao buscar registo de progresso:", error);

    return NextResponse.json(
      { error: "Erro ao buscar registo de progresso" },
      { status: 500 }
    );
  }
}

// PUT - atualizar registo de progresso
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const progressId = Number(id);

    if (Number.isNaN(progressId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const body = await request.json();

    const progress = await prisma.progress.update({
      where: { id: progressId },
      data: {
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

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Erro ao atualizar registo de progresso:", error);

    return NextResponse.json(
      { error: "Não foi possível atualizar o registo" },
      { status: 500 }
    );
  }
}

// DELETE - eliminar registo de progresso
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const progressId = Number(id);

    if (Number.isNaN(progressId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    await prisma.progress.delete({
      where: { id: progressId },
    });

    return NextResponse.json({
      message: "Registo eliminado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao eliminar registo de progresso:", error);

    return NextResponse.json(
      { error: "Registo não encontrado ou não foi possível eliminar" },
      { status: 404 }
    );
  }
}
