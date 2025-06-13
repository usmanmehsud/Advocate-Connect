import React, { useState } from 'react';
import "../styles/AboutPage.css";
const faqs = [
  {
    question: 'What areas of law do you specialize in?',
    answer:
      'We specialize in family law, criminal defense, personal injury, business law, and estate planning. Each case is handled with personal care and legal expertise.',
  },
  {
    question: 'How do I schedule a consultation?',
    answer:
      'You can schedule a consultation by calling our office directly or using the contact form available on our website. We’ll respond promptly to confirm your appointment.',
  },
  {
    question: 'What should I bring to my first meeting?',
    answer:
      'Please bring any relevant documents, identification, and a summary of your legal concerns. This helps us better understand your case from the start.',
  },
  {
    question: 'Do you offer free initial consultations?',
    answer:
      'Yes, we offer a complimentary initial consultation to discuss your legal issue and determine the best path forward.',
  },
  {
    question: 'How are legal fees structured?',
    answer:
      'Our fees depend on the nature of your case. We offer hourly rates, flat fees, and contingency arrangements depending on the legal service you need.',
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
          <button className="faq-question" onClick={() => toggleFAQ(index)}>
            {faq.question}
          </button>
          {activeIndex === index && (
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default FAQSection;
