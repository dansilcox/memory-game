import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberGridComponent } from './number-grid.component';

describe('NumberGridComponent', () => {
  let component: NumberGridComponent;
  let fixture: ComponentFixture<NumberGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
