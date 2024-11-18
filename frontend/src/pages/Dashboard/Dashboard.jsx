  import React, { useState } from 'react';
  import './Dashboard.css';
  import d1 from '../../assets/d1.png';
  import cart from '../../assets/cart.png';
  import avreage from '../../assets/avreage.png';
  import time from '../../assets/time.png';
  import 'chart.js/auto';
  import { Bar } from 'react-chartjs-2'; 
  import revenue from '../../assets/revenue.png';
  import dish1 from '../../assets/dish1.png';
  import dish2 from '../../assets/dish2.png';
  import dish3 from '../../assets/dish3.png';
  import dish4 from '../../assets/dish4.png';
  import dish5 from '../../assets/dish5.png';
  import { Pie } from 'react-chartjs-2';
  import { FaBox, FaStore } from 'react-icons/fa'; 


  const Dashboard = () => {

    const [selectedWeek, setSelectedWeek] = useState("This Week");

      const chartData = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Monthly Data',
              data: [12, 25, 15, 45, 32, 18, 50, 55, 40, 30, 20, 10],
              backgroundColor: 'rgba(87, 131, 243, 1)', 
            },
          ],
        };
      
        const chartOptions = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 60,
              ticks: { color: '#FFFFFF' },
            },
            x: {
              ticks: { color: '#FFFFFF' },
            },
          },
          plugins: {
            legend: { display: false },
          },
        };

        const dishes = [
          { image: dish1, name: 'Rice Noodles', price: '$12', orders: '100', revenue: '$240' },
          { image: dish2, name: 'French Fries', price: '$18', orders: '50', revenue: '$270' },
          { image: dish3, name: 'Biriyani Rice', price: '$10', orders: '200', revenue: '$250' },
          { image: dish4, name: 'Pasta', price: '$12', orders: '80', revenue: '$240' },
          { image: dish5, name: 'Salad', price: '$18', orders: '100', revenue: '$270' },
          { image: dish5, name: 'Salad', price: '$18', orders: '100', revenue: '$270' },
        ];

        const data = {
          labels: ['Parcel Order', 'On-Site Order'],
          datasets: [
            {
              data: [587, 475], 
              backgroundColor: ['rgb(231 ,76 , 60 )', 'rgb(250 , 190 , 37 )'],
              borderColor: 'black', 
              borderWidth: 1,
            },
          ],
        };

        const options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: 'white',
              },
            },
            title: {
              display: true,
              text: 'Orders (This Week)',
              color: 'white', 
            },
          },
        };

        const handleWeekChange = (event) => {
          setSelectedWeek(event.target.value);
        };

    return (
      <div className="container">  
        <div className="row">
          <div className="col-md-12 col-lg-7  col-sm-12">
            <div className="dash-img mb-2">
              <img src={d1} alt="Dashboard" className="dash-img-content" />
            </div>
          </div>
          <div className="col-md-5 col-sm-12">
      <div className="row dash-widget">
          <div className="col-md-6">
              <div 
                  className="card" 
                  style={{ backgroundColor: 'rgb(31, 29, 43)', padding: '19px', borderRadius: '8px', color: 'white', marginBottom: '15px' }}
              >
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={cart} alt="Total Orders" style={{ width: '35px', height: '35px' }} />
                          <div>
                              <h2 style={{ color: '#bbb', fontSize: '15px', margin: 0 }}>Total Orders Today</h2>
                              <span style={{ color: '#bbb', fontSize: '17px' }}>265</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-md-6">
              <div 
                  className="card" 
                  style={{ backgroundColor: 'rgb(31, 29, 43)', padding: '19px', borderRadius: '8px', color: 'white', marginBottom: '15px' }}
              >
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={avreage} alt="Total Orders" style={{ width: '35px', height: '35px' }} />
                          <div>
                              <h2 style={{ color: '#bbb', fontSize: '15px', margin: 0 }}>Average Customer</h2>
                              <span style={{ color: '#bbb', fontSize: '17px' }}>589</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-md-6">
              <div 
                  className="card" 
                  style={{ backgroundColor: 'rgb(31, 29, 43)', padding: '19px', borderRadius: '8px', color: 'white', marginBottom: '15px' }}
              >
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={time} alt="Total Orders" style={{ width: '35px', height: '35px' }} />
                          <div>
                              <h2 style={{ color: '#bbb', fontSize: '15px', margin: 0 }}>Average  Time</h2>
                              <span style={{ color: '#bbb', fontSize: '17px' }}>00:30 Hr</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-md-6">
              <div  
                  className="card" 
                  style={{ backgroundColor: 'rgb(31, 29, 43)', padding: '19px', borderRadius: '8px', color: 'white', marginBottom: '15px' }}
              >
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={revenue} alt="Total Orders" style={{ width: '35px', height: '35px' }} />
                          <div>
                              <h2 style={{ color: '#bbb', fontSize: '15px', margin: 0 }}>Today Revenue</h2>
                              <span style={{ color: '#bbb', fontSize: '17px' }}>256$</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
          <div className="col-md-7 col-sm-12">
            <div className="dash-img" style={{ backgroundColor: 'rgb(31, 29, 43)', padding: '20px', borderRadius: '8px' }}>
              <div className="barr" style={{ width: '967px', height: '300px' }}>
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>
            
            <div className='pieee' style={{ backgroundColor: 'rgb(31, 29, 43)', padding: '20px', borderRadius: '8px', color: 'white' , marginTop:'10px' }}>      
              {/* Week Selection Dropdown */}
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="week-select" style={{ marginRight: '10px' }}>Select Week:</label>
                <select 
                  id="week-select" 
                  value={selectedWeek} 
                  onChange={handleWeekChange} 
                  style={{ padding: '5px', borderRadius: '4px', background:'rgb(31 , 29 , 43'}}
                >
                  <option value="This Week">This Week</option>
                  <option value="Last Week">Last Week</option>
                  <option value="Two Weeks Ago">Two Weeks Ago</option>
                </select>
              </div>
              <div  style={{ display: 'flex', alignItems: 'center' }}>
                {/* Left side: Order data with icons */}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Order Summary</p>

                  {/* Parcel Order Section */}
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <FaBox style={{ color: 'green', fontSize: '24px', marginRight: '10px' }} />
                    <div>
                      <span style={{ fontSize: '16px' }}>Parcel Order</span>
                      <br />
                      <span style={{ fontSize: '20px', fontWeight: 'bold' }}>587</span>
                    </div>
                  </div>

                  {/* On-Site Order Section */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaStore style={{ color: 'red', fontSize: '24px', marginRight: '10px' }} />
                    <div>
                      <span style={{ fontSize: '16px' }}>On-Site Order</span>
                      <br />
                      <span style={{ fontSize: '20px', fontWeight: 'bold' }}>475</span>
                    </div>
                  </div>
                </div>

                {/* Right side: Pie chart */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: '250px', height: '250px' }}>
                    <Pie data={data} options={options} />
                  </div>
                </div>
              </div>
            </div>
        </div>
          
          
        {/* Popular Dishes Section */}
        <div
            className="col-md-5 col-sm-12 dishess"
            style={{
              backgroundColor: '#1F1D2B',
              padding: '20px',
              height : '730px',
              borderRadius: '8px',
            }}
          >
            <div className="popular-dishes-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2 style={{ color: 'white', fontSize: '1.2rem' }}>Popular Dishes</h2>
              <select
                style={{
                  backgroundColor: '#333',
                  color: 'white',
                  border: 'none',
                  padding: '5px',
                  borderRadius: '5px',
                  width:'150px'
                }}
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>

            {/* Headers for list columns */}
            <div
              className="dishes-list-headers"
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                color: '#bbb',
                fontSize: '15px',
                marginBottom: '10px',
                textAlign: 'center',
              }}
            >
            
            </div>

            {/* Popular Dishes List */}
            <div className="dishes-list">
              {dishes.map((dish, index) => (
                <div
                  className="dish-item"
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    borderBottom: '1px solid #bbb',
                    padding: '10px',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    textAlign: 'center',
                  }}
                >
                  {/* Dish Image and Name */}
                  <div style={{ flex: 1 }}>
                    <img src={dish.image} alt={dish.name} style={{ width: '50px', height: '50px', borderRadius: '5px' }} />
                    <div style={{ color: 'white', marginTop: '5px' }}>{dish.name}</div>
                  </div>

                  {/* Price with label above */}
                  <div style={{ flex: 1, color: '#bbb' }}>
                    <span style={{ fontSize: '12px' }}>Price</span>
                    <div style={{ fontSize: '17px', marginTop: '5px' }}>{dish.price}</div>
                  </div>

                  {/* Orders Per Day with label above */}
                  <div style={{ flex: 1, color: '#bbb' }}>
                    <span style={{ fontSize: '12px' }}>Orders/Day</span>
                    <div style={{ fontSize: '17px', marginTop: '5px' }}>{dish.orders}</div>
                  </div>

                  {/* Revenue Per Day with label above */}
                  <div style={{ flex: 1, color: '#bbb' }}>
                    <span style={{ fontSize: '12px' }}>Revenue/Day</span>
                    <div style={{ fontSize: '17px', marginTop: '5px' }}>{dish.revenue}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
      
        </div>
      </div>
    );
  };

  export default Dashboard;
