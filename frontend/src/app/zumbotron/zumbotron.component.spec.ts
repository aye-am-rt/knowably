import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZumbotronComponent } from './zumbotron.component';

describe('ZumbotronComponent', () => {
  let component: ZumbotronComponent;
  let fixture: ComponentFixture<ZumbotronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZumbotronComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZumbotronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
