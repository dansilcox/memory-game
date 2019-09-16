import { Component, OnInit, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  name = '';

  @Output()
  nameEvent = new EventEmitter<string>();

  @Output()
  modalClosed = new EventEmitter<boolean>();

  @ViewChild('content', {
    static: true
  })
  private content: TemplateRef<any>;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.open(this.content);
  }

  open(content) {
    // We don't care _how_ the modal is closed, we are starting the game anyway!!
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((saved) => {
      this.start();
    }, () => {
      this.start();
    });
  }

  private start() {
    this.modalClosed.emit(true);
    this.nameEvent.emit(this.name);
  }
}
