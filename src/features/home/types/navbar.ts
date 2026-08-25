export type NavbarVariant = 'public' | 'app'

export type NavbarProps = {
  availableCredits?: number
  totalCredits?: number
  userName?: string
  variant?: NavbarVariant
}
