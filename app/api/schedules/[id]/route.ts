import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - buscar um agendamento
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const scheduleId = Number(id);

    if (Number.isNaN(scheduleId)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 },
      );
    }

    const schedule = await prisma.schedule.findUnique({
      where: {
        id: scheduleId,
      },
    });

    if (!schedule) {
      return NextResponse.json(
        { error: "Agendamento não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(schedule);
  } catch (error) {
    console.error("Erro ao buscar agendamento:", error);

    return NextResponse.json(
      { error: "Erro ao buscar agendamento" },
      { status: 500 },
    );
  }
}

// PUT - atualizar um agendamento
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const scheduleId = Number(id);

    if (Number.isNaN(scheduleId)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 },
      );
    }

    const body = await request.json();

    const schedule = await prisma.schedule.update({
      where: {
        id: scheduleId,
      },
      data: {
        clientId: Number(body.clientId),
        date: body.date,
        time: body.time,
        type: body.type,
        status: body.status,
        notes: body.notes || null,
      },
    });

    return NextResponse.json(schedule);
  } catch (error) {
    console.error("Erro ao atualizar agendamento:", error);

    return NextResponse.json(
      { error: "Não foi possível atualizar o agendamento" },
      { status: 500 },
    );
  }
}

// DELETE - eliminar um agendamento
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const scheduleId = Number(id);

    if (Number.isNaN(scheduleId)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 },
      );
    }

    await prisma.schedule.delete({
      where: {
        id: scheduleId,
      },
    });

    return NextResponse.json({
      message: "Agendamento eliminado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao eliminar agendamento:", error);

    return NextResponse.json(
      { error: "Agendamento não encontrado ou não foi possível eliminar" },
      { status: 404 },
    );
  }
}