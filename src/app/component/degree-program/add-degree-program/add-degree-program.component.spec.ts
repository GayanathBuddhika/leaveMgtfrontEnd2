import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDegreeProgramComponent } from './add-degree-program.component';

describe('AddDegreeProgramComponent', () => {
  let component: AddDegreeProgramComponent;
  let fixture: ComponentFixture<AddDegreeProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDegreeProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDegreeProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
