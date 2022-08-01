import { Component, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as L from 'leaflet';
//import { DataService } from '../data.service';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map;
  private locations;

  icon = {
    icon: L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 0 ],
      iconUrl: 'https://p7.hiclipart.com/preview/174/899/693/google-map-maker-computer-icons-google-maps-world-map-map-marker.jpg',
      shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png'
    })
  };

  private initMap(): void {

    const map = L.map('map').setView([39.8282, -98.5795], 13);

    /*this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });*/

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    
    /*this.locations.forEach(element => {
      console.log(element.latitude);
    });*/
    this.apiservice.fetchMapData().subscribe((data)=>{
      console.log("inside map component"+data);
      
    })
    
    const marker = L.marker([39.8282, -98.5795], this.icon).addTo(map);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

    //tiles.addTo(this.map);
  }

  constructor(private apiservice: ApiServiceService) { }


  ngOnInit() {

    this.apiservice.fetchMapData().subscribe((data)=>{
      console.log(data);
      this.locations = data;
      Object.entries(data).forEach((key, value) => {
        console.log(key);
    });
    })  
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}