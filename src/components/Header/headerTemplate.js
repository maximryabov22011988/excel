export const createHeader = (tableName) => {
  return `
    <input 
      class="excel-header__input" 
      type="text" 
      value="${tableName}" 
      placeholder="Введите название таблицы" 
    />

    <div class="excel-header__button-group">
      <button class="excel-header__button-item" data-button="remove">
        <span class="material-icons" data-button="remove">delete</span>
      </button>

      <button class="excel-header__button-item" data-button="exit">
        <span class="material-icons" data-button="exit">exit_to_app</span>
      </button>
    </div>
  `
}

