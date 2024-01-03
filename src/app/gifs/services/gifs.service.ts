import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string[] = []
  private apiKey : string = 'z7v6pdQ4cIaUAxoXnEjwCLER9Fp084ei';
  private serviceUrl : string = `https://api.giphy.com/v1/gifs`

  constructor( private http : HttpClient) { }

  get tagsHistory(){
    return [...this._tagsHistory]
  }

  private organizedHistory( tag : string) {

    tag = tag.toLowerCase()

    if( this._tagsHistory.includes( tag )){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag  )
    }

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.splice(0,10)

  }

  public  searchTag(tag : string ): void {
    if( tag.length === 0 ) return
    this.organizedHistory( tag )

    const params = new HttpParams()
      .set('api_key', this.apiKey )
      .set('limit', '10' )
      .set('q', tag )

    this.http.get(`${ this.serviceUrl }/search`, { params })
    .subscribe( res => {
      console.log( res )
    })

      // fetch('https://api.giphy.com/v1/gifs/search?api_key=z7v6pdQ4cIaUAxoXnEjwCLER9Fp084ei&q=valorant&limit=10')
      //   .then(res => res.json())
      //   .then( data => console.log(data))


  }
}
