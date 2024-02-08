import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrancyExchangerComponent } from './currancy-exchanger.component';

describe('CurrancyExchangerComponent', () => {
  let component: CurrancyExchangerComponent;
  let fixture: ComponentFixture<CurrancyExchangerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrancyExchangerComponent]
    });
    fixture = TestBed.createComponent(CurrancyExchangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
