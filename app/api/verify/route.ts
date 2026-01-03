import { NextRequest, NextResponse } from 'next/server';
import axios from '@/lib/axios';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const response = await axios.post(`verify`, body);

        return NextResponse.json(response.data, { status: response.status });
    } catch (error: any) {
        if (error.response) {
            return NextResponse.json(error.response.data, { status: error.response.status });
        }
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}