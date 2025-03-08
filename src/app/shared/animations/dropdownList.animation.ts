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
    ]),
    sequence([
      animate("150ms", style({ height: "*" })),
      query(".dropdown-anime-item", [
        stagger(-50, [
          animate("300ms ease", style({ opacity: 1, transform: "none" }))
        ])
      ])
    ])
  ]),

  transition(":leave", [
    style({ height: "*", overflow: "hidden" }),
    query(".dropdown-anime-item", [style({ opacity: 1, transform: "none" })]),
    sequence([
      query(".dropdown-anime-item", [
        stagger(50, [
          animate(
            "300ms ease",
            style({ opacity: 0, transform: "translateY(-40px)" })
          )
        ])
      ]),
      animate("150ms", style({ height: 0 }))
    ])
  ])
]);


