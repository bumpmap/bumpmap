let id = 0

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
  { name: 'Lagos', latitude: 51.874444444444, longitude: -0.368333333333 },
]

function generateFakePins() {
  return cities.map(city => {
    const { name, latitude, longitude } = city
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
    }
  })
}

const fakePins = generateFakePins()
export default fakePins
