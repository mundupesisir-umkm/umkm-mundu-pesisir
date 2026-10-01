"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { cn } from "@/lib";

config.autoAddCss = false;

interface WhatsAppIconProps {
  className?: string;
}

export const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({ className }) => {
  return (
    <FontAwesomeIcon
      icon={faWhatsapp}
      className={cn("inline-block w-4 h-4 shrink-0", className)}
      aria-hidden="true"
    />
  );
};
