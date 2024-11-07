import mongoose from "mongoose";
import dbConnect from "./mongodb";
import Item from "@/app/models/Item";

const seedData = async () => {
  await dbConnect();

  await Item.deleteMany();
  console.log("Items deleted");

  const items = [
    {
      name: "AK-47 | Redline",
      description: "Uma skin de AK-47 com design moderno e minimalista.",
      price: 200,
      category: "Rifles",
      image:
        "https://stash.clash.gg/storage/img/skin_sideview/s271.png?id=62393878d06b2520ef13346e79043b29",
      float: "0.05",
    },
    {
      name: "AWP | Dragon Lore",
      description: "Uma skin lendária para AWP, famosa e muito rara.",
      price: 1500,
      category: "Rifles",
      image:
        "https://stash.clash.gg/storage/img/skin_sideview/s422.png?id=d0f53fa10778853316e953c55bdf5202",
      float: "0.02",
    },
    {
      name: "Desert Eagle | Blaze",
      description: "Uma skin de Desert Eagle com um efeito de chamas.",
      price: 300,
      category: "Pistolas",
      image:
        "https://stash.clash.gg/storage/img/skin_sideview/s68.png?id=061624d91f82f6c2f4abdc28280e6d4d",
      float: "0.15",
    },
    {
      name: "M4A1-S | Hyper Beast",
      description: "Uma skin colorida e cheia de detalhes para M4A1-S.",
      price: 500,
      category: "Rifles",
      image:
        "https://stash.clash.gg/storage/img/skin_sideview/s554.png?id=9ad73873030cddcc7ca66196a326da2f",
      float: "0.08",
    },
    {
      name: "Karambit | Doppler",
      description: "Uma faca Karambit com um efeito doppler roxo e azul.",
      price: 3000,
      category: "Facas",
      image:
        "https://stash.clash.gg/storage/img/skin_sideview/s548.png?id=6edb5f23cacb8e63d14967daabd8cb0d",
      float: "0.01",
    },
    {
      name: "Gut Knife | Tiger Tooth",
      description: "Faca Gut Knife com um padrão de dentes de tigre.",
      price: 700,
      category: "Facas",
      image:
        "https://stash.clash.gg/storage/img/skin_sideview/s526.png?id=ad3f39f3c65800cd4bb9a95d278488e7",
      float: "0.03",
    },
    {
      name: "MP9 | Hot Rod",
      description: "Skin da MP9 com um acabamento metálico vermelho brilhante.",
      price: 150,
      category: "SMGs",
      image:
        "https://stash.clash.gg/storage/img/skin_sideview/s195.png?id=256ec9b01a57d9f6b1a0a823a0b4df81",
      float: "0.02",
    },
    {
      name: "P90 | Asiimov",
      description: "Uma skin futurista com design branco e laranja para P90.",
      price: 400,
      category: "SMGs",
      image:
        "https://stash.clash.gg/storage/img/skin_sideview/s406.png?id=ce139bc978e0fd22d5dc05102096c41c",
      float: "0.05",
    },
    {
      name: "Sawed-Off | The Kraken",
      description: "Skin para a espingarda serrada com um design de Kraken.",
      price: 180,
      category: "Espingardas",
      image:
        "https://stash.clash.gg/storage/img/skin_sideview/s250.png?id=14ee340218f46ef40a8375705a8c8d83",
      float: "0.12",
    },
    {
      name: "Nova | Bloomstick",
      description: "Uma Nova com um design floral único e vibrante.",
      price: 120,
      category: "Espingardas",
      image:
        "https://stash.clash.gg/storage/img/skin_sideview/s469.png?id=0b8f816ec3a55e57f16693e4951403fe",
      float: "0.09",
    },
    {
      name: "Negev | Mjölnir",
      description:
        "Skin da Negev inspirada no martelo de Thor, com detalhes rúnicos.",
      price: 250,
      category: "Metralhadoras",
      image:
        "https://stash.clash.gg/storage/img/skin_sideview/s1180.png?id=2bec71e7ec43308e49c86ac6dbc51f53",
      float: "0.04",
    },
    {
      name: "MAC-10 | Neon Rider",
      description: "Skin temática neon para a MAC-10 com um design vibrante.",
      price: 180,
      category: "SMGs",
      image:
        "https://stash.clash.gg/storage/img/skin_sideview/s553.png?id=e48d27915b2aef0ab596fada4d7525a7",
      float: "0.03",
    },
    {
      name: "CZ75-Auto | Victoria",
      description: "Skin para a CZ75-Auto com um design luxuoso e real.",
      price: 220,
      category: "Pistolas",
      image:
        "https://stash.clash.gg/storage/img/skin_sideview/s262.png?id=7d9f84a8149d5d89c2760efa94dd4675",
      float: "0.02",
    },
    {
      name: "R8 Revolver | Fade",
      description: "R8 Revolver com efeito de cores degradê.",
      price: 250,
      category: "Pistolas",
      image:
        "https://stash.clash.gg/storage/img/skin_sideview/s672.png?id=5f7e45de655215f4d92d619799be90e4",
      float: "0.06",
    },
    {
      name: "Dual Berettas | Cobalt Quartz",
      description:
        "Duas pistolas Dual Berettas com acabamento de quartzo azul.",
      price: 130,
      category: "Pistolas",
      image:
        "https://stash.clash.gg/storage/img/skin_sideview/s172.png?id=1640fb3c699e94bb1f1208f717b9fe03",
      float: "0.10",
    },
  ];

  await Item.insertMany(items);
  console.log("Database populated with items!");
  mongoose.connection.close();
};

seedData();
