const { User } = require('../models/User');

let auth = (req, res, next) => {
    // 인증 처리를 하는 곳
    // 1. 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    // 2. 토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })

        // req.token, req.user로 해줘야 
        // index.js 등에서 해당 정보에 접근할 수 있음.
        req.token = token;
        req.user = user;

        // 미들웨어 이후 단계로 이동하기 위해 next 적용
        next();
    });

    // 3-1. 유저가 있으면 인증 Okay
    // 3-2. 유저가 없으면 인증 No
}

module.exports = { auth }