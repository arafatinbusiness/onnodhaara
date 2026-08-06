import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config';

const SETTINGS_DOC = 'settings';
const SETTINGS_ID = 'store_settings';

const DEFAULT_PHONE = '01330492979';

const OLD_DUMMY_NUMBERS = [
  '০১৭০০-০০০০০০',
  '01700000000',
  '8801700000000',
  '017000000000',
  '০১৭০০০০০০০০',
  '0170000000',
];

const normalizePhone = (phone: string): string =>
  OLD_DUMMY_NUMBERS.includes(phone) ? DEFAULT_PHONE : phone;

export interface StoreSettings {
  announcementText: string;
  helplineNumber: string;
  coupons: { code: string; type: 'percent' | 'flat'; value: number }[];
}

const defaultSettings: StoreSettings = {
  announcementText: 'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি | ১০০% প্রাকৃতিক উপাদান',
  helplineNumber: DEFAULT_PHONE,
  coupons: [
    { code: 'ONNODHARA10', type: 'percent', value: 10 },
    { code: 'HEALTH50', type: 'flat', value: 50 },
  ],
};

export const fetchSettings = async (): Promise<StoreSettings> => {
  try {
    const docRef = doc(db, SETTINGS_DOC, SETTINGS_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as StoreSettings;
      const helpline = normalizePhone(data.helplineNumber || '');
      if (helpline !== data.helplineNumber) {
        await setDoc(docRef, { ...data, helplineNumber: helpline });
      }
      return {
        announcementText: data.announcementText || defaultSettings.announcementText,
        helplineNumber: helpline,
        coupons: data.coupons || defaultSettings.coupons,
      };
    }

    await setDoc(docRef, defaultSettings);
    return defaultSettings;
  } catch (error) {
    console.error('Error fetching settings:', error);
    const stored = localStorage.getItem('onnodhara_helpline') || '';
    return {
      announcementText: localStorage.getItem('onnodhara_announcement') || defaultSettings.announcementText,
      helplineNumber: normalizePhone(stored) || DEFAULT_PHONE,
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

export const saveSettings = async (settings: StoreSettings): Promise<void> => {
  try {
    const docRef = doc(db, SETTINGS_DOC, SETTINGS_ID);
    await setDoc(docRef, settings);
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};