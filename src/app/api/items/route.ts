import { NextApiRequest, NextApiResponse } from 'next';

import { z } from 'zod';

import dbConnect from '@/lib/mongodb';
import Item from '@/app/models/Item';


const itemSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  price: z.preprocess((val) => Number(val), z.number().positive('Preço deve ser positivo')),
  float: z.string().optional().default('0.0'),
  image: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    await dbConnect();

    const jsonBody = await req.json();
    const parsedData = itemSchema.parse(jsonBody);

   const itemExists = await Item.findOne({
      name: parsedData.name,
    })

    console.log('itemExists', itemExists);

    if(itemExists) {
      return new Response(JSON.stringify({ success: false, message: `Item "${parsedData.name}" already exists` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newItem = new Item({
      name: parsedData.name,
      description: parsedData.description,
      price: parsedData.price,
      float: parsedData.float,
      image: parsedData.image,
      category: parsedData.category
    });

    await newItem.save();

    return new Response(JSON.stringify({ data: newItem }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({
        success: false,
        errors: error.errors.map((err) => err.message),
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: false, message: 'Failed to save item' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    const items = await Item.find({});
    
    return new Response(JSON.stringify({ items }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: 'Failed to fetch items' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
