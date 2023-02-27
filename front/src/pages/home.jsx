import '../utils/styles/home.scss'

import image1 from '../utils/images/main-1.jpg'
import image2 from '../utils/images/main-2.jpg'
import image3 from '../utils/images/main-3.jpg'

import { Carousel } from '../components/atoms/carousel'

const slides = [
  {
    image: image1,
    text: 'Profitez du plus beau spectacle chaque soir !',
    alt: 'Slide 1',
  },
  {
    image: image2,
    text: "Vivez une expérience inoubliable au cœur de la nature - le milieu de nulle part n'a jamais été aussi accueillant !",
    alt: 'Slide 2',
  },
  {
    image: image3,
    text: "Atteignez le sommet du confort avec notre tente de toit - l'expérience de camping ultime en pleine nature !",
    alt: 'Slide 3',
  },
]

export default function Home() {
  return (
    <div className="home">
      <section className="home__section">
        <Carousel className="home__section" slides={slides} />
      </section>
    </div>
  )
}
