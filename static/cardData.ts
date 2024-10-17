interface CardData {
  id: number;
  backgroundColor: string;
  text: string;
  image: string;
  width: number; // TODO: use this to change grid size
}

const cardsData: CardData[] = [
  {
    id: 1,
    backgroundColor: '#E57373',
    text: 'Hello',
    image:
      'https://cdn.pixabay.com/photo/2018/05/08/08/42/virtual-coworkers-3382503_1280.jpg',
    width: 100,
  },
  {
    id: 2,
    backgroundColor: '#64B5F6',
    text: 'Yes',
    image:
      'https://media.istockphoto.com/id/1408491095/photo/yellow-yes-billboard-sign-with-spot-lights.jpg?s=2048x2048&w=is&k=20&c=g3EuT8a8pGtdHLwO2zDUrpxr7RV5goejaCXoiGt211Y=',
    width: 100,
  },
  {
    id: 3,
    backgroundColor: '#EF5350',
    text: 'No',
    image:
      'https://png.pngtree.com/element_our/20190528/ourmid/pngtree-red-no-icon-image_1136655.jpg',
    width: 100,
  },
  {
    id: 4,
    backgroundColor: '#64B5F6',
    text: 'Water',
    image:
      'https://api.hub.jhu.edu/factory/sites/default/files/styles/landscape/public/ww-hydration-hub.jpg',
    width: 100,
  },
  {
    id: 5,
    backgroundColor: '#FFB74D',
    text: 'Eat',
    image:
      'https://d35oenyzp35321.cloudfront.net/MHC_Digital_Sit_Down_While_You_Eat_Part_36_925x389pix_200422n_01_d24a490fce.jpg',
    width: 100,
  },
  {
    id: 6,
    backgroundColor: '#64B5F6',
    text: 'Play',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6AhonV4yuOqGHdMVXFgJFpFCHnnOHrchYOg&s',
    width: 100,
  },
  {
    id: 7,
    backgroundColor: '#BDBDBD',
    text: 'Settings',
    image:
      'https://play-lh.googleusercontent.com/mOMVlWK_cLLdOOO3XUWiw1zFf7FO15f_ys2XmcYKJLOMTHF-eGtQddXE-wYDSd9kd5Q=w240-h480-rw',
    width: 100,
  },
  {
    id: 8,
    backgroundColor: '#FFD54F',
    text: 'Help',
    image:
      'https://donteatalone.com/wp-content/uploads/2021/09/Screen-Shot-2019-04-16-at-5.16.54-PM.png',
    width: 100,
  },
  {
    id: 9,
    backgroundColor: '#4DB6AC',
    text: 'Go',
    image:
      'https://media.istockphoto.com/id/1316434832/vector/female-mouth-with-red-lipstick-screaming-let-is-go-speech-bubble-can-be-used-for-business.jpg?s=612x612&w=0&k=20&c=ARuDNw8G_x9AUn_hRyXkL2VARsDZOhudYUN58zmLibA=',
    width: 100,
  },
  {
    id: 10,
    backgroundColor: '#4DB6AC',
    text: 'Home',
    image:
      'https://www.buyrentkenya.com/discover/wp-content/uploads/2022/06/brk-blog-4reasons-why.png',
    width: 100,
  },
  {
    id: 11,
    backgroundColor: '#E57373',
    text: 'Love',
    image:
      'https://ofhsoupkitchen.org/wp-content/uploads/2022/02/spread-love-quotes-2-1024x683.jpg',
    width: 100,
  },
  {
    id: 12,
    backgroundColor: '#64B5F6',
    text: 'Dance',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/3/38/Two_dancers.jpg',
    width: 100,
  },
  {
    id: 13,
    backgroundColor: '#E57373',
    text: 'Hello',
    image:
      'https://cdn.pixabay.com/photo/2018/05/08/08/42/virtual-coworkers-3382503_1280.jpg',
    width: 100,
  },
  {
    id: 14,
    backgroundColor: '#64B5F6',
    text: 'Yes',
    image:
      'https://media.istockphoto.com/id/1408491095/photo/yellow-yes-billboard-sign-with-spot-lights.jpg?s=2048x2048&w=is&k=20&c=g3EuT8a8pGtdHLwO2zDUrpxr7RV5goejaCXoiGt211Y=',
    width: 100,
  },
  {
    id: 15,
    backgroundColor: '#EF5350',
    text: 'No',
    image:
      'https://png.pngtree.com/element_our/20190528/ourmid/pngtree-red-no-icon-image_1136655.jpg',
    width: 100,
  },
  {
    id: 16,
    backgroundColor: '#64B5F6',
    text: 'Water',
    image:
      'https://api.hub.jhu.edu/factory/sites/default/files/styles/landscape/public/ww-hydration-hub.jpg',
    width: 100,
  },
  {
    id: 17,
    backgroundColor: '#FFB74D',
    text: 'Eat',
    image:
      'https://d35oenyzp35321.cloudfront.net/MHC_Digital_Sit_Down_While_You_Eat_Part_36_925x389pix_200422n_01_d24a490fce.jpg',
    width: 100,
  },
  {
    id: 18,
    backgroundColor: '#64B5F6',
    text: 'Play',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6AhonV4yuOqGHdMVXFgJFpFCHnnOHrchYOg&s',
    width: 100,
  },
  {
    id: 19,
    backgroundColor: '#BDBDBD',
    text: 'Settings',
    image:
      'https://play-lh.googleusercontent.com/mOMVlWK_cLLdOOO3XUWiw1zFf7FO15f_ys2XmcYKJLOMTHF-eGtQddXE-wYDSd9kd5Q=w240-h480-rw',
    width: 100,
  },
  {
    id: 20,
    backgroundColor: '#FFD54F',
    text: 'Help',
    image:
      'https://donteatalone.com/wp-content/uploads/2021/09/Screen-Shot-2019-04-16-at-5.16.54-PM.png',
    width: 100,
  },
  {
    id: 21,
    backgroundColor: '#4DB6AC',
    text: 'Go',
    image:
      'https://media.istockphoto.com/id/1316434832/vector/female-mouth-with-red-lipstick-screaming-let-is-go-speech-bubble-can-be-used-for-business.jpg?s=612x612&w=0&k=20&c=ARuDNw8G_x9AUn_hRyXkL2VARsDZOhudYUN58zmLibA=',
    width: 100,
  },
  {
    id: 22,
    backgroundColor: '#4DB6AC',
    text: 'Home',
    image:
      'https://www.buyrentkenya.com/discover/wp-content/uploads/2022/06/brk-blog-4reasons-why.png',
    width: 100,
  },
  {
    id: 23,
    backgroundColor: '#E57373',
    text: 'Love',
    image:
      'https://ofhsoupkitchen.org/wp-content/uploads/2022/02/spread-love-quotes-2-1024x683.jpg',
    width: 100,
  },
  {
    id: 24,
    backgroundColor: '#64B5F6',
    text: 'Dance',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/3/38/Two_dancers.jpg',
    width: 100,
  },
];

export default cardsData;
