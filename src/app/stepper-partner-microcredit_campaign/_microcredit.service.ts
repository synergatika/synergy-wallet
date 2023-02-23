import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { LocalMicrocreditInterface } from './_microcredit.interface';

@Injectable()
export class LocalMicrocreditService {

    private userSource = new BehaviorSubject({
        identifier: '',
        email: ''
    });
    user = this.userSource.asObservable();


    private checksSource = new BehaviorSubject({
        identifier_scanned: false,
    });
    checks = this.checksSource.asObservable();

    private actionsSource = new BehaviorSubject({
        redeem: '00',
        registration: '000000'
    });
    actions = this.actionsSource.asObservable();

    private microcreditCampaignSource = new BehaviorSubject(
        null   //     {
        //     _id: '',
        //     imageURL: '',
        //     title: '',
        //     slug: '',
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
        //     // confirmationTokens: {
        //     //     _id: '', initialTokens: 0, redeemedTokens: 0
        //     // },
        //     // orderedTokens: {
        //     //     _id: '', initialTokens: 0, redeemedTokens: 0
        //     // },
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

    private microcreditSupportsSource = new BehaviorSubject([
        // {
        //     campaign: {
        //         _id: '',
        //         imageURL: '',
        //         title: '',
        //         slug: '',
        //         subtitle: '',
        //         terms: '',
        //         description: '',
        //         category: '',
        //         access: 'public',
        //         status: 'published',

        //         quantitative: false,
        //         redeemable: false,
        //         stepAmount: 0,
        //         minAllowed: 0,
        //         maxAllowed: 0,
        //         maxAmount: 0,
        //         startsAt: 0,
        //         expiresAt: 0,
        //         redeemStarts: 0,
        //         redeemEnds: 0,

        //         tokens: {
        //             _id: '', earnedTokens: 0, paidTokens: 0, redeemedTokens: 0
        //         },
        //         // confirmationTokens: {
        //         //     _id: '', initialTokens: 0, redeemedTokens: 0
        //         // },
        //         // orderedTokens: {
        //         //     _id: '', initialTokens: 0, redeemedTokens: 0
        //         // },
        //         createdAt: new Date(),
        //         partner: {
        //             _id: '',
        //             name: '',
        //             email: '',
        //             slug: '',
        //             imageURL: '',

        //             phone: '',
        //             address: { street: '', city: '', postCode: '', coordinates: ['', ''] },
        //             payments: [{ bic: '', name: '', value: '' }, { bic: '', name: '', value: '' }],
        //             contacts: [{ slug: '', name: '', value: '' }],
        //         }
        //     },

        //     support_id: '',
        //     payment_id: '',
        //     initialTokens: 0,
        //     currentTokens: 0,

        //     // initialTokens: 0,
        //     // redeemedTokens: 0,
        //     status: '',

        //     amount: 0,
        //     method: '',

        //     type: '',
        //     transactions: [],
        //     createdAt: new Date(),
        //     how: {
        //         title: '',
        //         value: '',
        //     }
        // }
    ]
    );
    microcreditSupports = this.microcreditSupportsSource.asObservable();

    private transactionSource = new BehaviorSubject({
        support: null,
        campaign_id: '0',
        campaign_title: '0',
        support_id: '0',
        initial_tokens: 0,
        redeemed_tokens: 0,
        possible_tokens: 0,
        discount_tokens: 0,
    });
    transaction = this.transactionSource.asObservable();

    constructor() { }

    changeUser(user: LocalMicrocreditInterface["User"]) {
        this.userSource.next(user);
    };

    changeChecks(checks: LocalMicrocreditInterface["Checks"]) {
        this.checksSource.next(checks);
    };

    changeActions(actions: LocalMicrocreditInterface["Actions"]) {
        this.actionsSource.next(actions);
    }

    changeMicrocreditSupports(supports: LocalMicrocreditInterface["MicrocreditSupport"][]) {
        this.microcreditSupportsSource.next(supports);
    }

    changeMicrocreditCampaign(campaign: LocalMicrocreditInterface["MicrocreditCampaign"]) {
        this.microcreditCampaignSource.next(campaign);
    }

    changeTransaction(transaction: LocalMicrocreditInterface["Transaction"]) {
        this.transactionSource.next(transaction);
    }
}
