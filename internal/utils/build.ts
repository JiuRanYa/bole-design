import { blPackage } from '../path'

export function getPackageManifest(pkgPath: string) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(pkgPath)
}
export function getPackageDependencies(pkgPath: string): Record<'dependencies' | 'peerDependencies', string[]> {
  const manifest = getPackageManifest(pkgPath)
  const { dependencies = {}, peerDependencies = {} } = manifest

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  }
}

export async function generateExternal(options: { full: boolean }) {
  const { dependencies, peerDependencies } = getPackageDependencies(blPackage)

  return (id: string) => {
    const packages: string[] = peerDependencies
    if (!options.full)
      packages.push('@vue', ...dependencies)

    return [...new Set(packages)].some(pkg => id === pkg || id.startsWith(`${pkg}/`))
  }
}
