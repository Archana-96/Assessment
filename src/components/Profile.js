import React from "react";

const Profile = () => {
  return (
    <div>
      <h4>Your profle</h4>
      <h6 className="profile-name">John Doe</h6>
      <h6>Contact Information</h6>
      <ul>
        <li>
          <strong>Email:</strong> name@example.com
        </li>
        <li>
          <strong>Phone:</strong> +1-234-567-890
        </li>
        <li>
          <strong>Location:</strong> San Francisco, CA
        </li>
      </ul>
      <h6>Saved Address</h6>
      <p>
        Flat No :123 ,Flat Name
        <br />
        Street Name , Location
        <br />
        City,
        <br />
        Country
        <br />
        Pin: 4364377
      </p>
    </div>
  );
};

export default Profile;
