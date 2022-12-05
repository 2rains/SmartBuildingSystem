# Next.js 시작하기

```
> npx create-next-app@latest
```

# Prisma 설치

```
> npm install prisma -D
> npx prisma init
```

# Prisma 초기 설정

```
warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.
> .gitignore 파일 안에 맨 밑에 `.env` 타이핑 하기(개인정보보호)

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no
tables yet, read https://pris.ly/d/getting-started
> DATABASE_URL-<내 데이터베이스 주소>

2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
> prisma/schema.prisma파일에 `mongodb` 추가
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"    <-----  이 부분에 추가
  url      = env("DATABASE_URL")
}

3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

*prettier 적용 안 될 땐 오른쪽 밑에 종모양 클릭 -> prisma 확장자 선택
```

# .env 설정

```
DATABASE_URL='mongodb+srv://아이디:비밀번호@cluster0.avnysgu.mongodb.net/디비파일명'
```

# Prisma DB 연결

```
# 데이터베이스에 스키마 업로드(서버 반영)
> npx prisma db push

# prisma studio 실행(데이터베이스 웹 클라이언트)
> npx prisma studio
(이 명령어가 실행 중에만 접속 가능)

# prisma client 설정
> npx prisma generate

```

# Rechart 설치

```
npm install recharts --save
```

# tailwindCSS 적용하기

```
> tailwindCSS 홈페이지 > Get Started > Framework Guides > Next.js 들어가서 설치
> VSCODE에서 tailwindCSS 플러그인 설치
> _app 파일에 import "../styles/globals.css"; 해야 사용 가능
```
