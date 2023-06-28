import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "PB 북마크",
};

function BookmarkLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default BookmarkLayout;
