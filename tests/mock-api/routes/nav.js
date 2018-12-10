const Users = require('../resources/users')
const Nav = require('../resources/nav')

module.exports = app => {
  app.get('/api/nav', (request, response) => {
    const currentUser = Users.findBy('token', request.headers.authorization)

    if (!currentUser) {
      return response.status(401).json({
        message:
          '令牌过期，请重新登录.',
      })
    }

    let matched = Nav.findBy('userId', currentUser.id)

    if (!matched) {
        matched=Nav.findBy('userId', -1)
    }
    response.json(matched)
  })
}
