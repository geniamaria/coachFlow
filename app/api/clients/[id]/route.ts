import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - buscar um cliente pelo ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const clientId = Number(id);

    if (Number.isNaN(clientId)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    const client = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Cliente não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);

    return NextResponse.json(
      { error: "Erro ao buscar cliente" },
      { status: 500 }
    );
  }
}

// PUT - atualizar cliente
// PUT - atualizar cliente
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const clientId = Number(id);

    console.log("ID recebido:", clientId);

    if (Number.isNaN(clientId)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    const body = await request.json();

    console.log("Dados recebidos:", body);

    const client = await prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        birthDate: body.birthDate || null,
        goal: body.goal,
        plan: body.plan,
        status: body.status,
        notes: body.notes || null,
      },
    });

    console.log("Cliente atualizado:", client);

    return NextResponse.json(client);
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);

    return NextResponse.json(
      { error: "Não foi possível atualizar o cliente" },
      { status: 500 }
    );
  }
}

// DELETE - eliminar cliente
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const clientId = Number(id);

    if (Number.isNaN(clientId)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    await prisma.client.delete({
      where: {
        id: clientId,
      },
    });

    return NextResponse.json({
      message: "Cliente eliminado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao eliminar cliente:", error);

    return NextResponse.json(
      { error: "Cliente não encontrado ou não foi possível eliminar" },
      { status: 404 }
    );
  }
}