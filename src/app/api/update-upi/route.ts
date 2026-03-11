import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { PaymentConfig } from '@/models/PaymentConfig';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { upiId, merchantName } = body;

        if (!upiId || !merchantName) {
            return NextResponse.json(
                { error: 'upiId and merchantName are required' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // Upsert the single configuration document. Since we don't have a specific ID,
        // we just update the first one found, or create it if none exists.
        const filter = {}; // Matches any document
        const update = {
            upiId,
            merchantName,
            updatedAt: new Date()
        };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        const updatedConfig = await PaymentConfig.findOneAndUpdate(filter, update, options);

        if (!updatedConfig) {
            throw new Error('Failed to create or update configuration');
        }

        return NextResponse.json({
            success: true,
            config: {
                upiId: updatedConfig.upiId,
                merchantName: updatedConfig.merchantName
            }
        });
    } catch (error) {
        console.error('Error updating payment config in MongoDB:', error);
        return NextResponse.json(
            { error: 'Failed to update payment configuration' },
            { status: 500 }
        );
    }
}
