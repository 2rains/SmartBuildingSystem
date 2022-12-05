// 실제 데이터 표출 공간(메인 화면을 보여줌)
import Link from "next/link";
import { useRouter } from "next/router";
import { cls } from "../libs/client/utils";

interface LayoutProps {
  title: string;
  children: React.ReactNode; // 몸통안에 태그 넣는 법!
}

export default function Layout(props: LayoutProps) {
  // Layout 프롭스 받아오려면 (props 적으면 됨)-> index, data, setting 파일에서 <layout title:{"HOME, SETTING, DATA"}적으면 웹에 적용됨
  const router = useRouter();

  function 다크모드전환() {
    document.body.classList.toggle("dark");
    // document.querySelector("body")?.classList.toggle("dark"); 위랑 같음!
    // 어떤 요소에 classList.toggle을 하면 있으면 없애고 없으면 있게 만들어 줌!!
  }

  return (
    <div className="bg-[#8db2a5] bg-fixed h-[100vh]">
      <div className="flex justify-center ">
        <div className="flex justify-center font-mono text-[35px] bg-[#394e3f] rounded-xl text-[#ffffff] py-5 px-24 mt-10">
          식물 재배 자동화 시스템
        </div>
      </div>
      <div className="pl-11 mt-10 bg-[#8db2a5]">{props.children}</div>
    </div>
  );
}
