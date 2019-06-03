import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRaidprogressComponent } from './home-raidprogress.component';

describe('HomeRaidprogressComponent', () => {
  let component: HomeRaidprogressComponent;
  let fixture: ComponentFixture<HomeRaidprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRaidprogressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRaidprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
