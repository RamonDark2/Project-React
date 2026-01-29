# React Form Project

Projeto completo usando as tecnologias mais modernas do ecossistema React:

- ⚛️ **React 18** com TypeScript
- 🎨 **Tailwind CSS** para estilização
- 📝 **React Hook Form** para gerenciamento de formulários
- ✅ **Zod** para validação de schemas
- ⚡ **Vite** como bundler

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js versão 16 ou superior
- npm ou yarn

### Instalação

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abra o navegador em `http://localhost:5173`

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção

## 🎯 Funcionalidades do Formulário

O formulário demonstra:

- ✅ Validação em tempo real com Zod
- ✅ Mensagens de erro personalizadas
- ✅ Máscara para telefone
- ✅ Confirmação de senha
- ✅ Checkbox de termos
- ✅ Estado de loading no submit
- ✅ Feedback visual após envio
- ✅ Função de limpar formulário

## 📁 Estrutura do Projeto

```
react-form-project/
├── src/
│   ├── App.tsx          # Componente principal com formulário
│   ├── main.tsx         # Ponto de entrada
│   ├── index.css        # Estilos globais + Tailwind
│   └── vite-env.d.ts    # Tipos do Vite
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Tailwind CSS

O projeto está configurado com Tailwind CSS usando as diretivas:

- `@tailwind base`
- `@tailwind components`
- `@tailwind utilities`

Você pode personalizar o tema editando `tailwind.config.js`.

## 🔧 Tecnologias e Versões

- React: 18.3.1
- TypeScript: 5.6.3
- Vite: 5.4.11
- Tailwind CSS: 3.4.15
- React Hook Form: 7.53.2
- Zod: 3.23.8
- @hookform/resolvers: 3.9.1

## 📝 Validações Implementadas

- **Nome**: Mínimo 3 caracteres
- **E-mail**: Formato válido de e-mail
- **Idade**: Entre 18 e 120 anos
- **Telefone**: Formato (99) 99999-9999
- **Senha**: Mínimo 6 caracteres
- **Confirmar Senha**: Deve ser igual à senha
- **Termos**: Deve ser aceito

## 💡 Dicas de Uso

Para adicionar novos campos ao formulário:

1. Adicione no schema do Zod
2. Adicione o campo no JSX
3. Use `{...register('nomeDoCampo')}`
4. Adicione a mensagem de erro

Exemplo:

```typescript
// No schema
cidade: z.string().min(2, 'Cidade obrigatória'),

// No JSX
<input {...register('cidade')} />
{errors.cidade && <p>{errors.cidade.message}</p>}
```

## 🤝 Contribuindo

Sinta-se livre para fazer modificações e melhorias!

## 📄 Licença

MIT
