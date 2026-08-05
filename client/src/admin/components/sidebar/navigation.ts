import {
  FileText, Globe, GraduationCap, Home, Info, Layout, LayoutDashboard,
  LucideIcon, Newspaper, Package, Phone, Users, Wrench,
} from 'lucide-react';

export type AdminPage =
  | 'dashboard' | 'homepage' | 'trade_hubs' | 'about' | 'services'
  | 'products' | 'products_page' | 'partners' | 'training'
  | 'articles' | 'blog' | 'contact' | 'navbar_footer';

export interface NavGroup {
  label: string;
  items: Array<{ id: AdminPage; label: string; icon: LucideIcon }>;
}

export const NAV_GROUPS: NavGroup[] = [
  { label: 'General', items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }] },
  { label: 'Home', items: [
    { id: 'homepage', label: 'Homepage Editor', icon: Home },
    { id: 'trade_hubs', label: 'World Map Hubs', icon: Globe },
  ] },
  { label: 'About Us', items: [{ id: 'about', label: 'About Page', icon: Info }] },
  { label: 'Services & Sourcing', items: [{ id: 'services', label: 'Services Page', icon: Wrench }] },
  { label: 'Wholesale Catalog', items: [
    { id: 'products_page', label: 'Catalog Page Header', icon: Package },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'partners', label: 'Partners', icon: Users },
  ] },
  { label: 'Sales Training', items: [{ id: 'training', label: 'Training Page', icon: GraduationCap }] },
  { label: 'Market Insights', items: [
    { id: 'blog', label: 'Blog Page Header', icon: Newspaper },
    { id: 'articles', label: 'Articles', icon: FileText },
  ] },
  { label: 'Contact', items: [{ id: 'contact', label: 'Contact Page', icon: Phone }] },
  { label: 'Global Branding', items: [{ id: 'navbar_footer', label: 'Navbar & Footer', icon: Layout }] },
];
