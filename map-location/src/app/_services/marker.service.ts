import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopUpService } from './pop-up.service';



@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  private markers = L.layerGroup();
  constructor(private http: HttpClient,
    private popupService: PopUpService) { 
  } 

  centerLeafletMapOnMarker(map, marker) {
    var latLngs = marker.getLatLng();
    console.log(latLngs.lat +" " +  latLngs.lng);
    map.setView(latLngs,10,{
                          "animate": true,
                          "pan": {
                            "duration": 10,
                            "easeLinearity" : 0.1
                          }
                        }
                );
    //map.panTo(latLngs,{"animate":true},{"easeLinearity":0.1});
    //map.zoomIn(3,{"animate":true});
    //map.flyTo(latLngs,{"animate":true});
  }

  sendPostRequest(payload, map: L.map):void {
    console.log(payload + " finally reached here");
    const server = "http://checklocation.us-east-1.elasticbeanstalk.com/";
    const address_body = "\"" + payload + "\"";
    console.log(server);
    console.log(address_body);
    this.markers.addTo(map);
    this.markers.clearLayers();
    this.http.post(server,{"address": address_body}).subscribe(
      res => {
        console.log(res);
        var resultArray = Object.keys(res).map(function(nearest_loc){
          let loc = res[nearest_loc];
          return loc;
        });
        var marker;
        var center_it = false;
        for (const c of resultArray) {
          const lat = c.location.lat;
          const lon = c.location.lon;
          console.log(c.text + " lat is " + lat+ " and lon is " + lon);
          marker = L.marker([lat, lon]).addTo(map);
          marker.bindPopup(this.popupService.makeCapitalPopup(c));
          marker.addTo(map);
          this.markers.addLayer(marker);
          center_it = true
        }
        if (center_it)
          this.centerLeafletMapOnMarker(map,marker);
      },
      err => {
        console.log("Error occured" + err);
      }
    );
  }
}