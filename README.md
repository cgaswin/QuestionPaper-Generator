# Question Paper Generator

This project is a part of the assessment for the reelo backend internship.

This project is a backend service that provides an API for managing and generating question papers. It includes functionality to add questions to a database and generate a question paper based on specific criteria.

## Installation

Clone the repo:

```bash
git clone https://github.com/cgaswin/QuestionPaper-Generator.git
cd QuestionPaper-Generator
```

Install the dependencies:

```bash
npm install
```
Run the development server:

```bash
npm run dev
```
Set the environment variables:

```bash
cp .env.example .env
# open .env and modify the environment variables
```

## Environment Variables

The environment variables can be found and modified in the `.env` file.

```bash
# Port Number
PORT = # default 4000

# MongoDB Database URI
DB_URI =

# CORS origin
CORS_ORIGIN = # default *
```

## API Endpoints

**Health Check route**:\
`GET api/v1/health` 

**Question Paper Routes**:\
`POST "/api/v1/seed/questions` - Seed Questions\
`POST "/api/v1/questions/add` - Add Questions\
`POST "/api/v1/questions/generate` - Generate Question Paper


## License

[MIT](LICENSE)



