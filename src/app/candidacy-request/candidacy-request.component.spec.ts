import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidacyRequestComponent } from './candidacy-request.component';

describe('CandidacyRequestComponent', () => {
  let component: CandidacyRequestComponent;
  let fixture: ComponentFixture<CandidacyRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidacyRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidacyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
