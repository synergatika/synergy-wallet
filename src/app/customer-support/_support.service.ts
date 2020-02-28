import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { SupportInterface } from './_support.interface';

@Injectable()
export class SupportService {

    private microcreditCampaignsSource = new BehaviorSubject([]);
    microcreditCampaigns = this.microcreditCampaignsSource.asObservable();

    private microcreditCurrentSource = new BehaviorSubject({
        merchant_id: '',
        merchant_name: '',
        merchant_imageURL: '',
        merchant_payment: {
            Paypal: '',
            NationalBank: '',
            Eurobank: '',
            AlphaBank: '',
            PireausBank: ''
        },
        campaign_id: '',
        campaign_imageURL: '',
        title: '',
        terms: '',
        description: '',
        category: '',
        access: 'public',
        quantitative: false,
        minAllowed: 0,
        maxAllowed: 0,
        maxAmount: 0,
        redeemStarts: 0,
        redeemEnds: 0,
        supports: [{
            _id: '', backer_id: '', initialTokens: 0, redeemedTokens: 0, payment_id: '', status: 'order'
        }],
        confirmationTokens: {
            _id: '', initialTokens: 0, redeemedTokens: 0
        },
        orderedTokens: {
            _id: '', initialTokens: 0, redeemedTokens: 0
        },
        expiresAt: 0,
        createdAt: new Date()
    });
    microcreditCurrent = this.microcreditCurrentSource.asObservable();

    private microcreditSupportSource = new BehaviorSubject({
        merchant_id: '',
        campaign_id: '',
        support_id: '',
        payment_id: '',
        amount: 0,
        method: '',
        how:''
    });
    microcreditSupport = this.microcreditSupportSource.asObservable();

    constructor() { }

    changeMicrocreditCampaigns(microcreditCampaigns: SupportInterface["MicrocreditCampaign"][]) {
        this.microcreditCampaignsSource.next(microcreditCampaigns);
    }

    changeMicrocreditCurrent(microcreditCurrent: SupportInterface["MicrocreditCampaign"]) {
        this.microcreditCurrentSource.next(microcreditCurrent);
    }

    changeMicrocreditSupport(microcreditSupport: SupportInterface["MicrocreditSupport"]) {
        this.microcreditSupportSource.next(microcreditSupport);
    }
}