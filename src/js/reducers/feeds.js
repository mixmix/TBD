let fakeState = {
  images: [
    { id:0,
      imagelink: "http://i.imgur.com/R2tE1Wg.jpg?1"
    },
    { id:1,
      imagelink: "http://i.imgur.com/R2tE1Wg.jpg?1"
    },
    { id:2,
      imagelink: "http://i.imgur.com/R2tE1Wg.jpg?1"
    },
    { id:3,
      imagelink: "http://i.imgur.com/R2tE1Wg.jpg?1"
    }
  ]
}


export default function (state=fakeState.images, action){
  switch (action.type) {
    case 'LOAD_FEEDS':
      return action.feeds
      break;
    default:
      return state
  }
}
