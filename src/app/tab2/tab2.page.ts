import { Component } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  houses: any;
  desde: number = 0;
  rented: Boolean;
  min: Number;
  max: Number;
  user: any;
  type: any;
  properties: any;

  customers:any;
  constructor(private service:ServiceService, private toastController: ToastController,private alertController: AlertController) {}

  ngOnInit(){
    this.obtenerCasas(this.desde);
    this.obtenerCustomerSelect();
    this.obtenerPropiedades();
  }

  async noHousesFounded() {
    const toast = await this.toastController.create({
      message: 'No houses available or no founded',
      duration: 2000
    });
    toast.present();
  }

  obtenerPropiedades(){
    this.service.getProperties().then((resp:any)=>{
      this.properties = resp.resp;
      console.log(resp.resp);
    }).catch((err)=>{
      console.log(err);
    });
  }
  obtenerCasas(desde:Number){
      if(this.min && this.max > 0){
        this.obtenerCasasPorPrecio(this.min,this.max,this.desde);
      }
      else {
        this.service.getListingAndReviews(desde).then((resp:any)=>{
          if(resp.count>0){
            this.houses = resp.resp;
            console.log(resp.resp);
          }
          else {
            this.noHousesFounded();
          }
          
        }).catch((err)=>{
          console.log(err);
        });
      }
  }

  obtenerCasasPorPrecio(minimo: Number, maximo: Number, desde: Number){
    this.service.getByPriceRange(minimo,maximo,desde).then((resp: any)=>{
      this.houses = resp.resp;
      console.log(resp.resp);
    }).catch((err)=>{
      console.log(err);
    })
  }

  obtenerCasasPorPropiedad(property: any){
    this.service.getHousesByPropertyType(property).then((resp:any) => {
      this.houses = resp.resp;
      console.log(resp.resp);
    }).catch((err)=>{
      console.log(err);
    });
  }

  prevPage(){
    if(this.desde <0){this.desde = 0}
    this.desde-=10;
    this.obtenerCasas(this.desde);
  }

  nextPage(){
    if(this.desde <0){this.desde = 0}
    this.desde+=10;
    this.obtenerCasas(this.desde);
  }

  obtenerCustomerSelect(){
    this.service.getCustomers().then((resp:any)=>{
      this.customers = resp.customers
      console.log(resp.customers);
    }).catch((err)=>{
      console.log(err);
    })
  }

  async rentHouse( listingId: any) {
    const alert = await this.alertController.create({
      header: 'Add customer',
      inputs: [
        {
          name: 'idCustomer',
          type: 'text',
          value: this.user,
          disabled: true
        },
        {
          name: 'idListingAndReview',
          type: 'text',
          value: listingId,
          disabled: true
        },
        {
          name: 'returnDate',
          type: 'date'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            console.log('Confirm Ok');
            console.log(alertData);
            this.service.postRental(alertData).then((resp:any)=>{
              console.log(resp);
            }).catch((err)=>{
              console.log(err);
            })
          }
        }
      ]
    });
    await alert.present();
  }
  registrarRenta(renta:any){
    this.service.postRental(renta).then((resp:any) => {
      console.log(resp.resp);
    }).catch((err)=>{
      console.log(err);
    });
  }

}
