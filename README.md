# PD_GITHUB_ACTIONS

![CI/CD Pipeline](https://github.com/RicardoDR14/PD_GITHUB_ACTIONS/actions/workflows/ci-cd.yml/badge.svg)

Exercício académico de avaliação: pipeline CI/CD com GitHub Actions para um "Hello World" estático servido por Nginx em Docker, publicado no GitHub Container Registry (GHCR).

---

## Pipeline

A pipeline executa em qualquer push (`branches: ["**"]`) e tem dois jobs:

| Job | Descrição |
|-----|-----------|
| `validate-commit` | Valida que a mensagem de commit segue o padrão Conventional Commits. Falha com `exit 1` se não cumprir. |
| `build-and-push` | Faz build da imagem Docker e publica no GHCR. Só corre se o job anterior passar (`needs: validate-commit`). |

---

## Validação de Commits

As mensagens de commit devem seguir o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>
```

**Tipos válidos:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `ci`, `chore`

### Exemplos válidos

```
feat: add hello world page
fix: correct nginx config
docs: update README
chore: initial project setup
ci: add GitHub Actions pipeline
refactor(app): simplify HTML structure
```

### Exemplos inválidos

```
updated stuff
WIP
fixed bug
Added new feature
```

---

## Correr localmente com Docker

**Build da imagem:**
```bash
docker build -t hello-world .
```

**Iniciar o container:**
```bash
docker run -p 8080:80 hello-world
```

Abre [http://localhost:8080](http://localhost:8080) no browser.

---

## Tags da imagem no GHCR

| Condição | Tags geradas |
|----------|-------------|
| Qualquer push | `sha-<7chars>` (ex: `sha-a1b2c3d`) |
| Push para `main` | `sha-<7chars>` + `latest` |
