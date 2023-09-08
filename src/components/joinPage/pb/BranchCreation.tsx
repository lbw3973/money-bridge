import { registerBranch } from "@/app/apis/services/common";
import { searchLoadLocation } from "@/app/apis/services/location";
import ButtonModal from "@/components/common/ButtonModal";
import ErrorModal from "@/components/common/ErrorModal";
import SingleButton from "@/components/common/SingleButton";
import ModalLayout from "@/components/reservationPage/ModalLayout";
import { useBranchRestrationStore } from "@/store/branchRestrationStore";
import { useMutation } from "@tanstack/react-query";
import React, { MouseEvent, useEffect, useState } from "react";

const TEXT_STYLE = "mr-2 font-bold w-[70px]";

function BranchCreation() {
  const [isErrorModal, setIsErrorModal] = useState(false);
  const { selectCompany, setSelectCompany, setIsRegSelect, setIsButtonOpen } = useBranchRestrationStore();

  const { mutate } = useMutation(registerBranch, {
    onSuccess: data => {
      setIsButtonOpen(true);
    },
    onError: () => {
      setIsErrorModal(true);
    },
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate({
      companyId: selectCompany.companyId,
      name: selectCompany.name.split(" ")[1],
      address: selectCompany.address,
      specificAddress: selectCompany.specificAddress,
    });
  };

  useEffect(() => {
    const geoLocationFunc = async (search: string) => {
      const data = await searchLoadLocation(search);
      const loadName = data[0].road_address.address_name;
      setSelectCompany({
        ...selectCompany,
        address: loadName,
      });
    };
    geoLocationFunc(selectCompany.address);
  }, [selectCompany.latitude]);

  const handleSpecificAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectCompany({
      ...selectCompany,
      specificAddress: e.target.value,
    });
  };

  const modalContents = {
    content: "등록되어 있는 지점입니다. 다시 확인해주세요.",
    confirmText: "확인",
    confirmFn: () => setIsErrorModal(false),
  };
  return (
    <section className="h-[460px]">
      <h3 className="mb-8 text-xl font-bold leading-7">지점 등록</h3>
      <p className="mb-4">선택한 지점의 상세 주소를 작성해주세요.</p>
      <div className="flex py-2">
        <p className={TEXT_STYLE}>지점 명</p>
        {selectCompany.name}
      </div>
      <div className="flex py-2">
        <p className={TEXT_STYLE}>지점 주소</p>
        {selectCompany.address}
      </div>
      <form className="py-2 ">
        <p className={`${TEXT_STYLE} `}>상세 주소</p>
        <input onChange={handleSpecificAddress} type="text" className="mt-2 w-full border-1 border-gray-normal p-2" />
        <button
          onClick={handleClick}
          className="mt-6 h-14 w-full items-end rounded-md bg-primary-normal text-base font-bold text-white"
        >
          등록하기
        </button>
      </form>
      <ButtonModal modalContents={modalContents} isOpen={isErrorModal} setIsOpen={setIsErrorModal} />
    </section>
  );
}

export default BranchCreation;
