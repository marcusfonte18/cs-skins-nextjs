import dbConnect from "@/lib/mongodb";
import Item from "@/app/models/Item";
import { itemSchema, searchParamsSchema } from "./schema";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const jsonBody = await req.json();
    const parsedData = itemSchema.parse(jsonBody);

    const itemExists = await Item.findOne({
      name: parsedData.name,
    });

    if (itemExists) {
      return new Response(
        JSON.stringify({
          success: false,
          message: `Item "${parsedData.name}" already exists`,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const newItem = new Item({
      name: parsedData.name,
      description: parsedData.description,
      price: parsedData.price,
      float: parsedData.float,
      image: parsedData.image,
      category: parsedData.category,
    });

    await newItem.save();

    return new Response(JSON.stringify({ data: newItem }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: error.errors.map((err) => err.message),
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: false, message: "Failed to save item" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const searchParamsObj = Object.fromEntries(searchParams.entries());

    const paramsParsed = searchParamsSchema.parse(searchParamsObj);

    const filter = {
      $and: [
        paramsParsed.name ? { name: new RegExp(paramsParsed.name, "i") } : {},
        paramsParsed.price ? { price: paramsParsed.price } : {},
        paramsParsed.category
          ? { category: new RegExp(paramsParsed.category, "i") }
          : {},
        paramsParsed.float ? { float: paramsParsed.float } : {},
      ],
    };

    const validFields = [
      "name",
      "price",
      "category",
      "float",
      "createdAt",
      "updateAt",
    ];
    const sortField = validFields.includes(paramsParsed.orderBy)
      ? paramsParsed.orderBy
      : "createdAt";
    const sortOrder = paramsParsed.order === "asc" ? 1 : -1;

    const items = await Item.find(filter).sort({ [sortField]: sortOrder });

    return new Response(JSON.stringify({ items }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Failed to fetch items" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
