"use client";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
}

export default function GlitchText({
  text,
  className = "",
  as: Tag = "h1" as keyof HTMLElementTagNameMap,
}: GlitchTextProps) {
  const Component = Tag as React.ElementType;
  return (
    <Component className={`glitch ${className}`} data-text={text}>
      {text}
    </Component>
  );
}
