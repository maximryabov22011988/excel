const toButton = (button) => {
  const meta = `
    data-type="toolbar-button"
    data-value='${JSON.stringify(button.value)}'
  `
  return `
    <button 
      class="excel-toolbar__button-item ${button.isActive ? 'is-active' : ''}"
      ${meta}
    >
      <span 
        class="material-icons" 
        ${meta}
      >
        ${button.icon}
      </span>  
    </button>
  `
}

export const createToolbar = (state) => {
  const buttons = [
    {
      icon: 'format_align_left',
      isActive: state.textAlign === 'left',
      value: {
        textAlign: 'left',
      },
    },
    {
      icon: 'format_align_center',
      isActive: state.textAlign === 'center',
      value: {
        textAlign: 'center',
      },
    },
    {
      icon: 'format_align_right',
      isActive: state.textAlign === 'right',
      value: {
        textAlign: 'right',
      },
    },
    {
      icon: 'format_bold',
      isActive: state.fontWeight === 'bold',
      value: {
        fontWeight: state.fontWeight === 'bold' ? 'normal' : 'bold',
      },
    },
    {
      icon: 'format_italic',
      isActive: state.fontStyle === 'italic',
      value: {
        fontStyle: state.fontStyle === 'italic' ? 'normal' : 'italic',
      },
    },
    {
      icon: 'format_underlined',
      isActive: state.textDecoration === 'underline',
      value: {
        textDecoration: state.textDecoration === 'underline' ? 'none' : 'underline',
      },
    },
  ]

  return buttons.map(toButton).join('')
}

