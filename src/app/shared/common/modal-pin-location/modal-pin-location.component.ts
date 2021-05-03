import { AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';

declare const google: any;
@Component({
  selector: 'app-modal-pin-location',
  templateUrl: './modal-pin-location.component.html',
  styleUrls: ['./modal-pin-location.component.scss'],
})
export class ModalPinLocationComponent implements OnInit, AfterViewInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  @ViewChild('pacInput', { read: ElementRef }) pacInput: ElementRef<HTMLIonInputElement>;
  @Input() longitude: any;
  @Input() latitude: any;

  map: any;
  marker: any;
  mapListener: any[] = [];
  geoCoder: any;
  geoAddressData = {
    formatted_address: '',
    route_name: '',
  };
  fg: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private geolocation: Geolocation,
    private fb: FormBuilder,
    private zone: NgZone
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.initMap().then(() => {
      this.initSearchbox();
    });
  }

  buildForm() {
    this.fg = this.fb.group({
      longitude: [null],
      latitude: [null],
      formatted_address: [null],
      route: [null],
    });
  }

  async initMap() {
    await this.geolocation.getCurrentPosition().then((res) => {
      const latitude = this.latitude !== '' && this.latitude !== null ? this.latitude : res.coords.latitude;
      const longitude = this.longitude !== '' && this.longitude !== null ? this.longitude : res.coords.longitude;

      const longLat = new google.maps.LatLng(latitude, longitude);
      const mapOptions = {
        center: longLat,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        fullscreenControl: false,
        draggable: true,
        streetViewControl: false,
        disableDefaultUI: true,
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      // this.initMarker(longLat, this.map);
      this.fg?.controls?.latitude.patchValue(latitude);
      this.fg?.controls?.longitude.patchValue(longitude);
      this.getGeocodeInfo(this.map.getCenter());

      google.maps.event.addListener(this.map, 'dragend', () => {
        const center = this.map.getCenter();
        this.getGeocodeInfo(center);
        const lat = center.lat();
        const lng = center.lng();
        this.fg?.controls?.latitude.patchValue(lat);
        this.fg?.controls?.longitude.patchValue(lng);
      });

      google.maps.event.addListener(this.map, 'zoom_changed', () => {
        const center = this.map.getCenter();
        this.getGeocodeInfo(center);
        const lat = center.lat();
        const lng = center.lng();
        this.fg?.controls?.latitude.patchValue(lat);
        this.fg?.controls?.longitude.patchValue(lng);
      });
    });
  }

  // initMarker(longLat, maps) {
  //   this.marker = new google.maps.Marker({
  //     position: longLat,
  //     map: maps,
  //   });
  //   const objLonglat = longLat.toJSON();
  //   const controls = this.fg?.controls;
  //   controls?.latitude.patchValue(objLonglat.lat);
  //   controls?.longitude.patchValue(objLonglat.lng);
  // }

  getGeocodeInfo(longlat) {
    this.geoCoder = new google.maps.Geocoder();
    this.geoCoder.geocode({ location: longlat }, (result, status) => {
      if (status === 'OK') {
        this.processGeocodeResult(result[0]);
      }
    });
  }

  processGeocodeResult(result) {
    this.zone.run(() => {
      this.geoAddressData.formatted_address = result?.formatted_address;
      result?.address_components.forEach((element) => {
        const found = element.types.find((x) => x === 'route');
        if (found) {
          this.geoAddressData.route_name = element?.long_name;
        }
      });
    });
  }

  setCurrentLocation(data = null) {
    if (this.map && this.marker) {
      if (!data) {
        this.geolocation.getCurrentPosition().then((res) => {
          const longLat = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);
          // this.marker.setPosition(longLat);
          this.map.setCenter(longLat);
          this.getGeocodeInfo(longLat);
        });
      } else {
        const longLat = new google.maps.mapsLatLng(data.latitude, data.longitude);
        // this.marker.setPosition(longLat);
        this.map.setCenter(longLat);
        this.getGeocodeInfo(longLat);
      }
    }
  }

  async dismiss(data?: any) {
    await this.modalCtrl.dismiss(data);
  }

  pinLocation() {
    this.dismiss({
      coordinate: this.fg.value,
      addressData: this.geoAddressData,
    }).then(() => {});
  }

  initSearchbox() {
    this.pacInput.nativeElement.getInputElement().then((res) => {
      const input = res;
      const autoComOptions = {
        componentRestrictions: { country: 'id' },
        fields: ['formatted_address', 'geometry', 'name'],
        origin: this.map.getCenter(),
        strictBounds: false,
        types: ['establishment'],
      };
      const autocomplete = new google.maps.places.Autocomplete(input, autoComOptions);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          return;
        }

        if (place.geometry.viewport) {
          this.map.fitBounds(place.geometry.viewport);
        } else {
          this.map.setCenter(place.geometry.location);
          this.map.setZoom(17);
        }
      });
    });
  }
}
