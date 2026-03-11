import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPaymentConfig extends Document {
    upiId: string;
    merchantName: string;
    updatedAt: Date;
}

const PaymentConfigSchema: Schema = new Schema({
    upiId: { type: String, required: true },
    merchantName: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
});

export const PaymentConfig: Model<IPaymentConfig> =
    mongoose.models.PaymentConfig || mongoose.model<IPaymentConfig>('PaymentConfig', PaymentConfigSchema, 'settings');
