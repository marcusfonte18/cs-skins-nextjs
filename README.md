# Backend

Model

```prisma
model Item {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  image       String
  category    String
  float       String?
  price       Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

- [x] Criar rota `GET /items` para obter todas as skins.
- [x] Adicionar filtro por parâmetros como nome da skin, float, preço e categoria.
- [x] Adicionar ordenação por qualquer parâmetro.

# Frontend

- [x] Mostrar skins em formato de cards ou listas.
- [x] Exibir informações como: preço, nome, float e categoria.
- [x] Adicionar barra de pesquisa para buscar skins pelo nome.
- [x] Adicionar filtro para float, preço e categoria.
- [x] Implementar ordenação por preço ou float.
