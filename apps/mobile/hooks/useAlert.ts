import Toast, { ToastType } from "react-native-toast-message";

interface IUseAlert {
  showAlert: (type: ToastType, text1: string, text2: string) => void;
  hideAlert: () => void;
}

export function useAlert(): IUseAlert {
  const showAlert = (type: ToastType, text1: string, text2: string) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      onPress() {
        Toast.hide();
      },
    });
  };

  const hideAlert = () => {
    Toast.hide();
  };

  return { showAlert, hideAlert };
}
