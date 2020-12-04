import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { INew } from 'src/app/interfaces/new.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsServiceService {

  private featuredNewsCollection: AngularFirestoreCollection<INew>;
  private otherNewsCollection: AngularFirestoreCollection<INew>;
  
  constructor(
    private angularFirestore: AngularFirestore
  ) { 
    this.featuredNewsCollection = angularFirestore.collection<INew>('featured');
    this.otherNewsCollection = angularFirestore.collection<INew>('others');
  }

  getFeaturedNews(): Observable<INew[]> {
    return this.featuredNewsCollection.valueChanges({idField: 'id'});
  }

  getOtherNews(): Observable<INew[]> {
    return this.otherNewsCollection.valueChanges({idField: 'id'})
  }

  addFeaturedNew(_new: INew): Promise<any> {
    return this.featuredNewsCollection.add(_new);
  }

  addOtherNew(_new: INew): Promise<any> {
    return this.otherNewsCollection.add(_new);
  }

  updateFeaturedNew(id: string, _new: INew): Promise<void> {
    return this.featuredNewsCollection.doc(id).update(_new);
  }

  updateOtherNew(id: string, _new: INew): Promise<void> {
    return this.otherNewsCollection.doc(id).update(_new);
  }

  deleteFeaturedNews(id: string, _new: INew) : Promise<void> {
    return this.featuredNewsCollection.doc(id).delete();
  }

  deleteOtherNews(id: string, _new: INew) : Promise<void> {
    return this.otherNewsCollection.doc(id).delete();
  }
}
