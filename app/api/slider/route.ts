import { NextResponse } from 'next/server';
import usersData from '@/app/lib/users.json';
export async function GET() {
    return NextResponse.json(usersData);
}