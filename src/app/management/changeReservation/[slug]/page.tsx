"use client";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import TopNav from "@/components/common/TopNav";
import React, { useEffect, useRef, useState } from "react";
import res from "../../../../mocks/kjun/managementReservations.json";
import ConsultationNoteSection from "@/components/common/ConsultationNoteSection";
import DoubleButton from "@/components/common/DoubleButton";
import ScheduleSection from "@/components/managementPage/changeReservationPage/ScheduleSection";
import dayjs, { Dayjs } from "dayjs";
import CalendarModal from "@/components/managementPage/changeReservationPage/CalendarModal";
import TimeModal from "@/components/managementPage/changeReservationPage/TimeModal";
import CounselingModal from "@/components/managementPage/changeReservationPage/CounselingModal";

interface Props {
  params: {
    slug: string;
  };
}

interface ReservationData {
  pbId: number;
  profileImage: string;
  name: string;
  phoneNumber: string;
  reservationId: number;
  candidateTime1: string;
  candidateTime2: string;
  time: string;
  location: string;
  locationAddress: string;
  goal: string;
  question: string;
  type: string;
}

function ChangeReservationPage({ params }: Props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSelectSchedule, setIsSelectSchedule] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [isOpenTime, setIsOpenTime] = useState(false);
  const [changeState, setChangeState] = useState({
    time: "",
    type: "",
    locationName: "",
    locationAddress: "",
  });

  // 더미데이터
  const {
    pbId,
    profileImage,
    name,
    phoneNumber,
    reservationId,
    candidateTime1,
    candidateTime2,
    time,
    location,
    locationAddress,
    goal,
    question,
    type,
  } = res.data.reservationList[0];
  const consultTime = {
    consultStart: "09:00",
    consultEnd: "18:00",
    notice: "월요일 13시 제외",
  };

  // profileImage데이터는 api등록 후 UserReservationItem props 내려주고 코드 변경하기
  const role = "PB";

  useEffect(() => {
    console.log(changeState);
  }, [changeState]);

  // 상담 희망 일정(1순위, 2순위) 선택 버튼
  const selectTimeHandler = (clickTime: string) => {
    setIsSelectSchedule(!isSelectSchedule);
    setChangeState(prevState => ({
      ...prevState,
      time: clickTime,
    }));
  };

  // 방문상담 수정 오픈 버튼
  const modalOpenHandler = () => {
    setIsOpenModal(!isOpenModal);
  };

  // 상담 방식 선택 버튼
  const selectTypeHandler = (clickType: string) => {
    setChangeState(prevState => ({
      ...prevState,
      type: clickType,
    }));
    setIsOpenModal(!isOpenModal);
  };

  // 상담 일정 변경 캘린더 오픈 버튼
  const calendarOpenHandler = () => {
    setIsOpenCalendar(!isOpenCalendar);
  };

  // 상담 일정 변경 시간 오픈 버튼
  const timeOpenHandler = () => {
    setIsOpenTime(!isOpenTime);
  };

  // 상담일정 변경
  const handleCalendarSelect = (e: Dayjs) => {
    const date = e.format();
    setIsDisabled(false);
    setChangeState(prevState => ({
      ...prevState,
      time: date,
    }));
  };

  // 상담 시간 변경
  const handleTimeSelect = (time: string) => {
    const hour = Number(time.split(":")[0]);
    const candidate = dayjs(changeState.time, "YYYY-MM-DD").set("hour", hour).format("YYYY-MM-DDTHH:mm:ss");
    setChangeState(prevState => ({
      ...prevState,
      time: candidate,
    }));
  };

  // 날짜 선택
  const dateSelectClick = () => {
    setIsOpenCalendar(!isOpenCalendar);
    setIsOpenTime(!isOpenTime);
  };

  // 날짜 선택
  const timeSelectClick = () => {
    setIsOpenTime(!isOpenTime);
  };

  const locationChangeClick = () => {
    console.log("주소변경");
  };

  const customerInfoClickHandler = () => {
    console.log("고객정보페이지 이동");
  };
  const undoChangeClickHandler = () => {
    console.log("변경/취소 버튼");
  };

  const confirmedClickHandler = () => {
    console.log("상담확정 버튼");
  };

  const scheduleSectionProps = { candidateTime1, candidateTime2, isSelectSchedule, selectTimeHandler };
  const noteSectionProps = { role, goal, question };
  const calendarSectionProps = {
    calendarOpenHandler,
    isDisabled,
    setIsDisabled,
    handleCalendarSelect,
    dateSelectClick,
  };

  const timeModalProps = {
    timeOpenHandler,
    consultTime,
    selectedDate: changeState.time,
    handleTimeSelect,
    timeSelectClick,
    isDisabled,
  };
  const counselingModal = {
    modalOpenHandler,
    type,
    isOpenModal,
    selectTypeHandler,
  };

  return (
    <div>
      <TopNav title="예약 변경" hasBack={true} />

      <div className="pb_top_Phrase mt-4">
        <span className="text-white ">예약일자를 확정지어야 상담예약이 확정됩니다.</span>
      </div>
      <UserReservationItem buttonName="고객 정보" onClickhandler={customerInfoClickHandler} isRole={"USER"}>
        <p className="font-bold">{name}</p>
        <p className="text-xs ">{phoneNumber}</p>
        <p className="text-xs ">{type === "VISIT" ? "방문상담" : "유선상담"} </p>
      </UserReservationItem>
      <section className="mt-6 w-full rounded-md bg-white p-4 pb-6 text-xs">
        <ScheduleSection {...scheduleSectionProps} />
        <section className="my-4 flex justify-between border-b-1 pb-4">
          <h3 className="font-bold">상담 일정이 변경되셨나요?</h3>
          <button
            onClick={calendarOpenHandler}
            className="flex w-[150px] items-center justify-center rounded-md bg-primary-normal py-1 text-white"
          >
            확정된 일정 입력하기
          </button>
        </section>

        <section className="mb-4 flex flex-col border-b-1 pb-4">
          <CounselingModal {...counselingModal} />
          <div className="mt-2 flex justify-between">
            <span className="font-bold">미팅 장소</span>
            <span className="text-ellipsisxt-primary-normal">{location}</span>
          </div>{" "}
          <div className="mt-2 flex justify-end">
            <button
              onClick={locationChangeClick}
              className="flex w-[150px] items-center justify-center rounded-md bg-primary-normal py-1 text-white"
            >
              주소변경
            </button>
          </div>
        </section>
        <ConsultationNoteSection {...noteSectionProps} />
        <div className="flex flex-col items-center pt-6 text-xs">
          <p className="font-bold text-primary-normal">투자자와 유선연락을 통해 일정과 장소를 정하신 후</p>
          <p className="text-primary-normal">예약을 확정하시면 투자자에게 상담 확정 알림이 전송됩니다.</p>
        </div>
        <DoubleButton
          firstTitle={"변경/취소"}
          secondTitle={"상담 완료"}
          firstClickFunc={undoChangeClickHandler}
          secondClickFunc={confirmedClickHandler}
          role={"PB"}
        />
      </section>

      {isOpenCalendar && <CalendarModal {...calendarSectionProps} />}
      {isOpenTime && <TimeModal {...timeModalProps} />}
    </div>
  );
}

export default ChangeReservationPage;