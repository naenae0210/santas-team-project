//const passport = require('passport');
const LocalStrategy =require('passport-local').Strategy;
const {User} = require('../models');
const bcrypt = require('bcrypt');

module.export = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password',
    }, async (id,password,done) =>{
        try{
            const exUser =await User.findOne({where:{id}});
            if(exUser){
                const result = await bcrypt.compare(password, exUser.password);
                if(result){
                    done(null,exUser) ;
                }else{
                    done(null,false,{message: '비밀번호가 일치하기 않습니다'});
                }
            }else{
                done(null,false,{message: '가입되지 않은 회원입니다.'});
            }
        }catch(err){
            console.error(err);
            done(err);
        }
    }));
}