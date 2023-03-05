import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTileComponent } from './account-tile.component';

describe('AccountTileComponent', () => {
  let component: AccountTileComponent;
  let fixture: ComponentFixture<AccountTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
