/*

Open match met like vb: {
  id: 0,
  userOne: 1,
  userTwo: 2,
  matchType: 'like',
  matchComplete: false
}

Open match met dislike vb: {
  id: 0,
  userOne: 1,
  userTwo: 2,
  matchType: 'dislike',
  matchComplete: false
}

Gesloten match met like (MATCH) vb: {
  id: 0,
  userOne: 1,
  userTwo: 2,
  matchType: 'like',
  matchComplete: true
}

Gesloten match met dislike vb: {
  id: 0,
  userOne: 1,
  userTwo: 2,
  matchType: 'dislike',
  matchComplete: true
}

*/

class Connection {
  constructor(id, userOne, userTwo, matchType, matchComplete){
    this.id = id;
    this.userOne = userOne;
    this.userTwo = userTwo;
    this.matchType = matchType; // like, dislike, superlike
    this.matchComplete = matchComplete; // true als match gemaakt is
  }
}

exports.Connection = Connection;