import { ICoffee, ICoffeeResponse } from "@/interfaces/coffees";
import { Api } from "@/services";
import { TTypeOfModification } from "@/types/types";
import { useEffect, useState } from "react";
import { useAlert } from "./useAlert";

interface IUseCoffe {
  coffees: ICoffee<TTypeOfModification>[];
  setCoffees?: React.Dispatch<
    React.SetStateAction<ICoffee<TTypeOfModification>[]>
  >;
  loading: boolean;
}

export function useCoffee(): IUseCoffe {
  const [coffees, setCoffees] = useState<ICoffee<TTypeOfModification>[]>([]);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();

  const _getAllCoffees = async () => {
    try {
      const fetchcall = await Api.fetchData(
        `http://localhost:5555/api/v1/coffee`
      );
      const rsp =
        (await fetchcall.json()) as ICoffeeResponse<TTypeOfModification>;
      setCoffees(rsp.data);
      setLoading(false);
    } catch (e) {
      setCoffees([]);
      setLoading(false);
      showAlert("error", "Error", "Error while fetching data");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      _getAllCoffees();
    }, 1000);
  }, []);

  return { coffees, setCoffees, loading };
}
