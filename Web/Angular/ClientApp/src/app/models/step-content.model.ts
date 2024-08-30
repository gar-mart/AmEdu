import { Type } from "@angular/core";
import { SystemContentComponentIds } from "app/enums/system-content-component-id.enum";
import { Question } from "./question.model";

export interface StepContent {
  youTubeVideoContent: YouTubeVideoContent[];
  systemContent: SystemContentModel[];
  shortcutContent: ShortcutContent[];
  studentResourceContent: StudentResourceContent[];
  contactContent: ContactContent[];
  textImageContent: TextImageContent[];
  signatureContent: SignatureContent[];
  quizContent: QuizContent[];
  content?: Content[];
}

export class StepContentModel implements StepContent {
  youTubeVideoContent: YouTubeVideoContent[];
  systemContent: SystemContentModel[];
  shortcutContent: ShortcutContent[];
  studentResourceContent: StudentResourceContent[];
  contactContent: ContactContent[];
  textImageContent: TextImageContent[];
  signatureContent: SignatureContent[];
  quizContent: QuizContent[];

  // maintained by front-end
  content?: Content[] = [];

  constructor(options: { content?: Content[]; stepContent?: StepContent }) {
    if (options.stepContent) {
      Object.assign(this, options.stepContent);
      this.content = this.youTubeVideoContent
        .map<Content>(content => new YouTubeVideoContentModel(content))
        .concat(this.systemContent.map(content => new SystemContentModel(content)))
        .concat(this.shortcutContent.map(content => new ShortcutContentModel(content)))
        .concat(this.studentResourceContent.map(content => new StudentResourceContentModel(content)))
        .concat(this.contactContent.map(content => new ContactContentModel(content)))
        .concat(this.textImageContent.map(content => new TextImageContentModel(content)))
        .concat(this.signatureContent.map(content => new SignatureContentModel(content)))
        .concat(this.quizContent.map(content => new QuizContentModel(content)))
        .sort((a, b) => a.orderBy - b.orderBy);
      return;
    }

    this.youTubeVideoContent = [];
    this.systemContent = [];
    this.shortcutContent = [];
    this.studentResourceContent = [];
    this.contactContent = [];
    this.textImageContent = [];
    this.signatureContent = [];
    this.quizContent = [];
    this.content = options.content;

    options.content?.forEach((content, index) => {
      content.orderBy = index;

      if (content instanceof YouTubeVideoContentModel) {
        this.youTubeVideoContent.push(content);
      } else if (content instanceof SystemContentModel) {
        this.systemContent.push(content);
      } else if (content instanceof ShortcutContentModel) {
        this.shortcutContent.push(content);
      } else if (content instanceof StudentResourceContentModel) {
        this.studentResourceContent.push(content);
      } else if (content instanceof ContactContentModel) {
        this.contactContent.push(content);
      } else if (content instanceof TextImageContentModel) {
        this.textImageContent.push(content);
      } else if (content instanceof SignatureContentModel) {
        this.signatureContent.push(content);
      } else if (content instanceof QuizContentModel) {
        if (!content.questions) {
          content.questions = []; // the questions must be a non-null list for the back-end
        }

        this.quizContent.push(content);
      }
    });
  }
}

export interface Content {
  id: number;
  stepId: number;
  orderBy: number;
  /** client-side use only. Specifies whether or not the content is readonly or accepts user-input */
  readonly: boolean;

  is(contentType: Type<Content>): boolean;
  get title(): string;
}

export abstract class ContentModel implements Content {
  id: number;
  stepId: number;
  orderBy: number;
  abstract readonly: boolean;

  get title() {
    if (this instanceof YouTubeVideoContentModel) {
      return "YouTube Video";
    } else if (this instanceof ShortcutContentModel) {
      return "App Shortcut";
    } else if (this instanceof StudentResourceContentModel) {
      return "Student Resource";
    } else if (this instanceof TextImageContentModel) {
      return "Text/Image";
    } else if (this instanceof ContactContentModel) {
      return "Contact";
    } else if (this instanceof SignatureContentModel) {
      return "Signature";
    } else if (this instanceof QuizContentModel) {
      return "Quiz";
    } else if (this instanceof SystemContentModel) {
      return SystemContentModel.titleFor(this.componentId);
    }

    throw new Error("No title provided.");
  }

  constructor(copy: Partial<Content>) {
    Object.assign(this, copy);
  }

  is(contentType: Type<Content>): boolean {
    return this instanceof contentType;
  }
}

// #region Content Types
export interface YouTubeVideoContent extends Content {
  videoId: string;
}

export class YouTubeVideoContentModel extends ContentModel implements YouTubeVideoContent {
  videoId: string;
  get readonly() {
    return true;
  }

  constructor(copy: Partial<YouTubeVideoContent>) {
    super(copy);
  }
}

export interface SystemContent extends Content {
  componentId: SystemContentComponentIds;
}

export class SystemContentModel extends ContentModel implements SystemContent {
  componentId: SystemContentComponentIds;
  get readonly() {
    return (
      this.componentId === SystemContentComponentIds.IntroVideos ||
      this.componentId === SystemContentComponentIds.OutlookEmailVerification
    ); // not exactly readonly, but we don't want the user to edit this more than once.
  }

  constructor(copy: Partial<SystemContentModel>) {
    super(copy);
  }

  static titleFor(componentId: SystemContentComponentIds) {
    switch (componentId) {
      case SystemContentComponentIds.SendUsASelfie:
        return "Send us a Selfie";
      case SystemContentComponentIds.IntroVideos:
        return "Mentor Videos";
      case SystemContentComponentIds.OutlookEmailVerification:
        return "Email Verification";
      case SystemContentComponentIds.ConnectionSurvey:
        return "Connection Survey";
      case SystemContentComponentIds.Semester1Electives:
        return "Semester 1 Electives";
      case SystemContentComponentIds.Semester2Electives:
        return "Semester 2 Electives";
      default:
        throw new Error("No system content title provided.");
    }
  }
}

export interface ShortcutContent extends Content {
  appTileMetadataId: number;
}

export class ShortcutContentModel extends ContentModel implements ShortcutContent {
  appTileMetadataId: number;
  get readonly() {
    return true;
  }

  constructor(copy: Partial<ShortcutContent>) {
    super(copy);
  }
}

export interface StudentResourceContent extends Content {
  studentResourceId: number;
}

export class StudentResourceContentModel extends ContentModel implements StudentResourceContent {
  studentResourceId: number;
  get readonly() {
    return true;
  }

  constructor(copy: Partial<StudentResourceContent>) {
    super(copy);
  }
}

export interface TextImageContent extends Content {
  content: string;
}

export class TextImageContentModel extends ContentModel implements TextImageContent {
  content: string;
  get readonly() {
    return true;
  }

  constructor(copy: Partial<TextImageContent>) {
    super(copy);
  }
}

export interface SignatureContent extends Content {
  signer: string;
  disclaimer: string;
}

export class SignatureContentModel extends ContentModel implements SignatureContent {
  signer: string;
  disclaimer: string;
  get readonly() {
    return false;
  }

  constructor(copy: Partial<SignatureContent>) {
    super(copy);
  }
}

export interface ContactContent extends Content {
  userId: number;
}

export class ContactContentModel extends ContentModel implements ContactContent {
  userId: number;
  get readonly() {
    return true;
  }

  constructor(copy: Partial<ContactContent>) {
    super(copy);
  }
}

export interface QuizContent extends Content {
  questions: Question[];
}

export class QuizContentModel extends ContentModel implements QuizContent {
  questions: Question[];
  get readonly() {
    return false;
  }

  constructor(copy: Partial<QuizContent>) {
    super(copy);
  }
}
// #endregion
