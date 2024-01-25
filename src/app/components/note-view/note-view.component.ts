import { Component, Input, Output, EventEmitter, ViewChild, ElementRef  } from '@angular/core';
import * as _ from "lodash";
import { NoteService } from 'src/app/services/note.service';
// import { AuthService } from 'src/app/services/auth.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.scss']
})
export class NoteViewComponent {

  private _noteId: number;
  // encKey: string;
  @Output('getNotesByUserId') getNotesByUserId: EventEmitter<any> = new EventEmitter();
  @Output('backToWelcome') backToWelcome: EventEmitter<any> = new EventEmitter();
  @ViewChild('saveModal') saveModal: any;
  @ViewChild('updateModal') updateModal: any;
  
  
  @ViewChild('textArea') textArea:ElementRef;
  // @ViewChild('catNullModal') catNullModal: any;
  // @ViewChild('emptyKeyModal') emptyKeyModal: any;
  // @ViewChild('wrongPassModal') wrongPassModal: any;
  @ViewChild('editModal') editModal: any;
  @ViewChild('confirmDelete') confirmDelete: any;

  // This object is for storing the note detail only in view mode
  noteDetail = {
    id: null,
    title: '',
    body: ''
  }

  // This object is for storing the note detail in edit mode
  noteDetailForEdit = {
    id: null,
    title: '',
    category: null,
    body: ''
  }

  componentStatus = {
    textView: true,
    textEditor: false,
    textEditorTouch: false,
  }

  constructor(
    private noteService: NoteService, 
    private modalService: NgbModal) {}

  textEditorActive() {
    this.getNoteByIdForEdit();
    this.componentStatus = _.mapValues(this.componentStatus, () => false);
    this.componentStatus.textEditor = !this.componentStatus.textEditor;
  }

  textViewActive() {
    // To set all view to false (not showed)
    this.componentStatus = _.mapValues(this.componentStatus, () => false);
    this.componentStatus.textView = true;
  }

  getNoteById() {
    if (this._noteId !== 0) {
      this.noteService.getNoteById(this._noteId).subscribe(
        res => {
          let data = res.data[0];
          this.noteDetail.id = data.id;
          this.noteDetail.title = data.title;
          this.noteDetail.body = data.body;

          this.textViewActive();
        }
      );
    } else {
      // If note id is 0 it means the user is creating a new note
      this.noteDetailForEdit.id = null;
      this.noteDetailForEdit.title = '';
      this.noteDetailForEdit.category = null;
      this.noteDetailForEdit.body = '';
    }
  }

  getNoteByIdForEdit() {
    if (this._noteId !== 0) {
        let user_id = sessionStorage.getItem('id');
        this.noteService.getNoteByIdForEdit(parseInt(user_id!) ,this._noteId).subscribe(
          res => {
            let data = res.data[0];
            this.noteDetailForEdit.id = data.id;
            this.noteDetailForEdit.title = data.title;
            this.noteDetailForEdit.body = data.body;
            this.modalService.dismissAll();
  
            this.componentStatus = _.mapValues(this.componentStatus, () => false);
            this.componentStatus.textEditor = !this.componentStatus.textEditor;
          },
        );
      }
  }

  cancelEdit() {
    if (this._noteId === 0) {
      this.componentStatus = _.mapValues(this.componentStatus, () => false);
      this.backToWelcome.emit();
    } else {
      this.componentStatus = _.mapValues(this.componentStatus, () => false);
      this.componentStatus.textView = true;
    }
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  ngOnInit() {
    console.log(this.noteId);
    this.getNoteById();
  }

  @Input() set noteId(value: number) {
    this._noteId = value;

    if (this._noteId === 0) {
      this.noteDetail.id = null;
      this.noteDetail.title = '';
      this.noteDetail.body = '';
      this.textEditorActive()
    } else {
      this.getNoteById();
    }
  }

  get noteId(): number {
    return this._noteId;
  }

  updateNote() {
      this.noteService.updateNote(
        this.noteDetailForEdit.id!,
        parseInt(sessionStorage.getItem('id')!),
        this.noteDetailForEdit.title,
        this.noteDetailForEdit.body
      ).subscribe(
        res => {
          this.getNoteById();
          this.getNotesByUserId.emit();
          this.modalService.dismissAll();
        },
      )
  }

  saveNote() {
      this.noteService.saveNote(
        parseInt(sessionStorage.getItem('id')!),
        this.noteDetailForEdit.title,
        this.noteDetailForEdit.body,
      ).subscribe(
        res => {
          this._noteId = res.data.id;
          this.getNoteById();
          this.getNotesByUserId.emit();
          this.modalService.dismissAll();
        },
      )
  }

  saveAction() {
    // If note id that sent by the parent (dashboard) is not 0
    // Then it means the user will updated some note
    if (this._noteId !== 0) {
        this.openModal(this.updateModal);
    // Else if, the note is 0
    // Then it means the user will create a new note
    } else {
        this.openModal(this.saveModal);
    }
  }

  openConfirm() {
    this.modalService.open(this.confirmDelete);
  }

  deleteNote() {
    this.noteService.deleteNote(this._noteId).subscribe(
      res => {
        this.cancelEdit();
        this.getNotesByUserId.emit();
        this.backToWelcome.emit();
        this.modalService.dismissAll();
      }
    )
  }
}
