import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  lat: number
  lng: number

  map: GoogleMap;

  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
    this.loadMap();
  }
  posLocal() {

    this.geolocation.getCurrentPosition().then((resp) => {
      //resp.coords.latitude
      //resp.coords.longitude
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      console.log(this.lat, "  ", this.lng);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  posAtual() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: -22.745907199999998,
          lng: -43.4552832
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);
  }

  market: Marker;

  mapClick() { //Marcações do google maps     
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
      res => {
        //console.log(res);
        if (this.market) {
          this.market.setPosition(res[0]);
        } else {
          this.addMarket();
        }
      })
  }
  addMarket() {
    this.market = this.map.addMarkerSync({
      position: {
        lat: this.lat,
        lng: this.lng
        //position: res[0]
      }
    });
  }
}
