import {Request, Response} from 'express';
import User, {IUser} from '../models/user'
import jwt from 'jsonwebtoken';
import config from '../config'

function createToken(user: IUser) {
    return jwt.sign({id: user._id, email: user.email}, config.jwtSecret, {
        expiresIn: 86400 // 1 dia
    });
}

export const signUp = async (req: Request, res: Response) => {
    const oldUser: IUser = req.body;
    if (!oldUser.email || !oldUser.password) {
        return res
            .status(400)
            .json({msg: 'Please. Send your email and password'});
    }
    const user = await User.findOne({
        email: oldUser.email
    });

    if (user) {
        return res
            .status(400)
            .json({msg: 'El usuario ya existe'});
    }

    const newUser = new User(oldUser);
    await newUser.save();

    res.status(201)
        .json(newUser);
};

export const signIn = async (req: Request, res: Response) => {
    const oldUser: IUser = req.body;
    if (!oldUser.email || !oldUser.password) {
        return res
            .status(400)
            .json({msg: 'Please. Send your email and password'});
    }

    const user = await User.findOne({
        email: oldUser.email
    });

    if (!user) {
        return res
            .status(400)
            .json({msg: 'El usuario no existe'});
    }

    const isMatch = await user.comparePassword(oldUser.password);
    if (isMatch) {
        return res.status(200)
            .json({
                token: createToken(user)
            });
    }
    return res
        .status(400)
        .json({msg: 'El correo o la contraseña son incorrectos'});
};
