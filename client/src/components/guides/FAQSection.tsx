"use client"

import { useState } from "react"

interface FAQ {
  question: string
  answer: string
}

interface Props {
  faqs: FAQ[]
}

export function FAQSection({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-amber-200 mb-6">
        常見問題
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white/5 border border-purple-500/20 backdrop-blur-sm rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left"
            >
              <span className="text-purple-100 font-medium pr-4">
                {faq.question}
              </span>
              <span
                className={`text-purple-300 transition-transform duration-200 flex-shrink-0 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-5">
                <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
