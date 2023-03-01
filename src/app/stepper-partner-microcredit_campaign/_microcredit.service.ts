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

    private microcreditCampaignSource = new BehaviorSubject(null);
    microcreditCampaign = this.microcreditCampaignSource.asObservable();

    private microcreditSupportsSource = new BehaviorSubject([]);
    microcreditSupports = this.microcreditSupportsSource.asObservable();

    private transactionSource = new BehaviorSubject({
        support: null,
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
