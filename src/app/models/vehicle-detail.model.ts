import { Tire } from "./tire.model";
import { Vehicle } from "./vehicle.model";

export interface VehicleDetail extends Vehicle {
    tires: Tire[];
  }