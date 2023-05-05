export const warnWithPrefix = (name: string, info: string) => {
  console.warn(`[Bole Design] [${name.charAt(0).toLocaleUpperCase() + name.substring(1)}], ${info}`)
}

export const logger = {
  warnWithPrefix
}
