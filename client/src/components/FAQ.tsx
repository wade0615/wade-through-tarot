"use client";

export function FAQ() {
  const faqs = [
    {
      question: "塔羅占卜準確嗎？",
      answer:
        "塔羅牌是一種自我探索的工具，它透過象徵性的圖像幫助我們反思當前的處境和內心狀態。準確度取決於占卜者的解讀能力和問卜者的開放程度。塔羅牌不是預測命運的工具，而是協助我們更清楚地看見當下、理解潛意識訊息的媒介。",
    },
    {
      question: "我可以每天占卜嗎？",
      answer:
        "可以，但建議針對不同的問題或情況進行占卜。每日一張牌是很好的自我覺察練習，可以幫助您了解當天的能量與主題。然而，過於頻繁地就同一問題重複占卜可能會導致混亂，建議給予每次占卜一些時間沉澱與實踐。",
    },
    {
      question: "逆位的牌代表什麼？",
      answer:
        "逆位的牌通常代表能量的阻塞、延遲、內在化或需要特別關注的面向。它不一定是負面的，而是提示我們需要從不同角度看待問題。有時逆位代表正位意義的減弱，有時則代表能量的過度或不足。",
    },
    {
      question: "塔羅占卜需要什麼準備？",
      answer:
        "進行塔羅占卜前，建議先讓自己的心靜下來，清楚地形成您想詢問的問題。問題越具體，答案越明確。選擇適合您問題的牌陣（單張牌適合簡單問題，複雜問題可選擇凱爾特十字等多張牌陣）。保持開放的心態，相信直覺。",
    },
    {
      question: "如何解讀塔羅牌？",
      answer:
        "解讀塔羅牌需要結合牌面本身的傳統意義、牌的正逆位、在牌陣中的位置意義，以及您的直覺感受。建議先了解每張牌的基本含義，然後在實際占卜中觀察牌與牌之間的關聯，最後整合成完整的訊息。隨著練習，您會發展出自己的解讀風格。",
    },
    {
      question: "這個網站的資料安全嗎？",
      answer:
        "是的，您的所有占卜資料都儲存在您的瀏覽器本地端（LocalStorage），不會上傳到任何伺服器。我們不收集您的個人資訊、占卜問題內容或任何可識別身份的資料。您可以隨時刪除記錄或清空資料。",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="glass-card p-6 sm:p-8 my-8">
        <h2 className="text-2xl font-bold text-purple-200 mb-6">常見問題</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-purple-500/20 pb-6 last:border-b-0 last:pb-0">
              <h3 className="text-lg font-semibold text-purple-300 mb-3">
                {faq.question}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
