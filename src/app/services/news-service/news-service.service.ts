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
    // Obtención de todas las noticias
    this.allNewsCollection = angularFirestore.collection<INew>('news');

    // Tener preparada una "vista" de todas las noticias destacadas
    this.featuredNewsCollection = angularFirestore.collection<INew>(
      'news',
      (ref) => ref.where('featured', '==', true)
    );

    // Tener preparada una "vista" de todas las noticias no destacadas
    this.otherNewsCollection = angularFirestore.collection<INew>(
      'news',
      (ref) => ref.where('featured', '==', false)
    );
  }

  /**
   * Obtención de noticias destacadas
   */
  getFeaturedNews(): Observable<INew[]> {
    return this.featuredNewsCollection.valueChanges({ idField: 'id' });
  }

  /**
   * Obtención del resto de noticias
   */
  getOtherNews(): Observable<INew[]> {
    return this.otherNewsCollection.valueChanges({ idField: 'id' });
  }

  /**
   * Obtener una noticia de toda la colección
   * @param id Id de la noticia, en cadena
   */
  getNewsById(
    id: string
  ): Observable<firebase.firestore.DocumentSnapshot<INew>> {
    return this.allNewsCollection.doc(id).get();
  }

  /**
   * Agregar la noticia _new
   * @param _new 
   */
  addNew(_new: INew): Promise<any> {
    return this.allNewsCollection.add(_new);
  }

  /**
   * Actualizar los datos de la notici con el id @id, 
   * con los datos de @_new 
   * @param id 
   * @param _new 
   */
  updateNew(id: string, _new: INew): Promise<void> {
    return this.allNewsCollection.doc(id).update(_new);
  }

  /**
   * Borrar la noticia con el id @id
   * @param id 
   */
  deleteNews(id: string): Promise<void> {
    return this.allNewsCollection.doc(id).delete();
  }
}
