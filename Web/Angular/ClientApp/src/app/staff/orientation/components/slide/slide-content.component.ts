import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  ContactContentModel,
  Content,
  QuizContentModel,
  ShortcutContentModel,
  SignatureContentModel,
  StudentResourceContentModel,
  SystemContentModel,
  TextImageContentModel,
  YouTubeVideoContentModel,
} from "@models/step-content.model";
import { Step } from "@models/step.model";
import { SystemContentComponentIds } from "app/enums/system-content-component-id.enum";
import { SlideService } from "../slide.service";

@Component({
  selector: "app-manage-slide-content",
  templateUrl: "./slide-content.component.html",
  styleUrls: ["./slide-content.component.scss"],
})
export class SlideContentComponent {
  @Input() step: Step;
  @Output() edit = new EventEmitter<void>();

  private get newContent(): Partial<Content> {
    return {
      stepId: this.step.id,
      orderBy: this.slideService.nextOrderBy,
    };
  }

  constructor(public slideService: SlideService) {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.slideService.content, event.previousIndex, event.currentIndex);
    this.edit.emit();
  }

  addContact() {
    this.slideService.content.push(new ContactContentModel(Object.assign({ userId: 0 }, this.newContent)));
    this.afterAddContent();
  }

  addQuiz() {
    this.slideService.content.push(new QuizContentModel(this.newContent));
    this.afterAddContent();
  }

  addShortcuts() {
    this.slideService.content.push(new ShortcutContentModel(this.newContent));
    this.afterAddContent();
  }

  addSignature() {
    this.slideService.content.push(new SignatureContentModel(this.newContent));
    this.afterAddContent();
  }

  addResources() {
    this.slideService.content.push(new StudentResourceContentModel(this.newContent));
    this.afterAddContent();
  }

  addTextImage() {
    this.slideService.content.push(new TextImageContentModel(this.newContent));
    this.afterAddContent();
  }

  addYouTube() {
    this.slideService.content.push(new YouTubeVideoContentModel(this.newContent));
    this.afterAddContent();
  }

  addSystem(componentId: SystemContentComponentIds) {
    this.slideService.content.push(new SystemContentModel(Object.assign({ componentId }, this.newContent)));
    this.afterAddContent();
  }

  delete(index: number) {
    this.slideService.content.splice(index, 1)[0];
    this.edit.emit();
  }

  private afterAddContent() {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight));
    this.edit.emit();
  }
}
