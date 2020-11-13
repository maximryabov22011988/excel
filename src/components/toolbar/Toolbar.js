import { ExcelComponent } from '@core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  static className = 'excel-toolbar'

  constructor(componentContainerNode, options = {}) {
    super(componentContainerNode, {
      name: 'Toolbar',
      ...options,
    });
  }

  toHTML() {
    return `
      <div class="excel-toolbar__button-group">
          <button class="excel-toolbar__button-item">
              <span class="material-icons">format_align_left</span>
          </button>

          <button class="excel-toolbar__button-item">
              <span class="material-icons">format_align_center</span>
          </button>

          <button class="excel-toolbar__button-item">
              <span class="material-icons">format_align_right</span>
          </button>

          <button class="excel-toolbar__button-item">
              <span class="material-icons">format_bold</span>
          </button>

          <button class="excel-toolbar__button-item">
              <span class="material-icons">format_italic</span>
          </button>

          <button class="excel-toolbar__button-item">
              <span class="material-icons">format_strikethrough</span>
          </button>
      </div>
    `;
  }
}
