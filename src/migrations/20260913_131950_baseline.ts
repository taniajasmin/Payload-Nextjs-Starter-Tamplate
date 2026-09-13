import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en');
  CREATE TYPE "public"."enum_pages_blocks_feature_cards_block_cards_icon" AS ENUM('CheckCircle', 'Star', 'DollarSign', 'Rocket', 'Headphones', 'Shield', 'Zap', 'TrendingUp', 'Clock', 'Target', 'Award', 'HeartHandshake', 'BadgeCheck', 'MapPin', 'Lock', 'Mail', 'BarChart3', 'Calculator', 'Users', 'Package', 'Factory', 'Clipboard', 'Globe', 'Server', 'Database', 'Cloud', 'Code', 'Search', 'Settings', 'GraduationCap', 'Flask', 'Smartphone', 'Building', 'Store', 'Truck', 'Leaf', 'HeartPulse', 'Building2', 'Landmark', 'Cpu');
  CREATE TYPE "public"."enum_pages_blocks_highlight_block_highlights_icon" AS ENUM('CheckCircle', 'Star', 'DollarSign', 'Rocket', 'Headphones', 'Shield', 'Zap', 'TrendingUp', 'Clock', 'Target', 'Award', 'HeartHandshake', 'BadgeCheck', 'MapPin', 'Lock', 'Mail', 'BarChart3', 'Calculator', 'Users', 'Package', 'Factory', 'Clipboard', 'Globe', 'Server', 'Database', 'Cloud', 'Code', 'Search', 'Settings', 'GraduationCap', 'Flask', 'Smartphone', 'Building', 'Store', 'Truck', 'Leaf', 'HeartPulse', 'Building2', 'Landmark', 'Cpu');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_cards_block_cards_icon" AS ENUM('CheckCircle', 'Star', 'DollarSign', 'Rocket', 'Headphones', 'Shield', 'Zap', 'TrendingUp', 'Clock', 'Target', 'Award', 'HeartHandshake', 'BadgeCheck', 'MapPin', 'Lock', 'Mail', 'BarChart3', 'Calculator', 'Users', 'Package', 'Factory', 'Clipboard', 'Globe', 'Server', 'Database', 'Cloud', 'Code', 'Search', 'Settings', 'GraduationCap', 'Flask', 'Smartphone', 'Building', 'Store', 'Truck', 'Leaf', 'HeartPulse', 'Building2', 'Landmark', 'Cpu');
  CREATE TYPE "public"."enum__pages_v_blocks_highlight_block_highlights_icon" AS ENUM('CheckCircle', 'Star', 'DollarSign', 'Rocket', 'Headphones', 'Shield', 'Zap', 'TrendingUp', 'Clock', 'Target', 'Award', 'HeartHandshake', 'BadgeCheck', 'MapPin', 'Lock', 'Mail', 'BarChart3', 'Calculator', 'Users', 'Package', 'Factory', 'Clipboard', 'Globe', 'Server', 'Database', 'Cloud', 'Code', 'Search', 'Settings', 'GraduationCap', 'Flask', 'Smartphone', 'Building', 'Store', 'Truck', 'Leaf', 'HeartPulse', 'Building2', 'Landmark', 'Cpu');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_users_role" AS ENUM('administrator', 'editor', 'author', 'contributor');
  CREATE TYPE "public"."enum_users_locale" AS ENUM('en', 'ar', 'fr', 'ru');
  CREATE TYPE "public"."enum_messages_type" AS ENUM('general', 'sales', 'support');
  CREATE TYPE "public"."enum_messages_status" AS ENUM('new', 'reading', 'responded', 'archived');
  CREATE TYPE "public"."enum_header_utility_bar_social_links_platform" AS ENUM('linkedin', 'instagram', 'facebook', 'x', 'youtube');
  CREATE TYPE "public"."enum_header_nav_items_children_icon" AS ENUM('Package', 'Cpu', 'Mouse', 'Monitor', 'Gamepad', 'Laptop', 'Box', 'HardDrive', 'Wifi', 'Shield', 'Smartphone', 'Headphones', 'ShoppingCart', 'Briefcase', 'Users', 'FileText', 'BookOpen', 'Phone', 'MapPin', 'Globe', 'BarChart3', 'Settings', 'Wallet', 'Truck', 'Factory', 'GraduationCap', 'HeartPulse', 'Utensils', 'Landmark', 'Store', 'Clapperboard', 'ClipboardList', 'TrendingUp', 'Calculator', 'CreditCard', 'Database', 'Server', 'Network', 'Lock', 'Video', 'Wrench', 'Award', 'Sparkles', 'Lightbulb', 'Newspaper', 'HelpCircle', 'Building2', 'LayoutGrid', 'Zap', 'Mail', 'ArrowRight');
  CREATE TYPE "public"."enum_header_nav_items_children_icon_color" AS ENUM('blue', 'teal', 'pink', 'orange', 'gold', 'purple', 'emerald', 'indigo', 'rose');
  CREATE TYPE "public"."enum_header_nav_items_children_kind" AS ENUM('link', 'brand', 'case', 'viewAll');
  CREATE TYPE "public"."enum_header_nav_items_children_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum_header_nav_items_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum_header_nav_items_dropdown_variant" AS ENUM('mega', 'simple');
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('linkedin', 'instagram', 'facebook', 'youtube', 'whatsapp', 'twitter');
  CREATE TYPE "public"."enum_theme_mode" AS ENUM('system', 'light', 'dark');
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
  
  CREATE TABLE "pages_blocks_hero_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"headline" varchar,
  	"sub_headline" varchar,
  	"cta_label" varchar,
  	"cta_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_cards_block_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_feature_cards_block_cards_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_cards_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_highlight_block_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_highlight_block_highlights_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_highlight_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"phone_label" varchar,
  	"phone_number" varchar,
  	"email_label" varchar,
  	"email_address" varchar,
  	"demo_link_label" varchar,
  	"demo_link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_gallery_block_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_image_gallery_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_counter_block_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"prefix" varchar,
  	"suffix" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_counter_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
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
  
  CREATE TABLE "_pages_v_blocks_hero_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"headline" varchar,
  	"sub_headline" varchar,
  	"cta_label" varchar,
  	"cta_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_cards_block_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_feature_cards_block_cards_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_cards_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_highlight_block_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_highlight_block_highlights_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_highlight_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"phone_label" varchar,
  	"phone_number" varchar,
  	"email_label" varchar,
  	"email_address" varchar,
  	"demo_link_label" varchar,
  	"demo_link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_gallery_block_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_gallery_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_counter_block_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"prefix" varchar,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_counter_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
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
  	"users_id" integer,
  	"messages_id" integer
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
  	"section" varchar,
  	"icon" "enum_header_nav_items_children_icon",
  	"icon_color" "enum_header_nav_items_children_icon_color",
  	"kind" "enum_header_nav_items_children_kind" DEFAULT 'link',
  	"brand_logo" varchar,
  	"badge" varchar,
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
  	"has_dropdown" boolean DEFAULT false,
  	"dropdown_variant" "enum_header_nav_items_dropdown_variant" DEFAULT 'mega',
  	"view_all_link" varchar
  );
  
  CREATE TABLE "header_nav_items_locales" (
  	"label" varchar NOT NULL,
  	"view_all_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"utility_bar_phone" varchar DEFAULT '+971 4 393 0507',
  	"utility_bar_email" varchar DEFAULT 'hello@example.com',
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
  	"brand_name" varchar DEFAULT 'Acme Inc.',
  	"brand_subtitle" varchar DEFAULT 'Middle East LLC',
  	"logo_id" integer,
  	"contact_phone" varchar DEFAULT '+971 4 393 0507',
  	"contact_email" varchar DEFAULT 'hello@example.com',
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
  	"copyright" varchar DEFAULT '© {year} Acme Inc. All rights reserved.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
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
  	"site_name" varchar DEFAULT 'Acme Site',
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
  
  CREATE TABLE "theme" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"preset" varchar DEFAULT 'indigo',
  	"light_mode_background" varchar DEFAULT '#FFFFFF' NOT NULL,
  	"light_mode_foreground" varchar DEFAULT '#0F172A' NOT NULL,
  	"light_mode_card" varchar DEFAULT '#FFFFFF' NOT NULL,
  	"light_mode_card_foreground" varchar DEFAULT '#0F172A' NOT NULL,
  	"light_mode_popover" varchar DEFAULT '#FFFFFF' NOT NULL,
  	"light_mode_popover_foreground" varchar DEFAULT '#0F172A' NOT NULL,
  	"light_mode_primary" varchar DEFAULT '#DF4C73' NOT NULL,
  	"light_mode_primary_foreground" varchar DEFAULT '#FFFFFF' NOT NULL,
  	"light_mode_secondary" varchar DEFAULT '#F1F5F9' NOT NULL,
  	"light_mode_secondary_foreground" varchar DEFAULT '#0F172A' NOT NULL,
  	"light_mode_muted" varchar DEFAULT '#F1F5F9' NOT NULL,
  	"light_mode_muted_foreground" varchar DEFAULT '#6B7280' NOT NULL,
  	"light_mode_accent" varchar DEFAULT '#F1F5F9' NOT NULL,
  	"light_mode_accent_foreground" varchar DEFAULT '#0F172A' NOT NULL,
  	"light_mode_destructive" varchar DEFAULT '#DC2626' NOT NULL,
  	"light_mode_destructive_foreground" varchar DEFAULT '#FFFFFF' NOT NULL,
  	"light_mode_border" varchar DEFAULT '#E5E7EB' NOT NULL,
  	"light_mode_input" varchar DEFAULT '#E5E7EB' NOT NULL,
  	"light_mode_ring" varchar DEFAULT '#DF4C73' NOT NULL,
  	"dark_mode_background" varchar DEFAULT '#0B1120' NOT NULL,
  	"dark_mode_foreground" varchar DEFAULT '#F8FAFC' NOT NULL,
  	"dark_mode_card" varchar DEFAULT '#111827' NOT NULL,
  	"dark_mode_card_foreground" varchar DEFAULT '#F8FAFC' NOT NULL,
  	"dark_mode_popover" varchar DEFAULT '#111827' NOT NULL,
  	"dark_mode_popover_foreground" varchar DEFAULT '#F8FAFC' NOT NULL,
  	"dark_mode_primary" varchar DEFAULT '#DF4C73' NOT NULL,
  	"dark_mode_primary_foreground" varchar DEFAULT '#FFFFFF' NOT NULL,
  	"dark_mode_secondary" varchar DEFAULT '#1F2937' NOT NULL,
  	"dark_mode_secondary_foreground" varchar DEFAULT '#F8FAFC' NOT NULL,
  	"dark_mode_muted" varchar DEFAULT '#1F2937' NOT NULL,
  	"dark_mode_muted_foreground" varchar DEFAULT '#94A3B8' NOT NULL,
  	"dark_mode_accent" varchar DEFAULT '#1F2937' NOT NULL,
  	"dark_mode_accent_foreground" varchar DEFAULT '#F8FAFC' NOT NULL,
  	"dark_mode_destructive" varchar DEFAULT '#DC2626' NOT NULL,
  	"dark_mode_destructive_foreground" varchar DEFAULT '#FFFFFF' NOT NULL,
  	"dark_mode_border" varchar DEFAULT '#1F2937' NOT NULL,
  	"dark_mode_input" varchar DEFAULT '#1F2937' NOT NULL,
  	"dark_mode_ring" varchar DEFAULT '#DF4C73' NOT NULL,
  	"mode" "enum_theme_mode" DEFAULT 'system',
  	"radius" numeric DEFAULT 8,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_media_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."media_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_folders" ADD CONSTRAINT "media_folders_parent_id_media_folders_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_block" ADD CONSTRAINT "pages_blocks_hero_block_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_block" ADD CONSTRAINT "pages_blocks_hero_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_block" ADD CONSTRAINT "pages_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards_block_cards" ADD CONSTRAINT "pages_blocks_feature_cards_block_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_cards_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards_block" ADD CONSTRAINT "pages_blocks_feature_cards_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_highlight_block_highlights" ADD CONSTRAINT "pages_blocks_highlight_block_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_highlight_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_highlight_block" ADD CONSTRAINT "pages_blocks_highlight_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_block" ADD CONSTRAINT "pages_blocks_cta_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_gallery_block_images" ADD CONSTRAINT "pages_blocks_image_gallery_block_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_gallery_block_images" ADD CONSTRAINT "pages_blocks_image_gallery_block_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_gallery_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_gallery_block" ADD CONSTRAINT "pages_blocks_image_gallery_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_counter_block_stats" ADD CONSTRAINT "pages_blocks_stats_counter_block_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_counter_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_counter_block" ADD CONSTRAINT "pages_blocks_stats_counter_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_block" ADD CONSTRAINT "_pages_v_blocks_hero_block_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_block" ADD CONSTRAINT "_pages_v_blocks_hero_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_block" ADD CONSTRAINT "_pages_v_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_cards_block_cards" ADD CONSTRAINT "_pages_v_blocks_feature_cards_block_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_cards_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_cards_block" ADD CONSTRAINT "_pages_v_blocks_feature_cards_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_highlight_block_highlights" ADD CONSTRAINT "_pages_v_blocks_highlight_block_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_highlight_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_highlight_block" ADD CONSTRAINT "_pages_v_blocks_highlight_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_block" ADD CONSTRAINT "_pages_v_blocks_cta_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_gallery_block_images" ADD CONSTRAINT "_pages_v_blocks_image_gallery_block_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_gallery_block_images" ADD CONSTRAINT "_pages_v_blocks_image_gallery_block_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_gallery_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_gallery_block" ADD CONSTRAINT "_pages_v_blocks_image_gallery_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_counter_block_stats" ADD CONSTRAINT "_pages_v_blocks_stats_counter_block_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_counter_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_counter_block" ADD CONSTRAINT "_pages_v_blocks_stats_counter_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_background_image_id_media_id_fk" FOREIGN KEY ("version_hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_parent_id_pages_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_folders_fk" FOREIGN KEY ("media_folders_id") REFERENCES "public"."media_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_messages_fk" FOREIGN KEY ("messages_id") REFERENCES "public"."messages"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_seo_image_id_media_id_fk" FOREIGN KEY ("default_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_maintenance_logo_image_id_media_id_fk" FOREIGN KEY ("maintenance_logo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_maintenance_background_image_id_media_id_fk" FOREIGN KEY ("maintenance_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
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
  CREATE INDEX "pages_blocks_hero_block_order_idx" ON "pages_blocks_hero_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_block_parent_id_idx" ON "pages_blocks_hero_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_block_path_idx" ON "pages_blocks_hero_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_block_locale_idx" ON "pages_blocks_hero_block" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_block_background_image_idx" ON "pages_blocks_hero_block" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_rich_text_block_order_idx" ON "pages_blocks_rich_text_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_block_parent_id_idx" ON "pages_blocks_rich_text_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_block_path_idx" ON "pages_blocks_rich_text_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_block_locale_idx" ON "pages_blocks_rich_text_block" USING btree ("_locale");
  CREATE INDEX "pages_blocks_feature_cards_block_cards_order_idx" ON "pages_blocks_feature_cards_block_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_cards_block_cards_parent_id_idx" ON "pages_blocks_feature_cards_block_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_block_cards_locale_idx" ON "pages_blocks_feature_cards_block_cards" USING btree ("_locale");
  CREATE INDEX "pages_blocks_feature_cards_block_order_idx" ON "pages_blocks_feature_cards_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_cards_block_parent_id_idx" ON "pages_blocks_feature_cards_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_block_path_idx" ON "pages_blocks_feature_cards_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_cards_block_locale_idx" ON "pages_blocks_feature_cards_block" USING btree ("_locale");
  CREATE INDEX "pages_blocks_highlight_block_highlights_order_idx" ON "pages_blocks_highlight_block_highlights" USING btree ("_order");
  CREATE INDEX "pages_blocks_highlight_block_highlights_parent_id_idx" ON "pages_blocks_highlight_block_highlights" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_highlight_block_highlights_locale_idx" ON "pages_blocks_highlight_block_highlights" USING btree ("_locale");
  CREATE INDEX "pages_blocks_highlight_block_order_idx" ON "pages_blocks_highlight_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_highlight_block_parent_id_idx" ON "pages_blocks_highlight_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_highlight_block_path_idx" ON "pages_blocks_highlight_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_highlight_block_locale_idx" ON "pages_blocks_highlight_block" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_block_order_idx" ON "pages_blocks_cta_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_block_parent_id_idx" ON "pages_blocks_cta_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_block_path_idx" ON "pages_blocks_cta_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_block_locale_idx" ON "pages_blocks_cta_block" USING btree ("_locale");
  CREATE INDEX "pages_blocks_image_gallery_block_images_order_idx" ON "pages_blocks_image_gallery_block_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_gallery_block_images_parent_id_idx" ON "pages_blocks_image_gallery_block_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_gallery_block_images_locale_idx" ON "pages_blocks_image_gallery_block_images" USING btree ("_locale");
  CREATE INDEX "pages_blocks_image_gallery_block_images_image_idx" ON "pages_blocks_image_gallery_block_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_image_gallery_block_order_idx" ON "pages_blocks_image_gallery_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_gallery_block_parent_id_idx" ON "pages_blocks_image_gallery_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_gallery_block_path_idx" ON "pages_blocks_image_gallery_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_gallery_block_locale_idx" ON "pages_blocks_image_gallery_block" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_counter_block_stats_order_idx" ON "pages_blocks_stats_counter_block_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_counter_block_stats_parent_id_idx" ON "pages_blocks_stats_counter_block_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_counter_block_stats_locale_idx" ON "pages_blocks_stats_counter_block_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_counter_block_order_idx" ON "pages_blocks_stats_counter_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_counter_block_parent_id_idx" ON "pages_blocks_stats_counter_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_counter_block_path_idx" ON "pages_blocks_stats_counter_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_counter_block_locale_idx" ON "pages_blocks_stats_counter_block" USING btree ("_locale");
  CREATE INDEX "pages_hero_hero_background_image_idx" ON "pages" USING btree ("hero_background_image_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_parent_idx" ON "pages" USING btree ("parent_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_block_order_idx" ON "_pages_v_blocks_hero_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_block_parent_id_idx" ON "_pages_v_blocks_hero_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_block_path_idx" ON "_pages_v_blocks_hero_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_block_locale_idx" ON "_pages_v_blocks_hero_block" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_block_background_image_idx" ON "_pages_v_blocks_hero_block" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_rich_text_block_order_idx" ON "_pages_v_blocks_rich_text_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_block_parent_id_idx" ON "_pages_v_blocks_rich_text_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_block_path_idx" ON "_pages_v_blocks_rich_text_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_block_locale_idx" ON "_pages_v_blocks_rich_text_block" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_feature_cards_block_cards_order_idx" ON "_pages_v_blocks_feature_cards_block_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_cards_block_cards_parent_id_idx" ON "_pages_v_blocks_feature_cards_block_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_block_cards_locale_idx" ON "_pages_v_blocks_feature_cards_block_cards" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_feature_cards_block_order_idx" ON "_pages_v_blocks_feature_cards_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_cards_block_parent_id_idx" ON "_pages_v_blocks_feature_cards_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_block_path_idx" ON "_pages_v_blocks_feature_cards_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_cards_block_locale_idx" ON "_pages_v_blocks_feature_cards_block" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_highlight_block_highlights_order_idx" ON "_pages_v_blocks_highlight_block_highlights" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_highlight_block_highlights_parent_id_idx" ON "_pages_v_blocks_highlight_block_highlights" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_highlight_block_highlights_locale_idx" ON "_pages_v_blocks_highlight_block_highlights" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_highlight_block_order_idx" ON "_pages_v_blocks_highlight_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_highlight_block_parent_id_idx" ON "_pages_v_blocks_highlight_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_highlight_block_path_idx" ON "_pages_v_blocks_highlight_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_highlight_block_locale_idx" ON "_pages_v_blocks_highlight_block" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_block_order_idx" ON "_pages_v_blocks_cta_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_block_parent_id_idx" ON "_pages_v_blocks_cta_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_block_path_idx" ON "_pages_v_blocks_cta_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_block_locale_idx" ON "_pages_v_blocks_cta_block" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_image_gallery_block_images_order_idx" ON "_pages_v_blocks_image_gallery_block_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_gallery_block_images_parent_id_idx" ON "_pages_v_blocks_image_gallery_block_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_gallery_block_images_locale_idx" ON "_pages_v_blocks_image_gallery_block_images" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_image_gallery_block_images_image_idx" ON "_pages_v_blocks_image_gallery_block_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_image_gallery_block_order_idx" ON "_pages_v_blocks_image_gallery_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_gallery_block_parent_id_idx" ON "_pages_v_blocks_image_gallery_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_gallery_block_path_idx" ON "_pages_v_blocks_image_gallery_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_gallery_block_locale_idx" ON "_pages_v_blocks_image_gallery_block" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_counter_block_stats_order_idx" ON "_pages_v_blocks_stats_counter_block_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_counter_block_stats_parent_id_idx" ON "_pages_v_blocks_stats_counter_block_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_counter_block_stats_locale_idx" ON "_pages_v_blocks_stats_counter_block_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_counter_block_order_idx" ON "_pages_v_blocks_stats_counter_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_counter_block_parent_id_idx" ON "_pages_v_blocks_stats_counter_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_counter_block_path_idx" ON "_pages_v_blocks_stats_counter_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_counter_block_locale_idx" ON "_pages_v_blocks_stats_counter_block" USING btree ("_locale");
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
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "messages_updated_at_idx" ON "messages" USING btree ("updated_at");
  CREATE INDEX "messages_created_at_idx" ON "messages" USING btree ("created_at");
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
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_messages_id_idx" ON "payload_locked_documents_rels" USING btree ("messages_id");
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
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "site_settings_default_seo_default_seo_image_idx" ON "site_settings" USING btree ("default_seo_image_id");
  CREATE INDEX "site_settings_maintenance_maintenance_logo_image_idx" ON "site_settings" USING btree ("maintenance_logo_image_id");
  CREATE INDEX "site_settings_maintenance_maintenance_background_image_idx" ON "site_settings" USING btree ("maintenance_background_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "media_folders" CASCADE;
  DROP TABLE "pages_blocks_hero_block" CASCADE;
  DROP TABLE "pages_blocks_rich_text_block" CASCADE;
  DROP TABLE "pages_blocks_feature_cards_block_cards" CASCADE;
  DROP TABLE "pages_blocks_feature_cards_block" CASCADE;
  DROP TABLE "pages_blocks_highlight_block_highlights" CASCADE;
  DROP TABLE "pages_blocks_highlight_block" CASCADE;
  DROP TABLE "pages_blocks_cta_block" CASCADE;
  DROP TABLE "pages_blocks_image_gallery_block_images" CASCADE;
  DROP TABLE "pages_blocks_image_gallery_block" CASCADE;
  DROP TABLE "pages_blocks_stats_counter_block_stats" CASCADE;
  DROP TABLE "pages_blocks_stats_counter_block" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_block" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_block" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_cards_block_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_cards_block" CASCADE;
  DROP TABLE "_pages_v_blocks_highlight_block_highlights" CASCADE;
  DROP TABLE "_pages_v_blocks_highlight_block" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_block" CASCADE;
  DROP TABLE "_pages_v_blocks_image_gallery_block_images" CASCADE;
  DROP TABLE "_pages_v_blocks_image_gallery_block" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_counter_block_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_counter_block" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "messages" CASCADE;
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
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "theme" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_blocks_feature_cards_block_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_highlight_block_highlights_icon";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_feature_cards_block_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_highlight_block_highlights_icon";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_users_locale";
  DROP TYPE "public"."enum_messages_type";
  DROP TYPE "public"."enum_messages_status";
  DROP TYPE "public"."enum_header_utility_bar_social_links_platform";
  DROP TYPE "public"."enum_header_nav_items_children_icon";
  DROP TYPE "public"."enum_header_nav_items_children_icon_color";
  DROP TYPE "public"."enum_header_nav_items_children_kind";
  DROP TYPE "public"."enum_header_nav_items_children_status";
  DROP TYPE "public"."enum_header_nav_items_status";
  DROP TYPE "public"."enum_header_nav_items_dropdown_variant";
  DROP TYPE "public"."enum_footer_social_links_platform";
  DROP TYPE "public"."enum_theme_mode";`)
}
