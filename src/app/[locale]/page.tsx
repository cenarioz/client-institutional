import Divisor from "@/components/atoms/Divisor";
import Nav from "@/components/molecules/Navbar";
import About from "@/components/organisms/About";
import Banner from "@/components/organisms/Banner";
import Mission from "@/components/organisms/Mission";
import OurWork from "@/components/organisms/OurWork";

export default function Root() {
  return (
    <main className="overflow-hidden">
      <Nav />
      <Banner />
      <About />
      <Divisor />
      <OurWork />
      <Divisor />
      <Mission />
    </main>
  );
}