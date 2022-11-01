import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
/**
 * Environment
 */
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.scss']
})
export class MemberDashboardComponent implements OnInit, OnDestroy {

	/**
	 * Children Modals
	 */
  @ViewChild('badgeModal') badgeModal: NgbModalRef;




	/**
	 * Configuration and Static Data
	 */
  public configAccess: Boolean[] = environment.access;

	/**
	 * Component Constructor
	 * @param modalService: NgbModal
	 */
  constructor(
    private modalService: NgbModal,
  ) { }

	/**
	 * On Init
	 */
  ngOnInit() {
  }

	/**
	 * On Destroy
	 */
  ngOnDestroy() {
  }

	/**
	 * Close Modal on Browser Back Button
	 */
  controlModalState(state: boolean): void {
    if (state) {
      const modalState = {
        modal: true,
        desc: 'MemberDashboardModals'
      };
      history.pushState(modalState, null);
    } else {
      if (window.history.state.modal) {
        history.back();
      }
    }
  }

  @HostListener('window:popstate')
  dismissModal(): void {
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
      this.controlModalState(false);
    }
  }

	/**
	 * Open Badge Modal
	 */
	openBadgeExplainer(): void {
		this.controlModalState(true);
		this.modalService.open(this.badgeModal)
			.result.then(
			() => { this.controlModalState(false); console.log('closed'); },
			() => { this.controlModalState(false); console.log('dismissed'); });
	}


}
