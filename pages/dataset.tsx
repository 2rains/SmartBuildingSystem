// ********

import { Co2, Temp, Humi, Light, Pir } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";

type Data = {
  name: string;
  createMany?: any;
  arr_json?: any;
};

const Home: NextPage = () => {
  const [addDevice, setAddDevice] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); //에러 메세지(입력 안 했을 경우)
  const [enterDevice, setEnterDevice] = useState("");
  const [co2, setCo2] = useState<Co2[]>([]);
  const [temp, setTemp] = useState<Temp[]>([]);
  const [light, setLight] = useState<Pir[]>([]);
  const [pir, setPir] = useState<Light[]>([]);
  const [humi, setHumi] = useState<Humi[]>([]);

  useEffect(() => {
    fetch("/api/dbread/co2Read")
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.co2413[0]);
        setCo2(json.co2413);
      });
  }, []);

  return (
    <Layout title={"HOMEURL"}>
      <div>
        <div>
          {co2
            ? co2.map((data) => {
                return <div key={data.id}>{data.value}</div>;
              })
            : ""}
        </div>
        <div> 식물 재배 자동화 시스템 TEST-dataset</div>
      </div>
    </Layout>
  );
};
export default Home;
