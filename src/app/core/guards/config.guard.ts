import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ConfigGuard implements CanActivate {
    constructor(
        private router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        const accessIndex = route.data.accessIndex;

        if (environment.access[accessIndex] === true) {
            return true;
        }

        this.router.navigate([route.data.redirectURL || '/']);
        return false;
    }
}