import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { VehicleDetail } from 'src/app/models/vehicle-detail.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { selectVehicleDetails, selectVehicles } from 'src/app/store/app.selectors';
import * as appActions from '../../store/app.actions';
import { Tire } from 'src/app/models/tire.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-vehicle-table',
  templateUrl: './vehicle-table.component.html'
})

export class VehicleTableComponent {
  private subscriptions: Subscription[] = [];
  vehicles: Vehicle[] = [];
  vehicleDetails: VehicleDetail[] = [];
  expandSet = new Set<string>();

  constructor(private nzMessageService: NzMessageService, private store: Store, private dataService: DataService) {
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

    this.subscriptions.push(
      this.store.select(selectVehicles).subscribe((vehicles) => {
        this.vehicles = vehicles;
      })
    );

    this.subscriptions.push(
      this.store.select(selectVehicleDetails).subscribe((vehicles) => {
        this.vehicleDetails = vehicles;
      })
    );
  }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  getVehicleTires(id: string): Tire[] {
    if(this.vehicleDetails.filter(x => x.id === id).length > 0){
      return this.vehicleDetails.filter(x => x.id === id)[0].tires;
    }
    return [];
  }

  confirmDelete(id: any): void {
    this.store.dispatch(appActions.deleteVehicle({item: id}));
    this.nzMessageService.info('Vehicle is deleted.');
  }

  edit(id: any): void {
    this.store.dispatch(appActions.setSelectedVehicle({item: this.vehicleDetails.filter(x => x.id === id)[0]}));
  }

  create(): void {
    const maxId = this.vehicleDetails.reduce((max, current) => (Number(current.id) > max ? Number(current.id) : max), 0);
    this.store.dispatch(appActions.setSelectedVehicle({item: {
      id: (Number(maxId) + 1).toString(),
    }}));
  }
}
