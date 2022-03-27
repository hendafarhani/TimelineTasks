import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NoteLabel } from '../models/note-label';

@Injectable({
  providedIn: 'root'
})
export class NotesHttpService {

  private url = 'https://61ee5f30d593d20017dbad98.mockapi.io/pinguin/api';

  constructor(private http: HttpClient) { }


  getNotes() {
    return this.http.get<any[]>(this.url + '/notes');
  }

  getNoteLabels() {
    return this.http.get<NoteLabel[]>(this.url + '/noteLabels');
  }

}
