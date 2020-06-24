import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Models & Interfaces
 */
import { PostEvent } from 'src/app/core/models/post_event.model';

@Component({
	selector: 'app-post_event-single',
	templateUrl: './post_event-single.component.html',
	styleUrls: ['./post_event-single.component.scss']
})
export class PostEventSingleComponent implements OnInit, OnDestroy {

	/**
	 * Imported Variables
	 */
	@Input() post_event: PostEvent;

	private unsubscribe: Subject<any>;
	loading: boolean = false;

	/**
	 * Component Constructor
	 */
	constructor() {
		this.unsubscribe = new Subject();
	}

	/**
	 * On Init
	 */
	ngOnInit() {
		console.log("Post/Event in SinglePostEvent", this.post_event)
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

}
