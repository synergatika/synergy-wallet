import { Component, OnInit, Input } from '@angular/core';

/**
 * Models & Interfaces
 */
import { MicrocreditSupport } from '../../../../core/models/microcredit_support.model';

@Component({
  selector: 'app-microcredit_support-card',
  templateUrl: './microcredit_support-card.component.html',
  styleUrls: ['./microcredit_support-card.component.scss']
})
export class MicrocreditSupportCardComponent implements OnInit {
  /**
   * Imported Variables
   */
  @Input() support: MicrocreditSupport;
  type: any;

  constructor() { }

  ngOnInit() {
  }

}
