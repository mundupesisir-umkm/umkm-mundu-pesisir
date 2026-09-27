export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface LanguageOption {
  code: string;
  label: string;
  flag: string; // Emoji or SVG flag
}

export interface NavbarProps {
  brandName?: string;
  brandHref?: string;
  items?: NavItem[];
  defaultLanguage?: string;
  onSearch?: (query: string) => void;
  onLanguageChange?: (lang: LanguageOption) => void;
}
