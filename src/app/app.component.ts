import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataService } from './data.service';
import { Subscription } from 'rxjs';
import * as appActions from './store/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  
  constructor(private store: Store, private dataService: DataService) {
    this.subscriptions.push(
      this.dataService.getData().subscribe(data => {
        data.map((vehicle) => {
          this.subscriptions.push(
            this.dataService.getVehicleDetails(vehicle.id).subscribe(data => {
              this.store.dispatch(appActions.addVehicleDetail({item: data}));
            })
          );
          this.store.dispatch(appActions.addVehicle({item: vehicle}));
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
