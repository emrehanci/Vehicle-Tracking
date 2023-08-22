import { Component, OnDestroy } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { VehicleDetail } from 'src/app/models/vehicle-detail.model';
import { Store } from '@ngrx/store';
import { selectVehicleDetails, selectVehicles } from '../../store/app.selectors';
import * as appActions from '../../store/app.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html'
})

export class VehicleComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  vehicles: Vehicle[] = [];
  vehicleDetails: VehicleDetail[] = [];
  pageSize: number = 3;
  pageIndex: number = 1;
  pageSizeOptions: number[] = [3,5,10];

  constructor(private nzMessageService: NzMessageService, private store: Store) {
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  edit(id: any): void {
    this.store.dispatch(appActions.setSelectedVehicle({item: this.vehicleDetails.filter(x => x.id === id)[0]}));
  }

  confirmDelete(id: any): void {
    this.store.dispatch(appActions.deleteVehicle({item: id}));
    this.nzMessageService.info('Vehicle is deleted.');
  }

  getVehicleDetail(id: string): VehicleDetail {
    return this.vehicleDetails.filter(x => x.id === id)[0];
  }

  create(): void {
    const maxId = this.vehicleDetails.reduce((max, current) => (Number(current.id) > max ? Number(current.id) : max), 0);
    this.store.dispatch(appActions.setSelectedVehicle({item: {
      id: (Number(maxId) + 1).toString(),
    }}));
  }

  onPageIndexChange(pageIndex: number) {
    this.pageIndex = pageIndex;
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
  }

  getPagedData(): Vehicle[] {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.vehicles.slice(startIndex, endIndex);
  }
}
