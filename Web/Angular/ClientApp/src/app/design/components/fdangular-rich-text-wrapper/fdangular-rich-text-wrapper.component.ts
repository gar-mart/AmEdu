import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { AngularEditorComponent, AngularEditorConfig } from "@kolkov/angular-editor";

@Component({
  selector: "fd-angular-rich-text-wrapper",
  templateUrl: "./fdangular-rich-text-wrapper.component.html",
  styleUrls: ["./fdangular-rich-text-wrapper.component.scss"],
})
export class FDAngularRichTextWrapperComponent {
  @Input() editorConfig: AngularEditorConfig;
  @Output() editorUpdated = new EventEmitter<string>();

  @ViewChild(AngularEditorComponent, { static: true }) angularEditor: AngularEditorComponent;

  readonly fontColors = [
    {
      name: "White",
      hexCode: "#FFFFFF",
      className: "background-white fcolor-black",
    },
    {
      name: "Green",
      hexCode: "#00FF00",
      className: "background-green fcolor-white",
    },
    {
      name: "Red",
      hexCode: "#FF0000",
      className: "background-red fcolor-white",
    },
    {
      name: "Yellow",
      hexCode: "#FFFF00",
      className: "background-yellow fcolor-black",
    },
    {
      name: "Blue",
      hexCode: "#0000FF",
      className: "background-blue fcolor-white",
    },
  ];

  inputChanged() {
    // Just strip out the white text highlighting instead of trying to update the text area and keep all of the functionality.
    const textArea = this.angularEditor.editorWrapper.nativeElement.firstChild as HTMLAreaElement;
    let text = textArea.innerHTML;
    text = text.replace("background-color: rgb(255, 255, 255);", "");
    this.editorUpdated.emit(text);
  }

  applyColor(hexCode: string) {
    this.angularEditor.editorToolbar.insertColor(hexCode, "backgroundColor");
  }
}
