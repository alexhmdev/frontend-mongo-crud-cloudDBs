/* jshint esversion: 8 */
import { Component } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ToastController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  customers: any;
  filter: any;
  constructor(public service: ServiceService, private toastController: ToastController, private alertController: AlertController) {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.obtenerCustomer();
  }




  async presentToast() {
    const toast = await this.toastController.create({
      message: 'No customers available or registered',
      duration: 10000,
      position: 'middle'
    });
    toast.present();
  }
  async confirmDeleteCustomer(id: any, name: any, lastName: any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `<strong>Are you sure to delete ${name} ${lastName} from customers?</strong>`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');

          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.eliminarCustomer(id);
            this.obtenerCustomer();
          } 
        }
      ]
    });

    await alert.present();
  }

  async warning() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'No field should be empty',
      message: 'Please verify and try again',
      buttons: ['OK']
    });

    await alert.present();
  }
  async addCustomerForm() {
    const alert = await this.alertController.create({
      header: 'Add customer',
      inputs: [
        {
          name: 'firstName',
          type: 'text',
          placeholder: 'First Name',
        },
        {
          name: 'lastName',
          type: 'text',
          placeholder: 'Last Name'
        },
        // multiline input.
        {
          name: 'country',
          type: 'text',
          placeholder: 'Country'
        },
        {
          name: 'city',
          type: 'text',
          placeholder: 'City'
        },

        {
          name: 'district',
          type: 'text',
          placeholder: 'District'
        },
        {
          name: 'address',
          type: 'text',
          placeholder: 'Address'
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
            // tslint:disable-next-line: quotemark
            // tslint:disable-next-line: max-line-length
            if (alertData.firstName == "" || alertData.lastName == "" || alertData.country == "" || alertData.city == "" || alertData.district == "" ||
            alertData.address == "") {
              this.warning();
            } else {
            this.agregarCustomer(alertData);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async updateCustomerForm(customer: any) {
    const alert = await this.alertController.create({
      header: 'Modify customer',
      inputs: [
        {
          name: 'firstName',
          type: 'text',
          value: customer.firstName,
          placeholder: 'First Name',
        },
        {
          name: 'lastName',
          type: 'text',
          value: customer.lastName,
          placeholder: 'Last Name'
        },
        // multiline input.
        {
          name: 'country',
          type: 'text',
          value: customer.country,
          placeholder: 'Country'
        },
        {
          name: 'city',
          type: 'text',
          value: customer.city,
          placeholder: 'City'
        },

        {
          name: 'district',
          type: 'text',
          value: customer.district,
          placeholder: 'District'
        },
        {
          name: 'address',
          type: 'text',
          value: customer.address,
          placeholder: 'Address'
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
            this.modificarCustomer(customer._id, alertData);
          }
        }
      ]
    });
    await alert.present();
  }
  async updateSuccessfully(name: any, id: any) {
    const alert = await this.alertController.create({
      header: 'Updated Customer',
      subHeader: 'Successfully!',
      message: `Customer ${name} with Id: ${id}`,
      buttons: ['OK']
    });
    this.obtenerCustomer();
    await alert.present();
  }

  async addedSuccessfully(name: any, id: any) {
    const alert = await this.alertController.create({
      header: 'Added Customer',
      subHeader: 'Succesfully!',
      message: `Customer ${name} with Id: ${id}`,
      buttons: ['OK']
    });
    this.obtenerCustomer();
    await alert.present();
  }

  async noCustomersFounded() {
    const toast = await this.toastController.create({
      message: 'No customers Founded',
      duration: 3000,
      // tslint:disable-next-line: quotemark
      position: "top"
    });
    toast.present();
  }
  // tslint:disable-next-line: ban-types
  agregarCustomer(Customer: Object) {
    this.service.postCustomer(Customer).then((resp: any) => {
      console.log(resp.msg);
      this.addedSuccessfully(resp.Customers.firstName, resp.Customers._id);
    }).catch((err: any) => {
      console.log(err);
    });
  }

  obtenerCustomer() {
    this.service.getCustomers().then((customers: any) => {
        this.customers = customers.customers;
    }).catch((err: any) => {
      this.presentToast();
      console.log(err.cont);
    });
  }

  obtenerCustomerFiltro(filter: any) {
    if (filter == "") {
      this.obtenerCustomer();
    } else {
    this.service.getCustomersFilterId(filter).then((customers: any) => {
      if (customers.count > 0) {
         this.customers = customers.Customers;
      } else {
      // tslint:disable-next-line: no-shadowed-variable
      this.service.getCustomersFilterName(filter).then((customers: any) => {
        if (customers.count > 0) {this.customers = customers.Customers; } else {
        // tslint:disable-next-line: no-shadowed-variable
        this.service.getCustomersFilterCountry(filter).then((customers: any) => {
          if (customers.count > 0) {this.customers = customers.Customers; } else {
          this.obtenerCustomer();
          this.noCustomersFounded();
          console.log('mostrando todo');
          }
        }).catch((err: any) => {
          console.log(err.msg);
        });
      }
      });
    }
    }).catch((err: any) => {
       this.service.getCustomersFilterName(filter).then((customers: any) => {
         if (customers.count > 0) {
           this.customers = customers.Customers;
         }
         // tslint:disable-next-line: one-line
         else {
         this.service.getCustomersFilterCountry(filter).then((customers: any) => {
           if (customers.count > 0) {this.customers = customers.Customers; }
           // tslint:disable-next-line: one-line
           else{
           this.obtenerCustomer();
           this.noCustomersFounded();
           }
         // tslint:disable-next-line: no-shadowed-variable
         }).catch((err: any) => {
           console.log(err);
            // tslint:disable-next-line: align
            this.obtenerCustomer();
            // tslint:disable-next-line: align
            this.noCustomersFounded();
         });
        }
       // tslint:disable-next-line: no-shadowed-variable
       }).catch((err: any) => {
         console.log(err);
         this.obtenerCustomer();
         this.noCustomersFounded();
       })
    });
  }
  }

  modificarCustomer(id: any, Customer: object) {
    this.service.putCustomer(Customer, id).then((customers: any) => {
      this.updateSuccessfully(customers.Customers.name, customers.Customers._id);
      console.log(customers.Customers);
    }).catch((err: any) => {
      console.log(err);
    })
  }

  // tslint:disable-next-line: ban-types
  eliminarCustomer(id: number) { // funcion que manda a llamar servicios para que se realice la integracion con el front y el back
    this.service.deleteCustomer(id).then((customers: any) => {
      console.log(customers.msg);
      this.obtenerCustomer();
    }).catch((err) => {
      console.log(err.msg);
    })
  }
  async dumpCreated() {
    const alert = await this.alertController.create({
      header: 'Succesful',
      subHeader: 'Dump Created Succesfully',
      message: 'Saved in ./dump',
      buttons: ['OK']
    });
  
    await alert.present();
  }
// tslint:disable-next-line: ban-types
  // tslint:disable-next-line: comment-format
  dumpCollections() {//genera el dump de las collections

    this.service.dumpDataBase().then((resp: any) => {
      console.log(resp);
      this.dumpCreated();
    }).catch((err) => {
      console.log(err);
    });
  }
}
