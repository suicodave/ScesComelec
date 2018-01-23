import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyElectionsComponent } from './my-elections.component';

describe('MyElectionsComponent', () => {
  let component: MyElectionsComponent;
  let fixture: ComponentFixture<MyElectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyElectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyElectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
