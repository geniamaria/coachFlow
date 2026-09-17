import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const trainings = await prisma.training.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        exercises: true,
      },
    });

    return NextResponse.json(trainings);
  } catch (error) {
    console.error("Erro ao buscar planos de treino:", error);

    return NextResponse.json(
      { error: "Erro ao buscar planos de treino" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const training = await prisma.training.create({
      data: {
        clientId: Number(body.clientId),
        name: body.name,
        goal: body.goal,
        duration: body.duration,
        notes: body.notes || null,

        exercises: {
          create: body.exercises?.map((exercise: any) => ({
            name: exercise.name,
            sets: exercise.sets,
            repetitions: exercise.repetitions,
            weight: exercise.weight,
            rest: exercise.rest,
            notes: exercise.notes || null,
          })) || [],
        },
      },

      include: {
        exercises: true,
      },
    });

    return NextResponse.json(training, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar plano de treino:", error);

    return NextResponse.json(
      { error: "Erro ao criar plano de treino" },
      { status: 500 }
    );
  }
}