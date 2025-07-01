type DataTypes = {
  wrapperElementDOMClass: string, 
  wrapperCustomClass: string,
  alignments: string[]
}
// alignments: ['y-start', 'y-end', 'x-start', 'x-end']
export function applyCalenderWrapperStyles(
  alignments: string[] = ['y-start', 'x-start'],
  parentId: string,
  wrapperElementDOMClassOrId: string = '.easepick-wrapper', 
  wrapperCustomClass: string = 'easepick-custom-wrapper') {
  setTimeout(() => {
    const wrapper = document.querySelector("#parent-"+parentId)?.querySelector(wrapperElementDOMClassOrId) as HTMLElement;
    if(!wrapper) return
    if (wrapper) {
      const shadowRoot = wrapper.shadowRoot;
      const calendarContainer = shadowRoot?.querySelector('.container') as HTMLElement;
      wrapper.classList.add(wrapperCustomClass);
      alignments.forEach((className: string) => {
        wrapper.classList.add(className);
        calendarContainer?.classList.add(className);
        if(className === 'y-start') wrapper.style.setProperty('--calendar-inset-block-start', "0");
        if(className === 'y-end') wrapper.style.setProperty('--calendar-inset-block-end', "0");
        if(className === 'x-start') wrapper.style.setProperty('--calendar-inset-inline-start', "0");
        if(className === 'x-end') wrapper.style.setProperty('--calendar-inset-inline-end', "0");
      });

      Object.assign(wrapper.style, {
        zIndex: '9999',
        position: 'absolute',
        pointerEvents: 'none',
        insetBlockStart: 'var(--calendar-inset-block-start, initial)',
        insetBlockEnd: 'var(--calendar-inset-block-end, initial)',
        insetInlineStart: 'var(--calendar-inset-inline-start, initial)',
        insetInlineEnd: 'var(--calendar-inset-inline-end, initial)',
      });
    }
  }, 0);
}