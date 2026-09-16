import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - listar agendamentos
export async function GET() {
  try {
    const schedules = await prisma.schedule.findMany({
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(schedules);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);

    return NextResponse.json(
      { error: "Erro ao buscar agendamentos" },
      { status: 500 }
    );
  }
}

// POST - criar agendamento
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const schedule = await prisma.schedule.create({
      data: {
        clientId: Number(body.clientId),
        date: body.date,
        time: body.time,
        type: body.type,
        status: body.status || "Agendado",
        notes: body.notes || null,
      },
    });

    return NextResponse.json(schedule, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);

    return NextResponse.json(
      { error: "Erro ao criar agendamento" },
      { status: 500 }
    );
  }
}