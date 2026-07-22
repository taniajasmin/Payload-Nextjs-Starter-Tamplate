import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'ar', 'fr', 'ru');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'ar', 'fr', 'ru');
  CREATE TYPE "public"."enum_blog_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_posts_v_published_locale" AS ENUM('en', 'ar', 'fr', 'ru');
  CREATE TYPE "public"."enum_insights_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_insights_posts_category" AS ENUM('industry', 'company-news', 'technology', 'market-trends', 'case-study');
  CREATE TYPE "public"."enum__insights_posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__insights_posts_v_version_category" AS ENUM('industry', 'company-news', 'technology', 'market-trends', 'case-study');
  CREATE TYPE "public"."enum__insights_posts_v_published_locale" AS ENUM('en', 'ar', 'fr', 'ru');
  CREATE TYPE "public"."enum_categories_icon_name" AS ENUM('Cpu', 'Cable', 'Monitor', 'Gamepad2', 'Laptop', 'HardDrive');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_published_locale" AS ENUM('en', 'ar', 'fr', 'ru');
  CREATE TYPE "public"."enum_brands_category" AS ENUM('computer-components', 'computer-accessories', 'monitors', 'gaming', 'laptops', 'storage', 'audio-visual', 'networking');
  CREATE TYPE "public"."enum_brands_status" AS ENUM('available', 'future');
  CREATE TYPE "public"."enum_careers_type" AS ENUM('full-time', 'part-time', 'contract');
  CREATE TYPE "public"."enum_careers_status" AS ENUM('open', 'closed');
  CREATE TYPE "public"."enum_faq_entries_category" AS ENUM('orders', 'shipping', 'products', 'partnerships', 'support', 'general', 'returns');
  CREATE TYPE "public"."enum_users_role" AS ENUM('administrator', 'editor', 'author', 'contributor');
  CREATE TYPE "public"."enum_users_locale" AS ENUM('en', 'ar', 'fr', 'ru');
  CREATE TYPE "public"."enum_stats_icon" AS ENUM('globe', 'users', 'package', 'server', 'dollar', 'trending-up', 'award', 'map-pin');
  CREATE TYPE "public"."enum_applications_position" AS ENUM('general', 'senior-account-manager', 'product-specialist', 'technical-support', 'warehouse-coordinator', 'digital-marketing', 'b2b-sales');
  CREATE TYPE "public"."enum_applications_experience" AS ENUM('0-1', '1-3', '3-5', '5-10', '10+');
  CREATE TYPE "public"."enum_applications_status" AS ENUM('new', 'reviewing', 'shortlisted', 'interviewed', 'offered', 'rejected');
  CREATE TYPE "public"."enum_messages_type" AS ENUM('general', 'sales', 'support');
  CREATE TYPE "public"."enum_messages_status" AS ENUM('new', 'reading', 'responded', 'archived');
  CREATE TYPE "public"."enum_services_family" AS ENUM('it-services', 'software-erp');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_icon" AS ENUM('Package', 'Cpu', 'Mouse', 'Monitor', 'Gamepad', 'Laptop', 'Box', 'HardDrive', 'Wifi', 'Shield', 'Smartphone', 'Headphones', 'ShoppingCart', 'Briefcase', 'Users', 'FileText', 'BookOpen', 'Phone', 'MapPin', 'Globe', 'BarChart3', 'Settings', 'Wallet', 'Truck', 'Factory', 'GraduationCap', 'HeartPulse', 'Utensils', 'Landmark', 'Store', 'Clapperboard', 'ClipboardList', 'TrendingUp', 'Calculator', 'CreditCard', 'Database', 'Server', 'Network', 'Lock', 'Video', 'Wrench', 'Award', 'Sparkles', 'Lightbulb', 'Newspaper', 'HelpCircle', 'Building2', 'LayoutGrid', 'Zap', 'Mail');
  CREATE TYPE "public"."enum_services_icon_color" AS ENUM('blue', 'teal', 'pink', 'orange', 'gold', 'purple', 'emerald', 'indigo', 'rose');
  CREATE TYPE "public"."enum__services_v_version_family" AS ENUM('it-services', 'software-erp');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_version_icon" AS ENUM('Package', 'Cpu', 'Mouse', 'Monitor', 'Gamepad', 'Laptop', 'Box', 'HardDrive', 'Wifi', 'Shield', 'Smartphone', 'Headphones', 'ShoppingCart', 'Briefcase', 'Users', 'FileText', 'BookOpen', 'Phone', 'MapPin', 'Globe', 'BarChart3', 'Settings', 'Wallet', 'Truck', 'Factory', 'GraduationCap', 'HeartPulse', 'Utensils', 'Landmark', 'Store', 'Clapperboard', 'ClipboardList', 'TrendingUp', 'Calculator', 'CreditCard', 'Database', 'Server', 'Network', 'Lock', 'Video', 'Wrench', 'Award', 'Sparkles', 'Lightbulb', 'Newspaper', 'HelpCircle', 'Building2', 'LayoutGrid', 'Zap', 'Mail');
  CREATE TYPE "public"."enum__services_v_version_icon_color" AS ENUM('blue', 'teal', 'pink', 'orange', 'gold', 'purple', 'emerald', 'indigo', 'rose');
  CREATE TYPE "public"."enum__services_v_published_locale" AS ENUM('en', 'ar', 'fr', 'ru');
  CREATE TYPE "public"."enum_header_utility_bar_social_links_platform" AS ENUM('linkedin', 'instagram', 'facebook', 'x', 'youtube');
  CREATE TYPE "public"."enum_header_nav_items_children_icon" AS ENUM('Package', 'Cpu', 'Mouse', 'Monitor', 'Gamepad', 'Laptop', 'Box', 'HardDrive', 'Wifi', 'Shield', 'Smartphone', 'Headphones', 'ShoppingCart', 'Briefcase', 'Users', 'FileText', 'BookOpen', 'Phone', 'MapPin', 'Globe', 'BarChart3', 'Settings', 'Wallet', 'Truck', 'Factory', 'GraduationCap', 'HeartPulse', 'Utensils', 'Landmark', 'Store', 'Clapperboard', 'ClipboardList', 'TrendingUp', 'Calculator', 'CreditCard', 'Database', 'Server', 'Network', 'Lock', 'Video', 'Wrench', 'Award', 'Sparkles', 'Lightbulb', 'Newspaper', 'HelpCircle', 'Building2', 'LayoutGrid', 'Zap', 'Mail', 'ArrowRight');
  CREATE TYPE "public"."enum_header_nav_items_children_icon_color" AS ENUM('blue', 'teal', 'pink', 'orange', 'gold', 'purple', 'emerald', 'indigo', 'rose');
  CREATE TYPE "public"."enum_header_nav_items_children_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum_header_nav_items_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('linkedin', 'instagram', 'facebook', 'youtube', 'whatsapp', 'twitter');
  CREATE TYPE "public"."enum_homepage_section_config_section_id" AS ENUM('hero', 'intro', 'product-categories', 'pre-sales-compiler', 'featured-products', 'authorized-brands', 'why-choose-us', 'trusted-partners', 'services', 'customer-reviews', 'news-and-blogs', 'newsletter');
  CREATE TYPE "public"."enum_homepage_hero_content_feature_pills_icon" AS ENUM('Globe', 'ShieldCheck', 'Truck', 'BadgeCheck');
  CREATE TYPE "public"."enum_homepage_hero_content_stats_icon" AS ENUM('Award', 'Headphones', 'Users');
  CREATE TYPE "public"."enum_homepage_why_choose_us_section_features_icon" AS ENUM('Award', 'ShieldCheck', 'Globe', 'Truck', 'Activity', 'BadgeCheck');
  CREATE TYPE "public"."enum_homepage_why_choose_us_section_features_theme" AS ENUM('blue', 'teal', 'rose', 'amber', 'indigo', 'emerald');
  CREATE TYPE "public"."enum_contact_page_key_points_icon_type" AS ENUM('clock', 'shield', 'globe', 'chat');
  CREATE TYPE "public"."enum_contact_page_quick_contacts_icon_type" AS ENUM('phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_brands_page_authorized_features_icon_type" AS ENUM('shield-check', 'award', 'headphones', 'zap', 'shopping-cart', 'building-2');
  CREATE TYPE "public"."enum_brands_page_authorized_features_gradient_color" AS ENUM('blue-to-cyan', 'pink-to-light', 'cyan-to-blue', 'light-to-pink', 'tan-to-cyan', 'blue-to-pink');
  CREATE TYPE "public"."enum_brands_page_hero_heading_size" AS ENUM('text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl');
  CREATE TYPE "public"."enum_brands_page_hero_description_size" AS ENUM('text-base', 'text-lg', 'text-xl', 'text-2xl');
  CREATE TYPE "public"."enum_brands_page_hero_primary_button_color" AS ENUM('default', 'pink-gradient', 'blue-gradient', 'teal-gradient', 'dark-gradient', 'solid-white');
  CREATE TYPE "public"."enum_brands_page_hero_secondary_button_style" AS ENUM('outline-light', 'outline-dark');
  CREATE TYPE "public"."enum_brands_page_cta_heading_size" AS ENUM('text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl');
  CREATE TYPE "public"."enum_brands_page_cta_description_size" AS ENUM('text-base', 'text-lg', 'text-xl', 'text-2xl');
  CREATE TYPE "public"."enum_brands_page_cta_primary_button_color" AS ENUM('default', 'pink-gradient', 'blue-gradient', 'teal-gradient', 'dark-gradient', 'solid-white');
  CREATE TYPE "public"."enum_brands_page_cta_secondary_button_style" AS ENUM('outline-light', 'outline-dark');
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_tablet_url" varchar,
  	"sizes_tablet_width" numeric,
  	"sizes_tablet_height" numeric,
  	"sizes_tablet_mime_type" varchar,
  	"sizes_tablet_filesize" numeric,
  	"sizes_tablet_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"parent_id" integer,
  	"description" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image_id" integer,
  	"hero_cta_link" varchar,
  	"meta_image_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"parent_id" integer,
  	"status" "enum_pages_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"hero_headline" varchar,
  	"hero_sub_headline" varchar,
  	"hero_cta_label" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_hero_background_image_id" integer,
  	"version_hero_cta_link" varchar,
  	"version_meta_image_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_parent_id" integer,
  	"version_status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_hero_headline" varchar,
  	"version_hero_sub_headline" varchar,
  	"version_hero_cta_label" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cover_image_id" integer,
  	"author_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"status" "enum_blog_posts_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_blog_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "blog_posts_locales" (
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_blog_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_cover_image_id" integer,
  	"version_author_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_status" "enum__blog_posts_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__blog_posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__blog_posts_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_blog_posts_v_locales" (
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "insights_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"cover_image_id" integer,
  	"author_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"status" "enum_insights_posts_status" DEFAULT 'draft',
  	"category" "enum_insights_posts_category",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_insights_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "insights_posts_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_insights_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_cover_image_id" integer,
  	"version_author_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_status" "enum__insights_posts_v_version_status" DEFAULT 'draft',
  	"version_category" "enum__insights_posts_v_version_category",
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__insights_posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__insights_posts_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_insights_posts_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "categories_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "categories_highlights_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"parent_id" integer,
  	"icon_id" integer,
  	"image_id" integer,
  	"icon_name" "enum_categories_icon_name",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "products_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "products_images_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "products_features_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"sku" varchar,
  	"slug" varchar,
  	"brand_id" integer,
  	"category_id" integer,
  	"specs" jsonb,
  	"main_image_id" integer,
  	"datasheet_id" integer,
  	"moq" numeric,
  	"comparison_eligible" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_products_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "products_locales" (
  	"name" varchar,
  	"description" varchar,
  	"detailed_description" jsonb,
  	"seo_keywords" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "_products_v_version_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_images_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_version_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_features_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_sku" varchar,
  	"version_slug" varchar,
  	"version_brand_id" integer,
  	"version_category_id" integer,
  	"version_specs" jsonb,
  	"version_main_image_id" integer,
  	"version_datasheet_id" integer,
  	"version_moq" numeric,
  	"version_comparison_eligible" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__products_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_products_v_locales" (
  	"version_name" varchar,
  	"version_description" varchar,
  	"version_detailed_description" jsonb,
  	"version_seo_keywords" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "brands_certifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" integer
  );
  
  CREATE TABLE "brands_certifications_locales" (
  	"cert" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "brands_key_technologies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "brands_key_technologies_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "brands" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"logo_id" integer,
  	"logo_svg_id" integer,
  	"logo_png_id" integer,
  	"ideal_deployments" jsonb,
  	"product_tables" jsonb,
  	"spec_tables" jsonb,
  	"selection_guides" jsonb,
  	"ordering_info_whatsapp" varchar,
  	"ordering_info_email" varchar,
  	"related_links" jsonb,
  	"category" "enum_brands_category",
  	"status" "enum_brands_status" DEFAULT 'available',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "brands_locales" (
  	"name" varchar NOT NULL,
  	"story" jsonb,
  	"tagline" varchar,
  	"hero_slogan" varchar,
  	"hero_description" varchar,
  	"ordering_info_extra" varchar,
  	"status_note" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_keywords" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "brands_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "careers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"type" "enum_careers_type",
  	"status" "enum_careers_status" DEFAULT 'open',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "careers_locales" (
  	"title" varchar NOT NULL,
  	"department" varchar,
  	"location" varchar,
  	"description" jsonb,
  	"requirements" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "office_locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone" varchar,
  	"email" varchar,
  	"map_url" varchar,
  	"is_headquarters" boolean DEFAULT false,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "office_locations_locales" (
  	"city" varchar NOT NULL,
  	"country" varchar NOT NULL,
  	"address" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "faq_entries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" "enum_faq_entries_category" NOT NULL,
  	"order" numeric DEFAULT 0,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faq_entries_locales" (
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cover_image_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news_items_locales" (
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"excerpt" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"role" "enum_users_role" DEFAULT 'contributor' NOT NULL,
  	"active" boolean DEFAULT true,
  	"last_login_at" timestamp(3) with time zone,
  	"two_factor_enabled" boolean DEFAULT false,
  	"locale" "enum_users_locale" DEFAULT 'en',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "stats" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"suffix" varchar,
  	"prefix" varchar,
  	"icon" "enum_stats_icon" DEFAULT 'globe',
  	"order" numeric DEFAULT 0,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"avatar_id" integer,
  	"rating" numeric DEFAULT 5,
  	"order" numeric DEFAULT 0,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials_locales" (
  	"author_name" varchar NOT NULL,
  	"author_title" varchar,
  	"author_company" varchar,
  	"quote" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "awards" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"image_id" integer,
  	"order" numeric DEFAULT 0,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "awards_locales" (
  	"title" varchar NOT NULL,
  	"issuer" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"position" "enum_applications_position" NOT NULL,
  	"experience" "enum_applications_experience" NOT NULL,
  	"expected_salary" varchar,
  	"cv_id" integer NOT NULL,
  	"cover_letter" varchar,
  	"status" "enum_applications_status" DEFAULT 'new',
  	"notes" varchar,
  	"applied_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "messages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_messages_type" DEFAULT 'general' NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"company" varchar,
  	"subject" varchar,
  	"message" varchar,
  	"details" jsonb,
  	"status" "enum_messages_status" DEFAULT 'new',
  	"notes" varchar,
  	"submitted_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_features_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_benefits_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"family" "enum_services_family" DEFAULT 'it-services',
  	"status" "enum_services_status" DEFAULT 'draft',
  	"custom_href" varchar,
  	"icon" "enum_services_icon",
  	"icon_color" "enum_services_icon_color",
  	"hero_background_image_id" integer,
  	"hero_primary_cta_link" varchar,
  	"hero_secondary_cta_link" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "services_locales" (
  	"title" varchar,
  	"tagline" varchar,
  	"hero_headline" varchar,
  	"hero_sub_headline" varchar,
  	"hero_primary_cta_label" varchar,
  	"hero_secondary_cta_label" varchar,
  	"overview" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_version_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_features_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_version_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_benefits_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_family" "enum__services_v_version_family" DEFAULT 'it-services',
  	"version_status" "enum__services_v_version_status" DEFAULT 'draft',
  	"version_custom_href" varchar,
  	"version_icon" "enum__services_v_version_icon",
  	"version_icon_color" "enum__services_v_version_icon_color",
  	"version_hero_background_image_id" integer,
  	"version_hero_primary_cta_link" varchar,
  	"version_hero_secondary_cta_link" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__services_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_services_v_locales" (
  	"version_title" varchar,
  	"version_tagline" varchar,
  	"version_hero_headline" varchar,
  	"version_hero_sub_headline" varchar,
  	"version_hero_primary_cta_label" varchar,
  	"version_hero_secondary_cta_label" varchar,
  	"version_overview" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"media_folders_id" integer,
  	"pages_id" integer,
  	"blog_posts_id" integer,
  	"insights_posts_id" integer,
  	"categories_id" integer,
  	"products_id" integer,
  	"brands_id" integer,
  	"careers_id" integer,
  	"office_locations_id" integer,
  	"faq_entries_id" integer,
  	"news_items_id" integer,
  	"users_id" integer,
  	"stats_id" integer,
  	"testimonials_id" integer,
  	"awards_id" integer,
  	"applications_id" integer,
  	"messages_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_utility_bar_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_header_utility_bar_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"icon" "enum_header_nav_items_children_icon",
  	"icon_color" "enum_header_nav_items_children_icon_color",
  	"status" "enum_header_nav_items_children_status" DEFAULT 'published'
  );
  
  CREATE TABLE "header_nav_items_children_locales" (
  	"label" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar NOT NULL,
  	"status" "enum_header_nav_items_status" DEFAULT 'published',
  	"has_dropdown" boolean DEFAULT false
  );
  
  CREATE TABLE "header_nav_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"utility_bar_phone" varchar DEFAULT '+971 4 393 0507',
  	"utility_bar_email" varchar DEFAULT 'info@simalme.com',
  	"utility_bar_whatsapp" varchar DEFAULT '+971 54 308 8655',
  	"utility_bar_show_language_switcher" boolean DEFAULT true,
  	"utility_bar_show_whatsapp" boolean DEFAULT true,
  	"utility_bar_show_social_links" boolean DEFAULT true,
  	"cta_button_href" varchar DEFAULT '/contact',
  	"cta_button_show" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_locales" (
  	"cta_button_label" varchar DEFAULT 'Contact Sales',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "footer_footer_columns_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "footer_footer_columns_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_name" varchar DEFAULT 'Simal Technologies',
  	"brand_subtitle" varchar DEFAULT 'Middle East LLC',
  	"logo_id" integer,
  	"contact_phone" varchar DEFAULT '+971 4 393 0507',
  	"contact_email" varchar DEFAULT 'info@simalme.com',
  	"contact_address" varchar DEFAULT 'Office 201, Dar Al Riffa Building, Bur Dubai, UAE',
  	"vat_number" varchar DEFAULT '100207478700003',
  	"trade_license" varchar DEFAULT '49740',
  	"chamber_member" varchar DEFAULT 'Dubai Chamber Member',
  	"parent_company_name" varchar DEFAULT 'TwinMOS Group',
  	"parent_company_url" varchar DEFAULT 'https://twinmos.com',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"brand_description" varchar DEFAULT 'Premier IT distributor in Dubai, UAE with 20+ years experience. Authorized distributor for 20+ global brands. Delivering authentic IT products across the Middle East, Africa, and CIS.',
  	"copyright" varchar DEFAULT '© {year} Simal Technologies Middle East LLC. A TwinMOS Group Company. All rights reserved.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_section_config" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" "enum_homepage_section_config_section_id" NOT NULL,
  	"visible" boolean DEFAULT true
  );
  
  CREATE TABLE "homepage_hero_content_feature_pills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_homepage_hero_content_feature_pills_icon" DEFAULT 'Globe'
  );
  
  CREATE TABLE "homepage_hero_content_feature_pills_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_hero_content_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"icon" "enum_homepage_hero_content_stats_icon" DEFAULT 'Award'
  );
  
  CREATE TABLE "homepage_hero_content_stats_locales" (
  	"label" varchar NOT NULL,
  	"sub" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_why_choose_us_section_banner_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_why_choose_us_section_banner_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_why_choose_us_section_features_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_why_choose_us_section_features_chips_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_why_choose_us_section_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_homepage_why_choose_us_section_features_icon" DEFAULT 'Award',
  	"theme" "enum_homepage_why_choose_us_section_features_theme" DEFAULT 'blue'
  );
  
  CREATE TABLE "homepage_why_choose_us_section_features_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_latest_news_section_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"color" varchar NOT NULL
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image_id" integer,
  	"hero_content_cta1_link" varchar DEFAULT '/hardware/product-catalog',
  	"hero_content_cta2_link" varchar DEFAULT '#intro-section',
  	"featured_products_section_card_cta_link" varchar DEFAULT '/hardware/product-catalog',
  	"featured_products_section_bottom_cta_link" varchar DEFAULT '/hardware/product-catalog',
  	"brand_showcase_section_cta_link" varchar DEFAULT '/brands',
  	"why_choose_us_section_banner_image_id" integer,
  	"testimonials_section_cta_link" varchar DEFAULT '/about',
  	"latest_news_section_bottom_cta_link" varchar DEFAULT '/blog',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_locales" (
  	"hero_content_company_name" varchar DEFAULT 'Simal Technologies Middle East LLC',
  	"hero_content_badge" varchar DEFAULT 'Leading Middle East IT Distribution Hub',
  	"hero_content_headline1" varchar DEFAULT 'Powering Next-Gen',
  	"hero_content_headline2" varchar DEFAULT 'Enterprise Tech Across',
  	"hero_content_headline3" varchar DEFAULT 'The Gulf.',
  	"hero_content_subheadline" varchar DEFAULT 'Simal Technologies Middle East LLC is the premier value-added distributor supplying certified high-performance IT hardware and solutions to enterprises.',
  	"hero_content_cta1_label" varchar DEFAULT 'Explore Products',
  	"hero_content_cta2_label" varchar DEFAULT 'Our Vision',
  	"product_categories_section_badge" varchar DEFAULT 'Simal Portfolio Index',
  	"product_categories_section_heading" varchar DEFAULT 'Product Categories',
  	"product_categories_section_subtext" varchar DEFAULT 'Explore Simal''s certified portfolio across every IT hardware vertical.',
  	"pre_sales_compiler_section_badge" varchar DEFAULT 'Interactive Pre-Sales Assistant',
  	"pre_sales_compiler_section_heading" varchar DEFAULT 'Compile Your Pre-Sales Technical Specification',
  	"pre_sales_compiler_section_subtext" varchar DEFAULT 'Select specific models from the portfolio options below or click any category to initiate standard pre-sales diagnostics. Simal Technologies LLC delivers certified pre-sale hardware blueprints to regional Middle East integrators seamlessly.',
  	"featured_products_section_badge" varchar DEFAULT 'Product Catalog',
  	"featured_products_section_heading" varchar DEFAULT 'Top Products from Our Catalog',
  	"featured_products_section_subtext" varchar DEFAULT 'Discover our top-tier, certified hardware — ready to ship from Dubai with full Middle East warranty coverage.',
  	"featured_products_section_card_cta_label" varchar DEFAULT 'Request Quote',
  	"featured_products_section_bottom_cta_label" varchar DEFAULT 'View All Products',
  	"brand_showcase_section_badge" varchar DEFAULT 'Authorized Distributor',
  	"brand_showcase_section_heading" varchar DEFAULT 'Authorized Distributor for 20+ Global IT Brands',
  	"brand_showcase_section_subtext" varchar DEFAULT 'Simal Technologies Middle East LLC maintains legal partner and VAD agreements with world-leading technology manufacturers. We handle GCC regulatory clearings, local customs protocols, storage configuration, and deliver certified localized warranty schemes.',
  	"brand_showcase_section_cta_label" varchar DEFAULT 'View All Brands',
  	"why_choose_us_section_badge" varchar DEFAULT 'Why Simal',
  	"why_choose_us_section_headline" varchar DEFAULT 'Enterprise IT, Delivered with Certainty',
  	"why_choose_us_section_accent" varchar DEFAULT 'That Sets Us Apart',
  	"why_choose_us_section_body" varchar DEFAULT 'For 20+ years, Simal Technologies Middle East has bridged premium global IT vendors and Gulf enterprise networks — combining authorized distribution, Dubai-lab validation, and GCC regulatory expertise under one roof.',
  	"why_choose_us_section_banner_badge_title" varchar DEFAULT '20+',
  	"why_choose_us_section_banner_badge_subtitle" varchar DEFAULT 'Years Trusted',
  	"trusted_partners_section_badge" varchar DEFAULT 'Trusted Partners',
  	"trusted_partners_section_heading" varchar DEFAULT 'Built on Trust, Delivered with Care',
  	"trusted_partners_section_subtext" varchar DEFAULT 'We partner with 20+ world-class IT brands as their authorized distributor across the Middle East, Africa, and CIS regions. Every partnership is built on reliability, expertise, and a shared commitment to quality.',
  	"services_section_badge" varchar DEFAULT 'Our Services',
  	"services_section_heading" varchar DEFAULT 'End-to-End IT Services',
  	"services_section_subtext" varchar DEFAULT 'Beyond hardware distribution, we deliver professional IT services — from maintenance and security to AV solutions and data recovery.',
  	"testimonials_section_badge" varchar DEFAULT 'Success Stories',
  	"testimonials_section_heading" varchar DEFAULT 'Trusted by Top GCC ICT Experts',
  	"testimonials_section_cta_label" varchar DEFAULT 'Read All Reviews',
  	"latest_news_section_badge" varchar DEFAULT 'Technical Insights & Press',
  	"latest_news_section_heading" varchar DEFAULT 'The Simal Engineering Blog',
  	"latest_news_section_subtext" varchar DEFAULT 'Stay up-to-date with technical reviews from our systems engineers detailing architectural setups, local GCC spectrum clearances, and hardware integrations keys.',
  	"latest_news_section_card_cta_label" varchar DEFAULT 'Read more',
  	"latest_news_section_bottom_cta_label" varchar DEFAULT 'Read Our Blog',
  	"newsletter_section_badge" varchar DEFAULT 'Newsletter',
  	"newsletter_section_heading" varchar DEFAULT 'Get the Latest in IT Distribution & Tech Insights',
  	"newsletter_section_subtext" varchar,
  	"newsletter_section_email_placeholder" varchar DEFAULT 'Email address *',
  	"newsletter_section_name_placeholder" varchar DEFAULT 'Name (optional)',
  	"newsletter_section_consent_text" varchar,
  	"newsletter_section_privacy_label" varchar DEFAULT 'Read our Privacy Policy',
  	"newsletter_section_submit_label" varchar DEFAULT 'Subscribe',
  	"newsletter_section_submitting_label" varchar DEFAULT 'Subscribing...',
  	"newsletter_section_success_title" varchar DEFAULT 'Thank you for subscribing!',
  	"newsletter_section_success_message" varchar DEFAULT 'Please check your email to confirm your subscription.',
  	"newsletter_section_error_text" varchar DEFAULT 'Something went wrong. Please try again later.',
  	"newsletter_section_footer_text" varchar DEFAULT 'No spam, unsubscribe anytime.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer,
  	"categories_id" integer,
  	"brands_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Simal Technologies',
  	"logo_id" integer,
  	"favicon_id" integer,
  	"default_email" varchar,
  	"default_phone" varchar,
  	"address" varchar,
  	"default_seo_title" varchar,
  	"default_seo_description" varchar,
  	"default_seo_image_id" integer,
  	"typography_hero_heading_size" numeric DEFAULT 15,
  	"typography_heading_size" numeric DEFAULT 15,
  	"typography_body_text_size" numeric DEFAULT 12,
  	"typography_button_text_size" numeric DEFAULT 12,
  	"typography_nav_item_size" numeric DEFAULT 15,
  	"typography_badge_size" numeric DEFAULT 12,
  	"typography_section_label_size" numeric DEFAULT 12,
  	"typography_caption_size" numeric DEFAULT 10,
  	"maintenance_enabled" boolean DEFAULT false,
  	"maintenance_logo_image_id" integer,
  	"maintenance_background_image_id" integer,
  	"maintenance_contact_email" varchar,
  	"maintenance_contact_phone" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"maintenance_headline" varchar DEFAULT 'We''ll be back shortly',
  	"maintenance_message" varchar DEFAULT 'Our website is currently undergoing scheduled maintenance. We expect to be back online shortly. Thank you for your patience.',
  	"maintenance_estimated_return_time" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "about_page_company_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_associated_companies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"company" varchar NOT NULL,
  	"location" varchar,
  	"role" varchar
  );
  
  CREATE TABLE "about_page_parent_company_focus" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_vision_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar
  );
  
  CREATE TABLE "about_page_core_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_core_values_locales" (
  	"title" varchar NOT NULL,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_service_pillars_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_service_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_service_pillars_locales" (
  	"title" varchar NOT NULL,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_board_of_directors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"code" varchar,
  	"role" varchar,
  	"profile" varchar
  );
  
  CREATE TABLE "about_page_executive_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"position" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"code" varchar
  );
  
  CREATE TABLE "about_page_divisions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"size" varchar,
  	"focus" varchar
  );
  
  CREATE TABLE "about_page_awards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"issuer" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "about_page_certifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cert" varchar NOT NULL,
  	"authority" varchar,
  	"status" varchar DEFAULT 'Active'
  );
  
  CREATE TABLE "about_page_image_section1_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "about_page_image_section1_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_image_section2_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "about_page_image_section2_images_locales" (
  	"caption" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_ethical_practices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_uae_alignment" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"priority" varchar NOT NULL,
  	"contribution" varchar
  );
  
  CREATE TABLE "about_page_market_coverage" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"region" varchar NOT NULL,
  	"coverage" varchar,
  	"markets" varchar
  );
  
  CREATE TABLE "about_page_distribution_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar
  );
  
  CREATE TABLE "about_page_philosophy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar
  );
  
  CREATE TABLE "about_page_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar NOT NULL,
  	"milestone" varchar NOT NULL
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"mission_headline" varchar,
  	"mission_description" varchar,
  	"vision_headline" varchar,
  	"vision_description" varchar,
  	"cta_primary_button_href" varchar DEFAULT '/contact',
  	"cta_secondary_button_href" varchar DEFAULT '/brands',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_locales" (
  	"hero_headline" varchar,
  	"hero_sub_headline" varchar,
  	"hero_description" varchar,
  	"hero_secondary_description" varchar,
  	"company_section_badge" varchar DEFAULT 'Who We Are',
  	"company_section_heading" varchar DEFAULT 'Company at a',
  	"company_section_description" varchar,
  	"mission_vision_section_badge" varchar DEFAULT 'Our Purpose',
  	"mission_vision_section_heading" varchar DEFAULT 'Mission & Vision',
  	"core_values_section_badge" varchar DEFAULT 'What We Believe',
  	"core_values_section_heading" varchar DEFAULT 'Our Core Values',
  	"why_choose_section_badge" varchar DEFAULT 'Why Choose Us',
  	"why_choose_section_heading" varchar DEFAULT 'Your Trusted Partner in Quality & Performance',
  	"why_choose_section_description" varchar,
  	"leadership_section_badge" varchar DEFAULT 'Leadership',
  	"leadership_section_heading" varchar DEFAULT 'Our Leadership',
  	"awards_section_badge" varchar DEFAULT 'Recognition',
  	"awards_section_heading" varchar DEFAULT 'Awards & Certifications',
  	"image_section1_headline" varchar,
  	"image_section1_sub_headline" varchar,
  	"image_section2_headline" varchar,
  	"image_section2_sub_headline" varchar,
  	"milestones_section_badge" varchar DEFAULT 'Our Journey',
  	"milestones_section_heading" varchar DEFAULT 'Key Milestones',
  	"cta_heading" varchar DEFAULT 'Optimizing Your Business',
  	"cta_description" varchar,
  	"cta_primary_button_label" varchar DEFAULT 'Contact Us',
  	"cta_secondary_button_label" varchar DEFAULT 'Browse Products',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_page_key_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_type" "enum_contact_page_key_points_icon_type" DEFAULT 'clock'
  );
  
  CREATE TABLE "contact_page_key_points_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page_quick_contacts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"href" varchar,
  	"icon_type" "enum_contact_page_quick_contacts_icon_type"
  );
  
  CREATE TABLE "contact_page_quick_contacts_locales" (
  	"label" varchar,
  	"action" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page_departments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_href" varchar,
  	"email" varchar
  );
  
  CREATE TABLE "contact_page_departments_locales" (
  	"title" varchar,
  	"description" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image_id" integer,
  	"office_phone" varchar,
  	"office_email" varchar,
  	"view_all_offices_link" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_locales" (
  	"hero_headline" varchar,
  	"hero_description" varchar,
  	"office_title" varchar,
  	"office_country" varchar,
  	"office_address_label" varchar,
  	"office_address" varchar,
  	"office_hours_label" varchar,
  	"office_hours" varchar,
  	"office_contact_label" varchar,
  	"contact_form_title" varchar,
  	"contact_form_description" varchar,
  	"why_contact_section_heading" varchar,
  	"quick_contacts_title" varchar,
  	"view_all_offices_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "careers_contact_page_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "careers_contact_page_benefits_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "careers_contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"open_positions_link" varchar,
  	"cta_primary_cta_link" varchar,
  	"cta_secondary_cta_link" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "careers_contact_page_locales" (
  	"hero_headline" varchar,
  	"hero_sub_headline" varchar,
  	"intro_text" varchar,
  	"cta_headline" varchar,
  	"cta_description" varchar,
  	"cta_primary_cta_label" varchar,
  	"cta_secondary_cta_label" varchar,
  	"cta_related_links" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "brands_page_authorized_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_type" "enum_brands_page_authorized_features_icon_type" DEFAULT 'shield-check',
  	"gradient_color" "enum_brands_page_authorized_features_gradient_color" DEFAULT 'blue-to-cyan'
  );
  
  CREATE TABLE "brands_page_authorized_features_locales" (
  	"title" varchar NOT NULL,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "brands_page_awards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "brands_page_awards_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "brands_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_heading_size" "enum_brands_page_hero_heading_size" DEFAULT 'text-2xl',
  	"hero_description_size" "enum_brands_page_hero_description_size" DEFAULT 'text-lg',
  	"hero_primary_button_href" varchar,
  	"hero_primary_button_color" "enum_brands_page_hero_primary_button_color" DEFAULT 'default',
  	"hero_secondary_button_href" varchar,
  	"hero_secondary_button_style" "enum_brands_page_hero_secondary_button_style" DEFAULT 'outline-light',
  	"cta_heading_size" "enum_brands_page_cta_heading_size" DEFAULT 'text-3xl',
  	"cta_description_size" "enum_brands_page_cta_description_size" DEFAULT 'text-lg',
  	"cta_primary_button_href" varchar,
  	"cta_primary_button_color" "enum_brands_page_cta_primary_button_color" DEFAULT 'pink-gradient',
  	"cta_secondary_button_href" varchar,
  	"cta_secondary_button_style" "enum_brands_page_cta_secondary_button_style" DEFAULT 'outline-dark',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "brands_page_locales" (
  	"hero_headline" varchar,
  	"hero_description" varchar,
  	"hero_primary_button_label" varchar,
  	"hero_secondary_button_label" varchar,
  	"brand_directory_badge" varchar,
  	"brand_directory_heading" varchar,
  	"brand_directory_description" varchar,
  	"authorized_section_badge" varchar,
  	"authorized_section_heading" varchar,
  	"authorized_section_description" varchar,
  	"categories_section_badge" varchar,
  	"categories_section_heading" varchar,
  	"categories_section_description" varchar,
  	"partnerships_section_badge" varchar,
  	"partnerships_section_heading" varchar,
  	"partnerships_section_description" varchar,
  	"cta_badge" varchar,
  	"cta_heading" varchar,
  	"cta_description" varchar,
  	"cta_primary_button_label" varchar,
  	"cta_secondary_button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "product_catalog_page_gallery_section_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "product_catalog_page_gallery_section_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "product_catalog_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "product_catalog_page_locales" (
  	"hero_headline" varchar,
  	"hero_sub_headline" varchar,
  	"gallery_section_headline" varchar,
  	"gallery_section_description" varchar,
  	"cta_headline" varchar,
  	"cta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "computer_components_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "computer_components_page_locales" (
  	"hero_headline" varchar,
  	"hero_description" varchar,
  	"related_links" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "computer_accessories_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "computer_accessories_page_locales" (
  	"hero_headline" varchar,
  	"hero_description" varchar,
  	"related_links" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "monitors_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "monitors_page_locales" (
  	"hero_headline" varchar,
  	"hero_description" varchar,
  	"related_links" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "gaming_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "gaming_page_locales" (
  	"hero_headline" varchar,
  	"hero_description" varchar,
  	"related_links" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "laptops_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "laptops_page_locales" (
  	"hero_headline" varchar,
  	"hero_description" varchar,
  	"related_links" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "it_dp_authorized_brands" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "it_dp_authorized_brands_locales" (
  	"category" varchar,
  	"brands" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "it_dp_product_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"count" numeric
  );
  
  CREATE TABLE "it_dp_product_categories_locales" (
  	"category" varchar,
  	"sub_categories" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "it_dp_geographic_coverage" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"region" varchar
  );
  
  CREATE TABLE "it_dp_geographic_coverage_locales" (
  	"coverage" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "it_dp_channel_advantages_si_var_advantages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "it_dp_channel_advantages_si_var_advantages_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "it_dp_channel_advantages_corporate_gov_advantages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "it_dp_channel_advantages_corporate_gov_advantages_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "it_dp_channel_advantages_ecommerce_retail_advantages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "it_dp_channel_advantages_ecommerce_retail_advantages_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "it_dp_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "it_dp_industries_locales" (
  	"industry" varchar,
  	"requirements" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "it_dp_infrastructure_warehouse_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "it_dp_infrastructure_warehouse_features_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "it_dp_infrastructure_retail_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "it_dp_infrastructure_retail_features_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "it_dp_get_started_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_link" varchar
  );
  
  CREATE TABLE "it_dp_get_started_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "it_dp" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image_id" integer,
  	"hero_primary_cta_link" varchar,
  	"hero_secondary_cta_link" varchar,
  	"cta_primary_cta_link" varchar,
  	"cta_secondary_cta_link" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "it_dp_locales" (
  	"hero_headline" varchar,
  	"hero_sub_headline" varchar,
  	"hero_primary_cta_label" varchar,
  	"hero_secondary_cta_label" varchar,
  	"authorized_brands_title" varchar,
  	"authorized_brands_description" varchar,
  	"product_categories_title" varchar,
  	"product_categories_description" varchar,
  	"channel_advantages_si_var_title" varchar,
  	"channel_advantages_corporate_gov_title" varchar,
  	"channel_advantages_ecommerce_retail_title" varchar,
  	"industries_title" varchar,
  	"infrastructure_warehouse_title" varchar,
  	"infrastructure_warehouse_description" varchar,
  	"infrastructure_retail_title" varchar,
  	"infrastructure_retail_description" varchar,
  	"get_started_title" varchar,
  	"cta_headline" varchar,
  	"cta_description" varchar,
  	"cta_primary_cta_label" varchar,
  	"cta_secondary_cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "authorized_brands_page_authorized_brands" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "authorized_brands_page_authorized_brands_locales" (
  	"category" varchar,
  	"brands" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "authorized_brands_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "authorized_brands_page_locales" (
  	"hero_headline" varchar,
  	"hero_sub_headline" varchar,
  	"cta_headline" varchar,
  	"cta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "warehouse_logistics_page_warehouse_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "warehouse_logistics_page_warehouse_features_locales" (
  	"feature" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "warehouse_logistics_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "warehouse_logistics_page_locales" (
  	"hero_headline" varchar,
  	"hero_sub_headline" varchar,
  	"warehouse_title" varchar,
  	"warehouse_description" varchar,
  	"cta_headline" varchar,
  	"cta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "retail_presence_page_retail_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "retail_presence_page_retail_features_locales" (
  	"feature" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "retail_presence_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "retail_presence_page_locales" (
  	"hero_headline" varchar,
  	"hero_sub_headline" varchar,
  	"retail_title" varchar,
  	"retail_description" varchar,
  	"cta_headline" varchar,
  	"cta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "distribution_channels_page_b2b_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "distribution_channels_page_b2b_channels_locales" (
  	"label" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "distribution_channels_page_ecommerce_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "distribution_channels_page_ecommerce_channels_locales" (
  	"label" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "distribution_channels_page_geographic_coverage" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"region" varchar
  );
  
  CREATE TABLE "distribution_channels_page_geographic_coverage_locales" (
  	"coverage" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "distribution_channels_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "distribution_channels_page_locales" (
  	"hero_headline" varchar,
  	"hero_sub_headline" varchar,
  	"cta_headline" varchar,
  	"cta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "quality_assurance_page_quality_assurance" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "quality_assurance_page_quality_assurance_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "quality_assurance_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "quality_assurance_page_locales" (
  	"hero_headline" varchar,
  	"hero_sub_headline" varchar,
  	"cta_headline" varchar,
  	"cta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image_id" integer,
  	"hero_primary_cta_link" varchar,
  	"hero_secondary_cta_link" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "services_page_locales" (
  	"hero_headline" varchar,
  	"hero_sub_headline" varchar,
  	"hero_primary_cta_label" varchar,
  	"hero_secondary_cta_label" varchar,
  	"intro" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_media_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."media_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_folders" ADD CONSTRAINT "media_folders_parent_id_media_folders_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_background_image_id_media_id_fk" FOREIGN KEY ("version_hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_parent_id_pages_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts_locales" ADD CONSTRAINT "blog_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_parent_id_blog_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_locales" ADD CONSTRAINT "_blog_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "insights_posts" ADD CONSTRAINT "insights_posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "insights_posts" ADD CONSTRAINT "insights_posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "insights_posts_locales" ADD CONSTRAINT "insights_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."insights_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_insights_posts_v" ADD CONSTRAINT "_insights_posts_v_parent_id_insights_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."insights_posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_insights_posts_v" ADD CONSTRAINT "_insights_posts_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_insights_posts_v" ADD CONSTRAINT "_insights_posts_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_insights_posts_v_locales" ADD CONSTRAINT "_insights_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_insights_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_highlights" ADD CONSTRAINT "categories_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_highlights_locales" ADD CONSTRAINT "categories_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_images" ADD CONSTRAINT "products_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_images" ADD CONSTRAINT "products_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_images_locales" ADD CONSTRAINT "products_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_features" ADD CONSTRAINT "products_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_features_locales" ADD CONSTRAINT "products_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_datasheet_id_media_id_fk" FOREIGN KEY ("datasheet_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_images" ADD CONSTRAINT "_products_v_version_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_images" ADD CONSTRAINT "_products_v_version_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_images_locales" ADD CONSTRAINT "_products_v_version_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_features" ADD CONSTRAINT "_products_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_features_locales" ADD CONSTRAINT "_products_v_version_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_brand_id_brands_id_fk" FOREIGN KEY ("version_brand_id") REFERENCES "public"."brands"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_main_image_id_media_id_fk" FOREIGN KEY ("version_main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_datasheet_id_media_id_fk" FOREIGN KEY ("version_datasheet_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_locales" ADD CONSTRAINT "_products_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brands_certifications" ADD CONSTRAINT "brands_certifications_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "brands_certifications" ADD CONSTRAINT "brands_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brands_certifications_locales" ADD CONSTRAINT "brands_certifications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brands_certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brands_key_technologies" ADD CONSTRAINT "brands_key_technologies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brands_key_technologies_locales" ADD CONSTRAINT "brands_key_technologies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brands_key_technologies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brands" ADD CONSTRAINT "brands_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "brands" ADD CONSTRAINT "brands_logo_svg_id_media_id_fk" FOREIGN KEY ("logo_svg_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "brands" ADD CONSTRAINT "brands_logo_png_id_media_id_fk" FOREIGN KEY ("logo_png_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "brands_locales" ADD CONSTRAINT "brands_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brands_rels" ADD CONSTRAINT "brands_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brands_rels" ADD CONSTRAINT "brands_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_locales" ADD CONSTRAINT "careers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "office_locations_locales" ADD CONSTRAINT "office_locations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."office_locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_entries_locales" ADD CONSTRAINT "faq_entries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_items" ADD CONSTRAINT "news_items_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_items_locales" ADD CONSTRAINT "news_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stats_locales" ADD CONSTRAINT "stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_locales" ADD CONSTRAINT "testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards" ADD CONSTRAINT "awards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "awards_locales" ADD CONSTRAINT "awards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "applications" ADD CONSTRAINT "applications_cv_id_media_id_fk" FOREIGN KEY ("cv_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_features" ADD CONSTRAINT "services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_features_locales" ADD CONSTRAINT "services_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_benefits" ADD CONSTRAINT "services_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_benefits_locales" ADD CONSTRAINT "services_benefits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_features" ADD CONSTRAINT "_services_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_features_locales" ADD CONSTRAINT "_services_v_version_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_version_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_benefits" ADD CONSTRAINT "_services_v_version_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_benefits_locales" ADD CONSTRAINT "_services_v_version_benefits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_version_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_hero_background_image_id_media_id_fk" FOREIGN KEY ("version_hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_locales" ADD CONSTRAINT "_services_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_folders_fk" FOREIGN KEY ("media_folders_id") REFERENCES "public"."media_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_insights_posts_fk" FOREIGN KEY ("insights_posts_id") REFERENCES "public"."insights_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_brands_fk" FOREIGN KEY ("brands_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_careers_fk" FOREIGN KEY ("careers_id") REFERENCES "public"."careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_office_locations_fk" FOREIGN KEY ("office_locations_id") REFERENCES "public"."office_locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_entries_fk" FOREIGN KEY ("faq_entries_id") REFERENCES "public"."faq_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_items_fk" FOREIGN KEY ("news_items_id") REFERENCES "public"."news_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stats_fk" FOREIGN KEY ("stats_id") REFERENCES "public"."stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_awards_fk" FOREIGN KEY ("awards_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_applications_fk" FOREIGN KEY ("applications_id") REFERENCES "public"."applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_messages_fk" FOREIGN KEY ("messages_id") REFERENCES "public"."messages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_utility_bar_social_links" ADD CONSTRAINT "header_utility_bar_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_children_locales" ADD CONSTRAINT "header_nav_items_children_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_children"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_locales" ADD CONSTRAINT "header_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_footer_columns_links" ADD CONSTRAINT "footer_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_footer_columns_links_locales" ADD CONSTRAINT "footer_footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_footer_columns" ADD CONSTRAINT "footer_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_footer_columns_locales" ADD CONSTRAINT "footer_footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_section_config" ADD CONSTRAINT "homepage_section_config_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_hero_content_feature_pills" ADD CONSTRAINT "homepage_hero_content_feature_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_hero_content_feature_pills_locales" ADD CONSTRAINT "homepage_hero_content_feature_pills_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_hero_content_feature_pills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_hero_content_stats" ADD CONSTRAINT "homepage_hero_content_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_hero_content_stats_locales" ADD CONSTRAINT "homepage_hero_content_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_hero_content_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_why_choose_us_section_banner_stats" ADD CONSTRAINT "homepage_why_choose_us_section_banner_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_why_choose_us_section_banner_stats_locales" ADD CONSTRAINT "homepage_why_choose_us_section_banner_stats_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_why_choose_us_section_banner_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_why_choose_us_section_features_chips" ADD CONSTRAINT "homepage_why_choose_us_section_features_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_why_choose_us_section_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_why_choose_us_section_features_chips_locales" ADD CONSTRAINT "homepage_why_choose_us_section_features_chips_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_why_choose_us_section_features_chips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_why_choose_us_section_features" ADD CONSTRAINT "homepage_why_choose_us_section_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_why_choose_us_section_features_locales" ADD CONSTRAINT "homepage_why_choose_us_section_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_why_choose_us_section_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_latest_news_section_categories" ADD CONSTRAINT "homepage_latest_news_section_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_why_choose_us_section_banner_image_id_media_id_fk" FOREIGN KEY ("why_choose_us_section_banner_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_locales" ADD CONSTRAINT "homepage_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_brands_fk" FOREIGN KEY ("brands_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_seo_image_id_media_id_fk" FOREIGN KEY ("default_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_maintenance_logo_image_id_media_id_fk" FOREIGN KEY ("maintenance_logo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_maintenance_background_image_id_media_id_fk" FOREIGN KEY ("maintenance_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_company_details" ADD CONSTRAINT "about_page_company_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_associated_companies" ADD CONSTRAINT "about_page_associated_companies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_parent_company_focus" ADD CONSTRAINT "about_page_parent_company_focus_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_vision_standards" ADD CONSTRAINT "about_page_vision_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_core_values" ADD CONSTRAINT "about_page_core_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_core_values_locales" ADD CONSTRAINT "about_page_core_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_core_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_service_pillars_benefits" ADD CONSTRAINT "about_page_service_pillars_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_service_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_service_pillars" ADD CONSTRAINT "about_page_service_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_service_pillars_locales" ADD CONSTRAINT "about_page_service_pillars_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_service_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_board_of_directors" ADD CONSTRAINT "about_page_board_of_directors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_executive_team" ADD CONSTRAINT "about_page_executive_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_divisions" ADD CONSTRAINT "about_page_divisions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_awards" ADD CONSTRAINT "about_page_awards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_certifications" ADD CONSTRAINT "about_page_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_image_section1_images" ADD CONSTRAINT "about_page_image_section1_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_image_section1_images" ADD CONSTRAINT "about_page_image_section1_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_image_section1_images_locales" ADD CONSTRAINT "about_page_image_section1_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_image_section1_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_image_section2_images" ADD CONSTRAINT "about_page_image_section2_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_image_section2_images" ADD CONSTRAINT "about_page_image_section2_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_image_section2_images_locales" ADD CONSTRAINT "about_page_image_section2_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_image_section2_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_ethical_practices" ADD CONSTRAINT "about_page_ethical_practices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_uae_alignment" ADD CONSTRAINT "about_page_uae_alignment_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_market_coverage" ADD CONSTRAINT "about_page_market_coverage_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_distribution_channels" ADD CONSTRAINT "about_page_distribution_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_philosophy" ADD CONSTRAINT "about_page_philosophy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_milestones" ADD CONSTRAINT "about_page_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_locales" ADD CONSTRAINT "about_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_key_points" ADD CONSTRAINT "contact_page_key_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_key_points_locales" ADD CONSTRAINT "contact_page_key_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_key_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_quick_contacts" ADD CONSTRAINT "contact_page_quick_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_quick_contacts_locales" ADD CONSTRAINT "contact_page_quick_contacts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_quick_contacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_departments" ADD CONSTRAINT "contact_page_departments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_departments_locales" ADD CONSTRAINT "contact_page_departments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_locales" ADD CONSTRAINT "contact_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_contact_page_benefits" ADD CONSTRAINT "careers_contact_page_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers_contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_contact_page_benefits_locales" ADD CONSTRAINT "careers_contact_page_benefits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers_contact_page_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_contact_page_locales" ADD CONSTRAINT "careers_contact_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers_contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brands_page_authorized_features" ADD CONSTRAINT "brands_page_authorized_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brands_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brands_page_authorized_features_locales" ADD CONSTRAINT "brands_page_authorized_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brands_page_authorized_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brands_page_awards" ADD CONSTRAINT "brands_page_awards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brands_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brands_page_awards_locales" ADD CONSTRAINT "brands_page_awards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brands_page_awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brands_page_locales" ADD CONSTRAINT "brands_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brands_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_catalog_page_gallery_section_images" ADD CONSTRAINT "product_catalog_page_gallery_section_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_catalog_page_gallery_section_images" ADD CONSTRAINT "product_catalog_page_gallery_section_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_catalog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_catalog_page_gallery_section_images_locales" ADD CONSTRAINT "product_catalog_page_gallery_section_images_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_catalog_page_gallery_section_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_catalog_page" ADD CONSTRAINT "product_catalog_page_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_catalog_page_locales" ADD CONSTRAINT "product_catalog_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_catalog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "computer_components_page" ADD CONSTRAINT "computer_components_page_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "computer_components_page_locales" ADD CONSTRAINT "computer_components_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."computer_components_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "computer_accessories_page" ADD CONSTRAINT "computer_accessories_page_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "computer_accessories_page_locales" ADD CONSTRAINT "computer_accessories_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."computer_accessories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "monitors_page" ADD CONSTRAINT "monitors_page_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "monitors_page_locales" ADD CONSTRAINT "monitors_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."monitors_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gaming_page" ADD CONSTRAINT "gaming_page_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gaming_page_locales" ADD CONSTRAINT "gaming_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gaming_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "laptops_page" ADD CONSTRAINT "laptops_page_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "laptops_page_locales" ADD CONSTRAINT "laptops_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."laptops_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp_authorized_brands" ADD CONSTRAINT "it_dp_authorized_brands_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp_authorized_brands_locales" ADD CONSTRAINT "it_dp_authorized_brands_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp_authorized_brands"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp_product_categories" ADD CONSTRAINT "it_dp_product_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp_product_categories_locales" ADD CONSTRAINT "it_dp_product_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp_product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp_geographic_coverage" ADD CONSTRAINT "it_dp_geographic_coverage_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp_geographic_coverage_locales" ADD CONSTRAINT "it_dp_geographic_coverage_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp_geographic_coverage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp_channel_advantages_si_var_advantages" ADD CONSTRAINT "it_dp_channel_advantages_si_var_advantages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp_channel_advantages_si_var_advantages_locales" ADD CONSTRAINT "it_dp_channel_advantages_si_var_advantages_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp_channel_advantages_si_var_advantages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp_channel_advantages_corporate_gov_advantages" ADD CONSTRAINT "it_dp_channel_advantages_corporate_gov_advantages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp_channel_advantages_corporate_gov_advantages_locales" ADD CONSTRAINT "it_dp_channel_advantages_corporate_gov_advantages_locales_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp_channel_advantages_corporate_gov_advantages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp_channel_advantages_ecommerce_retail_advantages" ADD CONSTRAINT "it_dp_channel_advantages_ecommerce_retail_advantages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp_channel_advantages_ecommerce_retail_advantages_locales" ADD CONSTRAINT "it_dp_channel_advantages_ecommerce_retail_advantages_loca_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp_channel_advantages_ecommerce_retail_advantages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp_industries" ADD CONSTRAINT "it_dp_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp_industries_locales" ADD CONSTRAINT "it_dp_industries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp_industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp_infrastructure_warehouse_features" ADD CONSTRAINT "it_dp_infrastructure_warehouse_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp_infrastructure_warehouse_features_locales" ADD CONSTRAINT "it_dp_infrastructure_warehouse_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp_infrastructure_warehouse_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp_infrastructure_retail_features" ADD CONSTRAINT "it_dp_infrastructure_retail_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp_infrastructure_retail_features_locales" ADD CONSTRAINT "it_dp_infrastructure_retail_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp_infrastructure_retail_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp_get_started_items" ADD CONSTRAINT "it_dp_get_started_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp_get_started_items_locales" ADD CONSTRAINT "it_dp_get_started_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp_get_started_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "it_dp" ADD CONSTRAINT "it_dp_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "it_dp_locales" ADD CONSTRAINT "it_dp_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."it_dp"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "authorized_brands_page_authorized_brands" ADD CONSTRAINT "authorized_brands_page_authorized_brands_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."authorized_brands_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "authorized_brands_page_authorized_brands_locales" ADD CONSTRAINT "authorized_brands_page_authorized_brands_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."authorized_brands_page_authorized_brands"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "authorized_brands_page_locales" ADD CONSTRAINT "authorized_brands_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."authorized_brands_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "warehouse_logistics_page_warehouse_features" ADD CONSTRAINT "warehouse_logistics_page_warehouse_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."warehouse_logistics_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "warehouse_logistics_page_warehouse_features_locales" ADD CONSTRAINT "warehouse_logistics_page_warehouse_features_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."warehouse_logistics_page_warehouse_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "warehouse_logistics_page_locales" ADD CONSTRAINT "warehouse_logistics_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."warehouse_logistics_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "retail_presence_page_retail_features" ADD CONSTRAINT "retail_presence_page_retail_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."retail_presence_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "retail_presence_page_retail_features_locales" ADD CONSTRAINT "retail_presence_page_retail_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."retail_presence_page_retail_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "retail_presence_page_locales" ADD CONSTRAINT "retail_presence_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."retail_presence_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "distribution_channels_page_b2b_channels" ADD CONSTRAINT "distribution_channels_page_b2b_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."distribution_channels_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "distribution_channels_page_b2b_channels_locales" ADD CONSTRAINT "distribution_channels_page_b2b_channels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."distribution_channels_page_b2b_channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "distribution_channels_page_ecommerce_channels" ADD CONSTRAINT "distribution_channels_page_ecommerce_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."distribution_channels_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "distribution_channels_page_ecommerce_channels_locales" ADD CONSTRAINT "distribution_channels_page_ecommerce_channels_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."distribution_channels_page_ecommerce_channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "distribution_channels_page_geographic_coverage" ADD CONSTRAINT "distribution_channels_page_geographic_coverage_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."distribution_channels_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "distribution_channels_page_geographic_coverage_locales" ADD CONSTRAINT "distribution_channels_page_geographic_coverage_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."distribution_channels_page_geographic_coverage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "distribution_channels_page_locales" ADD CONSTRAINT "distribution_channels_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."distribution_channels_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quality_assurance_page_quality_assurance" ADD CONSTRAINT "quality_assurance_page_quality_assurance_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quality_assurance_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quality_assurance_page_quality_assurance_locales" ADD CONSTRAINT "quality_assurance_page_quality_assurance_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quality_assurance_page_quality_assurance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quality_assurance_page_locales" ADD CONSTRAINT "quality_assurance_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quality_assurance_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page_locales" ADD CONSTRAINT "services_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" USING btree ("sizes_tablet_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "media_folders_slug_idx" ON "media_folders" USING btree ("slug");
  CREATE INDEX "media_folders_parent_idx" ON "media_folders" USING btree ("parent_id");
  CREATE INDEX "media_folders_updated_at_idx" ON "media_folders" USING btree ("updated_at");
  CREATE INDEX "media_folders_created_at_idx" ON "media_folders" USING btree ("created_at");
  CREATE INDEX "pages_hero_hero_background_image_idx" ON "pages" USING btree ("hero_background_image_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_parent_idx" ON "pages" USING btree ("parent_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_hero_version_hero_background_image_idx" ON "_pages_v" USING btree ("version_hero_background_image_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_parent_idx" ON "_pages_v" USING btree ("version_parent_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v_locales" USING btree ("version_slug","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_posts_cover_image_idx" ON "blog_posts" USING btree ("cover_image_id");
  CREATE INDEX "blog_posts_author_idx" ON "blog_posts" USING btree ("author_id");
  CREATE INDEX "blog_posts_updated_at_idx" ON "blog_posts" USING btree ("updated_at");
  CREATE INDEX "blog_posts_created_at_idx" ON "blog_posts" USING btree ("created_at");
  CREATE INDEX "blog_posts__status_idx" ON "blog_posts" USING btree ("_status");
  CREATE UNIQUE INDEX "blog_posts_slug_idx" ON "blog_posts_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "blog_posts_locales_locale_parent_id_unique" ON "blog_posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_posts_v_parent_idx" ON "_blog_posts_v" USING btree ("parent_id");
  CREATE INDEX "_blog_posts_v_version_version_cover_image_idx" ON "_blog_posts_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_blog_posts_v_version_version_author_idx" ON "_blog_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_blog_posts_v_version_version_updated_at_idx" ON "_blog_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_blog_posts_v_version_version_created_at_idx" ON "_blog_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_blog_posts_v_version_version__status_idx" ON "_blog_posts_v" USING btree ("version__status");
  CREATE INDEX "_blog_posts_v_created_at_idx" ON "_blog_posts_v" USING btree ("created_at");
  CREATE INDEX "_blog_posts_v_updated_at_idx" ON "_blog_posts_v" USING btree ("updated_at");
  CREATE INDEX "_blog_posts_v_snapshot_idx" ON "_blog_posts_v" USING btree ("snapshot");
  CREATE INDEX "_blog_posts_v_published_locale_idx" ON "_blog_posts_v" USING btree ("published_locale");
  CREATE INDEX "_blog_posts_v_latest_idx" ON "_blog_posts_v" USING btree ("latest");
  CREATE INDEX "_blog_posts_v_version_version_slug_idx" ON "_blog_posts_v_locales" USING btree ("version_slug","_locale");
  CREATE UNIQUE INDEX "_blog_posts_v_locales_locale_parent_id_unique" ON "_blog_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "insights_posts_slug_idx" ON "insights_posts" USING btree ("slug");
  CREATE INDEX "insights_posts_cover_image_idx" ON "insights_posts" USING btree ("cover_image_id");
  CREATE INDEX "insights_posts_author_idx" ON "insights_posts" USING btree ("author_id");
  CREATE INDEX "insights_posts_updated_at_idx" ON "insights_posts" USING btree ("updated_at");
  CREATE INDEX "insights_posts_created_at_idx" ON "insights_posts" USING btree ("created_at");
  CREATE INDEX "insights_posts__status_idx" ON "insights_posts" USING btree ("_status");
  CREATE UNIQUE INDEX "insights_posts_locales_locale_parent_id_unique" ON "insights_posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_insights_posts_v_parent_idx" ON "_insights_posts_v" USING btree ("parent_id");
  CREATE INDEX "_insights_posts_v_version_version_slug_idx" ON "_insights_posts_v" USING btree ("version_slug");
  CREATE INDEX "_insights_posts_v_version_version_cover_image_idx" ON "_insights_posts_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_insights_posts_v_version_version_author_idx" ON "_insights_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_insights_posts_v_version_version_updated_at_idx" ON "_insights_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_insights_posts_v_version_version_created_at_idx" ON "_insights_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_insights_posts_v_version_version__status_idx" ON "_insights_posts_v" USING btree ("version__status");
  CREATE INDEX "_insights_posts_v_created_at_idx" ON "_insights_posts_v" USING btree ("created_at");
  CREATE INDEX "_insights_posts_v_updated_at_idx" ON "_insights_posts_v" USING btree ("updated_at");
  CREATE INDEX "_insights_posts_v_snapshot_idx" ON "_insights_posts_v" USING btree ("snapshot");
  CREATE INDEX "_insights_posts_v_published_locale_idx" ON "_insights_posts_v" USING btree ("published_locale");
  CREATE INDEX "_insights_posts_v_latest_idx" ON "_insights_posts_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_insights_posts_v_locales_locale_parent_id_unique" ON "_insights_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categories_highlights_order_idx" ON "categories_highlights" USING btree ("_order");
  CREATE INDEX "categories_highlights_parent_id_idx" ON "categories_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "categories_highlights_locales_locale_parent_id_unique" ON "categories_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_icon_idx" ON "categories" USING btree ("icon_id");
  CREATE INDEX "categories_image_idx" ON "categories" USING btree ("image_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_images_order_idx" ON "products_images" USING btree ("_order");
  CREATE INDEX "products_images_parent_id_idx" ON "products_images" USING btree ("_parent_id");
  CREATE INDEX "products_images_image_idx" ON "products_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "products_images_locales_locale_parent_id_unique" ON "products_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_features_order_idx" ON "products_features" USING btree ("_order");
  CREATE INDEX "products_features_parent_id_idx" ON "products_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_features_locales_locale_parent_id_unique" ON "products_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "products_sku_idx" ON "products" USING btree ("sku");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_brand_idx" ON "products" USING btree ("brand_id");
  CREATE INDEX "products_category_idx" ON "products" USING btree ("category_id");
  CREATE INDEX "products_main_image_idx" ON "products" USING btree ("main_image_id");
  CREATE INDEX "products_datasheet_idx" ON "products" USING btree ("datasheet_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products__status_idx" ON "products" USING btree ("_status");
  CREATE UNIQUE INDEX "products_locales_locale_parent_id_unique" ON "products_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_products_id_idx" ON "products_rels" USING btree ("products_id");
  CREATE INDEX "_products_v_version_images_order_idx" ON "_products_v_version_images" USING btree ("_order");
  CREATE INDEX "_products_v_version_images_parent_id_idx" ON "_products_v_version_images" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_images_image_idx" ON "_products_v_version_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "_products_v_version_images_locales_locale_parent_id_unique" ON "_products_v_version_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_version_features_order_idx" ON "_products_v_version_features" USING btree ("_order");
  CREATE INDEX "_products_v_version_features_parent_id_idx" ON "_products_v_version_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_products_v_version_features_locales_locale_parent_id_unique" ON "_products_v_version_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_version_sku_idx" ON "_products_v" USING btree ("version_sku");
  CREATE INDEX "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  CREATE INDEX "_products_v_version_version_brand_idx" ON "_products_v" USING btree ("version_brand_id");
  CREATE INDEX "_products_v_version_version_category_idx" ON "_products_v" USING btree ("version_category_id");
  CREATE INDEX "_products_v_version_version_main_image_idx" ON "_products_v" USING btree ("version_main_image_id");
  CREATE INDEX "_products_v_version_version_datasheet_idx" ON "_products_v" USING btree ("version_datasheet_id");
  CREATE INDEX "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX "_products_v_snapshot_idx" ON "_products_v" USING btree ("snapshot");
  CREATE INDEX "_products_v_published_locale_idx" ON "_products_v" USING btree ("published_locale");
  CREATE INDEX "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_products_v_locales_locale_parent_id_unique" ON "_products_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_rels_order_idx" ON "_products_v_rels" USING btree ("order");
  CREATE INDEX "_products_v_rels_parent_idx" ON "_products_v_rels" USING btree ("parent_id");
  CREATE INDEX "_products_v_rels_path_idx" ON "_products_v_rels" USING btree ("path");
  CREATE INDEX "_products_v_rels_products_id_idx" ON "_products_v_rels" USING btree ("products_id");
  CREATE INDEX "brands_certifications_order_idx" ON "brands_certifications" USING btree ("_order");
  CREATE INDEX "brands_certifications_parent_id_idx" ON "brands_certifications" USING btree ("_parent_id");
  CREATE INDEX "brands_certifications_file_idx" ON "brands_certifications" USING btree ("file_id");
  CREATE UNIQUE INDEX "brands_certifications_locales_locale_parent_id_unique" ON "brands_certifications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "brands_key_technologies_order_idx" ON "brands_key_technologies" USING btree ("_order");
  CREATE INDEX "brands_key_technologies_parent_id_idx" ON "brands_key_technologies" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "brands_key_technologies_locales_locale_parent_id_unique" ON "brands_key_technologies_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "brands_slug_idx" ON "brands" USING btree ("slug");
  CREATE INDEX "brands_logo_idx" ON "brands" USING btree ("logo_id");
  CREATE INDEX "brands_logo_svg_idx" ON "brands" USING btree ("logo_svg_id");
  CREATE INDEX "brands_logo_png_idx" ON "brands" USING btree ("logo_png_id");
  CREATE INDEX "brands_updated_at_idx" ON "brands" USING btree ("updated_at");
  CREATE INDEX "brands_created_at_idx" ON "brands" USING btree ("created_at");
  CREATE UNIQUE INDEX "brands_locales_locale_parent_id_unique" ON "brands_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "brands_rels_order_idx" ON "brands_rels" USING btree ("order");
  CREATE INDEX "brands_rels_parent_idx" ON "brands_rels" USING btree ("parent_id");
  CREATE INDEX "brands_rels_path_idx" ON "brands_rels" USING btree ("path");
  CREATE INDEX "brands_rels_products_id_idx" ON "brands_rels" USING btree ("products_id");
  CREATE UNIQUE INDEX "careers_slug_idx" ON "careers" USING btree ("slug");
  CREATE INDEX "careers_updated_at_idx" ON "careers" USING btree ("updated_at");
  CREATE INDEX "careers_created_at_idx" ON "careers" USING btree ("created_at");
  CREATE UNIQUE INDEX "careers_locales_locale_parent_id_unique" ON "careers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "office_locations_updated_at_idx" ON "office_locations" USING btree ("updated_at");
  CREATE INDEX "office_locations_created_at_idx" ON "office_locations" USING btree ("created_at");
  CREATE UNIQUE INDEX "office_locations_locales_locale_parent_id_unique" ON "office_locations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faq_entries_updated_at_idx" ON "faq_entries" USING btree ("updated_at");
  CREATE INDEX "faq_entries_created_at_idx" ON "faq_entries" USING btree ("created_at");
  CREATE UNIQUE INDEX "faq_entries_locales_locale_parent_id_unique" ON "faq_entries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "news_items_cover_image_idx" ON "news_items" USING btree ("cover_image_id");
  CREATE INDEX "news_items_updated_at_idx" ON "news_items" USING btree ("updated_at");
  CREATE INDEX "news_items_created_at_idx" ON "news_items" USING btree ("created_at");
  CREATE UNIQUE INDEX "news_items_slug_idx" ON "news_items_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "news_items_locales_locale_parent_id_unique" ON "news_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "stats_updated_at_idx" ON "stats" USING btree ("updated_at");
  CREATE INDEX "stats_created_at_idx" ON "stats" USING btree ("created_at");
  CREATE UNIQUE INDEX "stats_locales_locale_parent_id_unique" ON "stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE UNIQUE INDEX "testimonials_locales_locale_parent_id_unique" ON "testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "awards_image_idx" ON "awards" USING btree ("image_id");
  CREATE INDEX "awards_updated_at_idx" ON "awards" USING btree ("updated_at");
  CREATE INDEX "awards_created_at_idx" ON "awards" USING btree ("created_at");
  CREATE UNIQUE INDEX "awards_locales_locale_parent_id_unique" ON "awards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "applications_cv_idx" ON "applications" USING btree ("cv_id");
  CREATE INDEX "applications_updated_at_idx" ON "applications" USING btree ("updated_at");
  CREATE INDEX "applications_created_at_idx" ON "applications" USING btree ("created_at");
  CREATE INDEX "messages_updated_at_idx" ON "messages" USING btree ("updated_at");
  CREATE INDEX "messages_created_at_idx" ON "messages" USING btree ("created_at");
  CREATE INDEX "services_features_order_idx" ON "services_features" USING btree ("_order");
  CREATE INDEX "services_features_parent_id_idx" ON "services_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_features_locales_locale_parent_id_unique" ON "services_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_benefits_order_idx" ON "services_benefits" USING btree ("_order");
  CREATE INDEX "services_benefits_parent_id_idx" ON "services_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_benefits_locales_locale_parent_id_unique" ON "services_benefits_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_hero_background_image_idx" ON "services" USING btree ("hero_background_image_id");
  CREATE INDEX "services_meta_meta_image_idx" ON "services" USING btree ("meta_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_version_features_order_idx" ON "_services_v_version_features" USING btree ("_order");
  CREATE INDEX "_services_v_version_features_parent_id_idx" ON "_services_v_version_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_version_features_locales_locale_parent_id_unique" ON "_services_v_version_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_version_benefits_order_idx" ON "_services_v_version_benefits" USING btree ("_order");
  CREATE INDEX "_services_v_version_benefits_parent_id_idx" ON "_services_v_version_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_version_benefits_locales_locale_parent_id_unique" ON "_services_v_version_benefits_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_hero_background_image_idx" ON "_services_v" USING btree ("version_hero_background_image_id");
  CREATE INDEX "_services_v_version_meta_version_meta_image_idx" ON "_services_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_snapshot_idx" ON "_services_v" USING btree ("snapshot");
  CREATE INDEX "_services_v_published_locale_idx" ON "_services_v" USING btree ("published_locale");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_services_v_locales_locale_parent_id_unique" ON "_services_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_media_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("media_folders_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_blog_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_posts_id");
  CREATE INDEX "payload_locked_documents_rels_insights_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("insights_posts_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_brands_id_idx" ON "payload_locked_documents_rels" USING btree ("brands_id");
  CREATE INDEX "payload_locked_documents_rels_careers_id_idx" ON "payload_locked_documents_rels" USING btree ("careers_id");
  CREATE INDEX "payload_locked_documents_rels_office_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("office_locations_id");
  CREATE INDEX "payload_locked_documents_rels_faq_entries_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_entries_id");
  CREATE INDEX "payload_locked_documents_rels_news_items_id_idx" ON "payload_locked_documents_rels" USING btree ("news_items_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_stats_id_idx" ON "payload_locked_documents_rels" USING btree ("stats_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_awards_id_idx" ON "payload_locked_documents_rels" USING btree ("awards_id");
  CREATE INDEX "payload_locked_documents_rels_applications_id_idx" ON "payload_locked_documents_rels" USING btree ("applications_id");
  CREATE INDEX "payload_locked_documents_rels_messages_id_idx" ON "payload_locked_documents_rels" USING btree ("messages_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_utility_bar_social_links_order_idx" ON "header_utility_bar_social_links" USING btree ("_order");
  CREATE INDEX "header_utility_bar_social_links_parent_id_idx" ON "header_utility_bar_social_links" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_children_order_idx" ON "header_nav_items_children" USING btree ("_order");
  CREATE INDEX "header_nav_items_children_parent_id_idx" ON "header_nav_items_children" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_children_locales_locale_parent_id_unique" ON "header_nav_items_children_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_locales_locale_parent_id_unique" ON "header_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_footer_columns_links_order_idx" ON "footer_footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_footer_columns_links_parent_id_idx" ON "footer_footer_columns_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_footer_columns_links_locales_locale_parent_id_unique" ON "footer_footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_footer_columns_order_idx" ON "footer_footer_columns" USING btree ("_order");
  CREATE INDEX "footer_footer_columns_parent_id_idx" ON "footer_footer_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_footer_columns_locales_locale_parent_id_unique" ON "footer_footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_section_config_order_idx" ON "homepage_section_config" USING btree ("_order");
  CREATE INDEX "homepage_section_config_parent_id_idx" ON "homepage_section_config" USING btree ("_parent_id");
  CREATE INDEX "homepage_hero_content_feature_pills_order_idx" ON "homepage_hero_content_feature_pills" USING btree ("_order");
  CREATE INDEX "homepage_hero_content_feature_pills_parent_id_idx" ON "homepage_hero_content_feature_pills" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_hero_content_feature_pills_locales_locale_parent_id" ON "homepage_hero_content_feature_pills_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_hero_content_stats_order_idx" ON "homepage_hero_content_stats" USING btree ("_order");
  CREATE INDEX "homepage_hero_content_stats_parent_id_idx" ON "homepage_hero_content_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_hero_content_stats_locales_locale_parent_id_unique" ON "homepage_hero_content_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_why_choose_us_section_banner_stats_order_idx" ON "homepage_why_choose_us_section_banner_stats" USING btree ("_order");
  CREATE INDEX "homepage_why_choose_us_section_banner_stats_parent_id_idx" ON "homepage_why_choose_us_section_banner_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_why_choose_us_section_banner_stats_locales_locale_p" ON "homepage_why_choose_us_section_banner_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_why_choose_us_section_features_chips_order_idx" ON "homepage_why_choose_us_section_features_chips" USING btree ("_order");
  CREATE INDEX "homepage_why_choose_us_section_features_chips_parent_id_idx" ON "homepage_why_choose_us_section_features_chips" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_why_choose_us_section_features_chips_locales_locale" ON "homepage_why_choose_us_section_features_chips_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_why_choose_us_section_features_order_idx" ON "homepage_why_choose_us_section_features" USING btree ("_order");
  CREATE INDEX "homepage_why_choose_us_section_features_parent_id_idx" ON "homepage_why_choose_us_section_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_why_choose_us_section_features_locales_locale_paren" ON "homepage_why_choose_us_section_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_latest_news_section_categories_order_idx" ON "homepage_latest_news_section_categories" USING btree ("_order");
  CREATE INDEX "homepage_latest_news_section_categories_parent_id_idx" ON "homepage_latest_news_section_categories" USING btree ("_parent_id");
  CREATE INDEX "homepage_hero_background_image_idx" ON "homepage" USING btree ("hero_background_image_id");
  CREATE INDEX "homepage_why_choose_us_section_why_choose_us_section_ban_idx" ON "homepage" USING btree ("why_choose_us_section_banner_image_id");
  CREATE UNIQUE INDEX "homepage_locales_locale_parent_id_unique" ON "homepage_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_rels_order_idx" ON "homepage_rels" USING btree ("order");
  CREATE INDEX "homepage_rels_parent_idx" ON "homepage_rels" USING btree ("parent_id");
  CREATE INDEX "homepage_rels_path_idx" ON "homepage_rels" USING btree ("path");
  CREATE INDEX "homepage_rels_products_id_idx" ON "homepage_rels" USING btree ("products_id");
  CREATE INDEX "homepage_rels_categories_id_idx" ON "homepage_rels" USING btree ("categories_id");
  CREATE INDEX "homepage_rels_brands_id_idx" ON "homepage_rels" USING btree ("brands_id");
  CREATE INDEX "homepage_rels_testimonials_id_idx" ON "homepage_rels" USING btree ("testimonials_id");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "site_settings_default_seo_default_seo_image_idx" ON "site_settings" USING btree ("default_seo_image_id");
  CREATE INDEX "site_settings_maintenance_maintenance_logo_image_idx" ON "site_settings" USING btree ("maintenance_logo_image_id");
  CREATE INDEX "site_settings_maintenance_maintenance_background_image_idx" ON "site_settings" USING btree ("maintenance_background_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_company_details_order_idx" ON "about_page_company_details" USING btree ("_order");
  CREATE INDEX "about_page_company_details_parent_id_idx" ON "about_page_company_details" USING btree ("_parent_id");
  CREATE INDEX "about_page_associated_companies_order_idx" ON "about_page_associated_companies" USING btree ("_order");
  CREATE INDEX "about_page_associated_companies_parent_id_idx" ON "about_page_associated_companies" USING btree ("_parent_id");
  CREATE INDEX "about_page_parent_company_focus_order_idx" ON "about_page_parent_company_focus" USING btree ("_order");
  CREATE INDEX "about_page_parent_company_focus_parent_id_idx" ON "about_page_parent_company_focus" USING btree ("_parent_id");
  CREATE INDEX "about_page_vision_standards_order_idx" ON "about_page_vision_standards" USING btree ("_order");
  CREATE INDEX "about_page_vision_standards_parent_id_idx" ON "about_page_vision_standards" USING btree ("_parent_id");
  CREATE INDEX "about_page_core_values_order_idx" ON "about_page_core_values" USING btree ("_order");
  CREATE INDEX "about_page_core_values_parent_id_idx" ON "about_page_core_values" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_core_values_locales_locale_parent_id_unique" ON "about_page_core_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_service_pillars_benefits_order_idx" ON "about_page_service_pillars_benefits" USING btree ("_order");
  CREATE INDEX "about_page_service_pillars_benefits_parent_id_idx" ON "about_page_service_pillars_benefits" USING btree ("_parent_id");
  CREATE INDEX "about_page_service_pillars_order_idx" ON "about_page_service_pillars" USING btree ("_order");
  CREATE INDEX "about_page_service_pillars_parent_id_idx" ON "about_page_service_pillars" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_service_pillars_locales_locale_parent_id_unique" ON "about_page_service_pillars_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_board_of_directors_order_idx" ON "about_page_board_of_directors" USING btree ("_order");
  CREATE INDEX "about_page_board_of_directors_parent_id_idx" ON "about_page_board_of_directors" USING btree ("_parent_id");
  CREATE INDEX "about_page_executive_team_order_idx" ON "about_page_executive_team" USING btree ("_order");
  CREATE INDEX "about_page_executive_team_parent_id_idx" ON "about_page_executive_team" USING btree ("_parent_id");
  CREATE INDEX "about_page_divisions_order_idx" ON "about_page_divisions" USING btree ("_order");
  CREATE INDEX "about_page_divisions_parent_id_idx" ON "about_page_divisions" USING btree ("_parent_id");
  CREATE INDEX "about_page_awards_order_idx" ON "about_page_awards" USING btree ("_order");
  CREATE INDEX "about_page_awards_parent_id_idx" ON "about_page_awards" USING btree ("_parent_id");
  CREATE INDEX "about_page_certifications_order_idx" ON "about_page_certifications" USING btree ("_order");
  CREATE INDEX "about_page_certifications_parent_id_idx" ON "about_page_certifications" USING btree ("_parent_id");
  CREATE INDEX "about_page_image_section1_images_order_idx" ON "about_page_image_section1_images" USING btree ("_order");
  CREATE INDEX "about_page_image_section1_images_parent_id_idx" ON "about_page_image_section1_images" USING btree ("_parent_id");
  CREATE INDEX "about_page_image_section1_images_image_idx" ON "about_page_image_section1_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "about_page_image_section1_images_locales_locale_parent_id_un" ON "about_page_image_section1_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_image_section2_images_order_idx" ON "about_page_image_section2_images" USING btree ("_order");
  CREATE INDEX "about_page_image_section2_images_parent_id_idx" ON "about_page_image_section2_images" USING btree ("_parent_id");
  CREATE INDEX "about_page_image_section2_images_image_idx" ON "about_page_image_section2_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "about_page_image_section2_images_locales_locale_parent_id_un" ON "about_page_image_section2_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_ethical_practices_order_idx" ON "about_page_ethical_practices" USING btree ("_order");
  CREATE INDEX "about_page_ethical_practices_parent_id_idx" ON "about_page_ethical_practices" USING btree ("_parent_id");
  CREATE INDEX "about_page_uae_alignment_order_idx" ON "about_page_uae_alignment" USING btree ("_order");
  CREATE INDEX "about_page_uae_alignment_parent_id_idx" ON "about_page_uae_alignment" USING btree ("_parent_id");
  CREATE INDEX "about_page_market_coverage_order_idx" ON "about_page_market_coverage" USING btree ("_order");
  CREATE INDEX "about_page_market_coverage_parent_id_idx" ON "about_page_market_coverage" USING btree ("_parent_id");
  CREATE INDEX "about_page_distribution_channels_order_idx" ON "about_page_distribution_channels" USING btree ("_order");
  CREATE INDEX "about_page_distribution_channels_parent_id_idx" ON "about_page_distribution_channels" USING btree ("_parent_id");
  CREATE INDEX "about_page_philosophy_order_idx" ON "about_page_philosophy" USING btree ("_order");
  CREATE INDEX "about_page_philosophy_parent_id_idx" ON "about_page_philosophy" USING btree ("_parent_id");
  CREATE INDEX "about_page_milestones_order_idx" ON "about_page_milestones" USING btree ("_order");
  CREATE INDEX "about_page_milestones_parent_id_idx" ON "about_page_milestones" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_locales_locale_parent_id_unique" ON "about_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_page_key_points_order_idx" ON "contact_page_key_points" USING btree ("_order");
  CREATE INDEX "contact_page_key_points_parent_id_idx" ON "contact_page_key_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_page_key_points_locales_locale_parent_id_unique" ON "contact_page_key_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_page_quick_contacts_order_idx" ON "contact_page_quick_contacts" USING btree ("_order");
  CREATE INDEX "contact_page_quick_contacts_parent_id_idx" ON "contact_page_quick_contacts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_page_quick_contacts_locales_locale_parent_id_unique" ON "contact_page_quick_contacts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_page_departments_order_idx" ON "contact_page_departments" USING btree ("_order");
  CREATE INDEX "contact_page_departments_parent_id_idx" ON "contact_page_departments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_page_departments_locales_locale_parent_id_unique" ON "contact_page_departments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_page_hero_background_image_idx" ON "contact_page" USING btree ("hero_background_image_id");
  CREATE UNIQUE INDEX "contact_page_locales_locale_parent_id_unique" ON "contact_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "careers_contact_page_benefits_order_idx" ON "careers_contact_page_benefits" USING btree ("_order");
  CREATE INDEX "careers_contact_page_benefits_parent_id_idx" ON "careers_contact_page_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "careers_contact_page_benefits_locales_locale_parent_id_uniqu" ON "careers_contact_page_benefits_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "careers_contact_page_locales_locale_parent_id_unique" ON "careers_contact_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "brands_page_authorized_features_order_idx" ON "brands_page_authorized_features" USING btree ("_order");
  CREATE INDEX "brands_page_authorized_features_parent_id_idx" ON "brands_page_authorized_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "brands_page_authorized_features_locales_locale_parent_id_uni" ON "brands_page_authorized_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "brands_page_awards_order_idx" ON "brands_page_awards" USING btree ("_order");
  CREATE INDEX "brands_page_awards_parent_id_idx" ON "brands_page_awards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "brands_page_awards_locales_locale_parent_id_unique" ON "brands_page_awards_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "brands_page_locales_locale_parent_id_unique" ON "brands_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "product_catalog_page_gallery_section_images_order_idx" ON "product_catalog_page_gallery_section_images" USING btree ("_order");
  CREATE INDEX "product_catalog_page_gallery_section_images_parent_id_idx" ON "product_catalog_page_gallery_section_images" USING btree ("_parent_id");
  CREATE INDEX "product_catalog_page_gallery_section_images_image_idx" ON "product_catalog_page_gallery_section_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "product_catalog_page_gallery_section_images_locales_locale_p" ON "product_catalog_page_gallery_section_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "product_catalog_page_hero_hero_background_image_idx" ON "product_catalog_page" USING btree ("hero_background_image_id");
  CREATE UNIQUE INDEX "product_catalog_page_locales_locale_parent_id_unique" ON "product_catalog_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "computer_components_page_hero_background_image_idx" ON "computer_components_page" USING btree ("hero_background_image_id");
  CREATE UNIQUE INDEX "computer_components_page_locales_locale_parent_id_unique" ON "computer_components_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "computer_accessories_page_hero_background_image_idx" ON "computer_accessories_page" USING btree ("hero_background_image_id");
  CREATE UNIQUE INDEX "computer_accessories_page_locales_locale_parent_id_unique" ON "computer_accessories_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "monitors_page_hero_background_image_idx" ON "monitors_page" USING btree ("hero_background_image_id");
  CREATE UNIQUE INDEX "monitors_page_locales_locale_parent_id_unique" ON "monitors_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "gaming_page_hero_background_image_idx" ON "gaming_page" USING btree ("hero_background_image_id");
  CREATE UNIQUE INDEX "gaming_page_locales_locale_parent_id_unique" ON "gaming_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "laptops_page_hero_background_image_idx" ON "laptops_page" USING btree ("hero_background_image_id");
  CREATE UNIQUE INDEX "laptops_page_locales_locale_parent_id_unique" ON "laptops_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "it_dp_authorized_brands_order_idx" ON "it_dp_authorized_brands" USING btree ("_order");
  CREATE INDEX "it_dp_authorized_brands_parent_id_idx" ON "it_dp_authorized_brands" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "it_dp_authorized_brands_locales_locale_parent_id_unique" ON "it_dp_authorized_brands_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "it_dp_product_categories_order_idx" ON "it_dp_product_categories" USING btree ("_order");
  CREATE INDEX "it_dp_product_categories_parent_id_idx" ON "it_dp_product_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "it_dp_product_categories_locales_locale_parent_id_unique" ON "it_dp_product_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "it_dp_geographic_coverage_order_idx" ON "it_dp_geographic_coverage" USING btree ("_order");
  CREATE INDEX "it_dp_geographic_coverage_parent_id_idx" ON "it_dp_geographic_coverage" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "it_dp_geographic_coverage_locales_locale_parent_id_unique" ON "it_dp_geographic_coverage_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "it_dp_channel_advantages_si_var_advantages_order_idx" ON "it_dp_channel_advantages_si_var_advantages" USING btree ("_order");
  CREATE INDEX "it_dp_channel_advantages_si_var_advantages_parent_id_idx" ON "it_dp_channel_advantages_si_var_advantages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "it_dp_channel_advantages_si_var_advantages_locales_locale_pa" ON "it_dp_channel_advantages_si_var_advantages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "it_dp_channel_advantages_corporate_gov_advantages_order_idx" ON "it_dp_channel_advantages_corporate_gov_advantages" USING btree ("_order");
  CREATE INDEX "it_dp_channel_advantages_corporate_gov_advantages_parent_id_idx" ON "it_dp_channel_advantages_corporate_gov_advantages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "it_dp_channel_advantages_corporate_gov_advantages_locales_lo" ON "it_dp_channel_advantages_corporate_gov_advantages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "it_dp_channel_advantages_ecommerce_retail_advantages_order_idx" ON "it_dp_channel_advantages_ecommerce_retail_advantages" USING btree ("_order");
  CREATE INDEX "it_dp_channel_advantages_ecommerce_retail_advantages_parent_id_idx" ON "it_dp_channel_advantages_ecommerce_retail_advantages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "it_dp_channel_advantages_ecommerce_retail_advantages_local_1" ON "it_dp_channel_advantages_ecommerce_retail_advantages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "it_dp_industries_order_idx" ON "it_dp_industries" USING btree ("_order");
  CREATE INDEX "it_dp_industries_parent_id_idx" ON "it_dp_industries" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "it_dp_industries_locales_locale_parent_id_unique" ON "it_dp_industries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "it_dp_infrastructure_warehouse_features_order_idx" ON "it_dp_infrastructure_warehouse_features" USING btree ("_order");
  CREATE INDEX "it_dp_infrastructure_warehouse_features_parent_id_idx" ON "it_dp_infrastructure_warehouse_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "it_dp_infrastructure_warehouse_features_locales_locale_paren" ON "it_dp_infrastructure_warehouse_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "it_dp_infrastructure_retail_features_order_idx" ON "it_dp_infrastructure_retail_features" USING btree ("_order");
  CREATE INDEX "it_dp_infrastructure_retail_features_parent_id_idx" ON "it_dp_infrastructure_retail_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "it_dp_infrastructure_retail_features_locales_locale_parent_i" ON "it_dp_infrastructure_retail_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "it_dp_get_started_items_order_idx" ON "it_dp_get_started_items" USING btree ("_order");
  CREATE INDEX "it_dp_get_started_items_parent_id_idx" ON "it_dp_get_started_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "it_dp_get_started_items_locales_locale_parent_id_unique" ON "it_dp_get_started_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "it_dp_hero_background_image_idx" ON "it_dp" USING btree ("hero_background_image_id");
  CREATE UNIQUE INDEX "it_dp_locales_locale_parent_id_unique" ON "it_dp_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "authorized_brands_page_authorized_brands_order_idx" ON "authorized_brands_page_authorized_brands" USING btree ("_order");
  CREATE INDEX "authorized_brands_page_authorized_brands_parent_id_idx" ON "authorized_brands_page_authorized_brands" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "authorized_brands_page_authorized_brands_locales_locale_pare" ON "authorized_brands_page_authorized_brands_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "authorized_brands_page_locales_locale_parent_id_unique" ON "authorized_brands_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "warehouse_logistics_page_warehouse_features_order_idx" ON "warehouse_logistics_page_warehouse_features" USING btree ("_order");
  CREATE INDEX "warehouse_logistics_page_warehouse_features_parent_id_idx" ON "warehouse_logistics_page_warehouse_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "warehouse_logistics_page_warehouse_features_locales_locale_p" ON "warehouse_logistics_page_warehouse_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "warehouse_logistics_page_locales_locale_parent_id_unique" ON "warehouse_logistics_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "retail_presence_page_retail_features_order_idx" ON "retail_presence_page_retail_features" USING btree ("_order");
  CREATE INDEX "retail_presence_page_retail_features_parent_id_idx" ON "retail_presence_page_retail_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "retail_presence_page_retail_features_locales_locale_parent_i" ON "retail_presence_page_retail_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "retail_presence_page_locales_locale_parent_id_unique" ON "retail_presence_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "distribution_channels_page_b2b_channels_order_idx" ON "distribution_channels_page_b2b_channels" USING btree ("_order");
  CREATE INDEX "distribution_channels_page_b2b_channels_parent_id_idx" ON "distribution_channels_page_b2b_channels" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "distribution_channels_page_b2b_channels_locales_locale_paren" ON "distribution_channels_page_b2b_channels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "distribution_channels_page_ecommerce_channels_order_idx" ON "distribution_channels_page_ecommerce_channels" USING btree ("_order");
  CREATE INDEX "distribution_channels_page_ecommerce_channels_parent_id_idx" ON "distribution_channels_page_ecommerce_channels" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "distribution_channels_page_ecommerce_channels_locales_locale" ON "distribution_channels_page_ecommerce_channels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "distribution_channels_page_geographic_coverage_order_idx" ON "distribution_channels_page_geographic_coverage" USING btree ("_order");
  CREATE INDEX "distribution_channels_page_geographic_coverage_parent_id_idx" ON "distribution_channels_page_geographic_coverage" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "distribution_channels_page_geographic_coverage_locales_local" ON "distribution_channels_page_geographic_coverage_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "distribution_channels_page_locales_locale_parent_id_unique" ON "distribution_channels_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "quality_assurance_page_quality_assurance_order_idx" ON "quality_assurance_page_quality_assurance" USING btree ("_order");
  CREATE INDEX "quality_assurance_page_quality_assurance_parent_id_idx" ON "quality_assurance_page_quality_assurance" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "quality_assurance_page_quality_assurance_locales_locale_pare" ON "quality_assurance_page_quality_assurance_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "quality_assurance_page_locales_locale_parent_id_unique" ON "quality_assurance_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_page_hero_background_image_idx" ON "services_page" USING btree ("hero_background_image_id");
  CREATE INDEX "services_page_meta_meta_image_idx" ON "services_page" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "services_page_locales_locale_parent_id_unique" ON "services_page_locales" USING btree ("_locale","_parent_id");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "media_folders" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "blog_posts" CASCADE;
  DROP TABLE "blog_posts_locales" CASCADE;
  DROP TABLE "_blog_posts_v" CASCADE;
  DROP TABLE "_blog_posts_v_locales" CASCADE;
  DROP TABLE "insights_posts" CASCADE;
  DROP TABLE "insights_posts_locales" CASCADE;
  DROP TABLE "_insights_posts_v" CASCADE;
  DROP TABLE "_insights_posts_v_locales" CASCADE;
  DROP TABLE "categories_highlights" CASCADE;
  DROP TABLE "categories_highlights_locales" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "products_images" CASCADE;
  DROP TABLE "products_images_locales" CASCADE;
  DROP TABLE "products_features" CASCADE;
  DROP TABLE "products_features_locales" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_locales" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "_products_v_version_images" CASCADE;
  DROP TABLE "_products_v_version_images_locales" CASCADE;
  DROP TABLE "_products_v_version_features" CASCADE;
  DROP TABLE "_products_v_version_features_locales" CASCADE;
  DROP TABLE "_products_v" CASCADE;
  DROP TABLE "_products_v_locales" CASCADE;
  DROP TABLE "_products_v_rels" CASCADE;
  DROP TABLE "brands_certifications" CASCADE;
  DROP TABLE "brands_certifications_locales" CASCADE;
  DROP TABLE "brands_key_technologies" CASCADE;
  DROP TABLE "brands_key_technologies_locales" CASCADE;
  DROP TABLE "brands" CASCADE;
  DROP TABLE "brands_locales" CASCADE;
  DROP TABLE "brands_rels" CASCADE;
  DROP TABLE "careers" CASCADE;
  DROP TABLE "careers_locales" CASCADE;
  DROP TABLE "office_locations" CASCADE;
  DROP TABLE "office_locations_locales" CASCADE;
  DROP TABLE "faq_entries" CASCADE;
  DROP TABLE "faq_entries_locales" CASCADE;
  DROP TABLE "news_items" CASCADE;
  DROP TABLE "news_items_locales" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "stats" CASCADE;
  DROP TABLE "stats_locales" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "testimonials_locales" CASCADE;
  DROP TABLE "awards" CASCADE;
  DROP TABLE "awards_locales" CASCADE;
  DROP TABLE "applications" CASCADE;
  DROP TABLE "messages" CASCADE;
  DROP TABLE "services_features" CASCADE;
  DROP TABLE "services_features_locales" CASCADE;
  DROP TABLE "services_benefits" CASCADE;
  DROP TABLE "services_benefits_locales" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "_services_v_version_features" CASCADE;
  DROP TABLE "_services_v_version_features_locales" CASCADE;
  DROP TABLE "_services_v_version_benefits" CASCADE;
  DROP TABLE "_services_v_version_benefits_locales" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_locales" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_utility_bar_social_links" CASCADE;
  DROP TABLE "header_nav_items_children" CASCADE;
  DROP TABLE "header_nav_items_children_locales" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header_nav_items_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer_footer_columns_links" CASCADE;
  DROP TABLE "footer_footer_columns_links_locales" CASCADE;
  DROP TABLE "footer_footer_columns" CASCADE;
  DROP TABLE "footer_footer_columns_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "homepage_section_config" CASCADE;
  DROP TABLE "homepage_hero_content_feature_pills" CASCADE;
  DROP TABLE "homepage_hero_content_feature_pills_locales" CASCADE;
  DROP TABLE "homepage_hero_content_stats" CASCADE;
  DROP TABLE "homepage_hero_content_stats_locales" CASCADE;
  DROP TABLE "homepage_why_choose_us_section_banner_stats" CASCADE;
  DROP TABLE "homepage_why_choose_us_section_banner_stats_locales" CASCADE;
  DROP TABLE "homepage_why_choose_us_section_features_chips" CASCADE;
  DROP TABLE "homepage_why_choose_us_section_features_chips_locales" CASCADE;
  DROP TABLE "homepage_why_choose_us_section_features" CASCADE;
  DROP TABLE "homepage_why_choose_us_section_features_locales" CASCADE;
  DROP TABLE "homepage_latest_news_section_categories" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_locales" CASCADE;
  DROP TABLE "homepage_rels" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "about_page_company_details" CASCADE;
  DROP TABLE "about_page_associated_companies" CASCADE;
  DROP TABLE "about_page_parent_company_focus" CASCADE;
  DROP TABLE "about_page_vision_standards" CASCADE;
  DROP TABLE "about_page_core_values" CASCADE;
  DROP TABLE "about_page_core_values_locales" CASCADE;
  DROP TABLE "about_page_service_pillars_benefits" CASCADE;
  DROP TABLE "about_page_service_pillars" CASCADE;
  DROP TABLE "about_page_service_pillars_locales" CASCADE;
  DROP TABLE "about_page_board_of_directors" CASCADE;
  DROP TABLE "about_page_executive_team" CASCADE;
  DROP TABLE "about_page_divisions" CASCADE;
  DROP TABLE "about_page_awards" CASCADE;
  DROP TABLE "about_page_certifications" CASCADE;
  DROP TABLE "about_page_image_section1_images" CASCADE;
  DROP TABLE "about_page_image_section1_images_locales" CASCADE;
  DROP TABLE "about_page_image_section2_images" CASCADE;
  DROP TABLE "about_page_image_section2_images_locales" CASCADE;
  DROP TABLE "about_page_ethical_practices" CASCADE;
  DROP TABLE "about_page_uae_alignment" CASCADE;
  DROP TABLE "about_page_market_coverage" CASCADE;
  DROP TABLE "about_page_distribution_channels" CASCADE;
  DROP TABLE "about_page_philosophy" CASCADE;
  DROP TABLE "about_page_milestones" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "about_page_locales" CASCADE;
  DROP TABLE "contact_page_key_points" CASCADE;
  DROP TABLE "contact_page_key_points_locales" CASCADE;
  DROP TABLE "contact_page_quick_contacts" CASCADE;
  DROP TABLE "contact_page_quick_contacts_locales" CASCADE;
  DROP TABLE "contact_page_departments" CASCADE;
  DROP TABLE "contact_page_departments_locales" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "contact_page_locales" CASCADE;
  DROP TABLE "careers_contact_page_benefits" CASCADE;
  DROP TABLE "careers_contact_page_benefits_locales" CASCADE;
  DROP TABLE "careers_contact_page" CASCADE;
  DROP TABLE "careers_contact_page_locales" CASCADE;
  DROP TABLE "brands_page_authorized_features" CASCADE;
  DROP TABLE "brands_page_authorized_features_locales" CASCADE;
  DROP TABLE "brands_page_awards" CASCADE;
  DROP TABLE "brands_page_awards_locales" CASCADE;
  DROP TABLE "brands_page" CASCADE;
  DROP TABLE "brands_page_locales" CASCADE;
  DROP TABLE "product_catalog_page_gallery_section_images" CASCADE;
  DROP TABLE "product_catalog_page_gallery_section_images_locales" CASCADE;
  DROP TABLE "product_catalog_page" CASCADE;
  DROP TABLE "product_catalog_page_locales" CASCADE;
  DROP TABLE "computer_components_page" CASCADE;
  DROP TABLE "computer_components_page_locales" CASCADE;
  DROP TABLE "computer_accessories_page" CASCADE;
  DROP TABLE "computer_accessories_page_locales" CASCADE;
  DROP TABLE "monitors_page" CASCADE;
  DROP TABLE "monitors_page_locales" CASCADE;
  DROP TABLE "gaming_page" CASCADE;
  DROP TABLE "gaming_page_locales" CASCADE;
  DROP TABLE "laptops_page" CASCADE;
  DROP TABLE "laptops_page_locales" CASCADE;
  DROP TABLE "it_dp_authorized_brands" CASCADE;
  DROP TABLE "it_dp_authorized_brands_locales" CASCADE;
  DROP TABLE "it_dp_product_categories" CASCADE;
  DROP TABLE "it_dp_product_categories_locales" CASCADE;
  DROP TABLE "it_dp_geographic_coverage" CASCADE;
  DROP TABLE "it_dp_geographic_coverage_locales" CASCADE;
  DROP TABLE "it_dp_channel_advantages_si_var_advantages" CASCADE;
  DROP TABLE "it_dp_channel_advantages_si_var_advantages_locales" CASCADE;
  DROP TABLE "it_dp_channel_advantages_corporate_gov_advantages" CASCADE;
  DROP TABLE "it_dp_channel_advantages_corporate_gov_advantages_locales" CASCADE;
  DROP TABLE "it_dp_channel_advantages_ecommerce_retail_advantages" CASCADE;
  DROP TABLE "it_dp_channel_advantages_ecommerce_retail_advantages_locales" CASCADE;
  DROP TABLE "it_dp_industries" CASCADE;
  DROP TABLE "it_dp_industries_locales" CASCADE;
  DROP TABLE "it_dp_infrastructure_warehouse_features" CASCADE;
  DROP TABLE "it_dp_infrastructure_warehouse_features_locales" CASCADE;
  DROP TABLE "it_dp_infrastructure_retail_features" CASCADE;
  DROP TABLE "it_dp_infrastructure_retail_features_locales" CASCADE;
  DROP TABLE "it_dp_get_started_items" CASCADE;
  DROP TABLE "it_dp_get_started_items_locales" CASCADE;
  DROP TABLE "it_dp" CASCADE;
  DROP TABLE "it_dp_locales" CASCADE;
  DROP TABLE "authorized_brands_page_authorized_brands" CASCADE;
  DROP TABLE "authorized_brands_page_authorized_brands_locales" CASCADE;
  DROP TABLE "authorized_brands_page" CASCADE;
  DROP TABLE "authorized_brands_page_locales" CASCADE;
  DROP TABLE "warehouse_logistics_page_warehouse_features" CASCADE;
  DROP TABLE "warehouse_logistics_page_warehouse_features_locales" CASCADE;
  DROP TABLE "warehouse_logistics_page" CASCADE;
  DROP TABLE "warehouse_logistics_page_locales" CASCADE;
  DROP TABLE "retail_presence_page_retail_features" CASCADE;
  DROP TABLE "retail_presence_page_retail_features_locales" CASCADE;
  DROP TABLE "retail_presence_page" CASCADE;
  DROP TABLE "retail_presence_page_locales" CASCADE;
  DROP TABLE "distribution_channels_page_b2b_channels" CASCADE;
  DROP TABLE "distribution_channels_page_b2b_channels_locales" CASCADE;
  DROP TABLE "distribution_channels_page_ecommerce_channels" CASCADE;
  DROP TABLE "distribution_channels_page_ecommerce_channels_locales" CASCADE;
  DROP TABLE "distribution_channels_page_geographic_coverage" CASCADE;
  DROP TABLE "distribution_channels_page_geographic_coverage_locales" CASCADE;
  DROP TABLE "distribution_channels_page" CASCADE;
  DROP TABLE "distribution_channels_page_locales" CASCADE;
  DROP TABLE "quality_assurance_page_quality_assurance" CASCADE;
  DROP TABLE "quality_assurance_page_quality_assurance_locales" CASCADE;
  DROP TABLE "quality_assurance_page" CASCADE;
  DROP TABLE "quality_assurance_page_locales" CASCADE;
  DROP TABLE "services_page" CASCADE;
  DROP TABLE "services_page_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_blog_posts_status";
  DROP TYPE "public"."enum__blog_posts_v_version_status";
  DROP TYPE "public"."enum__blog_posts_v_published_locale";
  DROP TYPE "public"."enum_insights_posts_status";
  DROP TYPE "public"."enum_insights_posts_category";
  DROP TYPE "public"."enum__insights_posts_v_version_status";
  DROP TYPE "public"."enum__insights_posts_v_version_category";
  DROP TYPE "public"."enum__insights_posts_v_published_locale";
  DROP TYPE "public"."enum_categories_icon_name";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum__products_v_version_status";
  DROP TYPE "public"."enum__products_v_published_locale";
  DROP TYPE "public"."enum_brands_category";
  DROP TYPE "public"."enum_brands_status";
  DROP TYPE "public"."enum_careers_type";
  DROP TYPE "public"."enum_careers_status";
  DROP TYPE "public"."enum_faq_entries_category";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_users_locale";
  DROP TYPE "public"."enum_stats_icon";
  DROP TYPE "public"."enum_applications_position";
  DROP TYPE "public"."enum_applications_experience";
  DROP TYPE "public"."enum_applications_status";
  DROP TYPE "public"."enum_messages_type";
  DROP TYPE "public"."enum_messages_status";
  DROP TYPE "public"."enum_services_family";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_services_icon_color";
  DROP TYPE "public"."enum__services_v_version_family";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum__services_v_version_icon";
  DROP TYPE "public"."enum__services_v_version_icon_color";
  DROP TYPE "public"."enum__services_v_published_locale";
  DROP TYPE "public"."enum_header_utility_bar_social_links_platform";
  DROP TYPE "public"."enum_header_nav_items_children_icon";
  DROP TYPE "public"."enum_header_nav_items_children_icon_color";
  DROP TYPE "public"."enum_header_nav_items_children_status";
  DROP TYPE "public"."enum_header_nav_items_status";
  DROP TYPE "public"."enum_footer_social_links_platform";
  DROP TYPE "public"."enum_homepage_section_config_section_id";
  DROP TYPE "public"."enum_homepage_hero_content_feature_pills_icon";
  DROP TYPE "public"."enum_homepage_hero_content_stats_icon";
  DROP TYPE "public"."enum_homepage_why_choose_us_section_features_icon";
  DROP TYPE "public"."enum_homepage_why_choose_us_section_features_theme";
  DROP TYPE "public"."enum_contact_page_key_points_icon_type";
  DROP TYPE "public"."enum_contact_page_quick_contacts_icon_type";
  DROP TYPE "public"."enum_brands_page_authorized_features_icon_type";
  DROP TYPE "public"."enum_brands_page_authorized_features_gradient_color";
  DROP TYPE "public"."enum_brands_page_hero_heading_size";
  DROP TYPE "public"."enum_brands_page_hero_description_size";
  DROP TYPE "public"."enum_brands_page_hero_primary_button_color";
  DROP TYPE "public"."enum_brands_page_hero_secondary_button_style";
  DROP TYPE "public"."enum_brands_page_cta_heading_size";
  DROP TYPE "public"."enum_brands_page_cta_description_size";
  DROP TYPE "public"."enum_brands_page_cta_primary_button_color";
  DROP TYPE "public"."enum_brands_page_cta_secondary_button_style";`);
}
