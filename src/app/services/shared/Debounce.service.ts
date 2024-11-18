import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DebounceService {
  private subject = new Subject<() => void>();

  constructor() {
    this.subject.pipe(debounceTime(300)).subscribe((fn) => fn());
  }

  debounce(func: () => void, wait: number): void {
    this.subject.next(func);
  }
}
