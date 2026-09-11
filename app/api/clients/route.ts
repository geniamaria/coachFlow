import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - listar clientes
export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);

    return NextResponse.json(
      { error: "Erro ao buscar clientes" },
      { status: 500 }
    );
  }
}

// POST - criar cliente
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const client = await prisma.client.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        birthDate: body.birthDate || null,
        goal: body.goal,
        plan: body.plan,
        status: body.status || "Ativo",
        notes: body.notes || null,
      },
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar cliente:", error);

    return NextResponse.json(
      { error: "Erro ao criar cliente" },
      { status: 500 }
    );
  }
}