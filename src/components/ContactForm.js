import React from "react";
import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBInput } from "mdbreact";

const ContactPage = () => {
  return (
    <MDBCard className="my-5 px-1 pb-5 text-center">
      <MDBCardBody>
          <h2 className="h1-responsive font-weight-bold my-5">
            Wasiliana nasi kwa maelezo zaidi
          </h2>
          <p className="grey-text w-responsive mx-auto mb-5">
            Ili kupata ufafanuzi wa kina juu ya jambo lolote, Tuandikie
            ujumbe wako au wasiliana nasi kwa namba za simu zilizopo hapa chini au kwa kutufuata
            katika kurasa zetu za mitandao ya kijamii
          </p>
        </MDBCardBody>
        <MDBRow>
          <MDBCol lg="8">
            <MDBCardBody className="form">
              <h3 className="mt-4 text-left">
                <MDBIcon icon="envelope" className="pr-2" />
                Tuandikie Ujumbe:
              </h3>
              <MDBRow>
                <MDBCol md="6">
                  <div className="md-form mb-0">
                    <MDBInput
                      type="text"
                      id="form-contact-name"
                      label="Jina Lako"
                    />
                  </div>
                </MDBCol>
                <MDBCol md="6">
                  <div className="md-form mb-0">
                    <MDBInput
                      type="text"
                      id="form-contact-email"
                      label="Barua pepe"
                    />
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="6">
                  <div className="md-form mb-0">
                    <MDBInput
                      type="text"
                      id="form-contact-phone"
                      label="Simu"
                    />
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12">
                  <div className="md-form mb-0">
                    <MDBInput
                      type="textarea"
                      id="form-contact-message"
                      label="Ujumbe wako"
                    />
                    <MDBBtn rounded color="blue">
                      <MDBIcon icon="paper-plane" />
                    </MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCol>
          <MDBCol lg="4">
            <MDBCardBody className="contact text-center h-100 black-text">
              <h3 className="my-4 pb-2">Contact information</h3>
              <hr /><br />
              <ul className="text-lg-left list-unstyled ml-4">
                <li>
                  <p>
                    <MDBIcon icon="map-marker-alt" className="pr-2" />
                    Bonga, Babati - Manyara
                  </p>
                </li>
                <li>
                  <p>
                    <MDBIcon icon="phone" className="pr-2" />+255 752 506 523
                  </p>
                </li>
                <li>
                  <p>
                    <MDBIcon icon="phone" className="pr-2" />+255 788 030 052
                  </p>
                </li>
                <li>
                  <p>
                    <MDBIcon icon="envelope" className="pr-2" />
                    S.L.P. 507, Babati - Manyara
                  </p>
                </li>
                <li>
                  <p>
                    <MDBIcon icon="envelope" className="pr-2" />
                    hayatulislamiyass@gmail.com
                  </p>
                </li>
              </ul>
              <hr className="hr-light my-4" />
              <ul className="list-inline text-center list-unstyled">
                <li className="list-inline-item">
                  <a href="https://twitter.com/hayatulislamiya" className="p-2 fa-lg w-ic">
                    <MDBIcon fab icon="twitter" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://instagram.com/hayatulislamiya" className="p-2 fa-lg w-ic">
                    <MDBIcon fab icon="instagram" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://facebook.com/hayatulislamiya" className="p-2 fa-lg w-ic">
                    <MDBIcon fab icon="facebook" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.youtube.com/channel/UCgpGjY3Rd97l53n8r_sSwBQ" className="p-2 fa-lg w-ic">
                    <MDBIcon fab icon="youtube" />
                  </a>
                </li>
              </ul>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
  );
}

export default ContactPage;