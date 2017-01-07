const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
        id: '1',
        name: 'Tim',
        room: 'A'
    },
    {
        id: '2',
        name: 'Tom',
        room: 'B'
    },
    {
        id: '3',
        name: 'Tum',
        room: 'A'
    }];
  });

  it('should remove a user', () => {
    var userId = '2';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var userId = '24';
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should return a user', () => {
    var userId = '2';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not return a user', () => {
    var userId = '4';
    var user = users.getUser(userId);

    expect(user).toNotExist();
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Tim',
      room: 'Room'
    };

    var resUser = users.addUser('123', 'Tim', 'Room');

    expect(users.users).toEqual([resUser]);
  });

  it('should return names for A', () => {
    var userList = users.getUserList('A');

    expect(userList).toEqual(['Tim', 'Tum']);
  });
});
