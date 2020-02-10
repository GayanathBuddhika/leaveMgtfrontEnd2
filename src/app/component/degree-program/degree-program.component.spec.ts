import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeProgramComponent } from './degree-program.component';

describe('DegreeProgramComponent', () => {
  let component: DegreeProgramComponent;
  let fixture: ComponentFixture<DegreeProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DegreeProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DegreeProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
