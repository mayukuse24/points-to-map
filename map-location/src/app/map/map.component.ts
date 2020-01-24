import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { MarkerService } from '../_services/marker.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map;
  private address;
  private range;
  constructor(private markerService: MarkerService) {
  }

  sendToECS(){
    this.address = document.getElementById("address");
    this.range = document.getElementById("range");
    console.log("Address is:" +this.address.value);
    console.log("Range is:" +this.range.value);
    this.markerService.sendPostRequest(this.address.value,this.range.value,this.map); 
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ -25.2744, 133.7751],
      zoom: 4
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
  
    tiles.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}