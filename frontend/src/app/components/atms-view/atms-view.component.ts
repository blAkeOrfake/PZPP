import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';


@Component({
  selector: 'app-atms-view',
  templateUrl: './atms-view.component.html',
  styleUrls: ['./atms-view.component.scss']
})
export class AtmsViewComponent implements OnInit, AfterContentInit {
  // map: google.maps.Map;
  // marker: google.maps.Marker;
  // map: any;
  // marker: any;

  markers: any[] = [];
  atms: google.maps.places.PlaceResult[] = [];
  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  @ViewChild('map', { static: true })
  mapRef!: GoogleMap;

  constructor(
    // private mapsAPILoader: MapsAPILoader
  ) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  ngOnInit(): void {
    // this.mapRef.data
   
    
  }


  ngAfterContentInit() {
    // this.mapRef.
    // var service = new google.maps.places.PlacesService(this.mapRef.googleMap as google.maps.Map);

    const service = new google.maps.places.PlacesService(
      document.createElement('div')
    );

    service.nearbySearch(
      {
        location: this.center,
        radius: 500,
        type: 'atm'
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.atms = results || [];
        }
      }
    );
    // navigator.geolocation.getCurrentPosition((position) => {
    //   this.map = new google.maps.Map(document.getElementById('map'), {
    //     center: {lat: position.coords.latitude, lng: position.coords.longitude},
    //     zoom: 15
    //   });
      // this.mapRef.map
      // service.nearbySearch({
      //   location: {lat: this.center.lat, lng: this.center.lng},
      //   radius: 500,
      //   type: 'atm'
      // }, (results: any, status: any) => {
      //   if (status === google.maps.places.PlacesServiceStatus.OK) {
      //     for (var i = 0; i < results.length; i++) {
      //       this.createMarker(results[i]);
      //     }
      //   }
      // });
      
    }

    createMarker(place: any) : void{
      var marker = new google.maps.Marker({
        map: this.mapRef.googleMap as google.maps.Map,
        position: place.geometry.location
      });
    }

    addMarker(place: google.maps.places.PlaceResult) : void{
      // place.name
      this.markers.push({
        position: place.geometry?.location,
        title: place.name,
        options: { animation: google.maps.Animation.BOUNCE },
      });
    }
}

  

