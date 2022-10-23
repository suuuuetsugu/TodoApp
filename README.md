# TodoApp
タスク管理アプリ

## Description
- タスクの登録・編集・削除
- タスク一覧および詳細閲覧
- タスクのカテゴリー登録・編集

## Requirement
- [Next.js](https://nextjs.org/): 12.2.5
- [TypeScript](https://www.typescriptlang.org/): 4.7.4
- [Express](https://expressjs.com/ja/): 4.16.4
- [Node.js](https://nodejs.org/ja/): 16.16.0
- [Prisma](https://www.prisma.io/): 4.2.1
- [MySQL](https://www.mysql.com/jp/): 8.0
- [Docker](https://www.docker.com/): 20.10.17

## Getting Started
1.Clone this repository
```bash
$ git clone https://github.com/suuuuetsugu/TodoApp.git
```
2.Move to the root directory
```bash
$ cd TodoApp
```
3.Download dependencies
```bash
$ docker-compose run -w /app/next --rm front npm install
```
4.Run the App
```bash
$ docker-compose up -d
```
5.Open http://localhost:3000 with your browser to see the App

## Author
suuuuetsugu

Thank you!
