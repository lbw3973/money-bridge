"use client";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/common/TopNav";
import Content from "@/components/pbdetailPage/Content";
import Intro from "@/components/pbdetailPage/Intro";
import About from "@/components/pbdetailPage/About";
import { getPbNotLogin, getPbProfile } from "@/app/apis/services/pb";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { ILoginedUserInfo } from "@/types/common";
import { AxiosError } from "axios";
import { IloginProfile, IProfile } from "@/types/pb";
import { IDataResponse } from "@/types/common";
import Profile from "@/components/pbdetailPage/Profile";

function PbDetailInfo() {
  const pathname: string = usePathname();
  const id: number = Number(pathname.split("/").pop());
  const { data: profile } = useQuery<IDataResponse<IProfile>, AxiosError>([`/profile/${id}`], () => getPbNotLogin(id));
  const { data: authProfile } = useQuery<IDataResponse<IloginProfile>, AxiosError>([`/auth/profile/${id}`], () =>
    getPbProfile(id),
  );
  const { data: userData, isLoading } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["/auth/account"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });

  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    if (!isLoading) setMounted(true);
  }, [isLoading]);
  if (!profile?.data || (!mounted && !authProfile?.data)) return null;

  return (
    <div className="mb-24 flex w-full flex-col">
      <TopNav title="PB 상세프로필" hasBack={true} />
      {userData && authProfile?.data ? (
        <>
          <Intro introData={authProfile?.data} />
          <Content contentData={authProfile?.data} />
          <About aboutData={authProfile?.data} role={userData?.role} Id={userData?.id} />
        </>
      ) : (
        <Profile notLoginData={profile?.data} />
      )}
    </div>
  );
}

export default PbDetailInfo;
