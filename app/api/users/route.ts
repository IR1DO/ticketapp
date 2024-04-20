import { NextRequest, NextResponse } from 'next/server';
import { userSchema } from '@/validation/schema/users';
import prisma from '@/prisma/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const duplicate = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (duplicate) {
    return NextResponse.json(
      { message: 'Duplicate username.' },
      { status: 409 }
    );
  }

  if (!body.password) {
    return NextResponse.json(
      { message: 'Password is required.' },
      { status: 409 }
    );
  }

  const hashPassword = await bcrypt.hash(body.password, 10);

  body.password = hashPassword;

  const newUser = await prisma.user.create({
    data: { ...body },
  });

  return NextResponse.json(newUser, { status: 201 });
}
