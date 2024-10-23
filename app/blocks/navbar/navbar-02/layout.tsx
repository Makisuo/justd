import { AppNavbar } from "../app-navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppNavbar intent="floating">{children}</AppNavbar>
}
