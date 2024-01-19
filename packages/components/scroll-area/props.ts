import { booleanProps, buildProps } from '@panda-ui/common'

export const scrollAreaProps = buildProps({
  tag: String,
  height: String,
  watchResize: booleanProps,
  viewClass: Array,
  wrapperClass: Array,
  maxHeight: String
})

export type ScrollAreaInstance = {
  scrollTo: (option: ScrollToOptions) => void
}
