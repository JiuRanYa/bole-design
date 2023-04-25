import { ref, computed, type Ref } from 'vue'

/**
 * @param key: localStorage key
 * @param initialValue: localStorage initialValue
 * @param raw: if set to true, hook will not attempt to JSON serialize stored values.
 * @returns
 */
export function useLocalStorage<T>(
  key: string,
  initialValue?: T,
  raw: boolean = false
): [Ref<T>, (value: T) => void, () => void] {
  const state = ref()
  const serializer = raw ? String : JSON.stringify
  const deserializer = raw ? String : JSON.parse
  const localStorageValue = localStorage.getItem(key)

  const initializer = computed(() => {
    try {
      if (localStorageValue !== null) {
        initialValue && localStorage.setItem(key, serializer(initialValue))

        return initialValue ? initialValue : deserializer(localStorageValue)
      } else {
        initialValue && localStorage.setItem(key, serializer(initialValue))
        return initialValue
      }
    } catch {
      // if storage is string, return initialValue or storage value
      return initialValue ? initialValue : localStorageValue
    }
  })

  const setState = (value: string | T | undefined) => {
    localStorage.setItem(key, serializer(value))
    state.value = value
  }

  const remove = () => {
    try {
      localStorage.removeItem(key)
      setState(undefined)
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw. Also JSON.stringify can throw.
    }
  }

  try {
    const serializedState = serializer(state.value)

    state.value = initializer.value
    initialValue && localStorage.setItem(key, serializedState)
  } catch {
    // If user is in private mode or has storage restriction
    // localStorage can throw. Also JSON.stringify can throw.
  }

  return [state, setState, remove]
}

export default useLocalStorage
