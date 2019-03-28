import uuid from 'uuid/v4'

import { find, propEq, map } from 'rambda'

const colors = [
  { color: 'white', name: 'marker-white' },
  { color: 'red', name: 'marker-red' },
  { color: 'green', name: 'marker-green' },
  { color: 'yellow', name: 'marker-yellow' },
  { color: 'sky', name: 'marker-sky' },
  { color: 'blue', name: 'marker-blue' },
  { color: 'orange', name: 'marker-orange' },
]

const pinData = [
  {
    id: 'PIN1',
    body:
      'Your sacred cities have become a wasteland; even Zion is a wasteland, Jerusalem a desolation.',
    topic: 'Goody Two-Shoes',
    index: 1,
    score: 420,
    name: 'London',
    url: '/img/dummy/01.gif',
  },
  {
    id: 'PIN2',
    body:
      "'Summon archers against Babylon, all those who draw the bow. Encamp all around her; let no one escape. Repay her for her deeds; do to her as she has done. For she has defied the LORD, the Holy One of Israel.'",
    topic: 'Short End of the Stick',
    index: 2,
    score: 617,
    name: 'Berlin',
    url: '/img/dummy/02.jpg',
  },
  {
    id: 'PIN3',
    body: 'Next Abimelek went to Thebez and besieged it and captured it.',
    topic: 'Give a Man a Fish',
    index: 3,
    score: 162,
    name: 'Tokyo',
    url: '/img/dummy/03.jpg',
  },
  {
    id: 'PIN4',
    body:
      'And here is my judgment about what is best for you in this matter. Last year you were the first not only to give but also to have the desire to do so.',
    topic: 'Fit as a Fiddle',
    index: 4,
    score: 859,
    name: 'New York',
    url: '/img/dummy/04.jpg',
  },
  {
    id: 'PIN5',
    body:
      "Peter sent them all out of the room; then he got down on his knees and prayed. Turning toward the dead woman, he said, 'Tabitha, get up.' She opened her eyes, and seeing Peter she sat up.",
    topic: 'Down For The Count',
    index: 5,
    score: 215,
    name: 'Manila',
    url: '/img/dummy/05.jpg',
  },
  {
    id: 'PIN6',
    body:
      'They began the consecration on the first day of the first month, and by the eighth day of the month they reached the portico of the LORD. For eight more days they consecrated the temple of the LORD itself, finishing on the sixteenth day of the first month.',
    topic: 'Talk the Talk',
    index: 6,
    score: 26,
    name: 'Mumbai',
    url: '/img/dummy/06.png',
  },
  {
    id: 'PIN7',
    body:
      'So Jephthah fled from his brothers and settled in the land of Tob, where a gang of scoundrels gathered around him and followed him.',
    topic: 'On the Ropes',
    index: 7,
    score: 40,
    name: 'Moscow',
    url: '/img/dummy/07.png',
  },
  {
    id: 'PIN8',
    body:
      'He will take a tenth of your flocks, and you yourselves will become his slaves.',
    topic: 'Par For the Course',
    index: 8,
    score: 196,
    name: 'Rome',
    url: '/img/dummy/08.jpg',
  },
  {
    id: 'PIN9',
    body:
      "It is written: 'I believed; therefore I have spoken.' Since we have that same spirit of faith, we also believe and therefore speak",
    topic: 'Under Your Nose',
    index: 9,
    score: 436,
    name: 'Rio de Janeiro',
    url: '/img/dummy/09.png',
  },
  {
    id: 'PIN10',
    body:
      'They die in an instant, in the middle of the night; the people are shaken and they pass away; the mighty are removed without human hand.',
    topic: "Money Doesn't Grow On Trees",
    index: 10,
    score: 914,
    name: 'Los Angeles',
    url: '/img/dummy/10.png',
  },
  {
    id: 'PIN11',
    body:
      'And my God will meet all your needs according to the riches of his glory in Christ Jesus.',
    topic: 'Keep Your Shirt On',
    index: 11,
    score: 160,
    name: 'Stockholm',
    url: '/img/dummy/11.jpg',
  },
  {
    id: 'PIN12',
    body:
      'Collect five shekels for each one, according to the sanctuary shekel, which weighs twenty gerahs.',
    topic: "Off One's Base",
    index: 12,
    score: 360,
    name: 'Copenhagen',
    url: '/img/dummy/12.jpg',
  },
  {
    id: 'PIN13',
    body:
      'Then he set it before them, and they ate and had some left over, according to the word of the LORD.',
    topic: 'Right Off the Bat',
    index: 13,
    score: 155,
    name: 'Lagos',
    url: '/img/dummy/13.jpg',
  },
  {
    id: 'PIN14',
    body:
      "The angel of the LORD said to Elijah, 'Go down with him; do not be afraid of him.' So Elijah got up and went down with him to the king.",
    topic: 'Elvis Has Left The Building',
    index: 14,
    score: 198,
    name: 'Uganda',
    url: '/img/dummy/14.jpg',
  },
  {
    id: 'PIN15',
    body:
      'Now there was no water for the community, and the people gathered in opposition to Moses and Aaron.',
    topic: 'Down To Earth',
    index: 15,
    score: 313,
    name: 'Sydney',
    url: '/img/dummy/15.jpg',
  },
  {
    id: 'PIN16',
    body:
      "'The God who made the world and everything in it is the Lord of heaven and earth and does not live in temples built by hands.'",
    topic: 'Happy as a Clam',
    index: 16,
    score: 457,
    name: 'Adelaide',
    url: '/img/dummy/16.jpg',
  },
  {
    id: 'PIN17',
    body: "God came to Balaam and asked, 'Who are these men with you?'",
    topic: 'Lickety Split',
    index: 17,
    score: 399,
    name: 'New Zealand',
    url: '/img/dummy/17.jpg',
  },
  {
    id: 'PIN18',
    body:
      'Let their own eyes see their destruction; let them drink of the wrath of the Almighty.',
    topic: 'Wake Up Call',
    index: 18,
    score: 210,
    name: 'Mexico',
    url: '/img/dummy/18.jpg',
  },
  {
    id: 'PIN19',
    body:
      "'Our God, will you not judge them? For we have no power to face this vast army that is attacking us. We do not know what to do, but our eyes are on you.'",
    topic: 'High And Dry',
    index: 19,
    score: 119,
    name: 'Hong Kong',
    url: '/img/dummy/19.jpg',
  },
  {
    id: 'PIN20',
    body: 'For their rock is not like our Rock, as even our enemies concede.',
    topic: 'All Greek To Me',
    index: 20,
    score: 468,
    name: 'Shanghai',
    url: '/img/dummy/20.jpg',
  },
  {
    id: 'PIN21',
    body:
      "Elisha sent a messenger to say to him, 'Go, wash yourself seven times in the Jordan, and your flesh will be restored and you will be cleansed.'",
    topic: "It's Not Brain Surgery",
    index: 21,
    score: 249,
    name: 'Kerala',
    url: '/img/dummy/21.jpg',
  },
  {
    id: 'PIN22',
    body:
      "The LORD said, 'In this way the people of Israel will eat defiled food among the nations where I will drive them.'",
    topic: 'Rain on Your Parade',
    index: 22,
    score: 717,
    name: 'Seoul',
    url: '/img/dummy/22.jpg',
  },
  {
    id: 'PIN23',
    body: 'So Moses told this to Aaron and his sons and to all the Israelites.',
    topic: 'On the Same Page',
    index: 23,
    score: 152,
    name: 'Pyongyang',
    url: '/img/dummy/23.jpg',
  },
  {
    id: 'PIN24',
    body:
      "My Father's house has plenty of room; if that were not so, would I have told you that I am going there to prepare a place for you?",
    topic: 'Burst Your Bubble',
    index: 24,
    score: 367,
    name: 'Agrigento',
    url: '/img/dummy/24.jpg',
  },
  {
    id: 'PIN25',
    body: 'For we know in part and we prophesy in part',
    topic: 'Two Down, One to Go',
    index: 25,
    score: 459,
    name: 'Vienna',
    url: '/img/dummy/25.jpg',
  },
  {
    id: 'PIN26',
    body:
      "The commander took the young man by the hand, drew him aside and asked, 'What is it you want to tell me?'",
    topic: "Wouldn't Harm a Fly",
    index: 26,
    score: 37,
    name: 'Paris',
    url: '/img/dummy/26.jpg',
  },
  {
    id: 'PIN27',
    body:
      'Godly sorrow brings repentance that leads to salvation and leaves no regret, but worldly sorrow brings death.',
    topic: 'Fight Fire With Fire',
    index: 27,
    score: 868,
    name: 'Brussels',
    url: '/img/dummy/27.jpg',
  },
  {
    id: 'PIN28',
    body:
      "'I have taken the Levites from among the Israelites in place of the first male offspring of every Israelite woman. The Levites are mine,'",
    topic: 'When the Rubber Hits the Road',
    index: 28,
    score: 785,
    name: 'Amsterdam',
    url: '/img/dummy/28.jpg',
  },
  {
    id: 'PIN29',
    body:
      'He unleashed against them his hot anger, his wrath, indignation and hostility – a band of destroying angels.',
    topic: 'My Cup of Tea',
    index: 29,
    score: 27,
    name: 'New Orleans',
    url: '/img/dummy/29.jpg',
  },
  {
    id: 'PIN30',
    body:
      'The Sovereign LORD has given me an instructed tongue, to know the word that sustains the weary. He wakens me morning by morning, wakens my ear to listen like one being taught.',
    topic: 'Wild Goose Chase',
    index: 30,
    score: 603,
    name: 'Toronto',
    url: '/img/dummy/30.jpg',
  },
  {
    id: 'PIN31',
    body:
      'In the camp they grew envious of Moses and of Aaron, who was consecrated to the LORD.',
    topic: "You Can't Teach an Old Dog New Tricks",
    index: 31,
    score: 437,
    name: 'Miami',
    url: '/img/dummy/31.jpg',
  },
  {
    id: 'PIN32',
    body:
      'He did what was right in the eyes of the LORD, just as his father David had done.',
    topic: 'Hands Down',
    index: 32,
    score: 50,
    name: 'Flint',
    url: '/img/dummy/32.jpg',
  },
  {
    id: 'PIN33',
    body:
      'You destroy those who tell lies. The bloodthirsty and deceitful you, LORD, detest.',
    topic: 'Foaming At The Mouth',
    index: 33,
    score: 816,
    name: 'Edinburgh',
    url: '/img/dummy/33.jpg',
  },
  {
    id: 'PIN34',
    body:
      "Produce fruit in keeping with repentance. And do not begin to say to yourselves, 'We have Abraham as our father.' For I tell you that out of these stones God can raise up children for Abraham.",
    topic: 'Ride Him, Cowboy!',
    index: 34,
    score: 170,
    name: 'Watford',
    url: '/img/dummy/34.jpg',
  },
  {
    id: 'PIN35',
    body:
      "'Turn to me and be saved, all you ends of the earth; for I am God, and there is no other.'",
    topic: 'I Smell a Rat',
    index: 35,
    score: 705,
    name: 'Barnet',
    url: '/img/dummy/35.gif',
  },
  {
    id: 'PIN36',
    body:
      "'In the past, while Saul was king over us, you were the one who led Israel on their military campaigns. And the LORD said to you, 'You will shepherd my people Israel, and you will become their ruler.'",
    topic: 'Scot-free',
    index: 36,
    score: 878,
    name: 'Edgware',
    url: '/img/dummy/36.gif',
  },
  {
    id: 'PIN37',
    body: 'Moreover, Solomon has taken his seat on the royal throne.',
    topic: 'Easy As Pie',
    index: 37,
    score: 893,
    name: 'Mill Hill',
    url: '/img/dummy/37.gif',
  },
  {
    id: 'PIN38',
    body:
      "So the Danites sent five of their leading men from Zorah and Eshtaol to spy out the land and explore it. These men represented all the Danites. They told them, 'Go, explore the land.' So they entered the hill country of Ephraim and came to the house of Micah, where they spent the night.",
    topic: 'Jack of All Trades Master of None',
    index: 38,
    score: 913,
    name: 'Croydon',
    url: '/img/dummy/38.gif',
  },
  {
    id: 'PIN39',
    body:
      'Which God will bring about in his own time – God, the blessed and only Ruler, the King of kings and Lord of lords',
    topic: 'Playing For Keeps',
    index: 39,
    score: 172,
    name: 'Brick Lane',
    url: '/img/dummy/39.gif',
  },
  {
    id: 'PIN40',
    body:
      'When Joseph and Mary had done everything required by the Law of the Lord, they returned to Galilee to their own town of Nazareth.',
    topic: 'Jig Is Up',
    index: 40,
    score: 717,
    name: 'Westminster',
    url: '/img/dummy/40.gif',
  },
  {
    id: 'PIN41',
    body:
      'Because they have no regard for the deeds of the LORD and what his hands have done, he will tear them down and never build them up again.',
    topic: 'Curiosity Killed The Cat',
    index: 41,
    score: 456,
    name: 'Shoreditch',
    url: '/img/dummy/41.gif',
  },
  {
    id: 'PIN42',
    body:
      "May those who say to me, 'Aha! Aha!' be appalled at their own shame.",
    topic: 'Shot In the Dark',
    index: 42,
    score: 201,
    name: 'Camden Town',
    url: '/img/dummy/42.gif',
  },
  {
    id: 'PIN43',
    body:
      'But I did not believe these things until I came and saw with my own eyes. Indeed, not even half was told me; in wisdom and wealth you have far exceeded the report I heard.',
    topic: 'Knuckle Down',
    index: 43,
    score: 326,
    name: 'Kentish Town',
    url: '/img/dummy/43.gif',
  },
  {
    id: 'PIN44',
    body:
      'Israel has sinned; they have violated my covenant, which I commanded them to keep. They have taken some of the devoted things; they have stolen, they have lied, they have put them with their own possessions.',
    topic: 'Cut To The Chase',
    index: 44,
    score: 607,
    name: 'Brixton',
    url: '/img/dummy/44.gif',
  },
  {
    id: 'PIN45',
    body:
      'But if you harbor bitter envy and selfish ambition in your hearts, do not boast about it or deny the truth.',
    topic: 'Quick and Dirty',
    index: 45,
    score: 590,
    name: 'Cambridge',
    url: '/img/dummy/45.gif',
  },
  {
    id: 'PIN46',
    body:
      'For we were all baptized by one Spirit so as to form one body – whether Jews or Gentiles, slave or free – and we were all given the one Spirit to drink.',
    topic: 'Back To the Drawing Board',
    index: 46,
    score: 851,
    name: 'Oxford',
    url: '/img/dummy/46.gif',
  },
  {
    id: 'PIN47',
    body:
      "Everyone who saw it said, 'Such a thing has never been seen or done, not since the day the Israelites came up out of Egypt. Think about it! Consider it! Tell us what to do!'",
    topic: 'Under the Weather',
    index: 47,
    score: 51,
    name: 'Bristol',
    url: '/img/dummy/47.gif',
  },
  {
    id: 'PIN48',
    body:
      'When the apostles in Jerusalem heard that Samaria had accepted the word of God, they sent Peter and John to Samaria.',
    topic: 'Beating Around the Bush',
    index: 48,
    score: 446,
    name: 'Osaka',
    url: '/img/dummy/48.gif',
  },
  {
    id: 'PIN49',
    body:
      'I will bring Judah and Israel back from captivity and will rebuild them as they were before.',
    topic: "You Can't Judge a Book By Its Cover",
    index: 49,
    score: 135,
    name: 'Canary Wharf',
    url: '/img/dummy/49.gif',
  },
  {
    id: 'PIN50',
    body:
      'King Darius then issued an order, and they searched in the archives stored in the treasury at Babylon.',
    topic: 'Back to Square One',
    index: 50,
    score: 180,
    name: 'Cape Town',
    url: '/img/dummy/50.gif',
  },
  {
    id: 'PIN51',
    body: 'Do not let them out of your sight, keep them within your heart',
    topic: 'Cry Over Spilt Milk',
    index: 51,
    score: 184,
    name: 'Johannesburg',
    url: '/img/dummy/51.gif',
  },
  {
    id: 'PIN52',
    body:
      "While Pilate was sitting on the judge's seat, his wife sent him this message: 'Don't have anything to do with that innocent man, for I have suffered a great deal today in a dream because of him.'",
    topic: 'Know the Ropes',
    index: 52,
    score: 925,
    name: 'Baghdad',
    url: '/img/dummy/52.gif',
  },
  {
    id: 'PIN53',
    body:
      'Then Moses sent his father-in-law on his way, and Jethro returned to his own country.',
    topic: 'Close But No Cigar',
    index: 53,
    score: 549,
    name: 'Dubai',
    url: '/img/dummy/53.gif',
  },
  {
    id: 'PIN54',
    body:
      'Ner was the father of Kish, Kish the father of Saul, and Saul the father of Jonathan, Malki-Shua, Abinadab and Esh-Baal.',
    topic: 'Flea Market',
    index: 54,
    score: 769,
    name: 'Athens',
    url: '/img/dummy/54.gif',
  },
  {
    id: 'PIN55',
    body:
      "He also says, 'In the beginning, Lord, you laid the foundations of the earth, and the heavens are the work of your hands.'",
    topic: 'Everything But The Kitchen Sink',
    index: 55,
    score: 912,
    name: 'St. Albans',
    url: '/img/dummy/55.gif',
  },
  {
    id: 'PIN56',
    body:
      'Ahaz took some of the things from the temple of the LORD and from the royal palace and from the officials and presented them to the king of Assyria, but that did not help him.',
    topic: 'Jaws of Death',
    index: 56,
    score: 36,
    name: 'Lyon',
    url: '/img/dummy/56.gif',
  },
  {
    id: 'PIN57',
    body:
      "'Son of man, set your face against Pharaoh king of Egypt and prophesy against him and against all Egypt.'",
    topic: 'Fish Out Of Water',
    index: 57,
    score: 331,
    name: 'Munich',
    url: '/img/dummy/57.gif',
  },
  {
    id: 'PIN58',
    body:
      "'Send away male and female alike; send them outside the camp so they will not defile their camp, where I dwell among them.'",
    topic: 'Quick On the Draw',
    index: 58,
    score: 101,
    name: 'Bern',
    url: '/img/dummy/58.gif',
  },
  {
    id: 'PIN59',
    body:
      'Now all has been heard; here is the conclusion of the matter: Fear God and keep his commandments, for this is the duty of every human being.',
    topic: 'Birds of a Feather Flock Together',
    index: 59,
    score: 594,
    name: 'Milan',
    url: '/img/dummy/59.gif',
  },
]

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}

const cities = [
  { name: 'London', coordinates: [51.50532341149335, -0.08651733398437499] },
  { name: 'Berlin', coordinates: [52.507027222951635, 13.388214111328125] },
  { name: 'Tokyo', coordinates: [35.706377408871774, 139.7076416015625] },
  { name: 'New York', coordinates: [40.72696606629052, -73.99223327636719] },
  { name: 'Manila', coordinates: [14.647036218727651, 121.04667663574219] },
  { name: 'Mumbai', coordinates: [18.93113188261391, 72.83025741577148] },
  { name: 'Moscow', coordinates: [55.731749899652065, 37.59246826171875] },
  { name: 'Rome', coordinates: [41.887965758804484, 12.4749755859375] },
  {
    name: 'Rio de Janeiro',
    coordinates: [-22.92045268936839, -43.251800537109375],
  },
  { name: 'Los Angeles', coordinates: [34.04469442222683, -118.2568359375] },
  { name: 'Stockholm', coordinates: [59.32233087376979, 18.067703247070312] },
  { name: 'Copenhagen', coordinates: [55.68532693508523, 12.571105957031248] },
  { name: 'Lagos', coordinates: [6.442223907855765, 3.39202880859375] },
  { name: 'Uganda', coordinates: [1.197422590365017, 32.332763671875] },
  { name: 'Sydney', coordinates: [-33.87953701355922, 151.171875] },
  { name: 'Adelaide', coordinates: [-34.88593094075315, 139.74609375] },
  { name: 'New Zealand', coordinates: [-43.83452678223682, 172.6171875] },
  { name: 'Mexico', coordinates: [22.268764039073968, -103.18359375] },
  { name: 'Hong Kong', coordinates: [22.350075806124867, 114.7412109375] },
  { name: 'Shanghai', coordinates: [31.203404950917395, 121.47033691406249] },
  { name: 'Kerala', coordinates: [10.158153268244805, 76.5582275390625] },
  { name: 'Seoul', coordinates: [37.56199695314352, 126.97036743164062] },
  { name: 'Pyongyang', coordinates: [39.02131757437681, 125.73028564453124] },
  { name: 'Agrigento', coordinates: [37.31119861382921, 13.5736083984375] },
  { name: 'Vienna', coordinates: [48.21735290928554, 16.37237548828125] },
  { name: 'Paris', coordinates: [48.850258199721495, 2.346954345703125] },
  { name: 'Brussels', coordinates: [50.84280379061008, 4.340972900390625] },
  { name: 'Amsterdam', coordinates: [52.370568669179654, 4.890289306640625] },
  { name: 'New Orleans', coordinates: [29.920423069383865, -90.1043701171875] },
  { name: 'Toronto', coordinates: [43.643032068770395, -79.38446044921875] },
  { name: 'Miami', coordinates: [25.77021384896025, -80.22491455078125] },
  { name: 'Flint', coordinates: [43.01368503236689, -83.72611999511719] },
  { name: 'Edinburgh', coordinates: [55.94343231593446, -3.2045745849609375] },
  { name: 'Watford', coordinates: [51.65402790532984, -0.39516448974609375] },
  { name: 'Barnet', coordinates: [51.608636119273314, -0.21457672119140625] },
  { name: 'Edgware', coordinates: [51.60980877897748, -0.2799797058105469] },
  { name: 'Mill Hill', coordinates: [51.61524526000599, -0.23380279541015625] },
  { name: 'Croydon', coordinates: [51.370065750319654, -0.10677337646484375] },
  {
    name: 'Brick Lane',
    coordinates: [51.524445411196304, -0.07177591323852539],
  },
  {
    name: 'Westminster',
    coordinates: [51.50597785837161, -0.12003421783447266],
  },
  {
    name: 'Shoreditch',
    coordinates: [51.52664819849633, -0.07967233657836913],
  },
  {
    name: 'Camden Town',
    coordinates: [51.541637671663594, -0.13998985290527344],
  },
  {
    name: 'Kentish Town',
    coordinates: [51.54969764446971, -0.14299392700195312],
  },
  { name: 'Brixton', coordinates: [51.45633343798475, -0.11711597442626952] },
  { name: 'Cambridge', coordinates: [52.19919031904484, 0.10986328125] },
  { name: 'Oxford', coordinates: [51.74828886754378, -1.262054443359375] },
  { name: 'Bristol', coordinates: [51.44459262112174, -2.599639892578125] },
  { name: 'Osaka', coordinates: [34.70549341022544, 135.428466796875] },
  {
    name: 'Canary Wharf',
    coordinates: [51.5038274976179, -0.01819610595703125],
  },
  { name: 'Cape Town', coordinates: [-33.93196649986436, 18.404159545898434] },
  { name: 'Johannesburg', coordinates: [-26.22814270104532, 28.0316162109375] },
  { name: 'Baghdad', coordinates: [33.30126451306708, 44.3792724609375] },
  { name: 'Dubai', coordinates: [25.258358660862395, 55.29693603515625] },
  { name: 'Athens', coordinates: [37.98155119106918, 23.726348876953125] },
  {
    name: 'St. Albans',
    coordinates: [51.749989292270044, -0.34709930419921875],
  },
  { name: 'Lyon', coordinates: [45.75554707085215, 4.829521179199219] },
  { name: 'Munich', coordinates: [48.13218411348939, 11.583709716796875] },
  { name: 'Bern', coordinates: [46.9465122958623, 7.445983886718749] },
  { name: 'Milan', coordinates: [45.463501855252474, 9.185256958007812] },
]

function generateFakePins() {
  return cities.map(city => {
    const { name, coordinates } = city

    const { body, topic, id, url, score } = find(propEq('name', name))(pinData)
    const random = getRandomColor()
    const { color } = random
    const imageName = random.name
    return {
      id,
      topic,
      body,
      createdAt: Date.now(),
      author: 'rai',
      score,
      coordinates,
      image: url,
      color,
    }
  })
}

export const fakePins = generateFakePins()

export async function fetchAllPins() {
  return fakePins
}

export async function fetchPin(id) {
  return find(propEq('id', id))(fakePins)
}

export default fakePins
