# PD_GITHUB_ACTIONS

![CI/CD Pipeline](https://github.com/RicardoDR14/PD_GITHUB_ACTIONS/actions/workflows/ci-cd.yml/badge.svg)

Projeto académico de avaliação que demonstra a implementação de uma pipeline CI/CD com GitHub Actions. A aplicação é um site estático que documenta e explica os conceitos envolvidos na própria implementação — funcionando como apresentação interativa dos temas abordados.

---

## Sobre o Projeto

O site estático cobre os seguintes tópicos:

- **Conceitos de CI/CD** — Continuous Integration, Continuous Delivery, automação e containerização
- **GitHub Actions** — estrutura do workflow YAML, jobs, steps, triggers, dependências entre jobs e permissões
- **Docker e Nginx** — Dockerfile, conceito de imagem e container, execução local
- **GitHub Container Registry (GHCR)** — publicação e versionamento de imagens Docker
- **Estrutura do Repositório** — organização do projeto e como os componentes se interligam

A aplicação está dividida em quatro páginas: `index.html` (visão geral), `workflow.html`, `docker.html` e `estrutura.html`.

---

## Pipeline CI/CD

A pipeline executa em qualquer push para qualquer branch (`branches: ["**"]`) e tem dois jobs sequenciais:

| Job | Descrição |
|-----|-----------|
| `validate-commit` | Valida que a mensagem de commit segue o padrão Conventional Commits. Falha com `exit 1` se não cumprir. |
| `build-and-push` | Faz build da imagem Docker e publica no GHCR. Só corre se `validate-commit` passar (`needs: validate-commit`). |

### Fluxo

```
Push → Validação do commit → Build da imagem Docker → Publicação no GHCR
```

---

## Validação de Commits

As mensagens de commit devem seguir o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>
```

**Tipos válidos:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `ci`, `chore`

**Exemplos válidos:**
```
feat: add workflow explanation page
fix: correct nginx config
docs: update README
chore: initial project setup
ci: add GitHub Actions pipeline
refactor(app): simplify HTML structure
```

**Exemplos inválidos:**
```
updated stuff
WIP
fixed bug
Added new feature
```

---

## Tags da Imagem no GHCR

| Condição | Tags geradas |
|----------|-------------|
| Qualquer push | `sha-<7chars>` (ex: `sha-a1b2c3d`) |
| Push para `main` | `sha-<7chars>` + `latest` |

As imagens antigas nunca são apagadas automaticamente — cada commit cria uma nova versão identificada pelo SHA, o que permite rollback para qualquer versão anterior.

---

## Executar Localmente com Docker

**Build da imagem:**
```bash
docker build -t pd-github-actions .
```

**Iniciar o container:**
```bash
docker run -d -p 8080:80 --name pd-app pd-github-actions
```

Abre [http://localhost:8080](http://localhost:8080) no browser.

**Parar e remover o container:**
```bash
docker stop pd-app && docker rm pd-app
```

**Ou usar diretamente a imagem do GHCR:**
```bash
docker pull ghcr.io/ricardodr14/pd_github_actions:latest
docker run -d -p 8080:80 ghcr.io/ricardodr14/pd_github_actions:latest
```

---

## Estrutura do Repositório

```
.github/
└── workflows/
    └── ci-cd.yml       # Pipeline CI/CD

app/
├── index.html          # Página principal — visão geral do projeto
├── workflow.html       # Explicação do workflow GitHub Actions
├── docker.html         # Explicação do Docker e Dockerfile
├── estrutura.html      # Estrutura do repositório
├── style.css
├── script.js
└── images/

Dockerfile              # Imagem baseada em nginx:alpine
README.md
```

---

## Autores

| Nome | Número de Aluno |
|------|----------------|
| Ricardo Rodrigues | 2022147797 |
| Ruben Ferreiro | 2017008809 |

---

## Tecnologias

- [GitHub Actions](https://docs.github.com/en/actions) — automação da pipeline
- [Docker](https://www.docker.com/) + [Nginx Alpine](https://hub.docker.com/_/nginx) — containerização e servidor web
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) — publicação de imagens
- [Conventional Commits](https://www.conventionalcommits.org/) — convenção de mensagens de commit
