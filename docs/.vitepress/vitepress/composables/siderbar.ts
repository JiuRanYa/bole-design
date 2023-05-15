import { useData } from "vitepress";

export function useSiderbar() {
  const {site, page} = useData()

  console.log(site, page)
}
