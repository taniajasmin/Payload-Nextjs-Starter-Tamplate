/**
 * Navigation icon & color mappings.
 *
 * Maps CMS icon names (strings stored in Payload) to Lucide React components.
 * To add a new icon: import it from lucide-react and add an entry below.
 */

import {
  Home,
  Info,
  Mail,
  Phone,
  Settings,
  Users,
  FileText,
  Globe,
  Shield,
  Star,
  Zap,
  Heart,
  Truck,
  Package,
  BarChart3,
  BookOpen,
  MapPin,
  Briefcase,
  Newspaper,
  HelpCircle,
  ShoppingCart,
  Wrench,
  Monitor,
  Cpu,
  HardDrive,
  Cloud,
  Database,
  Code,
  Smartphone,
  Wifi,
  Laptop,
  Gamepad,
  Headphones,
  Mouse,
  LayoutGrid,
  Search,
  Award,
  Clock,
  Target,
  CheckCircle,
  BadgeCheck,
  HeartHandshake,
  Rocket,
  TrendingUp,
  DollarSign,
} from "lucide-react";

export const iconNameToComponent: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Home, Info, Mail, Phone, Settings, Users, FileText,
  Globe, Shield, Star, Zap, Heart, Truck, Package,
  BarChart3, BookOpen, MapPin, Briefcase, Newspaper,
  HelpCircle, ShoppingCart, Wrench, Monitor, Cpu,
  HardDrive, Cloud, Database, Code, Smartphone, Wifi,
  Laptop, Gamepad, Headphones, Mouse, LayoutGrid, Search,
  Award, Clock, Target, CheckCircle, BadgeCheck,
  HeartHandshake, Rocket, TrendingUp, DollarSign,
};

export interface IconColorTheme {
  iconColor: string;
  iconBg: string;
  textColor: string;
  badgeColor: string;
  badgeBg: string;
  borderColor: string;
}

export const colorNameToTheme: Record<string, IconColorTheme> = {
  default: {
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    textColor: "text-foreground",
    badgeColor: "text-primary-foreground",
    badgeBg: "bg-primary",
    borderColor: "border-border",
  },
  blue: {
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    textColor: "text-foreground",
    badgeColor: "text-white",
    badgeBg: "bg-blue-600",
    borderColor: "border-blue-200",
  },
  green: {
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
    textColor: "text-foreground",
    badgeColor: "text-white",
    badgeBg: "bg-green-600",
    borderColor: "border-green-200",
  },
  red: {
    iconColor: "text-red-600",
    iconBg: "bg-red-50",
    textColor: "text-foreground",
    badgeColor: "text-white",
    badgeBg: "bg-red-600",
    borderColor: "border-red-200",
  },
};
