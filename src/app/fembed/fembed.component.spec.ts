import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FembedComponent } from './fembed.component';

describe('FembedComponent', () => {
  let component: FembedComponent;
  let fixture: ComponentFixture<FembedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FembedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FembedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
