import { animate, state, style, transition, trigger } from "@angular/animations";

export function flyInOut(duration: number = 0.2) {
  return trigger("flyInOut", [
    state("in", style({ opacity: 1, transform: "translateX(0)" })),
    transition("void => *", [style({ opacity: 0, transform: "translateX(-100%)" }), animate(`${duration}s ease-in`)]),
    transition("* => void", [
      animate(`${duration}s 10ms ease-out`, style({ opacity: 0, transform: "translateX(100%)" })),
    ]),
  ]);
}
