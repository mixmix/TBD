import feeds      from '../../src/js/reducers/feeds'

import {expect} from 'chai'
let assert = require('chai').assert;

describe('feeds reducer',() => {
  it('returns unchanged state if action-type not found', () =>{
    const initState = []   // arrange
    const data = [{
      id: 1,
      category: "street"
    }]
 
    const reducedState = feeds(initState,{  // aciton
      type:'NOT_A_REAL_ACTION_RUMMM!!',
      feeds : data
    }))

    expect(reducedState.to.deep.equal(initState) // assert
  })

  it('LOAD FEEDS FROM SERVER', () =>{
    const initState = []
    const data = [{
      id: 1,
      categoryId: 6,
      cityId : '1',
      link: 'http://cityweeken.com'
    }]
    expect(feeds(initState,{
      type:'LOAD_FEEDS',
      feeds : data
    })).to.deep.equal(data)
  })

  it('ADD NEW FEED TO STATE', () =>{
    const initState = [{
      id: 1,
      categoryId: 6,
      cityId : '1',
      link: 'http://cityweeken.com'
    }]
    const data = {
      id: 2,
      categoryId: 7,
      cityId : '1',
      link: 'http://cityweeken.com'
    }
    const expectData = [{
      id: 1,
      categoryId: 6,
      cityId : '1',
      link: 'http://cityweeken.com'
    },{
      id: 2,
      categoryId: 7,
      cityId : '1',
      link: 'http://cityweeken.com'
    }]
    expect(feeds(initState,{
      type:'ADD_NEW_FEED',
      feed : data
    })).to.deep.equal(expectData)
  })
})
