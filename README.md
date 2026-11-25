# Iaiá Pizzaria — Sistema de Avaliações

Aplicação web inicial em Next.js + Supabase. Inclui formulário público de avaliação, login administrativo, painel de indicadores e exportação CSV.

## Importante antes de publicar
Este pacote é o código-fonte inicial. Ele ainda não está hospedado, não possui domínio e não recebe avaliações até você criar/configurar o projeto Supabase e publicar o site.

## 1. Criar banco de dados
1. Crie um projeto em https://supabase.com/.
2. Abra SQL Editor e execute todo o conteúdo de `supabase/schema.sql`.
3. Em Authentication > Providers, mantenha Email habilitado.
4. Em Authentication > Settings, desative "Allow new users to sign up" (cadastro público).
5. Em Authentication > Users, crie somente seu usuário administrador com seu e-mail e uma senha forte.
6. Em Project Settings > API, copie Project URL e a chave `anon`/publishable. Nunca coloque a `service_role` no navegador.

## 2. Rodar localmente
Requer Node.js 20 ou superior.
1. Copie `.env.example` para `.env.local`.
2. Preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. No terminal, na pasta do projeto:
   ```bash
   npm install
   npm run dev
   ```
4. Acesse http://localhost:3000. Formulário: `/avaliar`. Administração: `/admin`.

## 3. Publicar na internet
1. Envie esta pasta para um repositório privado no GitHub.
2. Importe o repositório em https://vercel.com/.
3. Configure as mesmas duas variáveis de ambiente no painel da Vercel.
4. Clique em Deploy.
5. A Vercel fornecerá um endereço `*.vercel.app`; depois você pode conectar um domínio próprio.

## 4. QR Code
Depois da publicação, gere um QR Code apontando para `https://SEU-ENDERECO/avaliar`. Imprima em mesas, balcão e embalagens.

## Segurança e privacidade
- O painel exige login Supabase.
- A política RLS permite inserção pública de avaliações, mas leitura apenas para usuários autenticados.
- Não habilite cadastro público. Crie somente a conta do proprietário.
- Contato é opcional; restrinja o acesso e defina prazo de retenção. Inclua aviso de privacidade adequado à LGPD.
- Para uma operação de produção, recomendamos adicionar rate limiting/antispam, verificação de e-mail, recuperação de senha e política mais restritiva que vincule a leitura ao ID do administrador autorizado.
