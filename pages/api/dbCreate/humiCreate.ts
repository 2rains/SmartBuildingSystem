// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import csvToJSON from "../../../components/csvToJSON";
import { prisma } from "@prisma/client";
import client from "../../../libs/server/client";
import { isPrivateIdentifier } from "typescript";

type Data = {
  name: string;
  createMany?: any;
  arr_json?: any;
  err?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let arr_json: any[];
  const fs = require("fs");
  fs.readdir("/building_data", (err: any, files: any[]) => {
    //C드라이브 디렉토리 파일명 읽기 C:/building_data
    if (err) {
      throw err;
    } else
      try {
        for (let i = 0; i < files.length; i++) {
          // console.log(files[i]); // 전체 파일명 ok
          if (files[i] === "humi") {
            // console.log(files[i] + "123"); // co2파일명 ok
            // console.log("CO2 OK");
            fs.readdir(
              "/building_data/" + files[i],
              async (err: any, files2: any[]) => {
                //C드라이브 디렉1토리 파일명 읽기 C:/building_data/files[i]
                // console.log(files2.length);
                for (let j = 0; j < files2.length; j++) {
                  console.log(files2[j]);
                  const file_csv = fs.readFileSync(
                    "/building_data/" + files[i] + "/" + files2[j],
                    "utf8"
                  ); // csv파일 읽기
                  // console.log(file_csv);
                  const string_csv = file_csv.toString(); // csv파일 문자열로 만듦
                  arr_json = csvToJSON(string_csv); // 문자열->json
                  const createMany = await client.humi.createMany({
                    data: arr_json,
                  });
                }
              }
            );
          }
        }
        res.status(200).json({ name: "HUMI OK", arr_json }); // 응답메소드를 여러 번 호출해서 에러남(1번 하면 응답이 끝남)
      } catch (err) {
        res.status(500).json({ name: "실패" });
      }
  });
}

// 5초마다 DB에 Create 할 때 사용

// let i = 0;
// let timer: string | number | NodeJS.Timer | undefined;

// try {
//   timer = setInterval(async () => {
//     const createCo2 = await client.humidity.create({
//       data: arr_json[i],
//     });
//     console.log(i);
//     i++;
//     if (i > arr_json.length) clearInterval(timer);
//   }, 5000);
//   res.status(200).json({ name: "humidity OK" });
// } catch (err) {
//   res.status(500).json({ name: "실패", err });
// }

//// csv to json으로 바꿈!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//// json -> mongoDB에 insert시킴(createMany())
