export interface PanelData {
  constraints: PanelConstraints
}
export interface PanelConstraints {
  defaultSizePercentage?: number | undefined
  maxSizePercentage: number | undefined
  minSizePercentage: number | undefined
  minGridCol: number | undefined
}
