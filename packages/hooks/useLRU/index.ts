export function useLRU(capacity: number) {
  const cache = new Map()

  useLRU.prototype.get = (key: string) => {
    if (cache.has(key)) {
      // 存在即更新
      const temp = cache.get(key)
      cache.delete(key)
      cache.set(key, temp)

      return temp
    }
    return -1
  }

  useLRU.prototype.put = (key: string, value: any) => {
    if (cache.has(key)) {
      // 存在即更新（删除后加入）
      cache.delete(key)
    }
    else if (cache.size >= capacity) {
      // 不存在即加入
      // 缓存超过最大值，则移除最近没有使用的
      cache.delete(cache.keys().next().value)
    }
    cache.set(key, value)
  }
}
/*
 * @desc: LRU 算法,使用map, O(1)复杂度
 * @params: capacity LRU容量,需要维护的map数量
 * @params: localStorageName 如果设置了第二个参数，将自动保存cache到localStorage中, 适用于需要记录user perference场景
 * */
// class LRUCache {
//   cache: any
//   capacity: number
//   localStorageName: string | undefined
//
//   constructor(capacity: number, localStorageName?: string) {
//     this.cache = new Map()
//     this.capacity = capacity
//     this.localStorageName = localStorageName
//
//     if (localStorageName) {
//       const cacheRef = useLocalStorage(localStorageName, '')
//
//       if (cacheRef.value) {
//         this.cache = new Map(JSON.parse(cacheRef.value as string))
//       }
//     }
//   }
//
//   updateLocalStorage() {
//     const mapString = JSON.stringify(Array.from(this.cache))
//     setMapToLocalStorage(mapString, this.localStorageName)
//   }
//
//   get(key: string) {
//     if (this.cache.has(key)) {
//       // 存在即更新
//       let temp = this.cache.get(key)
//       this.cache.delete(key)
//       this.cache.set(key, temp)
//       this.updateLocalStorage()
//
//       return temp
//     }
//     return -1
//   }
//
//   put(key: string, value: any) {
//     if (this.cache.has(key)) {
//       // 存在即更新（删除后加入）
//       this.cache.delete(key)
//     } else if (this.cache.size >= this.capacity) {
//       // 不存在即加入
//       // 缓存超过最大值，则移除最近没有使用的
//       this.cache.delete(this.cache.keys().next().value)
//     }
//     this.cache.set(key, value)
//     this.updateLocalStorage()
//   }
// }
