import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http'
  import { from, Observable } from 'rxjs';
import { HotelData } from '../common/hotel-data';
@Injectable({
  providedIn: 'root'
})
export class HotelDataService {
  baseUrl:string="https://api.npoint.io/d8c6ab8ac5307d469528"
  constructor(private http:HttpClient) { }
  getHotelsData():Observable<HotelData[]>{
   return  this.http.get<HotelData[]>(this.baseUrl)
  }
}
