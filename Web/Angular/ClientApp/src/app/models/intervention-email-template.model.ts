import { InterventionEmailTemplateFrom } from "app/enums/intervention-email-template-from.enum";
import { InterventionEmailTemplateTo } from "app/enums/intervention-email-template-to.enum";
import { InterventionLevel } from "app/enums/intervention-level.enum";

export interface InterventionEmailTemplate {
  interventionLevel: InterventionLevel;
  emailFrom: InterventionEmailTemplateFrom;
  emailTo: InterventionEmailTemplateTo;
  emailSubject: string;
  includeEngagementFlagSnapshot: boolean;
  emailBody: string;

  emailFromAddress: string;
  attachmentList: { interventionLevel: InterventionLevel; filename: string }[];
  recipients: { email: string; emailTo: InterventionEmailTemplateTo }[];
}
