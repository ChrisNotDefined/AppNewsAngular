import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { INew } from 'src/app/interfaces/new.interface';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class NewsServiceService {
  private featuredNewsCollection: AngularFirestoreCollection<INew>;
  private otherNewsCollection: AngularFirestoreCollection<INew>;
  private allNewsCollection: AngularFirestoreCollection<INew>;

  constructor(private angularFirestore: AngularFirestore) {
    this.allNewsCollection = angularFirestore.collection<INew>('news');

    this.featuredNewsCollection = angularFirestore.collection<INew>(
      'news',
      (ref) => ref.where('featured', '==', true)
    );

    this.otherNewsCollection = angularFirestore.collection<INew>(
      'news',
      (ref) => ref.where('featured', '==', false)
    );
  }

  getFeaturedNews(): Observable<INew[]> {
    return this.featuredNewsCollection.valueChanges({ idField: 'id' });
  }

  getOtherNews(): Observable<INew[]> {
    return this.otherNewsCollection.valueChanges({ idField: 'id' });
  }

  getNewsById(
    id: string
  ): Observable<firebase.firestore.DocumentSnapshot<INew>> {
    return this.allNewsCollection.doc(id).get();
  }

  addNew(_new: INew): Promise<any> {
    return this.allNewsCollection.add(_new);
  }

  updateNew(id: string, _new: INew): Promise<void> {
    return this.allNewsCollection.doc(id).update(_new);
  }

  deleteNews(id: string): Promise<void> {
    return this.allNewsCollection.doc(id).delete();
  }
}
