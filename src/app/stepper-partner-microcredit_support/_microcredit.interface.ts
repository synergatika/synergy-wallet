import { MicrocreditCampaign } from 'sng-core';

interface User {
    identifier: string;
    email: string | undefined;
}

interface Checks {
    identifier_scanned: boolean;
}

interface Actions {
    //   registration: string; // '00', '01', '10', '11' - None, Link Card, Link Email, Full Registration
    identifier: string;
    email: string;
}

interface Transaction {
    partner_id: string;
    campaign_id: string;
    support_id: string;
    payment_id: string;
    method: string;
    amount: number;
    paid: boolean;
}

export interface LocalMicrocreditInterface {
    User: User;
    Actions: Actions;
    MicrocreditCampaign: MicrocreditCampaign;
    Transaction: Transaction;
    Checks: Checks;
}
