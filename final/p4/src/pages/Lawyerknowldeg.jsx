import React from 'react'
import '../styles/lawyerknowelde.css'
import Footer from './Footer'
import Termsandconditions from '../Components/Termsandconditions'
import Privacyandpolicies from '../Components/Privacyandpolicies'
const Lawyerknowldeg = () => {
  return (
    <div>
         <div>
       <div>
    <div className="legal-container">
      <h1 className="main-heading">Legal Knowledge Base</h1>

      <section className="legal-section">
        <h2 className="section-heading">1. Legal Document Templates</h2>
        <p className="section-text">
          Access ready-made templates for essential legal documents like affidavits,
          agreements, contracts, and declarations to help you draft documents quickly and correctly.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="section-heading">2. Case Filing Procedures</h2>
        <p className="section-text">
          Learn the step-by-step process of how to file a case in court, including where to start,
          what documents you need, and which authorities to approach.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="section-heading">3. Filing Complaints with Police</h2>
        <p className="section-text">
          Understand the proper way to file complaints with law enforcement. Know your rights,
          what to include in your complaint, and how to follow up.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="section-heading">4. How to Contact and Work with a Lawyer</h2>
        <p className="section-text">
          Get guidance on how to choose a lawyer, schedule consultations, and work effectively
          with legal professionals to get the best results.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="section-heading">5. Legal Knowledge on Common Topics</h2>
        <p className="section-text">
          Explore simplified legal information about property rights, marriage laws,
          divorce processes, and inheritance laws to stay informed and aware.
        </p>
      </section>
    </div>





<div className='reh'>
<Termsandconditions/>
</div>

<Privacyandpolicies/>

<Footer/>
    </div>
    </div>
      
    </div>
  )
}

export default Lawyerknowldeg
