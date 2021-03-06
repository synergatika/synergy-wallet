import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { LocalLoyaltyInterface } from './_loyalty.interface';

@Injectable()
export class LocalLoyaltyService {

    private userSource = new BehaviorSubject({
        identifier: '',
        // identifier_scan: '',
        // identifier_form: '',
        email: ''
    });
    user = this.userSource.asObservable();

    private checksSource = new BehaviorSubject({
        identifier_scanned: false
    });
    checks = this.checksSource.asObservable();

    private loyaltyOfferSource = new BehaviorSubject(
        null
        //{
        // _id: '',
        // imageURL: '',
        // slug: '',
        // title: '',
        // subtitle: '',
        // description: '',
        // instructions: '',
        // cost: 0,
        // expiresAt: 0,
        // createdAt: new Date(),
        // updatedAt: new Date(),
        // partner: {
        //     _id: '',
        //     name: '',
        //     email: '',
        //     slug: '',
        //     imageURL: '',

        //     phone: '',
        //     address: { street: '', city: '', postCode: '', coordinates: ['', ''] },
        //     payments: [{ bic: '', name: '', value: '' }, { bic: '', name: '', value: '' }],
        //     contacts: [{ slug: '', name: '', value: '' }],
        // }
        //}
    );
    loyaltyOffer = this.loyaltyOfferSource.asObservable();

    private transactionSource = new BehaviorSubject({
        offer_id: '',
        offer_title: '',
        cost: 0,
        points: 0,
        discount_points: 0,
        final_points: 0,
        possible_quantity: 0,
        quantity: 0
    });
    transaction = this.transactionSource.asObservable();


    constructor() { }

    changeUser(user: LocalLoyaltyInterface["User"]) {
        this.userSource.next(user);
    };

    changeChecks(checks: LocalLoyaltyInterface["Checks"]) {
        this.checksSource.next(checks);
    };

    changeLoyaltyOffer(loyaltyOffer: LocalLoyaltyInterface["Offer"]) {
        this.loyaltyOfferSource.next(loyaltyOffer);
    }

    changeTransaction(transaction: LocalLoyaltyInterface["Transaction"]) {
        this.transactionSource.next(transaction);
    };
}
