import { NextRequest, NextResponse } from 'next/server';
import { candidates as initialCandidates } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const candidate = initialCandidates.find(c => c.id === id);
    
    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'Candidate not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: candidate
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch candidate' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // In a real app, you would update the database here
    const updatedCandidate = {
      ...body,
      id: id,
      updatedAt: new Date()
    };

    return NextResponse.json({
      success: true,
      data: updatedCandidate
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update candidate' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // In a real app, you would delete from database here
    
    return NextResponse.json({
      success: true,
      message: 'Candidate deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete candidate' },
      { status: 500 }
    );
  }
}
