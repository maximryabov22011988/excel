import { ExcelComponent } from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel-header'

  constructor(componentContainerNode, options = {}) {
    super(componentContainerNode, {
      name: 'Header',
      ...options,
    });
  }

  toHTML() {
    return `
        <input 
          class="excel-header__input" 
          type="text" 
          value="Новая таблица" 
          placeholder="Введите название таблицы" 
        />

        <div class="excel-header__button-group">
            <button class="excel-header__button-item">
                <span class="material-icons">delete</span>
            </button>

            <button class="excel-header__button-item">
                <span class="material-icons">exit_to_app</span>
            </button>
        </div>
    `;
  }
}
