import { Component, ViewChild, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SignaturePadComponent } from "@design/signature-pad/signature-pad.component";

@Component({
  selector: "app-signature-field",
  templateUrl: "./signature-field.component.html",
  styleUrls: ["./signature-field.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignatureFieldComponent),
      multi: true,
    },
  ],
})
export class SignatureFieldComponent implements ControlValueAccessor {
  @ViewChild(SignaturePadComponent) public signaturePad: SignaturePadComponent;

  public options: Object = {
    backgroundColor: "rgb(255,255,255)",
    canvasWidth: 600,
    canvasHeight: 150,
    penColor: "rgb(255, 0, 0)",
  };
  public _signature: any = null;
  public propagateChange: Function = null;

  get signature(): any {
    return this._signature;
  }

  set signature(value: any) {
    this._signature = value;
    this.propagateChange(this.signature);
  }

  public writeValue(value: any): void {
    if (!value) {
      return;
    }
    this._signature = value;
    this.signaturePad?.fromDataURL(this.signature);
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(): void {
    // no-op
  }

  public ngAfterViewInit(): void {
    this.signaturePad.clear();
  }

  public drawBegin(): void {}

  public drawComplete(): void {
    this.signature = this.signaturePad.toDataURL("image/jpeg", 0.5);
  }

  public clear(): void {
    this.signaturePad.clear();
    this.signature = "";
  }

  public disableSignaturePad() {
    this.signaturePad.off();
  }

  public enableSignaturePad() {
    this.signaturePad.on();
  }
}
