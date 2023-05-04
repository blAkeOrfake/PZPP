import { AfterContentInit, Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-atms-view',
  templateUrl: './atms-view.component.html',
  styleUrls: ['./atms-view.component.scss']
})
export class AtmsViewComponent implements OnInit, AfterContentInit {
  // map: google.maps.Map;
  // marker: google.maps.Marker;
  map: any;
  marker: any;

  constructor() { }

  ngOnInit(): void {

    
  }

  ngAfterContentInit() {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   this.map = new google.maps.Map(document.getElementById('map'), {
    //     center: {lat: position.coords.latitude, lng: position.coords.longitude},
    //     zoom: 15
    //   });
      
    //   var service = new google.maps.places.PlacesService(this.map);
    //   service.nearbySearch({
    //     location: {lat: position.coords.latitude, lng: position.coords.longitude},
    //     radius: 500,
    //     type: ['atm']
    //   }, (results: any, status: any) => {
    //     if (status === google.maps.places.PlacesServiceStatus.OK) {
    //       for (var i = 0; i < results.length; i++) {
    //         this.createMarker(results[i]);
    //       }
    //     }
    //   });
    // });
  }

  createMarker(place: any) : void{
    var marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });
  }

}
