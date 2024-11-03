import { ICoffee, ICoffeeDetailsResponse } from "@/interfaces/coffees";
import { Api } from "@/services";
import { TTypeOfModification } from "@/types/types";
import { useEffect, useState } from "react";
import { useModifications } from "./useModifications";
import { IModifications } from "@/interfaces/modifications";
import {
  MODIFICATIONS_EVENTS,
  modificationsEmitter,
} from "../services/modificationsEmitter";
import { useAlert } from "./useAlert";

export function useCoffeeDetails(
  id: string
): [
  ICoffee<TTypeOfModification> | undefined,
  React.Dispatch<React.SetStateAction<ICoffee<TTypeOfModification> | undefined>>
] {
  const { getAllModifications } = useModifications();
  const [selectedCoffe, setSelectedCoffe] = useState<
    ICoffee<TTypeOfModification> | undefined
  >();
  const { showAlert } = useAlert();

  const _getCoffeeDetails = async () => {
    try {
      const fetchcall = await Api.fetchData(
        `http://localhost:5555/api/v1/coffee/${id}`
      );
      const rsp =
        (await fetchcall.json()) as ICoffeeDetailsResponse<TTypeOfModification>;

      let coffee = rsp.data;
      let modifications = await getAllModifications();

      coffee.modifications = _mergeModifications(
        rsp.data.modifications,
        modifications
      );
      setSelectedCoffe(coffee);
    } catch (e) {
      setSelectedCoffe(undefined);
      showAlert("error", "Error", "Error while fetching data");
    }
  };

  const _mergeModifications = (
    coffeeModifications?: IModifications<TTypeOfModification>[],
    globalModifications?: IModifications<TTypeOfModification>[]
  ): IModifications<TTypeOfModification>[] => {
    if (!globalModifications) return [];

    return globalModifications.map((defaultMod) => {
      const existingMod = coffeeModifications?.find(
        (mod) => mod.id === defaultMod.id
      );

      return existingMod
        ? { ...defaultMod, value: existingMod.value }
        : defaultMod;
    });
  };

  useEffect(() => {
    _getCoffeeDetails();

    const unsub = modificationsEmitter.subscribe(
      MODIFICATIONS_EVENTS.CHANGED,
      (val) => {
        setSelectedCoffe((prevCoffee) => {
          if (!prevCoffee) return prevCoffee;
          let updatedModifications = prevCoffee.modifications.map((m) => {
            if (m.id === val.id) return val;
            return m;
          });
          return {
            ...prevCoffee,
            modifications: updatedModifications,
          };
        });
      }
    );

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    modificationsEmitter.publish(
      MODIFICATIONS_EVENTS.REFRESH,
      selectedCoffe?.modifications
    );
  }, [selectedCoffe?.modifications]);

  return [selectedCoffe, setSelectedCoffe];
}
