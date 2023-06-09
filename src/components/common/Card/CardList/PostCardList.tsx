"use client";
import React from "react";
import PostCardItem from "@/components/common/Card/CardItem/PostCardItem";

function PostCardList({props}: any) {
  // 10개 이상이면 무한 스크롤 동작 시작
  return (
    <ul>
      {props ? (
        props.map((item: any) => <PostCardItem key={item.id} item={item}/>)
      ) : (
        <li className="mx-auto my-4 flex h-48 w-4/5 items-center justify-center rounded-xl shadow-md">
          작성한 콘텐츠가 없습니다
        </li>
      )}
    </ul>
  );
}

export default PostCardList;
