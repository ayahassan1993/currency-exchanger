import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrancyExchangerComponent } from './currancy-exchanger.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Currency } from '../../models/currency.model';
import { CurrencyService } from '../../services/currency.service';
import { of } from 'rxjs';

describe('CurrancyExchangerComponent', () => {
  let component: CurrancyExchangerComponent;
  let fixture: ComponentFixture<CurrancyExchangerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatButtonModule, MatInputModule,
        MatFormFieldModule, MatSelectModule, ReactiveFormsModule, NoopAnimationsModule],
      declarations: [CurrancyExchangerComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(CurrancyExchangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check the amount', () => {
    expect(component.getController('value').value).toBeGreaterThan(0)
  });

});
