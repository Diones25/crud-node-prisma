import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export const all = async (req: Request, res: Response) => {
    const users = await UserService.findAll();
    res.status(200).json({ users })
}

export const one = async (req: Request, res: Response) => {

}

export const create = async (req: Request, res: Response) => {
    const { email, name, age } = req.body;
    if(email && name) {
        //TODO: Validar e-mail
        const user = await UserService.findOne({
            email: email
        });
        if(!user) {
            const newUser = await UserService.create({
                email,
                name,
                age: parseInt(age)
            });
            res.status(201).json({ user: newUser });
        }
        else {
            res.json({ error: 'Já existe um usuário com esse e-mail!' });
        }
    }
    else {
        res.json({ error: 'Dados não preenchidos! '})
    }
}

export const toggleUser = async (req: Request, res: Response) => {

}

export const deleteUser = async (req: Request, res: Response) => {

}
