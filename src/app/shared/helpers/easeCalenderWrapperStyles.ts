type DataTypes = {
  wrapperElementDOMClass: string, 
  wrapperCustomClass: string,
  alignments: string[]
}
// alignments: ['y-start', 'y-end', 'x-start', 'x-end']
export function applyCalenderWrapperStyles(
  wrapperElementDOMClassOrId: string = '.easepick-wrapper', 
  wrapperCustomClass: string = 'easepick-custom-wrapper', 
  alignments: string[] = ['y-start', 'x-start']) {
  setTimeout(() => {
    const wrapper = document.querySelector(wrapperElementDOMClassOrId) as HTMLElement;
    if (wrapper) {
      const shadowRoot = wrapper.shadowRoot;
      const calendarContainer = shadowRoot?.querySelector('.container') as HTMLElement;
      wrapper.classList.add(wrapperCustomClass);
      alignments.forEach((className: string) => {
        wrapper.classList.add(className);
        calendarContainer?.classList.add(className);
      });

      Object.assign(wrapper.style, {
        zIndex: '9999',
        borderRadius: 'var(--border-radius)',
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