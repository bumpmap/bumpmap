let id = 0

import { words } from 'lodash'
import { find, propEq, pluck } from 'rambda'

const colors = [
  { color: 'white', name: 'marker-white' },
  { color: 'red', name: 'marker-red' },
  { color: 'green', name: 'marker-green' },
  { color: 'yellow', name: 'marker-yellow' },
  { color: 'sky', name: 'marker-sky' },
  { color: 'blue', name: 'marker-blue' },
  { color: 'orange', name: 'marker-orange' },
]

const images = [
  { index: 1, name: 'London', url: '/img/dummy/01.gif' },
  { index: 2, name: 'Berlin', url: '/img/dummy/02.jpg' },
  { index: 3, name: 'Tokyo', url: '/img/dummy/03.jpg' },
  { index: 4, name: 'New York', url: '/img/dummy/04.jpg' },
  { index: 5, name: 'Manila', url: '/img/dummy/05.jpg' },
  { index: 6, name: 'Mumbai', url: '/img/dummy/06.png' },
  { index: 7, name: 'Moscow', url: '/img/dummy/07.png' },
  { index: 8, name: 'Rome', url: '/img/dummy/08.jpg' },
  { index: 9, name: 'Rio de Janeiro', url: '/img/dummy/09.png' },
  { index: 10, name: 'Los Angeles', url: '/img/dummy/10.png' },
  { index: 11, name: 'Stockholm', url: '/img/dummy/11.jpg' },
  { index: 12, name: 'Copenhagen', url: '/img/dummy/12.jpg' },
  { index: 13, name: 'Lagos', url: '/img/dummy/13.jpg' },
  { index: 14, name: 'Uganda', url: '/img/dummy/14.jpg' },
  { index: 15, name: 'Sydney', url: '/img/dummy/15.jpg' },
  { index: 16, name: 'Adelaide', url: '/img/dummy/16.jpg' },
  { index: 17, name: 'Wellington', url: '/img/dummy/17.jpg' },
  { index: 18, name: 'Mexico', url: '/img/dummy/18.jpg' },
  { index: 19, name: 'Hong Kong', url: '/img/dummy/19.jpg' },
  { index: 20, name: 'Shanghai', url: '/img/dummy/20.webp' },
  { index: 21, name: 'Kerala', url: '/img/dummy/21.webp' },
  { index: 22, name: 'Seoul', url: '/img/dummy/22.webp' },
  { index: 23, name: 'Pyongyang', url: '/img/dummy/23.webp' },
  { index: 24, name: 'Montaperto', url: '/img/dummy/24.webp' },
  { index: 25, name: 'Vienna', url: '/img/dummy/25.webp' },
  { index: 26, name: 'Paris', url: '/img/dummy/26.webp' },
  { index: 27, name: 'Brussels', url: '/img/dummy/27.webp' },
  { index: 28, name: 'Amsterdam', url: '/img/dummy/28.webp' },
  { index: 29, name: 'New Orleans', url: '/img/dummy/29.webp' },
  { index: 30, name: 'Toronto', url: '/img/dummy/30.webp' },
  { index: 31, name: 'Miami', url: '/img/dummy/31.jpg' },
  { index: 32, name: 'Flint', url: '/img/dummy/32.webp' },
  { index: 33, name: 'Edinburgh', url: '/img/dummy/33.webp' },
  { index: 34, name: 'Watford', url: '/img/dummy/34.webp' },
  { index: 35, name: 'Barnet', url: '/img/dummy/35.gif' },
  { index: 36, name: 'Edgware', url: '/img/dummy/36.gif' },
  { index: 37, name: 'Mill Hill', url: '/img/dummy/37.gif' },
  { index: 38, name: 'Croydon', url: '/img/dummy/38.gif' },
  { index: 39, name: 'Brick Lane', url: '/img/dummy/39.gif' },
  { index: 40, name: 'Westminster', url: '/img/dummy/40.gif' },
  { index: 41, name: 'Shoreditch', url: '/img/dummy/41.gif' },
  { index: 42, name: 'Camden Town', url: '/img/dummy/42.gif' },
  { index: 43, name: 'Kentish Town', url: '/img/dummy/43.gif' },
  { index: 44, name: 'Brixton', url: '/img/dummy/44.gif' },
  { index: 45, name: 'Cambridge', url: '/img/dummy/45.gif' },
  { index: 46, name: 'Oxford', url: '/img/dummy/46.gif' },
  { index: 47, name: 'Bristol', url: '/img/dummy/47.gif' },
  { index: 48, name: 'Kyoto', url: '/img/dummy/48.gif' },
  { index: 49, name: 'Canary Wharf', url: '/img/dummy/49.gif' },
  { index: 50, name: 'Cape Town', url: '/img/dummy/50.gif' },
  { index: 51, name: 'Johannesburg', url: '/img/dummy/51.gif' },
  { index: 52, name: 'Baghdad', url: '/img/dummy/52.gif' },
  { index: 53, name: 'Dubai', url: '/img/dummy/53.gif' },
  { index: 54, name: 'Athens', url: '/img/dummy/54.gif' },
  { index: 55, name: 'St. Albans', url: '/img/dummy/55.gif' },
  { index: 56, name: 'Lyon', url: '/img/dummy/56.gif' },
  { index: 57, name: 'Munich', url: '/img/dummy/57.gif' },
  { index: 58, name: 'Bern', url: '/img/dummy/58.gif' },
  { index: 59, name: 'Milan', url: '/img/dummy/59.gif' },
]

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)
  console.log()
  return colors[index]
}

const cities = [
  {
    name: 'London',
    coordinates: [-0.08651733398437499, 51.50532341149335],
  },
  {
    name: 'Berlin',
    coordinates: [13.388214111328125, 52.507027222951635],
  },
  {
    name: 'Tokyo',
    coordinates: [139.7076416015625, 35.706377408871774],
  },
  {
    name: 'New York',
    coordinates: [-73.99223327636719, 40.72696606629052],
  },
  {
    name: 'Manila',
    coordinates: [121.04667663574219, 14.647036218727651],
  },
  {
    name: 'Mumbai',
    coordinates: [72.83025741577148, 18.93113188261391],
  },
  {
    name: 'Moscow',
    coordinates: [37.59246826171875, 55.731749899652065],
  },
  {
    name: 'Rome',
    coordinates: [12.4749755859375, 41.887965758804484],
  },
  {
    name: 'Rio de Janeiro',
    coordinates: [-43.251800537109375, -22.92045268936839],
  },
  {
    name: 'Los Angeles',
    coordinates: [-118.2568359375, 34.04469442222683],
  },
  {
    name: 'Stockholm',
    coordinates: [18.067703247070312, 59.32233087376979],
  },
  {
    name: 'Copenhagen',
    coordinates: [12.571105957031248, 55.68532693508523],
  },
  {
    name: 'Lagos',
    coordinates: [3.39202880859375, 6.442223907855765],
  },
  {
    name: 'Uganda',
    coordinates: [32.332763671875, 1.197422590365017],
  },
  {
    name: 'Sydney',
    coordinates: [151.171875, -33.87953701355922],
  },
  {
    name: 'Adelaide',
    coordinates: [139.74609375, -34.88593094075315],
  },
  {
    name: 'Wellington',
    coordinates: [172.6171875, -43.83452678223682],
  },
  {
    name: 'Mexico',
    coordinates: [-103.18359375, 22.268764039073968],
  },
  {
    name: 'Hong Kong',
    coordinates: [114.7412109375, 22.350075806124867],
  },
  {
    name: 'Shanghai',
    coordinates: [121.47033691406249, 31.203404950917395],
  },
  {
    name: 'Kerala',
    coordinates: [76.5582275390625, 10.158153268244805],
  },
  {
    name: 'Seoul',
    coordinates: [126.97036743164062, 37.56199695314352],
  },
  {
    name: 'Pyongyang',
    coordinates: [125.73028564453124, 39.02131757437681],
  },
  {
    name: 'Montaperto',
    coordinates: [13.5736083984375, 37.31119861382921],
  },
  {
    name: 'Vienna',
    coordinates: [16.37237548828125, 48.21735290928554],
  },
  {
    name: 'Paris',
    coordinates: [2.346954345703125, 48.850258199721495],
  },
  {
    name: 'Brussels',
    coordinates: [4.340972900390625, 50.84280379061008],
  },
  {
    name: 'Amsterdam',
    coordinates: [4.890289306640625, 52.370568669179654],
  },
  {
    name: 'New Orleans',
    coordinates: [-90.1043701171875, 29.920423069383865],
  },
  {
    name: 'Toronto',
    coordinates: [-79.38446044921875, 43.643032068770395],
  },
  {
    name: 'Miami',
    coordinates: [-80.22491455078125, 25.77021384896025],
  },
  {
    name: 'Flint',
    coordinates: [-83.72611999511719, 43.01368503236689],
  },
  {
    name: 'Edinburgh',
    coordinates: [-3.2045745849609375, 55.94343231593446],
  },
  {
    name: 'Watford',
    coordinates: [-0.39516448974609375, 51.65402790532984],
  },
  {
    name: 'Barnet',
    coordinates: [-0.21457672119140625, 51.608636119273314],
  },
  {
    name: 'Edgware',
    coordinates: [-0.2799797058105469, 51.60980877897748],
  },
  {
    name: 'Mill Hill',
    coordinates: [-0.23380279541015625, 51.61524526000599],
  },
  {
    name: 'Croydon',
    coordinates: [-0.10677337646484375, 51.370065750319654],
  },
  {
    name: 'Brick Lane',
    coordinates: [-0.07177591323852539, 51.524445411196304],
  },
  {
    name: 'Westminster',
    coordinates: [-0.12003421783447266, 51.50597785837161],
  },
  {
    name: 'Shoreditch',
    coordinates: [-0.07967233657836913, 51.52664819849633],
  },
  {
    name: 'Camden Town',
    coordinates: [-0.13998985290527344, 51.541637671663594],
  },
  {
    name: 'Kentish Town',
    coordinates: [-0.14299392700195312, 51.54969764446971],
  },
  {
    name: 'Brixton',
    coordinates: [-0.11711597442626952, 51.45633343798475],
  },
  {
    name: 'Cambridge',
    coordinates: [0.10986328125, 52.19919031904484],
  },
  {
    name: 'Oxford',
    coordinates: [-1.262054443359375, 51.74828886754378],
  },
  {
    name: 'Bristol',
    coordinates: [-2.599639892578125, 51.44459262112174],
  },
  {
    name: 'Kyoto',
    coordinates: [135.428466796875, 34.70549341022544],
  },
  {
    name: 'Canary Wharf',
    coordinates: [-0.01819610595703125, 51.5038274976179],
  },
  {
    name: 'Cape Town',
    coordinates: [18.404159545898434, -33.93196649986436],
  },
  {
    name: 'Johannesburg',
    coordinates: [28.0316162109375, -26.22814270104532],
  },
  {
    name: 'Baghdad',
    coordinates: [44.3792724609375, 33.30126451306708],
  },
  {
    name: 'Dubai',
    coordinates: [55.29693603515625, 25.258358660862395],
  },
  {
    name: 'Athens',
    coordinates: [23.726348876953125, 37.98155119106918],
  },
  {
    name: 'St. Albans',
    coordinates: [-0.34709930419921875, 51.749989292270044],
  },
  {
    name: 'Lyon',
    coordinates: [4.829521179199219, 45.75554707085215],
  },
  {
    name: 'Munich',
    coordinates: [11.583709716796875, 48.13218411348939],
  },
  {
    name: 'Bern',
    coordinates: [7.445983886718749, 46.9465122958623],
  },
  {
    name: 'Milan',
    coordinates: [9.185256958007812, 45.463501855252474],
  },
]

function generateFakePins() {
  return cities.map(city => {
    const { name, coordinates } = city
    const [latitude, longitude] = coordinates.reverse()
    const { url } = find(propEq('name', name))(images)

    const citySlug = words(name)[0]
    const random = getRandomColor()
    const { color } = random
    const imageName = random.name
    return {
      id: id + 1,
      topic: `Hello from ${name}`,
      body:
        'Per ea omnis decore, eu mei appareat tincidunt. Te cum aeque repudiandae delicatissimi, cu populo dictas ponderum vel, dolor consequat ut vix.',
      createdAt: Date.now(),
      author: 'rai',
      score: Math.round(Math.random() * 100),
      position: {
        lat: latitude,
        lng: longitude,
      },
      background: `/img/explorer/${imageName}.svg`,
      // image: `https://source.unsplash.com/random/?500x500/?${citySlug}`,
      image: url,
      color,
    }
  })
}

const fakePins = generateFakePins()
export default fakePins
