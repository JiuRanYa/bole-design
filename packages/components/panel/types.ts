export type PanelData = {
  constraints: PanelConstraints
}
export type PanelConstraints = {
  defaultSizePercentage?: number | undefined
  maxSizePercentage: number | undefined
  minSizePercentage: number | undefined
  minGridCol: number | undefined
}
