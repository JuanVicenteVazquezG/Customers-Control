import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';
import { map } from 'rxjs/operators';

@Injectable()
export class CustomerService {
  public customersColection: AngularFirestoreCollection<Customer>;
  public customerDoc: AngularFirestoreDocument<Customer>;
  public customers: Observable<Customer[]>;
  public customer: Observable<Customer>;

  constructor(private db: AngularFirestore) {
    this.customersColection = db.collection('customers', (ref) =>
      ref.orderBy('name', 'asc')
    );
  }

  getCustomers(): Observable<Customer[]> {
    // Retrieve the customers
    this.customers = this.customersColection.snapshotChanges().pipe(
      map( changes => {
        return changes.map( action => {
          const data = action.payload.doc.data() as Customer;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
    console.log(this.customers);
    return this.customers;
  }
}
