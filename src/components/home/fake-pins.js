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
  { name: 'London', url: '/img/dummy/1.gif' },

  { name: 'Berlin', url: '/img/dummy/2.jpg' },
  { name: 'Tokyo', url: '/img/dummy/3.jpg' },
  { name: 'New York', url: '/img/dummy/8.jpg' },
  { name: 'Manila', url: '/img/dummy/5.jpg' },
  { name: 'Mumbai', url: '/img/dummy/10.png' },
  { name: 'Moscow', url: '/img/dummy/7.png' },
  { name: 'Rome', url: '/img/dummy/4.jpg' },
  { name: 'Rio de Janeiro', url: '/img/dummy/9.png' },
  { name: 'Los Angeles', url: '/img/dummy/6.png' },
]

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)
  console.log()
  return colors[index]
}

const cities = [
  { name: 'London', latitude: 51.874444444444, longitude: -0.368333333333 },
  {
    name: 'Berlin',
    latitude: 52.38,
    longitude: 13.5225,
  },
  {
    name: 'Tokyo',
    latitude: 35.764722222222225,
    longitude: 140.3863888888889,
  },
  {
    name: 'New York',
    latitude: 40.63972222222222,
    longitude: -73.77888888888889,
  },
  {
    name: 'Manila',
    latitude: 14.508611111111112,
    longitude: 121.01944444444445,
  },
  {
    name: 'Mumbai',
    latitude: 19.08861111111111,
    longitude: 72.86777777777777,
  },
  {
    name: 'Moscow',
    latitude: 55.97166666666667,
    longitude: 37.415,
  },
  {
    name: 'Rome',
    latitude: 40.416666666666664,
    longitude: 12.333333333333334,
  },
  {
    name: 'Rio de Janeiro',
    latitude: -22.875,
    longitude: -43.38444444444444,
  },
  {
    name: 'Los Angeles',
    latitude: 33.942499999999995,
    longitude: -118.40805555555556,
  },
]

function generateFakePins() {
  return cities.map(city => {
    const { name, latitude, longitude } = city
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
