# API SOULBANK

FUNCIONALIDADES:

- Cadastro de Usuário
- Login de Usuário
- Cadastro de Transação
- Edição de Transação
- Listagem de Transações
- Extrato das Transações 
- Listagem de Categorias
- Exclusao de uma Transação
- Exclusao de todas as Transações

# **Endpoints**
---
### **Cadastrar usuário**
#### `POST` `/cadastro`

#### **Exemplo de requisição**

```javascript
// POST /cadastro
{
    "nome": "marcelo",
    "email": "marcelo@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "mensagem": "Usuario cadastrado!"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Email invalido para cadastro."
}
```
---
### **Login do usuário**
#### `POST` `/login`

#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "marcelo@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "DadosUsuario": {
        "id": 1,
        "nome": "marcelo",
        "email": "marcelo@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Email ou senha incorretos."
}
```

---

### **Cadastrar transação para o usuário logado**

#### `POST` `/transacoes`

#### **Exemplo de requisição**

```javascript
// POST /transacoes
{    
    "descricao": "Salário",
    "valor": 300000,
    "data": "21/07/2023",
    "categoria_id": 6
    "tipo": "entrada",
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "mensagem": "Transação adicionada com sucesso!"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Informe todos os campos."
}
```
---

### **Atualizar transação do usuário logado**

#### `PUT` `/transacoes`

#### **Exemplo de requisição**

```javascript
// PUT /transacoes
{
 "descricao": "Sapato amarelo",
 "valor": 15800,
 "data": "21/07/2023",
 "categoria_id": 4,
 "tipo": "saida",
 "transacao_id": 4
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "mensagem": "Transação editada com sucesso!"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Informe todos os campos."
}
```
---

### **Listar transações do usuário logado**

#### `GET` `/transacoes`

#### **Exemplo de requisição**

```javascript
// GET /transacoes
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
    {
        id: 1,
        descricao: "Sapato amarelo",
        categoria_nome: "Roupas",
        valor: 15800,
        data: "21/07/2023",
        categoria_id: 11,
        usuario_id: 5,
        tipo: "saida",
    },
    {
        id: 4,
        descricao: "Salário mensal",
        categoria_nome: "Salários",
        valor: 15800,
        data: "21/07/2023",
        categoria_id: 14,
        usuario_id: 6,
        tipo: "entrada",
    },
]
```

```javascript
// HTTP Status 200 / 201 / 204
[]
```
---

### **Obter extrato de transações**

#### `GET` `/extrato`

#### **Exemplo de requisição**

```javascript
// GET /extrato
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
 "entrada": 300000,
 "saida": 15800
}
```
---

### **Listar categorias**

#### `GET` `/categorias`

#### **Exemplo de requisição**

```javascript
// GET /categorias
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
    {
        id: 1,
        descricao: "Roupas",
    },
    {
        id: 2,
        descricao: "Mercado",
    },
]
```

```javascript
// HTTP Status 200 / 201 / 204
[]
```
---

### **Excluir transação do usuário logado**

#### `DELETE` `/transacoes/:id_transacao`

#### **Exemplo de requisição**

```javascript
// DELETE /transacoes/:id_transacao
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "mensagem": "Transação excluida com sucesso!"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Erro ao deletar transação."
}
```
---

### **Excluir todas as transações do usuário logado**

#### `DELETE` `/excluirTudo`

#### **Exemplo de requisição**

```javascript
// DELETE /excluirTudo
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "mensagem": "Todas as transações foram excluidas!"
}
```
