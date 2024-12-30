import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateGalleryBody {
  title: string;
  description?: string;
  imageUrl: string;
}

// POST /api/gallerys
export async function POST(request: Request) {
  try {
    const body: CreateGalleryBody = await request.json();

    const newGalleryItem = await prisma.gallery.create({
      data: body,
    });

    return NextResponse.json({ success: true, data: newGalleryItem }, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// GET /api/gallerys
export async function GET() {
  try {
    const galleryItems = await prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: galleryItems }, { status: 200 });
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

interface DeleteGalleryParams {
  id: string; // Passed as a string in URL params
}


interface UpdateGalleryBody {
  id: number;
  title?: string;
  description?: string;
  imageUrl?: string;
}

// PUT /api/gallerys/:id

export async function PUT(request: Request) {
  try {
    const body: UpdateGalleryBody = await request.json();

    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const updatedGalleryItem = await prisma.gallery.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: updatedGalleryItem }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating gallery item:', error);

    if (error.code === 'P2025') {
      return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE /api/gallerys/:id

// export async function DELETE(request: Request, { params }: { params: DeleteGalleryParams }) {
//   try {
//     const { id } = params;

//     const deletedGalleryItem = await prisma.gallery.delete({
//       where: { id: parseInt(id, 10) },
//     });

//     return NextResponse.json(
//       { success: true, message: 'Gallery deleted successfully', data: deletedGalleryItem },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error('Error deleting gallery item:', error);

//     if (error.code === 'P2025') {
//       return NextResponse.json({ success: false, error: 'Gallery not found' }, { status: 404 });
//     }

//     return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }
