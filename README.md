# Backend

Model
```
model Item {
  id                        String        @id @default(auto()) @map("_id") @db.ObjectId
  name                      String
  image                     String
  category                  String
  float                     String?
  price                     Int
  createdAt                 DateTime      @default(now())
  updatedAt                 DateTime      @updatedAt
}
```

[ ] rota GET /items de todas as skins
[ ] filtro por parametro como nome da skin, float, preco e categoria
[ ] ordenacao por preco ou float


# Frontend

[ ] Mostrar skins em forma de cards ou listas
[ ] informacoes a ser mostradas: preço, nome, float e categoria
[ ] ter uma barra de pesquisa para buscar skins pelo nome
[ ] adicionar filtro para float, preço e categoria
[ ] ordenação por preço ou float