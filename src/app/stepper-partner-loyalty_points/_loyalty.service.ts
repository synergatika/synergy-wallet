import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { LocalLoyaltyInterface } from './_loyalty.interface';

@Injectable()
export class LocalLoyaltyService {

    initializeUser = {
        identifier: '',
        email: ''
    };

    initializeTransaction = {
        amount: 0,
        possible_discount_amount: 0,
        discount_amount: 0,
        final_amount: 0,
        points: 0,
        discount_points: 0,
        final_points: 0,
        added_points: 0
    };

    initializeActions = {
        redeem: '0',
        identifier: 'xxx',
        email: 'xxx'
    };

    initializeChecks = {
        identifier_scanned: false,
        amount_scanned: false,
    };


    private userSource = new BehaviorSubject(this.initializeUser);
    user = this.userSource.asObservable();

    private transactionSource = new BehaviorSubject(this.initializeTransaction);
    transaction = this.transactionSource.asObservable();

    private actionsSource = new BehaviorSubject(this.initializeActions);
    actions = this.actionsSource.asObservable();

    private checksSource = new BehaviorSubject(this.initializeChecks);
    checks = this.checksSource.asObservable();

    constructor() { }

    changeUser(user: LocalLoyaltyInterface["User"]) {
        this.userSource.next(user);
    };

    changeTransaction(transaction: LocalLoyaltyInterface["Transaction"]) {
        this.transactionSource.next(transaction);
    };

    changeActions(actions: LocalLoyaltyInterface["Actions"]) {
        this.actionsSource.next(actions);
    }

    changeChecks(checks: LocalLoyaltyInterface["Checks"]) {
        this.checksSource.next(checks);
    }

    // clearUser() {
    //     this.userSource.next(this.initializeUser);
    //     this.userSource.complete();
    // }

    // clearTransaction() {
    //     this.transactionSource.next(this.initializeTransaction)
    //     this.transactionSource.complete();
    // }

    // clearActions() {
    //     this.actionsSource.next(this.initializeActions)
    //     this.actionsSource.complete();
    // }

    // clearChecks() {
    //     this.checksSource.next(this.initializeChecks)
    //     this.checksSource.complete();
    // }

    // clearAll() {
    //     setTimeout(() => {
    //         this.clearUser();
    //         this.clearTransaction();
    //         this.clearActions();
    //         this.clearChecks();
    //     }, 100);
    // }
}
