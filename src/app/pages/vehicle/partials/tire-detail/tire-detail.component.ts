import { Component, Input, OnInit } from '@angular/core';
import { Tire } from 'src/app/models/tire.model';

const tireClassMap: { [position: string]: { count4: string; count6: string } } = {
  "1L": { count4: "two-left-1", count6: "three-left-1" },
  "1R": { count4: "two-right-1", count6: "three-right-1" },
  "2L": { count4: "two-left-2", count6: "three-left-2" },
  "2R": { count4: "two-right-2", count6: "three-right-2" },
  "3L": { count4: "", count6: "three-left-3" },
  "3R": { count4: "", count6: "three-right-3" },
};


@Component({
  selector: 'app-tire-detail',
  templateUrl: './tire-detail.component.html',
  styleUrls: ['./tire-detail.component.scss']
})

export class TireDetailComponent implements OnInit {
  @Input() tire: Tire | null = null;
  @Input() tireCount: number | null = null;
  tireClass: string = "float-left absolute z-50 p-1 ";

  constructor() {
  }

  ngOnInit() {
    const tirePosition = this.tire?.position;
    const tireCount = this.tireCount;

    if (tirePosition && tireCount) {
      const tireClassInfo = tireClassMap[tirePosition];
      
      if (tireClassInfo) {
        this.tireClass += tireCount === 4 ? tireClassInfo.count4 : tireClassInfo.count6;
      }
    }
  }

  generateTireMileageMessage() {
    if(!!!this.tire){
      return;
    }

    if (this.tire.mileage !== '') {
      if (this.tire.mileageUnit !== '') {
        return `${this.tire.mileage}`;
      } else {
        return `Mileage is: ${this.tire.mileage}, but Unit is missing`;
      }
    } else {
      if (this.tire.mileageUnit !== '') {
        return `Mileage is missing but unit is: ${this.tire.mileageUnit}`;
      } else {
        return `Mileage and Unit are missing`;
      }
    }
  }

}
