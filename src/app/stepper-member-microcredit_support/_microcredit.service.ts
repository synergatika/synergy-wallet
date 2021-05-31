import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { LocalMicrocreditInterface } from './_microcredit.interface';
import { MicrocreditCampaign, MicrocreditSupport } from 'sng-core';

@Injectable()
export class LocalMicrocreditService {

    private microcreditCampaignSource = new BehaviorSubject(
        null//{
        //     _id: '',
        //     imageURL: '',
        //     slug: '',

        //     title: '',
        //     subtitle: '',
        //     terms: '',
        //     description: '',
        //     category: '',
        //     access: 'public',
        //     status: 'published',

        //     quantitative: false,
        //     redeemable: false,
        //     stepAmount: 0,
        //     minAllowed: 0,
        //     maxAllowed: 0,
        //     maxAmount: 0,
        //     startsAt: 0,
        //     expiresAt: 0,
        //     redeemStarts: 0,
        //     redeemEnds: 0,

        //     tokens: {
        //         _id: '', earnedTokens: 0, paidTokens: 0, redeemedTokens: 0
        //     },
        //     createdAt: new Date(),

        //     partner: {
        //         _id: '',
        //         name: '',
        //         email: '',
        //         slug: '',
        //         imageURL: '',

        //         phone: '',
        //         address: { street: '', city: '', postCode: '', coordinates: ['', ''] },
        //         payments: [{ bic: '', name: '', value: '' }, { bic: '', name: '', value: '' }],
        //         contacts: [{ slug: '', name: '', value: '' }],
        //     }
        // }
    );
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
