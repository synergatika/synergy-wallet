import { MicrocreditCampaign, MicrocreditSupport } from 'sng-core';

interface User {
    identifier: string;
    email: string | undefined;
}

interface Checks {
    identifier_scanned: boolean;
}
interface Actions {
    redeem: string; // '00', '10', '11' - Cannnot and Does Not Want, Can but Does Not Want, Can and Want
    registration: string; // '00', '01', '10', '11' - None, Link Card, Link Email, Full Registration
}

interface Transaction {
    support: MicrocreditSupport;
    initial_tokens: any;
    redeemed_tokens: any;
    possible_tokens: number;
    discount_tokens: number;
}

export interface LocalMicrocreditInterface {
    User: User;
    Actions: Actions;
    MicrocreditSupport: MicrocreditSupport;
    MicrocreditCampaign: MicrocreditCampaign;
    Transaction: Transaction;
    Checks: Checks;
}
