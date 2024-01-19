import { ExtractPropTypes, Ref, reactive, ref, CSSProperties, watch } from 'vue'
import { PanelConstraints, PanelData } from '../panel/types'
import { panelGroupProps } from './props'
import { PanelGroupStates } from './panel-group-states'
import { DragStates, PanelDirection, ResizeEvent } from './types'

export function useSplit(props: ExtractPropTypes<typeof panelGroupProps>, groupId: string) {
  const gridCol = 12
  const paneCount = ref(0)
  const assignedSpans = ref(0)
  const container = ref<HTMLDivElement>()

  const states = reactive<PanelGroupStates>({
    layout: [],
    gridLayout: [],
    panelDataArray: [],
    gridColToFlexGrowMap: [],
    resizeHandleCount: 0,
    direction: props.direction as PanelDirection,
    showPreviewDots: false
  })
  const dragStates = ref<DragStates>({
    isDragging: false,
    dragHandleId: '',
    initialLayout: [],
    pivotIndice: []
  })

  function registerPanel(panelData: Ref<PanelData>) {
    states.panelDataArray.push(panelData)

    const unsafeLayout = caculateDefaultLayout()
    states.layout = unsafeLayout
  }

  /*
   * 算法：最小宽度 = ((总面板宽度 + resize宽度) / (栅格数 / 所占格) - 18) / (总面板宽度 - resize宽度 * resize数量)
   * 备注：此处的18为单个resizeHandle的左边距和中心到右边panel的距离总和，如果你需要自定义resizeHandle，需要重新计算该值
   * */
  function transferGridColToFlexGrow(col: number) {
    const totalWidth =
      (props.direction === 'horizontal'
        ? container.value?.clientWidth
        : container.value?.clientHeight) ?? 0
    const resizeHandleWidth = 18

    return (
      (((totalWidth + resizeHandleWidth) / (gridCol / col) - 18) /
        (totalWidth - resizeHandleWidth * states.resizeHandleCount)) *
      100
    )
  }

  function caculateDefaultLayout() {
    const panelLength = states.panelDataArray.length

    // 如果开启了grid布局，所有配置会失效
    if (props.grid) {
      states.panelDataArray.forEach(panel => {
        const eachPanelDefaultSize = 100 / panelLength
        const minGridCol = panel.value.constraints.minGridCol ?? 3

        panel.value.constraints.defaultSizePercentage = eachPanelDefaultSize
        panel.value.constraints.minSizePercentage = transferGridColToFlexGrow(minGridCol)
        panel.value.constraints.maxSizePercentage = transferGridColToFlexGrow(
          gridCol - states.panelDataArray.length
        )

        states.gridLayout =
          props.gridLayout ?? (Array(panelLength).fill(gridCol / panelLength) as number[])
      })

      for (let i = 0; i < gridCol; i++) {
        states.gridColToFlexGrowMap[i] = transferGridColToFlexGrow(i)
      }

      if (props.gridLayout) {
        return props.gridLayout.map(col => states.gridColToFlexGrowMap[col])
      }
      return Array<number>(panelLength).fill(100 / panelLength)
    }

    const layout = props.layout ?? Array<number>(states.panelDataArray.length).fill(0)
    const panelTempData = {
      count: 0,
      remainingSize: 100
    }

    // we should Distribute default sizes first, exculde defaultSizePercentage size
    for (let i = 0; i < states.panelDataArray.length; i++) {
      const panelData = states.panelDataArray[i]

      const { defaultSizePercentage } = panelData.value.constraints

      if (defaultSizePercentage) {
        layout[i] = defaultSizePercentage
        panelTempData.remainingSize -= defaultSizePercentage
        continue
      }
      panelTempData.count++
    }

    for (let i = 0; i < layout.length; i++) {
      const size = layout[i]

      if (size !== 0) continue

      layout[i] = panelTempData.remainingSize / panelTempData.count
    }

    return layout
  }

  function getPanelStyle(panelData: Ref<PanelData>) {
    const panelIndex = states.panelDataArray.indexOf(panelData)

    return computePanelFlexBoxStyle({
      layout: states.layout,
      panelDataArray: states.panelDataArray,
      panelIndex: panelIndex
    })
  }

  function computePanelFlexBoxStyle({
    layout,
    panelDataArray,
    panelIndex,
    precision = 12
  }: {
    layout: number[]
    panelDataArray: Ref<PanelData>[]
    panelIndex: number
    precision?: number
  }): CSSProperties {
    const size = layout[panelIndex]

    let flexGrow = size ? Number(size.toPrecision(precision)) : 0

    if (panelDataArray.length === 1) flexGrow = 100

    return {
      flexBasis: 0,
      flexGrow,
      flexShrink: 1,
      overflow: 'hidden'
    }
  }
  function setLayout(layout: number[]) {
    states.layout = layout
  }

  // panel-resize-handle
  function startDragging(event: ResizeEvent, resizeHandleId: string) {
    if (props.disabled) return

    const initialCursorPosition = getResizeEventCursorPosition(states.direction, event)

    states.showPreviewDots = true
    dragStates.value.isDragging = true
    dragStates.value.initialLayout = states.layout
    dragStates.value.initialCursorPosition = initialCursorPosition
    dragStates.value.dragHandleId = resizeHandleId
  }

  function stopDragging() {
    if (props.disabled) return

    states.showPreviewDots = false
    dragStates.value.isDragging = false
    dragStates.value.initialCursorPosition = 0
    dragStates.value.dragHandleId = ''

    if (props.grid) {
      adjustGridLayout(states.layout)
    }
  }

  function adjustGridLayout(layout: number[]) {
    if (!props.grid) return

    for (let i = 0; i < layout.length; i++) {
      let minDelta = 999
      let targetPivotIndice = -1
      let shouldPatch = true

      for (let j = 0; j < states.gridColToFlexGrowMap.length; j++) {
        const prevPanelSize = layout[i]
        const exceptedWidth = states.gridColToFlexGrowMap[j]

        // 精度内相等，直接跳过当次判断
        if (fuzzyCompareNumbers(prevPanelSize, exceptedWidth) === 0) {
          shouldPatch = false
          break
        }

        const delta = Math.abs(prevPanelSize - exceptedWidth)

        if (delta < minDelta) {
          minDelta = delta
          targetPivotIndice = j
        }
      }

      if (shouldPatch) {
        layout[i] = states.gridColToFlexGrowMap[targetPivotIndice]
      }
    }
  }

  function getResizeEventCursorPosition(direction: PanelDirection, event: ResizeEvent): number {
    const isHorizontal = direction === 'horizontal'

    if (isMouseEvent(event)) {
      return isHorizontal ? event.clientX : event.clientY
    } else {
      throw Error(`Unsupported event type "${event.type}"`)
    }
  }

  function registerResizeHandler(resizeHandleId: string) {
    states.resizeHandleCount++

    return function resizeHandler(event: MouseEvent) {
      event.preventDefault()

      if (dragStates.value.dragHandleId !== resizeHandleId || props.disabled) {
        return
      }

      const { initialLayout } = dragStates.value

      const initialCursorPosition = dragStates.value.initialCursorPosition ?? 0
      const movedCursorPosition = getResizeEventCursorPosition(states.direction, event)

      let delatPercentage = calculateDeltaPercentage(
        initialCursorPosition,
        movedCursorPosition,
        groupId
      )

      const panelsConstraints = states.panelDataArray.map(data => data.value.constraints)
      const pivotIndice = getPivotIndiceByResizeId(groupId, resizeHandleId)

      dragStates.value.pivotIndice = pivotIndice

      // delta为初始位置计算，调整layout也应该根据初始的layout计算
      const nextLayout = adjustLayoutByDelatPercentage(
        delatPercentage,
        initialLayout,
        panelsConstraints,
        pivotIndice
      )

      if (!compareLayouts(states.layout, nextLayout)) {
        states.layout = nextLayout
      }
    }
  }
  function getPivotIndiceByResizeId(groupId: string, resizeHandleId: string) {
    const index = findResizeHandleIndex(groupId, resizeHandleId)

    return index != null ? [index, index + 1] : [-1, -1]
  }

  function getResizeHandleElementsForGroup(groupId: string) {
    return Array.from(
      document.querySelectorAll(`[data-panel-resize-handle][data-panel-group-id="${groupId}"]`)
    )
  }

  function findResizeHandleIndex(groupId: string, resizeHandleId: string) {
    const handles = getResizeHandleElementsForGroup(groupId)
    const index = handles.findIndex(
      handle => handle.getAttribute('data-panel-resize-handle-id') === resizeHandleId
    )
    return index ?? null
  }

  // 计算panel的限制条件: 最大尺寸和最小尺寸
  function computePercentagePanelConstraints(
    panelIndex: number,
    panelsConstraints: PanelConstraints[]
  ) {
    let totalMinConstraints = 0
    let totalMaxConstraints = 0

    // All panel constraints, excluding the current one
    for (let i = 0; i < panelsConstraints.length; i++) {
      if (i !== panelIndex) {
        totalMaxConstraints += panelsConstraints[i].maxSizePercentage ?? 100
        totalMinConstraints += panelsConstraints[i].minSizePercentage ?? 0
      }
    }
    const { maxSizePercentage = 100, minSizePercentage = 0 } = panelsConstraints[panelIndex]

    // 极限法: 如果目标panel没有设置最大尺寸，那最大的限制条件为: 100 - 其余面板最小约束尺寸之和
    // Limit method: if target panel don't have maxSizePercentage, the maxSizePercentage is the 100 - totalMinConstraints
    return {
      maxSizePercentage:
        panelsConstraints.length > 1
          ? Math.min(maxSizePercentage, 100 - totalMinConstraints)
          : maxSizePercentage,
      minSizePercentage:
        panelsConstraints.length > 1
          ? Math.max(minSizePercentage, 100 - totalMaxConstraints)
          : minSizePercentage
    }
  }

  function adjustLayoutByDelatPercentage(
    delta: number,
    layout: number[],
    panelConstraints: PanelConstraints[],
    pivotIndices: number[]
  ) {
    const nextLayout = [...layout]

    const increment = delta < 0 ? 1 : -1
    let index = delta < 0 ? pivotIndices[1]! : pivotIndices[0]!

    // 预先计算枢轴相反方向最大可用增量: 取用户触发的delta和面板最大可用增量的最小值
    // Pre-calculate max available delta in the opposite direction of our pivot.
    {
      let maxAvailableDelta = 0

      while (true) {
        let presize = layout[index]
        let { maxSizePercentage } = computePercentagePanelConstraints(index, panelConstraints)

        const delta = maxSizePercentage - presize
        maxAvailableDelta += delta
        index += increment

        if (index < 0 || index >= panelConstraints.length) {
          break
        }
      }

      const minAbsDelta = Math.min(Math.abs(delta), Math.abs(maxAvailableDelta))
      delta = delta < 0 ? 0 - minAbsDelta : minAbsDelta
    }

    let deltaApplied = 0
    // 逐一把增量分配给枢轴相同方向的面板
    // The applied Delta needs to be subtracted from other panels
    {
      const pivotIndex = delta < 0 ? pivotIndices[0]! : pivotIndices[1]!
      let index = pivotIndex
      while (index >= 0 && index < panelConstraints.length) {
        const deltaRemaining = Math.abs(delta) - Math.abs(deltaApplied)
        const presize = layout[index]
        let { minSizePercentage } = computePercentagePanelConstraints(index, panelConstraints)

        const panelDeltaAvailable = presize - minSizePercentage

        if (panelDeltaAvailable >= deltaRemaining) {
          nextLayout[index] = presize - deltaRemaining
          deltaApplied += deltaRemaining
          break
        } else {
          nextLayout[index] = minSizePercentage
          deltaApplied += panelDeltaAvailable
        }

        delta < 0 ? index-- : index++
      }
    }
    // 把已分配增量从枢轴相反方向的面板中减去
    // Distribute the applied delta to the panels in the other direction
    {
      const pivotIndex = delta < 0 ? pivotIndices[1]! : pivotIndices[0]!
      let index = pivotIndex
      while (index >= 0 && index < panelConstraints.length) {
        const deltaRemaining = Math.abs(deltaApplied)
        const presize = layout[index]
        let { maxSizePercentage } = computePercentagePanelConstraints(index, panelConstraints)

        const panelDeltaAvailable = maxSizePercentage

        if (panelDeltaAvailable >= deltaRemaining) {
          nextLayout[index] = presize + deltaRemaining
          deltaApplied -= deltaRemaining
          break
        } else {
          nextLayout[index] = maxSizePercentage
          deltaApplied -= panelDeltaAvailable
        }

        delta < 0 ? index++ : index--
      }
    }

    const totalPanelSize = nextLayout.reduce((total, size) => size + total, 0)

    if (fuzzyCompareNumbers(totalPanelSize, 100) !== 0) {
      return layout
    }
    return nextLayout
  }

  function calculateDeltaPercentage(
    initialCursorPosition: number,
    movedCursorPosition: number,
    groupId: string,
    precision = 12
  ) {
    const delatPixel = calculateDeltaPixel(initialCursorPosition, movedCursorPosition)
    const panelGroupInPixel = getPanelGroupMainAxiosPixel(groupId) ?? 1
    const deltaPercentage = (delatPixel / panelGroupInPixel) * 100

    return Number(deltaPercentage.toFixed(precision))
  }

  function calculateDeltaPixel(initialCursorPosition: number, movedCursorPosition: number) {
    return movedCursorPosition - initialCursorPosition
  }

  function getGroupElement(groupId: string) {
    return document.querySelector(`[data-panel-group][data-panel-group-id="${groupId}"]`)
  }

  function getPanelGroupMainAxiosPixel(groupId: string) {
    const isHorizontal = states.direction === 'horizontal'
    const groupElement = getGroupElement(groupId)
    const groupRect = groupElement?.getBoundingClientRect()
    const mainAxiosPixel = isHorizontal ? groupRect?.width : groupRect?.height

    return mainAxiosPixel
  }

  watch(
    () => props.layout,
    () => {
      if (props.layout?.length) {
        states.layout = props.layout
      } else {
        states.layout = caculateDefaultLayout()
      }
    }
  )

  return {
    states,
    container,
    paneCount,
    assignedSpans,
    dragStates,

    setLayout,
    registerPanel,
    getPanelStyle,
    stopDragging,
    startDragging,
    registerResizeHandler,
    computePanelFlexBoxStyle
  }
}

function isMouseEvent(event: MouseEvent) {
  return event.type.startsWith('mouse')
}
function fuzzyCompareNumbers(actual: number, expected: number, fractionDigits: number = 6): number {
  actual = parseFloat(actual.toFixed(fractionDigits))
  expected = parseFloat(expected.toFixed(fractionDigits))

  const delta = actual - expected
  if (delta === 0) {
    return 0
  } else {
    return delta > 0 ? 1 : -1
  }
}
function compareLayouts(a: number[], b: number[]) {
  if (a.length !== b.length) {
    return false
  } else {
    for (let index = 0; index < a.length; index++) {
      if (a[index] != b[index]) {
        return false
      }
    }
  }
  return true
}
