import { TypeOfVehicle } from "./type-of-vehicle";
import { PriceList} from './pricelist'
import { Service } from "./service"
import {Pic } from "./pic"
export class Vehicle {
    constructor(
    
      public Id: number,
      public Mark: string,
      public Model: string,
      public Year: string,
      public Description : string,
      public Available : boolean,
      public TypeOfVehicleId: number,
      public ServiceId: number,
      public Pics : Pic[],
      public PriceLists : PriceList[],
      public Price : number
  ){}
}