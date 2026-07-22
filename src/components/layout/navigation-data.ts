import {
  Package,
  Cpu,
  Mouse,
  Monitor,
  Gamepad,
  Laptop,
  Newspaper,
  HelpCircle,
  Building2,
  LayoutGrid,
  Zap,
  Mail,
  Box,
  HardDrive,
  Wifi,
  Shield,
  Smartphone,
  Headphones,
  ShoppingCart,
  Briefcase,
  Users,
  FileText,
  BookOpen,
  Phone,
  MapPin,
  Globe,
  BarChart3,
  Settings,
  Wallet,
  Truck,
  Factory,
  GraduationCap,
  HeartPulse,
  Utensils,
  Landmark,
  Store,
  Clapperboard,
  ClipboardList,
  TrendingUp,
  Calculator,
  CreditCard,
  Database,
  Server,
  Network,
  Lock,
  Video,
  Wrench,
  Award,
  Sparkles,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Leaf,
  Star,
  type LucideIcon,
} from "lucide-react";

/** Icon color theme for mega menu cards */
export interface IconColorTheme {
  bg: string;
  icon: string;
  glow?: string;
}

export interface NavItemChild {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: IconColorTheme;
  section?: string;
  kind?: "link" | "brand" | "case" | "viewAll";
  brandLogo?: string;
  image?: string;
  badge?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItemChild[];
  dropdownOnly?: boolean;
  dropdownVariant?: "mega" | "simple";
  viewAllLink?: string;
  viewAllLabel?: string;
}

const PRIMARY_TILE = {
  bg: "from-primary to-primary",
  icon: "text-primary-foreground",
} as const;

export const iconColors = {
  blue: PRIMARY_TILE,
  teal: PRIMARY_TILE,
  pink: PRIMARY_TILE,
  orange: PRIMARY_TILE,
  gold: PRIMARY_TILE,
  purple: PRIMARY_TILE,
  emerald: PRIMARY_TILE,
  indigo: PRIMARY_TILE,
  rose: PRIMARY_TILE,
} as const;

export const iconNameToComponent: Record<string, LucideIcon> = {
  Package,
  Cpu,
  Mouse,
  Monitor,
  Gamepad,
  Laptop,
  Newspaper,
  HelpCircle,
  Building2,
  LayoutGrid,
  Zap,
  Mail,
  Box,
  HardDrive,
  Wifi,
  Shield,
  Smartphone,
  Headphones,
  ShoppingCart,
  Briefcase,
  Users,
  FileText,
  BookOpen,
  Phone,
  MapPin,
  Globe,
  BarChart3,
  Settings,
  Wallet,
  Truck,
  Factory,
  GraduationCap,
  HeartPulse,
  Utensils,
  Landmark,
  Store,
  Clapperboard,
  ClipboardList,
  TrendingUp,
  Calculator,
  CreditCard,
  Database,
  Server,
  Network,
  Lock,
  Video,
  Wrench,
  Award,
  Sparkles,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Leaf,
  Star,
};

export const colorNameToTheme: Record<string, IconColorTheme> = {
  blue: iconColors.blue,
  teal: iconColors.teal,
  pink: iconColors.pink,
  orange: iconColors.orange,
  gold: iconColors.gold,
  purple: iconColors.purple,
  emerald: iconColors.emerald,
  indigo: iconColors.indigo,
  rose: iconColors.rose,
};

/** Navigation is populated entirely from the CMS (seeded by seed scripts).
    No hardcoded fallback — the seeder is the single source of truth. */
export const primaryNav: NavItem[] = [];

export const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "fr", label: "Français" },
  { code: "ru", label: "Русский" },
];
