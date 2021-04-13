import { MicrocreditCampaign } from 'sng-core';

interface User {
    identifier: string;
    email: string | undefined;
}

interface Actions {
    redeem: string; // '00', '10', '11' - Cannnot and Does Not Want, Can but Does Not Want, Can and Want
    identifier: string; // '00', '01', '10', '11' - None, Link Card, Link Email, Full Registration
    email: string;
}


interface Transaction {
    amount: number;
    possible_discount_amount: number;
    discount_amount: number;
    final_amount: number;

    points: number;
    discount_points: number;
    final_points: number;

    added_points: number;
}

export interface LocalLoyaltyInterface {
    User: User;
    Transaction: Transaction;
    Actions: Actions;
}
