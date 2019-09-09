import { Component, OnInit, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

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
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
      this.modalClosed.emit(true);
    }, () => {
      this.modalClosed.emit(true);
    });
  }

}
