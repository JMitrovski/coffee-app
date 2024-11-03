import { IModifications } from "@/interfaces/modifications";
import { TTypeOfModification } from "@/types/types";

export class TransformService {
  static instance: TransformService;

  static getInstance() {
    if (!TransformService.instance) {
      TransformService.instance = new TransformService();
    }
    return TransformService.instance;
  }

  capitalizeText(text: string) {
    if (!text) return "";
    return text.toUpperCase();
  }

  mapModificationsNames(text: string): string {
    if (!text) return "";

    let tmpText = text;

    if (text === "packsOfSuggar") {
      tmpText = "packs of suggar";
    }

    return tmpText.charAt(0).toUpperCase() + tmpText.slice(1).toLowerCase();
  }

  stringifyModifiers(modifiers: IModifications<TTypeOfModification>[]): string {
    if (!modifiers) return "";
    return modifiers
      .filter((el) => typeof el.value !== "object")
      .map((m) => {
        return typeof m.value === "number"
          ? `• ${this.mapModificationsNames(m.name)} x ${m.value}`
          : `• ${
              (!m.value as boolean) ? `No ` : ``
            }${this.mapModificationsNames(m.name)}`;
      })
      .join("\n");
  }
}
