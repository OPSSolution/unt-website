import { GraduationCap, Package, ShoppingCart, Sparkles } from 'lucide-react';

export interface QuoteFormContent {
  title?: string;
  subtitle?: string;
  need_label?: string;
  category_label?: string;
  origin_label?: string;
  volume_label?: string;
  business_label?: string;
  back_button?: string;
  continue_button?: string;
  submitting_button?: string;
  submit_button?: string;
  service_labels?: string[];
  category_options?: string[];
  origin_options?: string[];
  volume_options?: string[];
}

export const SERVICE_TYPES = [
  { value: 'Product Sourcing', label: 'Product Sourcing', labelKm: 'ការស្វែងរកផលិតផល', icon: Package, desc: 'Find verified products from overseas factories', descKm: 'ស្វែងរកផលិតផលដែលបានផ្ទៀងផ្ទាត់ពីរោងចក្រនៅក្រៅប្រទេស' },
  { value: 'OEM / Private Label', label: 'OEM / Private Label', labelKm: 'OEM / ស្លាកឯកជន', icon: Sparkles, desc: 'Custom branding & manufacturing', descKm: 'ការដាក់ម៉ាក និងផលិតតាមបំណង' },
  { value: 'Wholesale Purchase', label: 'Wholesale Purchase', labelKm: 'ការទិញលក់ដុំ', icon: ShoppingCart, desc: 'Bulk orders at direct factory pricing', descKm: 'ការបញ្ជាទិញច្រើនក្នុងតម្លៃរោងចក្រផ្ទាល់' },
  { value: 'Sales Training', label: 'Sales Training', labelKm: 'ការបណ្តុះបណ្តាលផ្នែកលក់', icon: GraduationCap, desc: 'Upskill your commercial teams', descKm: 'ពង្រឹងជំនាញក្រុមពាណិជ្ជកម្មរបស់អ្នក' },
];

export const CATEGORIES = [
  'Food & Beverage (F&B)',
  'Skincare & Cosmetics',
  'Personal Care & Hair',
  'Health & Wellness Supplements',
  'Household Goods & Cleaners',
  'Other / Custom Category',
];

export const CATEGORIES_KM = [
  'អាហារ និងភេសជ្ជៈ (F&B)',
  'គ្រឿងសម្អាង និងគ្រឿងសំអាង',
  'ការថែទាំផ្ទាល់ខ្លួន និងសក់',
  'អាហារបំប៉នសុខភាព',
  'របស់ប្រើប្រាស់ក្នុងផ្ទះ និងសារធាតុសម្អាត',
  'ផ្សេងទៀត / ប្រភេទតាមបំណង',
];

export const ORIGINS = [
  { value: 'South Korea', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/250px-Flag_of_South_Korea.svg.png' },
  { value: 'Japan', flagUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/250px-Flag_of_Japan.svg.png' },
  { value: 'Vietnam', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/250px-Flag_of_Vietnam.svg.png' },
  { value: 'China', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/250px-Flag_of_the_People%27s_Republic_of_China.svg.png' },
  { value: 'Laos', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Flag_of_Laos.svg/250px-Flag_of_Laos.svg.png' },
  { value: 'Malaysia', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_Malaysia.svg/250px-Flag_of_Malaysia.svg.png' },
  { value: 'Global / Best Price', flagUrl: '' },
];

export const VOLUMES = [
  'Trial Batch (500 - 1,000 units)',
  'Medium Order (1,000 - 5,000 units)',
  'Large Wholesale (5,000 - 20,000 units)',
  'Full Container Load (FCL 20ft/40ft)',
];

export const VOLUMES_KM = [
  'ការសាកល្បង (៥០០ - ១,០០០ គ្រឿង)',
  'ការបញ្ជាទិញមធ្យម (១,០០០ - ៥,០០០ គ្រឿង)',
  'លក់ដុំធំ (៥,០០០ - ២០,០០០ គ្រឿង)',
  'កុងតឺន័រពេញ (FCL 20ft/40ft)',
];

export const ORIGINS_KM: Record<string, string> = {
  'South Korea': 'កូរ៉េខាងត្បូង',
  'Japan': 'ជប៉ុន',
  'Vietnam': 'វៀតណាម',
  'China': 'ចិន',
  'Laos': 'ឡាវ',
  'Malaysia': 'ម៉ាឡេស៊ី',
  'Global / Best Price': 'សកល / តម្លៃល្អបំផុត',
};

export const STEPS = [
  { label: 'Service', labelKm: 'សេវាកម្ម', number: 1 },
  { label: 'Details', labelKm: 'ព័ត៌មានលម្អិត', number: 2 },
  { label: 'Contact', labelKm: 'ទំនាក់ទំនង', number: 3 },
];

