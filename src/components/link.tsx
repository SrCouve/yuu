import React from "react";

interface LinkProps {
  url: string;
  label: string;
  /** 
   * Caso queira abrir em uma nova aba, defina essa prop como `true`.
   * Padrão: `false`.
   */
  newTab?: boolean;
  /** 
   * Classe(s) de estilo extra opcional(is).
   */
  className?: string;
}

export const Link: React.FC<LinkProps> = ({
  url,
  label,
  newTab = false,
  className = "text-primary hover:text-primary-hover",
}) => {
  return (
    <a
      href={url}
      className={className}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
    >
      {label}
    </a>
  );
};
