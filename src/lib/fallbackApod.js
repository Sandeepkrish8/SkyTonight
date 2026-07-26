import JupiterImage from '../assets/jupiter.jpg';
import SaturnImage from '../assets/saturn.jpg';
import MarsImage from '../assets/mars.jpg';
import VenusImage from '../assets/Venus.jpg';
import MercuryImage from '../assets/mercury.jpg';
import UranusImage from '../assets/uranus.jpg';

export const fallbackApod = [
  {
    date: '2024-04-08',
    explanation: 'Jupiter is the largest planet in our solar system. This breathtaking capture showcases the swirling storms of its atmosphere and the iconic Great Red Spot, a massive storm that has been raging for hundreds of years.',
    hdurl: JupiterImage,
    media_type: 'image',
    title: 'The Great Gas Giant: Jupiter',
    url: JupiterImage
  },
  {
    date: '2023-10-14',
    explanation: 'Saturn, the jewel of our solar system, is adorned with thousands of beautiful ringlets. This image highlights the intricate details of the ring system and the planet\'s subtle atmospheric banding.',
    hdurl: SaturnImage,
    media_type: 'image',
    title: 'Rings of Saturn',
    url: SaturnImage
  },
  {
    date: '2023-07-12',
    explanation: 'Mars, the Red Planet, continues to captivate us. This high-resolution view reveals its rusty surface, ancient river valleys, and polar ice caps, telling a story of a world that once resembled our own.',
    hdurl: MarsImage,
    media_type: 'image',
    title: 'The Red Planet',
    url: MarsImage
  },
  {
    date: '2023-01-15',
    explanation: 'Venus is permanently shrouded in thick, toxic clouds of sulfuric acid. Despite its beautiful appearance, it is the hottest planet in our solar system with a surface temperature capable of melting lead.',
    hdurl: VenusImage,
    media_type: 'image',
    title: 'Venus: Earth\'s Evil Twin',
    url: VenusImage
  },
  {
    date: '2023-12-25',
    explanation: 'Mercury is the smallest and closest planet to the Sun. Its heavily cratered surface resembles our Moon, scarred by countless impacts over billions of years in the harsh environment of the inner solar system.',
    hdurl: MercuryImage,
    media_type: 'image',
    title: 'Cratered Mercury',
    url: MercuryImage
  },
  {
    date: '2024-02-14',
    explanation: 'Uranus, the seventh planet from the Sun, is an ice giant that rotates on its side. Its beautiful pale blue color comes from methane in its atmosphere absorbing red light.',
    hdurl: UranusImage,
    media_type: 'image',
    title: 'The Tilted Ice Giant',
    url: UranusImage
  }
];
