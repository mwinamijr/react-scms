import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div className="col-lg-8 mx-auto p-3 py-md-5">
      <header className="d-flex align-items-center pb-3 mb-5 border-bottom">
        
          <span className="fs-5">HISMS</span>
        
      </header>

      <main className="text-center">
        <h1>Hayatul Islamiya School Management System</h1>
        <p className="fs-5 text-center">
          Huu ni mfumo wa uendeshaji na utoaji wa taarifa mbalimbali zinazohusu shule na uendeshaji. Mfumo huu unatumika na walimu wa shule hii kupata na kuhifadhi taarifa za maendeleo ya shule na wanafunzi.
           Pia ni kiunganisha kati ya shule na wazazi katika kutoa na kupata taarifa za maendeleo ya wanafunzi moja kwa moja.
        </p>

        <div className="mb-5">
          <Link to="/login" className="btn btn-primary btn-lg px-4">Ingia</Link>
        </div>

        <hr className="col-3 col-md-2 mb-5" />

        <div className="row g-5">
          <div className="col-md-6">
            <h2>Developers</h2>
            <p>
              All developers are welcome to join in on this open Source project, This projects gives opportunity to all developers who can contribute anything, so all developers with JavaScript, React and Redux are wecome to join in and help on this project.
            </p>
            <ul className="icon-list">
              <li><Link to="https://github.com/mwinamijr/react-scms">React School Management System</Link></li>
            </ul>
          </div>

          <div className="col-md-6">
            <h2>Namna ya kutumia mfumo huu</h2>
            <p>Soma maelekezo ya kutumia mfumo huu kulingana na aina ya mtumiaji.</p>
            <ul className="icon-list">
              <li><a href="../getting-started/introduction/">Walimu</a></li>
              <li><a href="../getting-started/webpack/">Wazazi</a></li>
              <li><a href="../getting-started/parcel/">Wanafunzi</a></li>
              <li><a href="../getting-started/build-tools/">Developers</a></li>
            </ul>
          </div>
        </div>
      </main>
      <footer className="pt-5 my-5 text-center text-muted border-top pb-3">
        Created by the Techdometz team &middot; &copy; 2022
      </footer>
    </div>

  )
}

export default Home
