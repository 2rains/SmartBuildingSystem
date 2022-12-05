// 서버 함수임!!!
// 미리 데이터 받을 형식 갖춘 다음에 서버 만들어야 함
// DB READ // 데이터 가져오는 함수

import { Co2, Humi, Light, Pir, Temp } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { idText } from "typescript";
import client from "../../../libs/server/client";

interface Data {
  ok: boolean;
  a413?: Light[];
  a415?: Light[];
  a417?: Light[];
  error?: String;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  if (request.method !== "GET") {
    response.status(405).json({
      ok: false,
      error: `지원하지 않는 메서드 입니다 : ${request.method}`,
    });
    return;
  }
  try {
    const a413 = await client.light.findMany({
      where: {
        roomNum: 413,
      },
      take: 100, // 100개만 가져오기
    });
    const a415 = await client.light.findMany({
      where: {
        roomNum: 415,
      },
      take: 100, // 100개만 가져오기
    });
    const a417 = await client.light.findMany({
      where: {
        roomNum: 417,
      },
      take: 100, // 100개만 가져오기
    });
    console.log("light 읽기 ok");
    response.status(200).json({ ok: true, a413, a415, a417 });
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err} LIGHT READ ERR` });
  } finally {
    await client.$disconnect();
  }
}
