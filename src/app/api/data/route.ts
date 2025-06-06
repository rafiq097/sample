import { NextResponse } from 'next/server';
import data from '../../../data/MOCK_DATA.json';

export async function GET() {
  return NextResponse.json(data);
}
