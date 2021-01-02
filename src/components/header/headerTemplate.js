export const createHeader = (tableName) => {
  return `
    <input 
      class="excel-header__input" 
      type="text" 
      value="${tableName}" 
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
  `
}

