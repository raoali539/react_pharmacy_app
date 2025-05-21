import moment from "moment";
import { Alert } from "react-native";

/**
 * Formats a date string to "YYYY-MM-DD".
 *
 * @param {moment.MomentInput} dateString - The input date to format.
 * @returns {string} - The formatted date in "YYYY-MM-DD" format or an empty string if invalid.
 */
export function formatDate(dateString: moment.MomentInput): string {
  // Parse the input date using a specific format and return formatted date if valid
  const parsedDate = moment(dateString, "ddd, MMM D");
  return parsedDate.isValid() ? parsedDate.format("YYYY-MM-DD") : "";
}

/**
 * Formats trip dates for display in a readable format.
 *
 * @param {string} checkInDate - The check-in date in ISO format.
 * @param {string} checkOutDate - The check-out date in ISO format.
 * @param {string} checkOutTime - The check-out time in "HH:mm" format.
 * @returns {string} - A formatted string representing the trip dates.
 */
export const formatTripsDate = (
  checkInDate: string,
  checkOutDate: string,
  checkOutTime: string,
): string => {
  // Convert check-in and check-out dates from UTC to local time
  const checkIn = moment.utc(checkInDate).local();
  const checkOut = moment.utc(checkOutDate).local();

  // Validate if both dates are valid
  if (!checkIn.isValid() || !checkOut.isValid()) return "Invalid date";

  // Format check-in and check-out times for display
  const checkInTimeFormatted = checkIn.format("h:mm A");
  const checkOutTimeFormatted = moment
    .utc(`${checkOutDate} ${checkOutTime}`, "YYYY-MM-DD HH:mm")
    .local()
    .format("h:mm A");

  // Extract month, day, and year for check-in and check-out
  const checkInMonth = checkIn.format("MMM");
  const checkOutMonth = checkOut.format("MMM");
  const checkInDay = checkIn.format("DD");
  const checkOutDay = checkOut.format("DD");
  const checkInYear = checkIn.format("YYYY");
  const checkOutYear = checkOut.format("YYYY");

  // Format the display string based on whether check-in and check-out are in the same month/year
  return checkInMonth === checkOutMonth && checkInYear === checkOutYear
    ? `${checkInTimeFormatted}, ${checkInMonth} ${checkInDay} - ${checkOutTimeFormatted}, ${checkOutMonth} ${checkOutDay}, ${checkInYear}`
    : `${checkInTimeFormatted}, ${checkInMonth} ${checkInDay} - ${checkOutTimeFormatted}, ${checkOutMonth} ${checkOutDay}, ${checkOutYear}`;
};

/**
 * Formats a UTC date string to "hh:mm A".
 *
 * @param {string} dateString - The UTC date string to format.
 * @returns {string} - The formatted time without seconds.
 */
export const getTimeWithoutSeconds = (dateString: string): string => {
  // Parse the date in UTC and return formatted time if valid
  const parsedDate = moment.utc(dateString);
  return parsedDate.isValid() ? parsedDate.format("hh:mm A") : "";
};

/**
 * Generates a time range string based on check-in and check-out dates.
 *
 * @param {string} checkIn - The check-in date in ISO format.
 * @param {string} checkout - The check-out date in ISO format.
 * @returns {string} - The formatted time range.
 */
export const getTimeRange = (checkIn: string, checkout: string): string => {
  // Parse check-in and check-out dates and format based on whether they are in the same month
  const startDate = moment(checkIn);
  const endDate = moment(checkout);

  return startDate.month() === endDate.month()
    ? `${startDate.format("MMM D")}-${endDate.format("D")}, ${endDate.format("YYYY")}`
    : `${startDate.format("MMM D")}-${endDate.format("MMM D")}, ${endDate.format("YYYY")}`;
};

/**
 * Calculates the difference in days between two dates.
 *
 * @param {string} startDate - The start date in ISO format.
 * @param {string} endDate - The end date in ISO format.
 * @returns {number} - The difference in days.
 */
export const getDifferenceInDays = (
  startDate: string,
  endDate: string,
): number => {
  // Convert dates to UTC
  const startDateUTC = convertToUTC(new Date(startDate));
  const endDateUTC = convertToUTC(new Date(endDate));
  
  // Calculate the difference in days, rounding up any partial day
  const diffInMilliseconds = endDateUTC.getTime() - startDateUTC.getTime();
  const diffInDays = diffInMilliseconds / (24 * 60 * 60 * 1000); // Convert milliseconds to days
  return Math.ceil(diffInDays); // Round up to the nearest whole number
};


/**
 * Converts a date to UTC.
 *
 * @param {Date} date - The local date to convert.
 * @returns {Date} - The UTC equivalent of the date.
 */
export const convertToUTC = (date: Date): Date => {
  // Adjust the date by adding the timezone offset to convert to UTC
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
};

/**
 * Checks if a date is the same day or earlier than another date.
 *
 * @param {string} date1 - The first date to compare.
 * @param {string} date2 - The second date to compare.
 * @returns {boolean} - `true` if date1 is the same day or earlier than date2.
 */
export const isSameDayOrPast = (date1: string, date2: string): boolean => {
  // Compare the two dates to see if they are the same day or if date2 is before date1
  const day1 = moment(date1);
  const day2 = moment(date2);
  return day1.isSame(day2, "day") || day2.isBefore(day1, "day");
};

/**
 * Validates the date difference between check-in and check-out and triggers a callback if conditions are met.
 *
 * @param {string} checkIn - The check-in date in ISO format.
 * @param {string} checkOut - The check-out date in ISO format.
 * @param {() => void} callback - The callback to execute if validation passes.
 */
export const checkDateDifference = (
  checkIn: string,
  checkOut: string,
  callback: () => void,
) => {
  // Convert check-in and check-out dates to UTC and validate their relationship
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const checkInUTC = convertToUTC(checkInDate);
  const checkOutUTC = convertToUTC(checkOutDate);

  // Check if the check-out date is in the future compared to check-in date
  if (checkOutUTC <= checkInUTC) {
    Alert.alert(
      "Alert",
      "The checkout date must be in the future compared to the check-in date.",
    );
    return;
  }

  // Ensure the difference between check-in and check-out is at least 30 minutes
  const differenceInMinutes =
    (checkOutUTC.getTime() - checkInUTC.getTime()) / (1000 * 60);

  if (differenceInMinutes < 30) {
    Alert.alert(
      "Alert",
      "The difference between check-in and check-out must be at least 30 minutes.",
    );
  } else {
    callback();
  }
};

/**
 * Formats a date-time string to a user-friendly format based on its difference from the current date.
 *
 * @param {string} dateTime - The date-time string to format.
 * @returns {string} - A formatted string like "Today", "Yesterday", or a specific date.
 */
export const formatDateTime = (dateTime: string): string => {
  // Calculate the difference between the current date and the message date
  const currentDate = new Date();
  const messageDate = new Date(dateTime);
  const diffInDays = Math.floor(
    (currentDate.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  // Return appropriate format based on how old the message date is
  if (diffInDays === 0) {
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else {
    return messageDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  }
};

/**
 * Calculate the formatted date range.
 * @param {string} checkIn - Check-in date.
 * @param {string} checkout - Check-out date.
 * @returns {string} - Formatted date range.
 */
export const timeRange = (checkIn: string, checkout: string): string => {
  const startDate = moment(checkIn);
  const endDate = moment(checkout);
  if (startDate.month() === endDate.month()) {
    return `${startDate.format("MMM D")} - ${endDate.format("D")}`;
  }
  return `${startDate.format("MMM D")} - ${endDate.format("MMM D")}`;
};

/**
 * Calculate the difference between two dates.
 * @param {string} checkIn - Check-in date.
 * @param {string} checkout - Check-out date.
 * @returns {number} - Difference in days.
 */

export const getDaysDifference = (bookingData: {
  checkInDate: string;
  checkOutDate: string;
}) => {
  const checkInDate = moment(bookingData.checkInDate);
  const checkOutDate = moment(bookingData.checkOutDate);
  const daysDifference = checkOutDate.diff(checkInDate, "days");

  return daysDifference;
};
