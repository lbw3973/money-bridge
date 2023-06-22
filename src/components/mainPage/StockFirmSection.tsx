"use client";

import React from "react";
import CompanyList from "../common/CompanyList";
import { companyListData } from "@/mocks/seon/companyList";
import { usePBListQueries } from "@/hooks/usePBListQueries";
import { Carousel } from "antd";
import { chunkArray } from "@/utils/chunkArray";
import Image from "next/image";
import profile from "/public/assets/images/profile.svg";

const LI_STYLE =
  "flex flex-col py-2 justify-between w-full h-[60px] justify-center items-center rounded-sm cursor-pointer";

function StockFirmSection() {
  const { handleIDClick } = usePBListQueries();
  const chunkedCompanyList = chunkArray([{ id: "ALL", logo: null, name: "전체보기" }, ...companyListData], 8);

  return (
    <section className="relative w-full mt-3 ">
      <h3 className="text-xl font-bold">
        선호하는 증권사의 <br /> PB를 만나보세요.
      </h3>
      <Carousel draggable={true} className="p-6 m-4 bg-white rounded-md shadow-md">
        {chunkedCompanyList.map((companyList, index) => (
          <div key={index}>
            <ul className="grid grid-cols-4 gap-6">
              {companyList.map(company => (
                <li
                  data-id={company.id}
                  onClick={handleIDClick}
                  className={`${LI_STYLE}${company.name === "전체보기" && "!justify-center"}`}
                  key={company.id}
                >
                  {company.logo && <Image src={profile} alt={company.name} width={24} height={24} />}
                  {company.name === "전체보기" ? (
                    <p>
                      전체
                      <br />
                      보기
                    </p>
                  ) : (
                    <p className="text-xs font-bold leading-3">{company.name}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Carousel>
    </section>
  );
}

export default StockFirmSection;
