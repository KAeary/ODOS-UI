/* eslint-disable */

/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import type { App } from 'vue'
import type { Plugin } from 'vue'
import { AudioPlugin } from './Audio'
import { ButtonPlugin } from './Button'
import { CheckBoxPlugin } from './CheckBox'
import { CalendarPlugin } from './Calendar'
import { DatePickerPlugin } from './DatePicker'
import { EmptyPlugin } from './Empty'
import { IconPlugin } from './Icon'
import { InputPlugin } from './Input'
import { InputNumberPlugin } from './InputNumber'
import { LoadingPlugin } from './Loading'
import { ModalPlugin } from './Modal'
import { PaginationPlugin } from './Pagination'
import { PopoverPlugin } from './Popover'
import { PopconfirmPlugin } from './Popconfirm'
import { RadioPlugin } from './Radio'
import { SelectPlugin } from './Select'
import { TablePlugin } from './Table'
import { TabsPlugin } from './Tabs'
import { TagPlugin } from './Tag'
import { TextareaPlugin } from './Textarea'
import { TextDisplayPlugin } from './TextDisplay'
import { ToothSelectPlugin } from './ToothSelect'
import { ToothChartPlugin } from './ToothChart'
import { TooltipPlugin } from './Tooltip'
import { DrawerPlugin } from './Drawer'
import { ImageUploadPlugin } from './ImageUpload'
import { ImageClassifyViewerPlugin } from './ImageClassifyViewer'
import { SmartSelectPlugin } from './SmartSelect'
import { MedicalRecordTermsPlugin } from './MedicalRecordTerms'
import { DropdownPanelPlugin } from './DropdownPanel'

const Packages: Plugin[] = [
  DropdownPanelPlugin,
  MedicalRecordTermsPlugin,
  SmartSelectPlugin,
  ImageClassifyViewerPlugin,
  AudioPlugin,
  ButtonPlugin,
  CheckBoxPlugin,
  CalendarPlugin,
  DatePickerPlugin,
  EmptyPlugin,
  IconPlugin,
  InputPlugin,
  InputNumberPlugin,
  LoadingPlugin,
  ModalPlugin,
  PaginationPlugin,
  PopoverPlugin,
  PopconfirmPlugin,
  RadioPlugin,
  SelectPlugin,
  TablePlugin,
  TabsPlugin,
  TagPlugin,
  TextareaPlugin,
  TextDisplayPlugin,
  ToothSelectPlugin,
  ToothChartPlugin,
  TooltipPlugin,
  DrawerPlugin,
  ImageUploadPlugin
]

const OdosPlugin: Plugin = {
  install(app: App) {
    Packages.forEach((item) => {
      item.install?.(app)
    })
  }
}

export default OdosPlugin

// 统一导出
export * from './Audio'
export * from './Button'
export * from './CheckBox'
export * from './Calendar'
export * from './DatePicker'
export * from './ToothSelect'
export * from './ToothChart'
export * from './Empty'
export * from './Icon'
export * from './Input'
export * from './InputNumber'
export * from './Loading'
export * from './Message'
export * from './Modal'
export * from './Pagination'
export * from './Popover'
export * from './Popconfirm'
export * from './Radio'
export * from './Select'
export * from './Table'
export * from './Tabs'
export * from './Tag'
export * from './Textarea'
export * from './TextDisplay'
export * from './Tooltip'
export * from './Drawer'
export * from './ImageUpload'
export * from './ImageClassifyViewer'
export * from './SmartSelect'
export * from './MedicalRecordTerms'
export * from './DropdownPanel'
