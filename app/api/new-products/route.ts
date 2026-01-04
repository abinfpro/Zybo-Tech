import { NextRequest, NextResponse } from 'next/server';
import axios from '@/lib/axios';

export async function GET(request: NextRequest) {
    try {
        const response = await axios.get("new-products/");

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error('[Proxy Error]', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
