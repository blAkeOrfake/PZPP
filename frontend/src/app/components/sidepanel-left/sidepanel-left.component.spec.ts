import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidepanelLeftComponent } from './sidepanel-left.component';

describe('SidepanelLeftComponent', () => {
  let component: SidepanelLeftComponent;
  let fixture: ComponentFixture<SidepanelLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidepanelLeftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidepanelLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
