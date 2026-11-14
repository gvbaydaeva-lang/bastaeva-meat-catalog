import Script from "next/script";

const counterId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
const enabled = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ENABLED === "true";

export function Analytics() {
  if (!enabled || !counterId) return null;
  return <Script id="yandex-metrika" strategy="afterInteractive">{`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r)return}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');ym(${JSON.stringify(counterId)},'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});document.addEventListener('click',function(event){var target=event.target.closest('[data-metrika-goal]');if(target&&window.ym){window.ym(${JSON.stringify(counterId)},'reachGoal',target.dataset.metrikaGoal,target.dataset.metrikaParams?JSON.parse(target.dataset.metrikaParams):undefined)}});`}</Script>;
}
