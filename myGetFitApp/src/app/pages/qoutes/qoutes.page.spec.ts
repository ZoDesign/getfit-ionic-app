import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QoutesPage } from './qoutes.page';

describe('QoutesPage', () => {
  let component: QoutesPage;
  let fixture: ComponentFixture<QoutesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QoutesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
