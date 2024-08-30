import { animate, style, transition, trigger } from "@angular/animations";

export const fadeInOut = trigger("fadeInOut", [
  transition(":enter", [style({ opacity: 0 }), animate("0.4s ease-in", style({ opacity: 1 }))]),
  transition(":leave", [animate("0.4s 10ms ease-out", style({ opacity: 0 }))]),
]);
