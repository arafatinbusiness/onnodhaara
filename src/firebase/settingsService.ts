 import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config';

const SETTINGS_DOC = 'settings';
const SETTINGS_ID = 'store_settings';

export interface StoreSettings {
  announcementText: string;
  helplineNumber: string;
  coupons: { code: string; type: 'percent' | 'flat'; value: number }[];
}

const defaultSettings: StoreSettings = {
  announcementText: 'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি | ১০০% প্রাকৃতিক উপাদান',
  helplineNumber: '01330492979',
  coupons: [
    { code: 'ONNODHARA10', type: 'percent', value: 10 },
    { code: 'HEALTH50', type: 'flat', value: 50 },
  ],
};

// Fetch store settings from Firestore
export const fetchSettings = async (): Promise<StoreSettings> => {
  try {
    const docRef = doc(db, SETTINGS_DOC, SETTINGS_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as StoreSettings;
      return {
        announcementText: data.announcementText || defaultSettings.announcementText,
        helplineNumber: data.helplineNumber || defaultSettings.helplineNumber,
        coupons: data.coupons || defaultSettings.coupons,
      };
    }

    // If no settings in Firestore, seed defaults
    await setDoc(docRef, defaultSettings);
    return defaultSettings;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {
      announcementText: localStorage.getItem('onnodhara_announcement') || defaultSettings.announcementText,
      helplineNumber: localStorage.getItem('onnodhara_helpline') || defaultSettings.helplineNumber,
      coupons: (() => {
        try {
          const saved = localStorage.getItem('onnodhara_coupons');
          return saved ? JSON.parse(saved) : defaultSettings.coupons;
        } catch {
          return defaultSettings.coupons;
        }
      })(),
    };
  }
};

// Save store settings to Firestore
export const saveSettings = async (settings: StoreSettings): Promise<void> => {
  try {
    const docRef = doc(db, SETTINGS_DOC, SETTINGS_ID);
    await setDoc(docRef, settings);
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};