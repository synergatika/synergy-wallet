import { Injectable } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
//import Swal from 'sweetalert2';

/**
 * Models & Interfaces
 */
import { PaymentList } from '../interfaces/payment-list.interface';
import { GeneralList } from '../interfaces/general-list.interface';
import { Language } from '../interfaces/language.interface';

@Injectable({
    providedIn: 'root'
})
export class StaticDataService {

    /**
     * Owl Carousel
     */
    customOptionsTwo: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: false,
        pullDrag: false,
        dots: true,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1
            },
            740: {
                items: 2
            }
        },
        margin: 30,
        nav: true
    };

    customOptionsThree: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: false,
        pullDrag: false,
        dots: true,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            940: {
                items: 3
            }
        },
        margin: 30,
        nav: true,
    }

    /**
     * Languages
     */
    languages: Language[] = [
        {
            lang: 'en',
            name: 'English',
            flag: './assets/flags/united-kingdom.svg'
        },
        {
            lang: 'el',
            name: 'Ελληνικά',
            flag: './assets/flags/greece.svg'
        },
    ];

    /**
     * Badges Images
     */
    badgesImages = {
        supporter: '../../../assets/media/images/ranking-1.png',
        helper: '../../../assets/media/images/ranking-2.png',
        one_of_us: '../../../assets/media/images/ranking-3.png',
    };

    /**
     * Payments List
     */
    paymentsList: PaymentList[] = [
        {
            bic: 'ETHNGRAA',
            title: 'FIELDS.PROFILE.PAYMENT_CHOICES.A',
            name: 'NationalBankofGreece',
            value: '',
            description: '',
        },
        {
            bic: 'PIRBGRAA',
            title: 'FIELDS.PROFILE.PAYMENT_CHOICES.B',
            name: 'PiraeusBank',
            value: '',
            description: '',
        },
        {
            bic: 'EFGBGRAA',
            title: 'FIELDS.PROFILE.PAYMENT_CHOICES.C',
            name: 'EFGEurobankErgasias',
            value: '',
            description: '',
        },
        {
            bic: 'CRBAGRAA',
            title: 'FIELDS.PROFILE.PAYMENT_CHOICES.D',
            name: 'AlphaBankAE',
            value: '',
            description: '',
        },
        {
            bic: 'PAYPAL',
            title: 'FIELDS.PROFILE.PAYMENT_CHOICES.E',
            name: 'Paypal',
            value: '',
            description: '',
        }
    ];

    /**
     * Sectors List
     */
    sectorList: GeneralList[] = [
        {
            title: 'FIELDS.PROFILE.SECTOR_CHOICES._',
            value: 'Other',
        },
        {
            title: 'FIELDS.PROFILE.SECTOR_CHOICES.A',
            value: 'B2B Services & Other Goods and Services',
        },
        {
            title: 'FIELDS.PROFILE.SECTOR_CHOICES.B',
            value: 'Durables',
        },
        {
            title: 'FIELDS.PROFILE.SECTOR_CHOICES.C',
            value: 'Durables (Technology)',
        },
        {
            title: 'FIELDS.PROFILE.SECTOR_CHOICES.D',
            value: 'Education',
        },
        {
            title: 'FIELDS.PROFILE.SECTOR_CHOICES.E',
            value: 'Food',
        },
        {
            title: 'FIELDS.PROFILE.SECTOR_CHOICES.F',
            value: 'Hotels, Cafés and Restaurants',
        },
        {
            title: 'FIELDS.PROFILE.SECTOR_CHOICES.G',
            value: 'Recreation and Culture',
        }
    ];

    /**
     * Access List
     */
    accessList: GeneralList[] = [
        {
            title: 'FIELDS.POST.ACCESS_CHOICES.A',
            value: 'public',
        },
        {
            title: 'FIELDS.POST.ACCESS_CHOICES.B',
            value: 'private',
        },
        {
            title: 'FIELDS.POST.ACCESS_CHOICES.C',
            value: 'partners',
        }
    ];

    /**
     * Form Validators
     */
    validators = {
        user: {
            email: {
                minLength: 4,
                maxLength: 256
            },
            password: {
                minLength: 4,
                maxLength: 64
            },
            name: {
                minLength: 4,
                maxLength: 256
            },
            subtitle: {
                minLength: 4,
                maxLength: 512
            },
            description: {
                minLength: 16,
                maxLength: 4096
            },
            address: {
                street: {
                    minLength: 0,
                    maxLength: 128
                },
                postCode: {
                    minLength: 0,
                    maxLength: 16
                },
                city: {
                    minLength: 0,
                    maxLength: 128
                },
                coordinates: {
                    minLength: 0,
                    maxLength: 16
                },
                lat: {
                    minValue: -90,
                    maxValue: 90,
                },
                long: {
                    minValue: -180,
                    maxValue: 180,
                },
            },
            contact: {
                phone: {
                    minLength: 0,
                    maxLength: 16
                },
                websiteURL: {
                    minLength: 0,
                    maxLength: 256
                }
            },
            timeTable: {
                minLength: 0,
                maxLength: 1024
            },
            payment: {
                minLength: 0,
                maxLength: 1024
            },
            deactivation_reason: {
                minLength: 0,
                maxLength: 1024
            }
        },
        post: {
            title: {
                minLength: 4,
                maxLength: 256
            },
            subtitle: {
                minLength: 4,
                maxLength: 512
            },
            content: {
                minLength: 8,
                maxLength: 4096
            }
        },
        event: {
            title: {
                minLength: 4,
                maxLength: 256
            },
            subtitle: {
                minLength: 4,
                maxLength: 512
            },
            description: {
                minLength: 16,
                maxLength: 4096
            },
            location: {
                minLength: 4,
                maxLength: 264
            }
        },
        offer: {
            title: {
                minLength: 4,
                maxLength: 256
            },
            subtitle: {
                minLength: 4,
                maxLength: 512
            },
            description: {
                minLength: 16,
                maxLength: 4096
            },
            cost: {
                minValue: 0,
                maxValue: 100000
            },
        },
        microcredit: {
            title: {
                minLength: 4,
                maxLength: 256
            },
            subtitle: {
                minLength: 4,
                maxLength: 512
            },
            description: {
                minLength: 16,
                maxLength: 4096
            },
            terms: {
                minLength: 16,
                maxLength: 4096
            },
            category: {
                minLength: 2,
                maxLength: 128
            },
            minAllowed: {

            },
            maxAllowed: {
                minValue: 0,
                maxValue: 100000
            },
            stepAmount: {
                minValue: 0,
                maxValue: 100000
            },
            maxAmount: {
                minValue: 0,
                maxValue: 100000
            }
        }
    }

    public get getOwlOptionsTwo(): OwlOptions {
        return this.customOptionsTwo;
    };

    public get getOwlOptionsThree(): OwlOptions {
        return this.customOptionsThree;
    };

    public get getLanguages(): Language[] {
        return this.languages;
    };

    public get getBadgesImages() {
        return this.badgesImages;
    };

    public get getPaymentsList(): PaymentList[] {
        return this.paymentsList;
    };

    public get getSectorList(): GeneralList[] {
        return this.sectorList;
    }

    public get getAccessList(): GeneralList[] {
        return this.accessList;
    }

    public get getValidators() {
        return this.validators;
    }
}