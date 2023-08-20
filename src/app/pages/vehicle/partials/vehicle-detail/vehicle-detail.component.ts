import { Component, Input } from '@angular/core';
import { VehicleDetail } from 'src/app/models/vehicle-detail.model';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html'
})

export class VehicleDetailComponent {
  @Input() selectedVehicle: VehicleDetail | null = null;
}
