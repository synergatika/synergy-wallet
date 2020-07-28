import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { LocalMicrocreditInterface } from './_microcredit.interface';
import { MicrocreditCampaign } from '../core/models/microcredit_campaign.model';
import { MicrocreditSupport } from '../core/models/microcredit_support.model';

@Injectable()
export class LocalMicrocreditService {

    private microcreditCampaignSource = new BehaviorSubject({
        partner_id: '',
        partner_name: '',
        partner_email: '',
        partner_slug: '',
        partner_imageURL: '',
        partner_address: { street: '', city: '', postCode: '', coordinates: ['', ''] },
        partner_contact: { phone: '', websiteURL: '' },
        partner_payments: [{ bic: '', name: '', value: '' }],

        campaign_id: '',
        campaign_imageURL: '',
        title: '',
        campaign_slug: '',
        subtitle: '',
        terms: '',
        description: '',
        category: '',
        access: 'public',
        status: 'published',

        quantitative: false,
        stepAmount: 0,
        minAllowed: 0,
        maxAllowed: 0,
        maxAmount: 0,
        startsAt: 0,
        expiresAt: 0,
        redeemStarts: 0,
        redeemEnds: 0,

        confirmationTokens: {
            _id: '', initialTokens: 0, redeemedTokens: 0
        },
        orderedTokens: {
            _id: '', initialTokens: 0, redeemedTokens: 0
        },
        createdAt: new Date()
    });
    microcreditCampaign = this.microcreditCampaignSource.asObservable();

    private transactionSource = new BehaviorSubject({
        partner_id: '',
        campaign_id: '',
        support_id: '',
        payment_id: '',
        amount: 0,
        method: '',
        paid: false,
        how: {
            title: '',
            value: ''
        }
    });
    transaction = this.transactionSource.asObservable();

    constructor() { }

    changeMicrocreditCampaign(campaign: LocalMicrocreditInterface["MicrocreditCampaign"]) {
        this.microcreditCampaignSource.next(campaign);
    }

    changeTransaction(transaction: LocalMicrocreditInterface["Transaction"]) {
        this.transactionSource.next(transaction);
    }
}
