import { NextRequest, NextResponse } from 'next/server';
import { candidates as initialCandidates } from '@/lib/data';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: initialCandidates
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch candidates' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real app, you would save to database here
    const newCandidate = {
      id: Date.now().toString(),
      ...body,
      appliedDate: new Date(body.appliedDate),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return NextResponse.json({
      success: true,
      data: newCandidate
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create candidate' },
      { status: 500 }
    );
  }
}
