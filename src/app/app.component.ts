import { QueryList } from '@angular/core';
import { AfterViewInit, Component, ElementRef, ViewChildren } from '@angular/core';
import { SynchronizedViewers } from './SynchronizedViewers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit{

  @ViewChildren('maps') maps:  QueryList<ElementRef>;

  private synchronizedViewers;

  constructor() {
    this.synchronizedViewers = new SynchronizedViewers();
  }

  ngAfterViewInit(): void {
    this.maps.forEach((element) => {
      this.synchronizedViewers.addViewer(element.nativeElement);
    });

    this.synchronizedViewers.setMain(0);
  }

  setContext(index) {
    this.synchronizedViewers.setMain(index);
  }
  
}
