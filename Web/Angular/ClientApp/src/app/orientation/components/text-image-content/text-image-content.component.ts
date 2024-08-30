import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FDAngularRichTextWrapperComponent } from "@design/fdangular-rich-text-wrapper/fdangular-rich-text-wrapper.component";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { TextImageContent } from "@models/step-content.model";
import { Utility } from "app/shared";

@Component({
  selector: "app-text-image-content",
  templateUrl: "./text-image-content.component.html",
  styleUrls: ["./text-image-content.component.scss"],
})
export class TextImageContentComponent implements AfterViewInit {
  @Input() content: TextImageContent;
  @Input() editMode: boolean;
  @Input() previewMode: boolean;
  @Output() edit = new EventEmitter<void>();

  @ViewChild(FDAngularRichTextWrapperComponent) editor: FDAngularRichTextWrapperComponent;

  angularEditorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "40vh",
    width: "100%",
    enableToolbar: true,
    showToolbar: true,
    defaultParagraphSeparator: "<br>",
    defaultFontName: "Verdana",
    sanitize: true,
    toolbarPosition: "top",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "verdana", name: "Verdana" },
    ],
    toolbarHiddenButtons: [
      [
        /*'bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript'*/
      ],
      [/*'fontName', 'heading', 'fontSize', 'textColor',*/ "backgroundColor"],
      [
        /*'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent'*/
      ],
      [
        /*'cut', 'copy', 'delete', 'removeFormat', 'undo', 'redo'*/
      ],
      [
        /*'paragraph', 'blockquote', 'removeBlockquote', 'horizontalLine', 'orderedList', 'unorderedList'*/
      ],
      ["video" /*'link', 'unlink', 'image'*/],
    ],
  };

  ngAfterViewInit(): void {
    if (this.content.content && this.editor) {
      setTimeout(() => this.editor.angularEditor.writeValue(this.content.content));
    }
  }

  inputChange(content: string) {
    this.content.content = Utility.cleanAngularEditorHtml(content);
    this.edit.emit();
  }
}
