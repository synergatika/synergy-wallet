import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Sector } from 'sng-core';

@Pipe({
  name: 'sector_filter',
  pure: false,
})
export class SectorFilterPipe implements PipeTransform {
  sectors = [{
    "_id": "606daa442bc8e70588534115",
    "title": "Durables (Technology)",
    "slug": "durables_(technology)",
    "el_title": "Αναλώσιμα (Τεχνολογία)",
    "en_title": "Durables (Technology)",
  }, {
    "_id": "606daa442bc8e70588534116",
    "title": "Education",
    "slug": "education",
    "el_title": "Εκπαίδευση",
    "en_title": "Education",
  }, {
    "_id": "606daa442bc8e70588534117",
    "title": "Food",
    "slug": "food",
    "el_title": "Τρόφιμα",
    "en_title": "Food",
  }, {
    "_id": "606daa442bc8e70588534118",
    "title": "Hotels, Cafés and Restaurants",
    "slug": "hotels,_cafes_and_restaurants",
    "el_title": "Ξενοδοχεία, καφέ και εστιατόρια",
    "en_title": "Hotels, Cafés and Restaurants",
  }, {
    "_id": "606daa442bc8e70588534119",
    "title": "Recreation and Culture",
    "slug": "recreation_and_culture",
    "el_title": "Αναψυχή και Πολιτισμός",
    "en_title": "Recreation and Culture",
  }, {
    "_id": "606daa442bc8e7058853411a",
    "title": "Other",
    "slug": "other",
    "el_title": "Άλλο",
    "en_title": "Other",
  }, {
    "_id": "606daa442bc8e7058853411b",
    "title": "Β2Β Services",
    "slug": "β2β_services",
    "el_title": "Υπηρεσίες B2B και άλλα αγαθά και υπηρεσίες",
    "en_title": "Β2Β Services",
  }, {
    "_id": "606daa442bc8e7058853411c",
    "title": "Durables",
    "slug": "durables",
    "el_title": "Αναλώσιμα",
    "en_title": "Durables",
  }]

  constructor(public translate: TranslateService) { }

  transform(value: string, args?: Sector[]): any {
    const lang = this.translate.currentLang;

    const sector: Sector = this.sectors.filter((o) => { return o.title == value })[0];
    return sector[`${lang}_title`];
  }
}
