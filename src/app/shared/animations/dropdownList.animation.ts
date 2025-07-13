import {
  animate,
  query,
  sequence,
  stagger,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

export const dropDownMenu = trigger("dropDownMenu", [
  transition(":enter", [
    style({ height: 0, overflow: "hidden" }),
    query(".dropdown-anime-item", [
      style({ opacity: 0, transform: "translateY(-40px)" })
    ],  { optional: true }),
    sequence([
      animate("150ms", style({ height: "*" })),
      query(".dropdown-anime-item", [
        stagger(-50, [
          animate("300ms ease", style({ opacity: 1, transform: "none" }))
        ])
      ], { optional: true })
    ])
  ]),

  transition(":leave", [
    style({ height: "*", overflow: "hidden" }),
    query(".dropdown-anime-item", [style({ opacity: 1, transform: "none" })], { optional: true }),
    sequence([
      query(".dropdown-anime-item", [
        stagger(50, [
          animate(
            "300ms ease",
            style({ opacity: 0, transform: "translateY(-40px)" })
          )
        ])
      ], { optional: true }),
      animate("150ms", style({ height: 0 }))
    ])
  ])
]);

export const dropdownItemAnimation = trigger('dropdownItemAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-20px)' }),
    animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);


