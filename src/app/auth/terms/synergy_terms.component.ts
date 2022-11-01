import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StaticContentService  } from '../../core/services/static_content.service';

@Component({
  selector: 'app-terms',
  templateUrl: './synergy_terms.component.html',
})
export class TermsComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<any>;
  content: any;

	/**
	 * Component Constructor
	 *
	 * @param dialog: MatDialog
	 */
  constructor(
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private StaticContentService : StaticContentService ,
  ) {
  }

  ngOnInit() {
    this.unsubscribe = new Subject();
    this.content = null;
    this.fetchContent('126');
  }

  fetchContent(page_id) {
    this.StaticContentService.getWPContent(page_id).subscribe((data) => {
      this.content = data.content.rendered;
      console.log(this.content);
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }



}
