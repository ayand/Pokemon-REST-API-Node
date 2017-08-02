import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPromptComponent } from './select-prompt.component';

describe('SelectPromptComponent', () => {
  let component: SelectPromptComponent;
  let fixture: ComponentFixture<SelectPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
