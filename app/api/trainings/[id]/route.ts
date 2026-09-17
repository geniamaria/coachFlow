import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const trainingId = Number(id);

    if (Number.isNaN(trainingId)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    const training = await prisma.training.findUnique({
      where: {
        id: trainingId,
      },
      include: {
        exercises: true,
      },
    });

    if (!training) {
      return NextResponse.json(
        { error: "Plano de treino não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(training);
  } catch (error) {
    console.error("Erro ao buscar plano de treino:", error);

    return NextResponse.json(
      { error: "Erro ao buscar plano de treino" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const trainingId = Number(id);

    if (Number.isNaN(trainingId)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const training = await prisma.training.update({
      where: {
        id: trainingId,
      },
      data: {
        clientId: Number(body.clientId),
        name: body.name,
        goal: body.goal,
        duration: body.duration,
        notes: body.notes || null,
      },
      include: {
        exercises: true,
      },
    });

    return NextResponse.json(training);
  } catch (error) {
    console.error("Erro ao atualizar plano de treino:", error);

    return NextResponse.json(
      { error: "Não foi possível atualizar o plano de treino" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const trainingId = Number(id);

    if (Number.isNaN(trainingId)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    await prisma.training.delete({
      where: {
        id: trainingId,
      },
    });

    return NextResponse.json({
      message: "Plano de treino eliminado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao eliminar plano de treino:", error);

    return NextResponse.json(
      {
        error:
          "Plano de treino não encontrado ou não foi possível eliminar",
      },
      { status: 404 }
    );
  }
}