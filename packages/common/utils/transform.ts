import { isDefined, isFunction } from '..'
import { toTrue } from './common'

export function ensureArray<T>(value: T | T[]) {
  return Array.isArray(value) ? value : [value]
}

export interface TreeOptions<T = string> {
  keyField?: T
  childField?: T
  parentField?: T
  rootId?: T
  callback?: (a: any) => any
}

/**
 * 将一个展平的列表转换为树
 *
 * @param list 要转换的列表
 * @param options 转换的配置项
 *
 * @returns 转换后的树
 */
export function transformTree<T = any>(
  list: T[],
  options: TreeOptions<keyof T> = { callback: () => {} },
) {
  const {
    keyField = 'id' as keyof T,
    childField = 'children' as keyof T,
    parentField = 'parent' as keyof T,
    rootId = null,
    callback,
  } = options

  const hasRootId = isDefined(rootId) && rootId !== ''
  const tree: T[] = []
  const record = new Map<T[keyof T], T[]>()

  for (let i = 0, len = list.length; i < len; ++i) {
    const item = list[i]
    const id = item[keyField]

    isFunction(callback) && callback(item)

    if (hasRootId ? id === rootId : !isDefined(id))
      continue

    if (record.has(id)) {
      ;(item as any)[childField] = record.get(id)!
    }
    else {
      ;(item as any)[childField] = []
      record.set(id, (item as any)[childField])
    }

    if (item[parentField] && (!hasRootId || item[parentField] !== rootId)) {
      const parentId = item[parentField]

      if (!record.has(parentId))
        record.set(parentId, [])

      record.get(parentId)!.push(item)
    }
    else {
      tree.push(item)
    }
  }

  return tree
}

export function flatTree<T = any>(
  tree: T[],
  options: TreeOptions<keyof T> & {
    /** 是否为深度优先遍历 */
    depthFirst?: boolean
    /**
     * 是否为无 ID 的节点插入 ID 值
     */
    injectId?: boolean
    /** 构建节点的 ID 的方法 */
    buildId?: (index: number) => any
    /** 过滤节点的方法 */
    filter?: (item: T) => boolean
    /** 是否强制为节点插入 ID 值 */
    forceInject?: boolean
    /** 过滤的结果是否会影响其子级 */
    cascaded?: boolean
  } = {},
) {
  const {
    keyField = 'id' as keyof T,
    childField = 'children' as keyof T,
    parentField = 'parent' as keyof T,
    depthFirst = false,
    injectId = true,
    buildId = i => i,
    filter = toTrue,
    cascaded = false,
    forceInject = false,
  } = options

  let idCount = 1
  const list: T[] = []
  const loop = [...tree]

  while (loop.length) {
    const item = loop.shift()!
    const childrenValue = item[childField]
    const children: T[] = Array.isArray(childrenValue) && childrenValue.length ? childrenValue : []

    if (injectId && (forceInject || !item[keyField]))
      item[keyField] = buildId(idCount++)

    const id = item[keyField]

    const filterResult = filter(item)

    if (filterResult)
      list.push(item)

    if (filterResult || !cascaded) {
      for (let i = 0, len = children.length; i < len; ++i) {
        const child = children[i]

        if (injectId && parentField)
          child[parentField] = id

        !depthFirst && loop.push(child)
      }

      if (depthFirst)
        loop.unshift(...children)
    }
  }

  return list
}
