import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { PaymentConfig } from '@/models/PaymentConfig';

export async function GET() {
    try {
        await connectToDatabase();

        // We only expect one configuration document
        const config = await PaymentConfig.findOne();

        if (!config) {
            // Return defaults if document doesn't exist yet
            return NextResponse.json({
                upiId: '9122998546@ybl',
                merchantName: 'ANIL KUMAR'
            });
        }

        return NextResponse.json({
            upiId: config.upiId,
            merchantName: config.merchantName
        });
    } catch (error) {
        console.error('Error reading payment config from MongoDB:', error);
        return NextResponse.json(
            { error: 'Failed to read payment configuration' },
            { status: 500 }
        );
    }
}
