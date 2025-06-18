import React from 'react';

const MainComponent = () => { 
  
  return ( <div className="container mt-5"> <h1 className="text-center fw-bold text-danger text-decoration-underline mb-4"> Welcome to RESTOCK ALERT </h1> <p className="text-center fw-bold text-success text-decoration-underline mb-5"> This is your smart inventory dashboard. </p>


<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
    <div className="col">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Product List</h5>
          <p className="card-text">View and manage all the available products sorted by expiry.</p>
          <button className="btn btn-primary" >View</button>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Add Product</h5>
          <p className="card-text">Add a new product with details like name, rack number, and expiry date.</p>
          <button className="btn btn-primary">Go</button>
        </div>
      </div>
    </div>
    
    <div className="col">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Edit Product</h5>
          <p className="card-text">Update product information like rack or expiry date.</p>
          <button className="btn btn-secondary">Edit</button>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Notifications</h5>
          <p className="card-text">Get alerts when racks are low on stock or nearing expiry.</p>
          <button className="btn btn-warning">Check</button>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Settings</h5>
          <p className="card-text">Customize your dashboard preferences and notification options.</p>
          <button className="btn btn-dark">Settings</button>
        </div>
      </div>
    </div>
  </div>
</div>

); };

export default MainComponent;