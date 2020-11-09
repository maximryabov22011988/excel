import { ExcelComponent } from '@core/ExcelComponent';

import { createTable } from '@/components/table/tableTemplate';
import { resizeHandler } from '@/components/table/tableResize';
import { shouldResize } from '@/components/table/utils';

export class Table extends ExcelComponent {
  static className = 'excel-table'

  constructor(componentContainerNode) {
    super(componentContainerNode, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(40)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.componentContainerNode)
    }
  }
}
