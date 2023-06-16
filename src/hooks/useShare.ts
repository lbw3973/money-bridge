import { useState } from "react";
import shareKakao from "@/utils/shareKakao";

const useShare = (url: any, title?: any, description?: any, imageUrl?: any) => {
  const [isShare, setIsShare] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [isCopyOpen, setIsCopyOpen] = useState(false);
  const [isKaKaoOpen, setIsKaKaoOpen] = useState(false);

  const shareHandler = () => {
    setIsShareOpen(true);
    setIsShare(!isShare);
  };

  const shareContents = {
    content: "PB 정보 공유하기",
    confirmText: "카카오톡으로 공유",
    cancelText: "링크 복사",
    confirmFn: () => {
      setIsShareOpen(false);
      setIsKaKaoOpen(true);
    },
    cancelFn: () => {
      navigator.clipboard.writeText(url);
      setIsShareOpen(false);
      setIsCopy(!isCopy);
      setIsCopyOpen(true);
    },
  };

  const copyContents = {
    content: "링크가 복사되었습니다.",
    confirmText: "확인",
    confirmFn: () => {
      setIsCopyOpen(false);
    },
  };

  if (isKaKaoOpen) {
    shareKakao(url, title, description, imageUrl);
    setIsKaKaoOpen(false);
  }

  return {
    isShare,
    isShareOpen,
    setIsShareOpen,
    shareHandler,
    shareContents,
    isCopy,
    isCopyOpen,
    setIsCopyOpen,
    copyContents,
  };
};

export default useShare;