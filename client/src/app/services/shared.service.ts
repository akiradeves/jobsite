import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {

	// Observable string sources
	private emitTitleChangeSource = new Subject<any>();

	// Observable string streams
	changeTitleEmitted$ = this.emitTitleChangeSource.asObservable();

	// Service message commands
	emitTitleChange(change: any) {
		this.emitTitleChangeSource.next(change);
	}
}
