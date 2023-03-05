import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidepanelRightComponent } from './sidepanel-right.component';

describe('SidepanelRightComponent', () => {
  let component: SidepanelRightComponent;
  let fixture: ComponentFixture<SidepanelRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidepanelRightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidepanelRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
