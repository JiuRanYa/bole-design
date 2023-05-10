import { isNumber, getBase64BySrc, isFunction, toCapitalCase } from '@bole-design/common'

interface StopConfig {
  fin?: boolean
  callback?: AFunction
}

interface ILoadImageSeqConfig {
  el: string
  imgSeq: string[]
  customClass?: string[]
}

type AFunction = (...args: any) => any

/* Desc:
 * 支持链式调用的序列帧处理工具
 *
 * 初始化:
 *    let frames: InstanceType<typeof LoadImageFrames>
 *
 *    frames = new LoadImageFrames({
 *      el: '.box-imgs-seq',
 *      imgSeq: [图片序列帧地址],
 *      customClass: ['kol-img-box']
 *    })
 *
 * 链式调用:
 *  以下代码表示：循环前19帧，用户点击之后添加19-38帧并且将速度设置为0.5倍，然后播放结束后停止
 *    frames.loop(0,19).click().addFrames(19, 38).setSpeed(0.5).stopAnimation().toggle()
 *
 * 注意:
 *   1. 所有链式调用必须以toggle()结尾
 *   2. 所有帧序列传入后，必须调用loop方法，工具会自动首先加载loop区间内的帧,结束后播放序列帧动画,再懒加载剩余帧数
 * */
export default class LoadImageFrames {
  private imgSeq: string[]
  private container: HTMLElement | null
  private config: any
  private currentFrame: any
  private activeFrames: any
  private imgTags: HTMLImageElement[]
  private interval: any
  private queue: any
  private eventTasks: any
  private taskIdx: number
  private startFrame: number
  private endFrame: number
  private shouldStop: boolean
  private stopConfig: StopConfig = {}
  private speed: number = 1
  // 序列加载状态
  private loadState: (0 | 1)[]
  private callbacks: Record<string, AFunction[]> = {}
  // 序列是否加载完成
  state: {
    loaded?: boolean
  } = {}

  constructor(config: ILoadImageSeqConfig) {
    this.imgSeq = config.imgSeq
    this.config = config
    this.currentFrame = 0
    this.activeFrames = []
    this.imgTags = []
    this.interval = null
    this.queue = []
    this.taskIdx = 0
    this.startFrame = 0
    this.endFrame = 0
    this.shouldStop = false
    this.speed = 1
    this.container = document.querySelector(config.el)
    this.loadState = []
    this.eventTasks = ['click']

    this.callbacks = {}

    this.checkContainer()

    this.initImgSeqState()

    this.container && this.initNodes()
  }

  private initImgSeqState() {
    const stat = new Proxy(
      {
        loaded: false
      },
      {
        set: (target, p, newValue) => {
          const k = p as keyof typeof target
          if (p === 'loaded') {
            this.execAllCbs('loaded')
          }
          target[k] = newValue
          return true
        },
        get(target, key) {
          const k = key as keyof typeof target
          if (Object.keys(target).includes(k)) {
            return target[k]
          }
        }
      }
    )
    this.state = stat
  }

  private execAllCbs(name: string) {
    const funcs = this.callbacks[name]

    if (funcs?.length) {
      funcs.forEach(func => func())
    }
  }

  private checkContainer() {
    if (!this.container) {
      console.warn('Please ensure that the el DOM node exists.')
    }
  }

  private async loadImgBase64(path: string[]) {
    const imgs = await Promise.all(path.map(imgPath => getBase64BySrc(imgPath)))

    return imgs
  }

  private async patchSrcToNodes(start: number, end: number) {
    if (start === end) return

    const waitForLoadImgPath = []

    for (let i = start; i <= end; i++) {
      // img not loaded
      if (this.loadState[i] === 0) {
        waitForLoadImgPath.push(this.imgSeq[i])
      }
    }

    const loadedImgs = await this.loadImgBase64(waitForLoadImgPath)

    for (let i = start; i < end + 1; i++) {
      if (this.imgTags[i].src !== loadedImgs[i]) {
        this.imgTags[i].src = loadedImgs[i - start]
      }
    }
  }

  private async initNodes() {
    this.loadState = new Array(this.imgSeq.length).fill(0)

    this.imgSeq.forEach((path, idx) => {
      const img = document.createElement('img')

      img.style.display = 'none'

      this.config?.customClass?.length && img.classList.add(...this.config.customClass)
      this.container?.appendChild(img)
      this.imgTags.push(img)
    })

    this.loadFirstSeq()
  }

  private async loadFirstSeq() {
    const firFrame = await this.loadImgBase64([this.imgSeq[0]])

    this.loadState[0] = 1
    this.imgTags[0].src = firFrame[0]
    this.imgTags[0].style.display = 'block'
  }

  loop(startFrame: number, endFrame: number) {
    this.startFrame = startFrame
    this.endFrame = endFrame

    this.queue.push({
      funcName: 'loop',
      params: [startFrame, endFrame]
    })
    return this
  }

  private async realLoop(startFrame: number, endFrame: number) {
    this.activeFrames = this.imgSeq.slice(startFrame, endFrame)

    await this.patchSrcToNodes(startFrame, endFrame)
    await this.initAnimation()

    this.loadOtherSeq()
  }

  onLoaded(callback: AFunction) {
    if (this.callbacks['loaded']) {
      this.callbacks['loaded'].push(callback)
    } else {
      this.callbacks['loaded'] = [callback]
    }

    return this
  }

  private async loadOtherSeq() {
    const start = this.startFrame
    const end = this.endFrame

    await this.patchSrcToNodes(0, start)
    await this.patchSrcToNodes(end + 1, this.imgSeq.length - 1)

    this.state.loaded = true
  }

  async initAnimation() {
    clearInterval(this.interval)

    this.interval = setInterval(() => {
      const shouldStop = this.shouldStop && this.currentFrame === this.activeFrames.length - 1

      if (shouldStop) {
        clearInterval(this.interval)

        if (this.stopConfig.callback) {
          this.stopConfig.callback()
        }
        return
      }

      for (let i = 0; i < this.imgTags.length; i++) {
        this.imgTags[i].style.display = 'none'
      }

      this.imgTags[this.currentFrame].style.display = 'block'

      if (this.currentFrame === this.activeFrames?.length) {
        this.currentFrame = 0
      } else {
        this.currentFrame++
      }
    }, (1000 * this.speed) / this.activeFrames.length)
  }

  setSpeed(speed: number) {
    this.queue.push({
      funcName: 'setSpeed',
      params: [speed]
    })
    return this
  }

  private async realSetSpeed(speed: number) {
    if (!isNumber(speed)) {
      console.warn('Please ensure speed is number type')
      return
    }
    this.speed = speed
    this.initAnimation()
  }

  stopAnimation(config: StopConfig) {
    this.queue.push({
      funcName: 'stopAnimation',
      params: [config]
    })
    return this
  }

  private async realStopAnimation(config: StopConfig) {
    this.shouldStop = true
    this.stopConfig = config
  }

  click(callback?: AFunction) {
    const params = callback ? [callback] : []
    this.queue.push({
      funcName: 'click',
      params
    })

    return this
  }
  private async realClick(callback?: AFunction) {
    this.container?.addEventListener('click', () => {
      if (callback && isFunction(callback)) {
        callback()
      }
      this.toggle()
    })
  }

  addFrames(s: number, e: number) {
    this.queue.push({
      funcName: 'addFrames',
      params: [s, e]
    })

    return this
  }
  private async realAddFrames(s: number, e: number) {
    this.activeFrames = [...this.activeFrames, ...this.imgSeq.slice(s, e)]

    await this.initAnimation()
  }

  private getRealFuncName(funcName: string) {
    return `real${toCapitalCase(funcName)}`
  }
  private isEventTask(target: any) {
    return this.eventTasks.includes(target.funcName)
  }

  async toggle() {
    const task = this.queue[this.taskIdx]

    if (!task) {
      return
    }

    if (task && !this.isEventTask(task)) {
      const funcName = this.getRealFuncName(task.funcName)
      const iFunction: Function = (this as any)[funcName]
      await iFunction.call(this, ...task.params)

      this.taskIdx++
      this.toggle()
    }

    if (this.isEventTask(task)) {
      this.container?.addEventListener(task.funcName, () => {
        this.taskIdx++
        this.toggle()
      })
    }
  }
}
