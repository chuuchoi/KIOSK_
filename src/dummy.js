function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max)||max+1;
}
export let noodle_data = [
  {
  img:'/img/n0.png',
  name:'계란 라면',
  price:4000
  },
  {
  img:'/img/n1.png',
  name:'소고기 라면',
  price:6500
  },
  {
  img:'/img/n2.png',
  name:'비빔면',
  price:5000
  },
  {
  img:'/img/n3.png',
  name:'샐러드 라면',
  price:9000
  },
  {
  img:'/img/n4.png',
  name:'돼지고기 라면',
  price:7000
  },
  {
  img:'/img/n5.png',
  name:'만두 라면',
  price:6000
  },
  {
  img:'/img/n6.png',
  name:'해물 라면',
  price:8000
  },
  {
  img:'/img/n7.png',
  name:'카레 라면',
  price:7500
  },
]
noodle_data = noodle_data.concat(shuffle(noodle_data.slice(0,8)))
noodle_data = noodle_data.concat(shuffle(noodle_data.slice(0,getRandomInt(7))))

export let food_data = [
  {
  img:'/img/f0.png',
  name:'계란밥',
  price:4000
  },
  {
  img:'/img/f1.png',
  name:'스테이크',
  price:6500
  },
  {
  img:'/img/f2.png',
  name:'햄버거',
  price:5000
  },
  {
  img:'/img/f3.png',
  name:'샤브샤브',
  price:9000
  },
  {
  img:'/img/f4.png',
  name:'연어 포케',
  price:7000
  },
  // {
  // img:'/img/f5.png',
  // name:'만gg',
  // price:6000
  // },
  // {
  // img:'/img/f6.png',
  // name:'해g라면',
  // price:8000
  // },
  // {
  // img:'/img/f0.png',
  // name:'계d',
  // price:4000
  // },
]
// food_data = food_data.concat(shuffle(food_data.slice(0,getRandomInt(7))))

export let dessert_data = [
  {
  img:'/img/d0.png',
  name:'모둠과일',
  price:4000
  },
  {
  img:'/img/d1.png',
  name:'샐러드',
  price:6500
  },
  {
  img:'/img/d2.png',
  name:'야채 스프',
  price:5000
  },
  {
  img:'/img/d3.png',
  name:'녹두전',
  price:9000
  },
  {
  img:'/img/d4.png',
  name:'아이스크림',
  price:7000
  },
  {
  img:'/img/d5.png',
  name:'아이스크림 케이크',
  price:6000
  },
  {
    img:'/img/d7.png',
    name:'햄 야채 베이컨 토스트',
    price:4000
  },
  {
  img:'/img/d6.png',
  name:'딸기 케이크',
  price:8000
  },
]
// dessert_data = dessert_data.concat(shuffle(dessert_data.slice(0,8)))
// dessert_data = dessert_data.concat(shuffle(dessert_data.slice(0,8)))
dessert_data = dessert_data.concat(shuffle(dessert_data.slice(0,getRandomInt(7))))