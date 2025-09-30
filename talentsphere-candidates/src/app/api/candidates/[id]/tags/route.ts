import { NextRequest, NextResponse } from 'next/server';
import { candidates as initialCandidates } from '@/lib/data';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { tags } = body;
    
    const candidate = initialCandidates.find(c => c.id === id);
    
    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'Candidate not found' },
        { status: 404 }
      );
    }

    // In a real app, you would update the database here
    const updatedCandidate = {
      ...candidate,
      tags: tags || [],
      updatedAt: new Date()
    };

    return NextResponse.json({
      success: true,
      data: updatedCandidate
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update candidate tags' },
      { status: 500 }
    );
  }
}
