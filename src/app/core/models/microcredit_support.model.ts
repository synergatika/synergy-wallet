import { PartnerAddress } from './partner_address.model';
import { PartnerPayment } from './partner_payment.model';

export interface MicrocreditSupport {
    partner_id: string;
    partner_name: string;
    partner_address: PartnerAddress;
    partner_payments: PartnerPayment[];

    campaign_id: string;
    campaign_imageURL: string;
    title: string;
    terms: string;
    redeemStarts: number;
    redeemEnds: number;

    support_id: string;
    payment_id: string;
    backer_id: string;
    initialTokens: number;
    redeemedTokens: number;
    status: string;

    amount: number;
    method: string;
    createdAt: Date;
    how: {
        title: string,
        value: string
    };
}
