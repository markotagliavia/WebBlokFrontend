import { TypeOfVehicle } from "./type-of-vehicle";
import { Service } from "./service"
import {Pic } from "./pic"
export class Vehicle {
    constructor(
    
      public Id: number,
      public RowVersion : any,
      public Mark: string,
      public Model: string,
      public Year: string,
      public Description : string,
      public Aveliable : boolean,
      public TypeOfVehicle: TypeOfVehicle,
      public Service: Service
  ){}
}