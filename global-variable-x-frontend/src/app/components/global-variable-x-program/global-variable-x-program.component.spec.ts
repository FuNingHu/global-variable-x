import {ComponentFixture, TestBed} from '@angular/core/testing';
import {GlobalVariableXProgramComponent} from "./global-variable-x-program.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('GlobalVariableXProgramComponent', () => {
  let fixture: ComponentFixture<GlobalVariableXProgramComponent>;
  let component: GlobalVariableXProgramComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalVariableXProgramComponent],
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader, useValue: {
            getTranslation(): Observable<Record<string, string>> {
              return of({});
            }
          }
        }
      })],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalVariableXProgramComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
