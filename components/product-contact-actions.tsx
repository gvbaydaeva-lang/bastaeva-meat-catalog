"use client";

import { useState } from "react";
import { storeContact } from "@/lib/data";
import { getProductInquiryMessage } from "@/lib/product-detail";

export function ProductContactActions({ productName }: { productName: string }) {
  const [notice, setNotice] = useState("");
  const message = getProductInquiryMessage(productName);

  const copyInquiry = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setNotice("Сообщение скопировано — отправьте его магазину удобным способом.");
    } catch {
      setNotice(message);
    }
  };

  return <div className="grid gap-3 sm:flex sm:flex-wrap">
    <button type="button" className="button-primary" onClick={copyInquiry}>Уточнить наличие</button>
    <a className="button-secondary" href={storeContact.phoneHref}>Позвонить</a>
    {notice ? <p className="basis-full text-sm leading-6 text-ink/65" role="status">{notice}</p> : null}
  </div>;
}
