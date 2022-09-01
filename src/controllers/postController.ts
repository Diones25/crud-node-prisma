import { Request, Response } from 'express';
import { PostService } from '../services/PostService';
import { UserService } from '../services/UserService';

export const all = async (req: Request, res: Response) => {
    const posts = await PostService.findAll()
    res.status(200).json({ posts });
}

export const one = async (req: Request, res: Response) => {
    const id = req.params.id;
    const post = await PostService.findOne( parseInt(id) );
    if(post) {
        res.status(200).json(post)
    }
    else {
        res.status(404).json({ error: 'Post não encontrado!' })
    }
}

export const create = async (req: Request, res: Response) => {
    const { title, body, author } = req.body;

    if(title && body && author) {
        const user = await UserService.findOne({
            id: parseInt(author)
        });

        if(user) {
            const post = await PostService.create({
                title, body, authorId: user.id
            });
            res.status(201).json({ post })
        }
        else {
            res.status(400).json({ error: 'Author não encontrado!' });
        }

    }
    else {
        res.json({ error: 'Dados nãp preenchidos!' })
    }
}

export const togglePost = async (req: Request, res: Response) => {
    const id = req.params.id;

    const post = await PostService.findOne(parseInt(id));

    if(post) {
        const postUpdated = await PostService.update(post.id,
            {
                published: !post.published        
            }
        );
        res.status(200).json({ post: postUpdated });
    }
    else {
        res.status(400).json({ error: 'Post não encontrado!' })
    } 
}

export const deletePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    const post = await PostService.findOne(parseInt(id));

    if(post) {
        await PostService.delete(parseInt(id));
        
        res.status(200).json('Post removido com sucesso!');
    }
    else {
        res.status(400).json({ error: 'Post não encontrado!' })
    }
}
