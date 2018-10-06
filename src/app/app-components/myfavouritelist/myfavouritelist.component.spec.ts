import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfavouritelistComponent } from './myfavouritelist.component';

describe('MyfavouritelistComponent', () => {
  let component: MyfavouritelistComponent;
  let fixture: ComponentFixture<MyfavouritelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfavouritelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfavouritelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
