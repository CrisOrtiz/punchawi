import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  episodes: Observable<any[]>;
  urlArray : Array<SafeResourceUrl>;

  constructor(
    private sanitizer: DomSanitizer,
    private readonly firestore: AngularFirestore
    
    ) {
  
    this.episodes = firestore.collection('episodes').valueChanges();
    this.urlArray = [];
  }

  ngOnInit() {
    this.manageSafeLinks();
  }

  ngOnDestroy() {
  }
  
  manageSafeLinks(){
    this.episodes.subscribe(episode => {
     for (let i = 0; i < episode.length; i++) {
      this.urlArray.push(this.sanitizer.bypassSecurityTrustResourceUrl(episode[i].link));
     }   
    });   
  }
}
