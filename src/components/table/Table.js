import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/tableTemplate';

export class Table extends ExcelComponent {
  static className = 'excel-table'

  constructor(componentContainerNode) {
    super(componentContainerNode, {
      name: 'Table',
    });
  }

  toHTML() {
    return createTable(40)
  }
}
