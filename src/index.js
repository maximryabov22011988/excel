import { Router } from '@core/routes/Router'

import { ExcelPage } from '@/pages/ExcelPage'
import { DashboardPage } from '@/pages/DashboardPage/DashboardPage'

import './styles/index.scss'

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
})
