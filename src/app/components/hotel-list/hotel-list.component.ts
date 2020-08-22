import { Component, OnInit } from '@angular/core';
import { HotelData } from 'src/app/common/hotel-data';
import { HotelDataService } from 'src/app/services/hotel-data.service';
import { Options } from 'ng5-slider';


@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {
  numberOfNights: number
  checkInDate: Date
  checkOutDate: Date
  availableHotelData: HotelData[] = []
  allHotelData:HotelData[] = []
  limitedHotelData:HotelData[]=[]
  tempLimitedHotelData: HotelData[]=[]
  beginCount:number=0
  limitedCount:number=3
  constructor(private hotelservice: HotelDataService) { }

  ngOnInit(): void {
    this.hotelservice.getHotelsData().subscribe(data=>this.allHotelData=data)         
  }
  
  // price range slider
  value: number = 200
  options: Options = {
    stepsArray:[{value:200},{value:213},{value:225},{value:238},{value:250},
      {value:263},{value:275},{value:288},{value:300},{value:313},{value:325},],
    showTicks: true,
    showTicksValues: true
  }

  // gets search dates & show result of search & number of nights 
  getSearchData(checkIn: Date, checkOut: Date) {
    this.checkInDate = new Date(checkIn)
    this.checkOutDate = new Date(checkOut) 
    this.beginCount=0
    this.limitedCount=3 
    this.availableHotelData=[]   
    this.getNumberOfNights(this.checkInDate,this.checkOutDate)
    this.getHotelData(this.checkInDate,this.checkOutDate)
  }

  // calculates number of nights 
  getNumberOfNights(d1:Date,d2:Date){
    let differenceinMillisec = d2.getTime() - d1.getTime()
    let differenceAsDate = new Date (differenceinMillisec)    
    this.numberOfNights= differenceAsDate.getDate()
  }

  // searches for available hotels due to search dates
  getHotelData(checkIn:Date,checkOut:Date) {   
    for(let hotel of this.allHotelData){       
       if(this.checkAvailableHotelsByDates(checkIn,checkOut,hotel.available_on)){
         this.availableHotelData.push(hotel)
       }
    }
    this.getLimitedHotelData()
  }

  // show 3 results of all search results
  getLimitedHotelData(){
     this.limitedHotelData=[]    
     for(let hotel of this.availableHotelData  ){
       if(this.beginCount<this.limitedCount){
        let existingHotel=this.limitedHotelData.find(data=>data.name===this.availableHotelData[this.beginCount].name)
        if(existingHotel===undefined){
         this.limitedHotelData.push(this.availableHotelData[this.beginCount])
         this.beginCount++
        }
       }
     }
     this.limitedCount=this.beginCount+3   
     this.tempLimitedHotelData=this.limitedHotelData 
  }

  // checks if there are hotels available in search dates range
  checkAvailableHotelsByDates(chechIn: Date, checkOut: Date, availableOn: Date) {
    let d1 = new Date(chechIn)

    let d2 = new Date(checkOut)

    let checkDate = new Date(availableOn)
    
    if (checkDate.getTime() >= d1.getTime() && checkDate.getTime() <= d2.getTime()) {
      return true
    }
    else {
      return false
    }
  }


  // sorts search results form lowest price to highest price
  sortPriceAsc(data: HotelData[]) {
    this.availableHotelData = data.sort((a, b) => a.price - b.price)
  }

  // sorts search results form highest price to lowest price
  sortPriceDesc(data: HotelData[]) {
    data.sort((a, b) => a.price - b.price)
    this.availableHotelData = data.reverse()
  }

  // sorts search results form A to Z
  sortNamesAtoZ(data: HotelData[]) {
    this.availableHotelData = data.sort((a, b) => (a.name > b.name ? 1 : -1))
  }

   // sorts search results form Z to A
  sortNamesZtoA(data: HotelData[]) {
    this.availableHotelData = data.sort((a, b) => (a.name > b.name ? -1 : 1))
  }


   // filters search results by price
  filterByPrice(price: number) {         
    let filteredData: HotelData[]=[]
    this.limitedHotelData=this.tempLimitedHotelData   
    for (let filteredHotel of this.limitedHotelData) {
       if(filteredHotel.price==price){      
         filteredData.push(filteredHotel)
       } 
      }
      this.limitedHotelData = filteredData           
  }

  // filters search results by city
  filterByCity(city: string,event) {
    let filteredData: HotelData[]=[]
    
    if( event.target.checked){
      for (let filteredHotel of this.limitedHotelData) {
       if(filteredHotel.city===city ){
         filteredData.push(filteredHotel)
       }
      }
      this.limitedHotelData = filteredData 
    }
    else{     
     this.limitedHotelData=this.tempLimitedHotelData
    }   
  }

  // filters search results by hotel name
  filterByName( name: string,event) {
    let filteredData: HotelData[]=[]    
    if(event.target.checked){
     for (let filteredHotel of this.limitedHotelData) {
       if(filteredHotel.name===name ){
         filteredData.push(filteredHotel)
       }
      }
      this.limitedHotelData = filteredData    
   }
   else{    
     this.limitedHotelData=this.tempLimitedHotelData
   }
 }

}
