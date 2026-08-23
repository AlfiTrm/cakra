import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'

export function HomePage() {
  return (
    <>
      <Navbar />
      <main className="app-container py-12">
        <h1 className="text-display-sm">Cakra</h1>
      </main>
      <Footer />
    </>
  )
}
