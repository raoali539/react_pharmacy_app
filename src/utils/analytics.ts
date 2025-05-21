import DeviceInfo from "react-native-device-info";

/**
 * Fetches comprehensive metadata about the device using `react-native-device-info`.
 * The function utilizes `Promise.allSettled` to handle cases where some properties may fail to resolve.
 * @returns {Promise<object>} A promise resolving to an object containing the device metadata.
 */
export const getDeviceMetaData = async (): Promise<{
  [key: string]: any; // Keys correspond to device metadata fields.
}> => {
  // Fetch metadata about the device using multiple methods from `react-native-device-info` in parallel.
  const results = await Promise.allSettled([
    DeviceInfo.getManufacturer(), // Manufacturer of the device.
    DeviceInfo.getBrand(), // Brand of the device.
    DeviceInfo.getModel(), // Model name of the device.
    DeviceInfo.getDeviceId(), // Unique device ID.
    DeviceInfo.getSystemName(), // Operating system name (e.g., Android, iOS).
    DeviceInfo.getSystemVersion(), // Version of the operating system.
    DeviceInfo.getBuildId(), // Build ID of the OS.
    DeviceInfo.isTablet(), // Whether the device is a tablet.
    DeviceInfo.getVersion(), // Application version.
    DeviceInfo.getBuildNumber(), // Application build number.
    DeviceInfo.getApiLevel(), // API level of the OS (Android only).
    DeviceInfo.isEmulator(), // Whether the device is an emulator.
    DeviceInfo.supportedAbis(), // Supported ABIs for the device.
    DeviceInfo.getCarrier(), // Carrier name.
    DeviceInfo.getDeviceName(), // Human-readable device name.
    DeviceInfo.getMacAddress(), // MAC address of the device.
    DeviceInfo.hasNotch(), // Whether the device has a notch.
    DeviceInfo.getDeviceType(), // Type of the device (e.g., phone, tablet).
    DeviceInfo.getUserAgent(), // User agent string of the device.
    DeviceInfo.getSerialNumber(), // Serial number of the device.
    DeviceInfo.getFingerprint(), // Fingerprint of the device.
    DeviceInfo.getDisplay(), // Display information.
    DeviceInfo.getHardware(), // Hardware information.
    DeviceInfo.getFirstInstallTime(), // Timestamp of the first app installation.
    DeviceInfo.getLastUpdateTime(), // Timestamp of the last app update.
    DeviceInfo.getTotalMemory(), // Total memory of the device.
    DeviceInfo.getFreeDiskStorage(), // Free disk storage available.
    DeviceInfo.getTotalDiskCapacity(), // Total disk capacity of the device.
    DeviceInfo.hasDynamicIsland(), // Whether the device has a dynamic island (iOS specific).
    DeviceInfo.isPinOrFingerprintSet(), // Whether the device has a pin or fingerprint set.
    DeviceInfo.isLowRamDevice(), // Whether the device is a low RAM device.
    DeviceInfo.getUsedMemory(), // Used memory of the device.
    DeviceInfo.getBaseOs(), // Base OS information.
    DeviceInfo.getInstallReferrer(), // Referrer of the app installation.
    DeviceInfo.isDisplayZoomed(), // Whether the display is zoomed (iOS specific).
    DeviceInfo.getBootloader(), // Bootloader version.
    DeviceInfo.getDeviceToken(), // Device token (used for push notifications).
  ]);

  // List of keys corresponding to each metadata field.
  const keys = [
    "manufacturer",
    "brand",
    "model",
    "deviceId",
    "systemName",
    "systemVersion",
    "buildId",
    "isTablet",
    "appVersion",
    "appBuildNumber",
    "apiLevel",
    "isEmulator",
    "supportedAbis",
    "carrier",
    "deviceName",
    "macAddress",
    "hasNotch",
    "deviceType",
    "userAgent",
    "serialNumber",
    "fingerprint",
    "display",
    "hardware",
    "firstInstallTime",
    "lastUpdateTime",
    "totalMemory",
    "freeDiskStorage",
    "totalDiskStorage",
    "hasDynamicIsland",
    "isPinOrFingerprintSet",
    "isLowRamDevice",
    "usedMemory",
    "baseOS",
    "installReferrer",
    "isDisplayZoomed",
    "bootloader",
    "deviceToken",
  ];

  // Reduce the results to an object containing the metadata.
  const deviceMetaData = keys.reduce(
    (acc, key, index) => {
      const result = results[index];
      // If the promise was fulfilled, assign the value; otherwise, set it to null.
      acc[key] = result.status === "fulfilled" ? result.value : null;
      return acc;
    },
    {} as { [key: string]: any },
  );

  return deviceMetaData; // Return the aggregated device metadata.
};

/**
 * Fetches the unique device ID.
 * @returns {Promise<string | null>} A promise resolving to the unique device ID or null if it cannot be retrieved.
 */
export const getDeviceId = async (): Promise<string | null> => {
  try {
    return await DeviceInfo.getUniqueId(); // Retrieve the unique device ID.
  } catch {
    return null; // Return null if there was an error retrieving the ID.
  }
};
