import TopNav from "@/components/common/TopNav";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "상담 예약 완료",
};

function ReservationLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TopNav title="상담 예약 완료" hasBack={true} />
      {children}
    </>
  );
}

export default ReservationLayout;
