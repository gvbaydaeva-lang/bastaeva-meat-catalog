"use client";

import { useState } from "react";
import { getActiveContactChannels, storeContact } from "@/lib/data";
import { getProductInquiryMessage, getProductInquiryUrl } from "@/lib/product-detail";

export function ProductContactActions({ productName }: { productName: string }) {
  const [notice, setNotice] = useState("");
  const message = getProductInquiryMessage(productName);
  const activeChannels = getActiveContactChannels();

  const copyInquiry = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setNotice("Сообщение скопировано — отправьте его магазину удобным способом.");
    } catch {
      setNotice(message);
    }
  };

  return <div className="grid gap-3 sm:flex sm:flex-wrap">
    {activeChannels.length ? activeChannels.map((channel) => <a key={channel.id} className="button-primary" href={getProductInquiryUrl(channel.href, productName)} target="_blank" rel="noreferrer">Уточнить в {channel.label}</a>) : <button type="button" className="button-primary" onClick={copyInquiry}>Уточнить наличие</button>}
    <a className="button-secondary" href={storeContact.phoneHref}>Позвонить</a>
    {activeChannels.length ? <p className="basis-full text-sm leading-6 text-ink/65">Откроется выбранный канал с подготовленным текстом — отправку подтвердите самостоятельно.</p> : null}
    {notice ? <p className="basis-full text-sm leading-6 text-ink/65" role="status">{notice}</p> : null}
  </div>;
}
