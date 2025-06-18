/**
 * 带缓存方法包装器
 *
 * 仅支持每次调用返回值必然一样的方法
 *
 * @param func
 */
export function withCache<T extends (...args: any[]) => Promise<any>>(func: T): T {
  let cache: ReturnType<T> | undefined
  let promise: Promise<ReturnType<T>> | undefined

  const wrapped = function (...args: Parameters<T>) {
    if (cache) {
      return cache
    }
    if (promise) {
      return promise
    }
    promise = func(...args)
    promise.then((res) => {
      cache = res
    }).finally(() => {
      promise = undefined
    })
    return promise
  }
  return wrapped as unknown as T
}
