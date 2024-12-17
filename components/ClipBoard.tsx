"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

const ClipboardButton = ({ textToCopy }: { textToCopy: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 text-gray_gradient text-xs"
    >
      {copied ? <Check /> : <Copy />}
      <span>{textToCopy}</span>
    </button>
  );
};

export default ClipboardButton;
