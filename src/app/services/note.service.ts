import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from './env';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) {} 

  getNotesByUserId(id: string | null) {
    return this.http.get<any>(`${url}/api/note/user/${id}`);
  }

  getNoteById(id: number) {
    return this.http.get<any>(`${url}/api/note/${id}`);
  }

  getNoteByIdForEdit(user_id: number, id: number) {
    return this.http.post<any>(`${url}/api/note/getNoteEdit/`, {
      user_id: user_id,
      id: id,
    });
  }

  saveNote(
    user_id: number,
    title: string,
    body: string) {

    return this.http.post<any>(`${url}/api/note/`, {
      user_id: user_id,
      title: title,
      body: body
    });
  }

  updateNote(
    note_id: number,
    user_id: number | null,
    title: string,
    body: any) {

    return this.http.put<any>(`${url}/api/note/`, {
      id: note_id,
      user_id: user_id,
      title: title,
      body: body
    });
  }

  deleteNote(id: number) {
    return this.http.delete<any>(`${url}/api/note/${id}`);
  }
}