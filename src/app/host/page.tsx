import Image from 'next/image'
import Nav from '@/components/navbar'
import Banner from '@/components/banner'
import About from '@/components/about'
import Divisor from '@/components/divisor'
import OurWork from '@/components/our-work'
import Mission from '@/components/mission'

export default function Host() {
  return (
    <main className="overflow-hidden">
      <Nav/>
      <Banner/>
      <About/>
      <Divisor/>
      <OurWork/>
      <Divisor/>
      <Mission/>
    </main>
  )
}
