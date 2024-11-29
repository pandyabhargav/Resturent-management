import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateQr.css';
import theme1 from '../../assets/them1.png'
import theme2 from '../../assets/them2.png'
import theme3 from '../../assets/them3.png'
import theme4 from '../../assets/them4.png'
import theme5 from '../../assets/them5.png'
import theme6 from '../../assets/them6.png'

const CreateQr = () => {
  return (
    <div className="qr-container">
      <div className="qr-card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="qr-title">Create QR Code</h4>
          <div className="d-flex justify-content-between align-items-center">
            <label className="circle-checkbox d-flex align-items-center">
            <input type="radio" id="circleTable" name="qrOption" />
            <span className="circle-label"> Table</span>
            </label>
            <label className="circle-checkbox d-flex align-items-center ms-3">
            <input type="radio" id="circleCounter" name="qrOption" />
            <span className="circle-label"> Counter</span>
            </label>
          </div>
        </div>
        <form>
          <div className="row gx-3 mb-4">
            <div className="col-lg-4">
              <label htmlFor="link" className="qr-label">
                Put Your Link Here
              </label>
              <input
                type="text"
                id="link"
                name="link"
                className="form-control qr-input"
                placeholder="https://www.musthavemenus.com/category/restaurant-menu.html"
              />
            </div>
            <div className="col-lg-4">
              <label htmlFor="qrName" className="qr-label">
                Name Your QR (Optional)
              </label>
              <input
                type="text"
                id="qrName"
                name="qrName"
                className="form-control qr-input"
                placeholder="Food & Drink"
              />
            </div>
            <div className="col-lg-4">
              <label htmlFor="contentCategory" className="qr-label">
                Select Content Category
              </label>
              <select id="contentCategory" name="contentCategory" className="form-select qr-input">
                <option value="food">Food & Drink</option>
                <option value="business">Business</option>
                <option value="personal">Personal</option>
              </select>
            </div>
          </div>

          {/* Second Row */}
          <div className="row gx-3 mb-4">
            <div className="col-lg-3">
              <label htmlFor="additionalText" className="qr-label">
                Additional Text
              </label>
              <input
                type="text"
                id="additionalText"
                name="additionalText"
                className="form-control qr-input"
                placeholder="Additional"
              />
            </div>
            <div className="col-lg-3">
              <label htmlFor="chooseColor" className="qr-label">
                Choose Color
              </label>
              <input type="color" id="chooseColor" name="chooseColor" className="form-control qr-input" />
            </div>
            <div className="col-lg-3">
              <label htmlFor="frameBg" className="qr-label">
                Frame Background
              </label>
              <input type="color" id="frameBg" name="frameBg" className="form-control qr-input" />
            </div>
            <div className="col-lg-3">
              <label htmlFor="qrBg" className="qr-label">
                QR Code Background
              </label>
              <input type="color" id="qrBg" name="qrBg" className="form-control qr-input" />
            </div>
          </div>

          {/* Thematic Section */}
          <div className="thematic-section mb-4">
            <h5 className="qr-label">Thematic</h5>
            <div className="thematic-icons">
              <div className="thematic-box">
                  <img src={theme1} alt="t1" width={75} className='mt-2 ' />
              </div>
              <div className="thematic-box">
                  <img src={theme2} alt="t1" width={58} className='mt-1 ' style={{marginLeft:'10px'}} />
              </div>
              <div className="thematic-box">
                  <img src={theme3} alt="t1" width={75} className='mt-3 ' style={{marginLeft:'2px'}}/>
              </div>
              <div className="thematic-box">
                  <img src={theme4} alt="t1" width={50  } className='mt-2 ' style={{marginLeft:'15px'}}/>
              </div>
              <div className="thematic-box">
                  <img src={theme5} alt="t1" width={55} className='mt-2 ' style={{marginLeft:'10px'}}/>
              </div>
              <div className="thematic-box">
                  <img src={theme6} alt="t1" width={77} className='mt-4  ' style={{marginLeft:'2px'}}/>
              </div>
            </div>
          </div>

          {/* Download Section */}
          <div className="text-center mt-4">
            <button type="submit" className="btn download-btn">
              Download QR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQr;
