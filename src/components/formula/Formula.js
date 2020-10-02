import { ExcelComponent } from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel-formula'

  constructor(componentContainerNode) {
    super(componentContainerNode, {
      name: 'Formula',
      listeners: ['input'],
    });
  }

  toHTML() {
    return `
        <label for="formula" class="excel-formula__label">fx</label>
        <input 
          type="text" 
          class="excel-formula__input" 
          id="formula" 
          spellcheck="false" 
        />
    `;
  }

  onInput(event) {
    console.log(event.target.value, this.componentContainerNode)
  }
}
