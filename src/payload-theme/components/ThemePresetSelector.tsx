"use client";

/**
 * ThemePresetSelector — Payload custom Field component rendered at the top
 * of the Theme global form. Shows a responsive grid of preset cards. Clicking
 * a card writes its full token set into every `lightMode.*` / `darkMode.*`
 * field and `radius`, via `dispatchFields`. The `preset` field itself
 * (a hidden text field) is also written so the active card can be
 * highlighted on reload.
 *
 * Hooked in from `src/globals/Theme.ts` via `admin.components.Field`.
 */

import React from "react";
import { useField, useForm } from "@payloadcms/ui";
import {
  SEMANTIC_TOKENS,
  THEME_PRESETS,
  type ThemePreset,
} from "../../lib/theme-presets";

type FieldAction = {
  type: "UPDATE";
  path: string;
  value?: unknown;
  valid?: boolean;
};

function SwatchRow({ preset, mode }: { preset: ThemePreset; mode: "light" | "dark" }) {
  const tokens = preset[mode];
  const swatches = ["primary", "accent", "background", "foreground", "muted"] as const;
  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        padding: "6px 8px",
        borderRadius: 6,
        background: tokens.background,
        border: `1px solid ${tokens.border}`,
      }}
    >
      {swatches.map((k) => (
        <div
          key={k}
          title={`${mode} · ${k}: ${tokens[k]}`}
          style={{
            width: 18,
            height: 18,
            borderRadius: 4,
            background: tokens[k],
            border: `1px solid ${tokens.border}`,
          }}
        />
      ))}
    </div>
  );
}

export const ThemePresetSelector: React.FC = () => {
  const presetField = useField<string>({ path: "preset" });
  const form = useForm();

  const selectedId = presetField.value ?? presetField.initialValue ?? "";
  const setPreset = presetField.setValue;

  const apply = React.useCallback(
    (preset: ThemePreset) => {
      const updates: FieldAction[] = [];
      for (const token of SEMANTIC_TOKENS) {
        updates.push({
          type: "UPDATE",
          path: `lightMode.${token}`,
          value: preset.light[token],
        });
        updates.push({
          type: "UPDATE",
          path: `darkMode.${token}`,
          value: preset.dark[token],
        });
      }
      updates.push({ type: "UPDATE", path: "radius", value: preset.radius });
      updates.push({ type: "UPDATE", path: "preset", value: preset.id });

      for (const action of updates) {
        form.dispatchFields(action as never);
      }
      setPreset(preset.id);
    },
    [form, setPreset],
  );

  return (
    <div
      style={{
        marginBottom: 24,
        padding: 16,
        background: "var(--theme-elevation-50, #f8fafc)",
        border: "1px solid var(--theme-elevation-200, #e2e8f0)",
        borderRadius: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 4,
        }}
      >
        <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>
          Theme Presets
        </h4>
        <span style={{ fontSize: 12, opacity: 0.7 }}>
          Click a card to apply — manual edits below will be overwritten.
        </span>
      </div>
      <p
        style={{
          margin: "0 0 12px",
          fontSize: 12,
          opacity: 0.7,
        }}
      >
        Saves will revalidate the layout cache within a few seconds.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {THEME_PRESETS.map((preset) => {
          const isActive = preset.id === selectedId;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => apply(preset)}
              style={{
                cursor: "pointer",
                textAlign: "left",
                padding: 12,
                background: isActive
                  ? "var(--theme-success-50, #ecfdf5)"
                  : "var(--theme-elevation-0, #ffffff)",
                border: `2px solid ${
                  isActive
                    ? "var(--theme-success-500, #10b981)"
                    : "var(--theme-elevation-200, #e2e8f0)"
                }`,
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                transition: "border-color 120ms ease, box-shadow 120ms ease",
              }}
              aria-pressed={isActive}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                }}
              >
                <strong style={{ fontSize: 13, fontWeight: 600 }}>
                  {preset.name}
                </strong>
                {isActive && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      color: "var(--theme-success-700, #047857)",
                    }}
                  >
                    Active
                  </span>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <SwatchRow preset={preset} mode="light" />
                <SwatchRow preset={preset} mode="dark" />
              </div>
              <span style={{ fontSize: 11, opacity: 0.75, lineHeight: 1.4 }}>
                {preset.description}
              </span>
              <span style={{ fontSize: 10, opacity: 0.55 }}>
                radius {preset.radius}px · primary {preset.light.primary}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemePresetSelector;
