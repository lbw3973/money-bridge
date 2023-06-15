import React from "react";
import InformationCheck from "../findEmailPage/InformationCheck";
import { usePathname, useRouter } from "next/navigation";

function SelectInformation() {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <>
      <p className="mb-10 mt-14 text-xl font-bold leading-7">해당하는 정보를 선택해주세요.</p>
      <InformationCheck />
      <button
        className="mb-24 mt-[266px] h-14 w-full rounded-[8px] bg-primary-normal text-xl font-bold leading-7 text-white"
        onClick={() => router.push(`/findPassword/${pathName.split("/")[2]}/resetPassword`)}
      >
        비밀번호 재설정
      </button>
    </>
  );
}

export default SelectInformation;