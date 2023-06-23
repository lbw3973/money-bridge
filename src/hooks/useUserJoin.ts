import { userJoin } from "@/app/apis/services/auth";
import { useAuthenticationStore } from "@/store/authenticationStore";
import { useJoinStore } from "@/store/joinStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";

export const useUserJoin = () => {
  const { resetInformations } = useJoinStore();
  const { resetCode } = useAuthenticationStore();
  const pathName = usePathname();
  const joinType = pathName.split("/")[2];
  const router = useRouter();

  const { mutate } = useMutation(userJoin, {
    onSuccess: data => {
      console.log(data);
      resetInformations();
      resetCode();
      router.push(`/join/${joinType}/complete`);
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });
  return mutate;
};