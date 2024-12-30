import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { page } = await req.json();

    if (!page) {
      return NextResponse.json({ success: false, error: 'Page is required' }, { status: 400 });
    }

    // Use Prisma to find or create the PageView record
    const pageView = await prisma.pageView.upsert({
      where: { page },
      update: { views: { increment: 1 } },
      create: { page, views: 1 },
    });

    return NextResponse.json({ success: true, views: pageView.views }, { status: 200 });
  } catch (error) {
    console.error('Error updating page views:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Clean up the database connection
  }
}
