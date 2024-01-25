import { Component, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from "lodash";

import { AuthService } from '../services/auth.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  _keyPass: string;
  loggedId: string | null = null;
  loggedUsername: string | null = null;

  componentStatus = {
    welcomeView: true,
    accountSet: false,
    textView: false,
  }

  notesData: any[] = [];
  categoryData: any[] = [];

  constructor(
    private router: Router,
    private noteService: NoteService,
    private renderer: Renderer2, 
    private el: ElementRef
  ) {}
  
  checkStatus: boolean = false;
  checkChange() {
    let sidebar = this.el.nativeElement.querySelector('.sidebar');
    let cancelBtn = this.el.nativeElement.querySelector('#cancel');
    
    if (this.checkStatus) {
      this.renderer.setStyle(sidebar, 'left', 0);
      this.renderer.setStyle(cancelBtn, 'left', '440px');
    } else if (!this.checkStatus) {
      this.renderer.setStyle(sidebar, 'left', '-500px');
      this.renderer.setStyle(cancelBtn, 'left', '-440px');
    }
  }

  toggleSidebar() {
    let sidebar = this.el.nativeElement.querySelector('.sidebar');
    if (this.checkStatus) {
      this.checkStatus = !this.checkStatus
      this.renderer.setStyle(sidebar, 'left', '-500px');
    }
  }

  getNotesByUserId() {
    this.noteService.getNotesByUserId(this.loggedId).subscribe(
      res => {
        this.notesData = res.data;
      }
    );
  }

  ngOnInit() {
    this.loggedId = sessionStorage.getItem('id');
    this.getNotesByUserId();
    let cancelBtn = this.el.nativeElement.querySelector('#cancel');
    this.renderer.setStyle(cancelBtn, 'left', '-440px');

    const myDiv = document.querySelector('.right') as HTMLDivElement;
    myDiv.addEventListener('click', () => {
      this.toggleSidebar();
    })
  }

  textViewActive() {
    this.componentStatus = _.mapValues(this.componentStatus, () => false);
    this.componentStatus.textView = !this.componentStatus.textView;
  }

  accountViewActive() {
    this.componentStatus = _.mapValues(this.componentStatus, () => false);
    this.componentStatus.accountSet = !this.componentStatus.accountSet;
  }

  welcomeViewActive() {
    this.componentStatus = _.mapValues(this.componentStatus, () => false);
    this.componentStatus.welcomeView = !this.componentStatus.welcomeView;
  }
  
  selectedNoteId: number = 0
  openNote(id: number) {
    this.componentStatus = _.mapValues(this.componentStatus, () => false);
    this.selectedNoteId = id;
    this.textViewActive();
  }
  
  newNote() {
    this.componentStatus = _.mapValues(this.componentStatus, () => false);
    this.selectedNoteId = 0;
    this.textViewActive();
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
