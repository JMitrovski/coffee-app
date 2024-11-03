import {
  IModifications,
  IModificationsResponse,
} from "@/interfaces/modifications";
import { Api } from "@/services";
import { TTypeOfModification } from "@/types/types";

export function useModifications() {
  const getAllModifications = async (): Promise<
    IModifications<TTypeOfModification>[]
  > => {
    const fetchcall = await Api.fetchData(
      `http://localhost:5555/api/v1/modifications`
    );
    const rsp =
      (await fetchcall.json()) as IModificationsResponse<TTypeOfModification>;

    return rsp.data;
  };

  return { getAllModifications };
}
