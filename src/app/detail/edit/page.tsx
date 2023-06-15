"use client";
import React from "react";
import TopNav from "@/components/common/TopNav";
import Content from "@/components/pbdetailPage/Content";
import Intro from "@/components/pbdetailPage/Intro";
import authProfile from "@/mocks/hyeon17/PbDetail/Profile/authProfile.json";

function PbDetailEdit() {
  const data = authProfile.data;
  const introData = {
    id: data.id,
    profile: data.profile,
    name: data.name,
    isBookmarked: data.isBookmarked,
    branchName: data.branchName,
    msg: data.msg,
    companyName: data.companyName,
    companyLogo: data.companyLogo,
    reserveCount: data.reserveCount,
    reviewCount: data.reviewCount,
  };

  const contentData = {
    intro: data.intro,
    name: data.name,
    speciality1: data.speciality1,
    speciality2: data.speciality2,
    career: data.career,
    award: data.award,
  };

  return (
    <>
      <TopNav title="PB 상세프로필" hasBack={true} />
      <Intro introData={introData} edit={true} />
      <Content contentData={contentData} edit={true} />
    </>
  );
}

export default PbDetailEdit;