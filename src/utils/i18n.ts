import { Dispatch } from "@reduxjs/toolkit";
import * as RNLocalize from "react-native-localize";
import i18n, { resources } from "@/components/intl/translations";
import { setPreferredLanguage } from "@/redux/reducers/slice/preferences";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Initializes or updates the preferred language.
 *
 * If no preferred language is provided, it defaults to the first locale detected by `react-native-localize`
 * or falls back to English ("en"). Updates the language in the app's internationalization configuration
 * and dispatches the preferred language to the Redux store.
 *
 * @param {string | null} preferredLanguage - The user's preferred language code (e.g., "en", "fr", etc.), or null if not set.
 * @param {Dispatch} dispatch - The Redux dispatch function to update the preferred language in the store.
 */
export const initializeLanguage = (
  preferredLanguage: string | null,
  dispatch: Dispatch,
): void => {
  try {
    const fallbackLanguage = "en_US"; // Default fallback language

    if (!preferredLanguage) {
      const locale =
        RNLocalize.getLocales()[0]?.languageCode || fallbackLanguage;
      dispatch(setPreferredLanguage({ code: locale, label: locale }));
      i18n.changeLanguage(locale);
    } else if (!Object.keys(resources).includes(preferredLanguage)) {
      // If the preferred language is unsupported, fallback to default
      console.warn(
        `Unsupported language: ${preferredLanguage}. Falling back to ${fallbackLanguage}`,
      );
      i18n.changeLanguage(fallbackLanguage);
      dispatch(
        setPreferredLanguage({
          code: fallbackLanguage,
          label: fallbackLanguage,
        }),
      );
    } else {
      i18n.changeLanguage(preferredLanguage);
      dispatch(
        setPreferredLanguage({
          code: preferredLanguage,
          label: preferredLanguage,
        }),
      );
    }
  } catch (error) {
    console.error("Failed to initialize language:", error);
  }
};

export const formatNumberWithLocale = async (
  value: number | bigint | string,
) => {
  // Retrieve the locale from the Redux state
  // const locale = useSelector((state: RootState) => state.preferences?.preferredLanguageCode || "en_us");

  let format = await AsyncStorage.getItem("preferredLanguageLabel");
  if (format) {
    try {
      return new Intl.NumberFormat(
        format.replace("_", "-").toLowerCase(),
      ).format(value as number);
    } catch (error) {
      return value;
    }
  } else {
    return value;
  }
};
