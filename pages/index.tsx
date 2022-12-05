// 메인화면(Layout에 props.children으로 이 곳 데이터가 불려 감)
import { Co2, Temp, Humi, Light, Pir } from "@prisma/client";
import Layout from "../components/Layout";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { isPropertySignature } from "typescript";
import { useRouter } from "next/router";

type Data = {
  name: string;
  createMany?: any;
  arr_json?: any;
};

export default function Home(this: any) {
  const [addDevice, setAddDevice] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); //에러 메세지(입력 안 했을 경우)
  const [enterDevice, setEnterDevice] = useState("");
  const [type, setType] = useState(""); // 데이터 종류
  const [all413, setAll413] = useState<Co2[]>([]);
  const [all415, setAll415] = useState<Co2[]>([]);
  const [all417, setAll417] = useState<Co2[]>([]);
  const [all, setAll] = useState<Co2[]>([]);

  // useEffect(() => {
  //   fetch("/api/dbread/co2Read")
  //   .then((res) => res.json())
  //   .then((json) => {
  //     // console.log(json.co2413[0]);
  //     setCo2(json.co2413);
  //   });
  // }, []);

  const router = useRouter();

  function dbCreate(type: any) {
    // DB CREATE
    fetch(`/api/dbCreate/${type}Create`, {
      method: "POST",
    });
    try {
      console.log("버튼클릭" + type);
    } catch (error) {
      console.log(errorMessage);
    }
  }

  function dbRead(type: any) {
    // DB READ
    try {
      fetch(`/api/dbRead/${type}Read`)
        .then((res) => res.json())
        .then(
          (json) => (
            setAll413(json.a413), setAll415(json.a415), setAll417(json.a417)
          )
        );
      console.log("버튼클릭" + type);
    } catch (error) {
      console.log(errorMessage);
    }
  }

  return (
    <Layout title={"HOMEURL"}>
      {/*  <Layout> 태그 사용해야 Layout 값이 계속 보여짐ex) Layout에서 만든 메뉴*/}
      <div className="mr-16 flex justify-between">
        <div className="">
          <div className="border-4 rounded-lg w-[500px] mb-4">
            <div className=" p-5 text-3xl font-bold text-[#334232]">
              DB Insert
            </div>
            <div className="flex justify-evenly pb-3">
              <button
                value={"co2"}
                onClick={(e) => dbCreate(e.currentTarget.value)}
                className="bg-[#f4eabd] p-3 text-sm font-semibold border-[#3a4e46] rounded-xl border-4"
              >
                CO2
              </button>
              <button
                value={"humi"}
                onClick={(e) => dbCreate(e.currentTarget.value)}
                className="bg-[#f4eabd] p-3 text-sm font-semibold border-[#3a4e46] rounded-xl border-4"
              >
                HUMIDITY
              </button>
              <button
                value={"temp"}
                onClick={(e) => dbCreate(e.currentTarget.value)}
                className="bg-[#f4eabd] p-3 text-sm font-semibold border-[#3a4e46] rounded-xl border-4"
              >
                TEMPERATURE
              </button>
              <button
                value={"light"}
                onClick={(e) => dbCreate(e.currentTarget.value)}
                className="bg-[#f4eabd] p-3 text-sm font-semibold border-[#3a4e46] rounded-xl border-4"
              >
                LIGHT
              </button>
              <button
                value={"pir"}
                onClick={(e) => dbCreate(e.currentTarget.value)}
                className="bg-[#f4eabd] p-3 text-sm font-semibold border-[#3a4e46] rounded-xl border-4"
              >
                PIR
              </button>
            </div>
          </div>

          <div className="border-4 rounded-lg w-[500px]">
            <div className=" p-5 text-3xl font-bold text-[#334232]">
              DB 불러오기
            </div>
            <div className="flex justify-evenly pb-3">
              <button
                value={"co2"}
                onClick={(e) => dbRead(e.currentTarget.value)}
                className="bg-[#f4eabd] p-3 text-sm font-semibold border-[#3a4e46] rounded-xl border-4"
              >
                CO2
              </button>
              <button
                value={"humi"}
                onClick={(e) => dbRead(e.currentTarget.value)}
                className="bg-[#f4eabd] p-3 text-sm font-semibold border-[#3a4e46] rounded-xl border-4"
              >
                HUMIDITY
              </button>
              <button
                value={"temp"}
                onClick={(e) => dbRead(e.currentTarget.value)}
                className="bg-[#f4eabd] p-3 text-sm font-semibold border-[#3a4e46] rounded-xl border-4"
              >
                TEMPERATURE
              </button>
              <button
                value={"light"}
                onClick={(e) => dbRead(e.currentTarget.value)}
                className="bg-[#f4eabd] p-3 text-sm font-semibold border-[#3a4e46] rounded-xl border-4"
              >
                LIGHT
              </button>
              <button
                value={"pir"}
                onClick={(e) => dbRead(e.currentTarget.value)}
                className="bg-[#f4eabd] p-3 text-sm font-semibold border-[#3a4e46] rounded-xl border-4"
              >
                PIR
              </button>
            </div>
          </div>
        </div>
        <div className=" w-[150px] font-mono text-center">
          <div className="text-center font-semibold font-mono text-lg border-4 rounded-md bg-[#93a9cc]">
            413호 Data{type}
          </div>
          <div className="flex justify-around">
            <div className="text-center font-semibold font-mono text-base">
              TIME
            </div>
            <div className="text-center font-semibold font-mono text-base ">
              VALUE
            </div>
          </div>
          {all413.length !== 0 ? (
            all413.map((data) => {
              return (
                <div key={data.id}>
                  {data.time} {data.value}
                </div>
              );
            })
          ) : (
            <div>데이터가 없습니다</div>
          )}
        </div>

        <div className="w-[150px] font-mono text-center">
          <div className="text-center font-semibold font-mono text-lg border-4  rounded-md bg-[#93a9cc]">
            415호 Data{type}
          </div>
          <div className="flex justify-around">
            <div className="text-center font-semibold font-mono text-base">
              TIME
            </div>
            <div className="text-center font-semibold font-mono text-base ">
              VALUE
            </div>
          </div>

          {all415.length !== 0 ? (
            all415.map((data) => {
              return (
                <div key={data.id}>
                  {data.time} {data.value}
                </div>
              );
            })
          ) : (
            <div>데이터가 없습니다</div>
          )}
        </div>
        <div className="w-[150px] font-mono text-center">
          <div className="text-center font-semibold font-mono text-lg border-4  rounded-md bg-[#93a9cc]">
            417호 Data{type}
          </div>
          <div className="flex justify-around">
            <div className="text-center font-semibold font-mono text-base">
              TIME
            </div>
            <div className="text-center font-semibold font-mono text-base ">
              VALUE
            </div>
          </div>
          {all417.length !== 0 ? (
            all417.map((data) => {
              return (
                <div key={data.id}>
                  {data.time} {data.value}
                </div>
              );
            })
          ) : (
            <div>데이터가 없습니다</div>
          )}
        </div>
      </div>
    </Layout>
  );
}
