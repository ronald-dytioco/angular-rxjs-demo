import { Component, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import ActivityService from './lib/services/activity.service';
import { IActivity } from './lib/types/activity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private title = 'Angular RxJS Demo';
  private activities?: IActivity[] | null;
  private activity?: IActivity | null;
  private loading = false;
  @ViewChild('dialog') dialog?: ElementRef;

  constructor(private titleSvc: Title, private activitySvc: ActivityService) {
    this.titleSvc.setTitle(this.title);
  }

  onClickLoad() {
    // clear activities if not null|undefined
    if (this.activities) {
      this.activities = null;
    }
    // throttle onclick spam
    if (this.loading)
      return console.log('Wait for the activity list to load, then try again!');
    this.loading = true;

    this.activitySvc.getActivities().subscribe((activities) => {
      this.activities = activities;
      this.loading = false;
    });
  }

  onClickActivity(key: string | number) {
    // clear activity if not null|undefined
    if (this.activity) {
      this.activity = null;
    }
    // throttle onclick spam
    if (this.loading)
      return console.log('Wait for the activity list to load, then try again!');
    this.loading = true;

    this.activitySvc.getActivity(key).subscribe((activity) => {
      this.activity = activity;
      this.loading = false;
      this.openDialog();
    });
  }

  get getActivities() {
    return this.activities;
  }

  get getActivity() {
    return this.activity;
  }

  closeDialog() {
    // handle dialog not loaded in DOM
    if (!this.dialog) return alert('Something went wrong, please try again!');
    this.dialog.nativeElement.classList.add('hidden');
  }
  openDialog() {
    // handle dialog not loaded in DOM
    if (!this.dialog) return alert('Something went wrong, please try again!');
    this.dialog.nativeElement.classList.toggle('hidden');
  }
}
