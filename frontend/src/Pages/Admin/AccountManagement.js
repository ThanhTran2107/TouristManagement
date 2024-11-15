import React, { useState, useEffect } from "react";
import AccountService from "../../Services/AccountService"; // Nhập đối tượng AccountService
import searchIcon from "../../images/search-icon.png"; // Nhập hình ảnh kính lúp

const AccountManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await AccountService.getAllUsers(); // Gọi phương thức getAllUsers
        setAccounts(response.data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const handleSearch = () => {
    alert(`Searching for: ${searchTerm}`);
  };

  return (
    <div style={Styles.container}>
      <h2 style={Styles.title}>Account Management</h2>
      <div style={Styles.searchContainer}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={Styles.searchInput}
        />
        <button onClick={handleSearch} style={Styles.searchButton}>
          <img src={searchIcon} alt="Search" style={Styles.icon} />
        </button>
      </div>
      <table style={Styles.table}>
        <thead>
          <tr>
            <th style={Styles.th}>ID</th>
            <th style={Styles.th}>First Name</th>
            <th style={Styles.th}>Last Name</th>
            <th style={Styles.th}>Email</th>
            <th style={Styles.th}>Date of Birth</th>
            <th style={Styles.th}>Address</th>
            <th style={Styles.th}>Phone Number</th>
            <th style={Styles.th}>Role</th>
          </tr>
        </thead>
        <tbody>
          {accounts.length > 0 ? (
            accounts.map((account, index) => ( // Thêm index vào đây
              <tr key={account.id} style={Styles.row}>
                <td style={Styles.td}>{index + 1}</td> {/* Sử dụng index + 1 để hiển thị ID */}
                <td style={Styles.td}>{account.firstName}</td>
                <td style={Styles.td}>{account.lastName}</td>
                <td style={Styles.td}>{account.email}</td>
                <td style={Styles.td}>{account.dob}</td>
                <td style={Styles.td}>{account.address}</td>
                <td style={Styles.td}>{account.phoneNo}</td>
                <td style={Styles.td}>{account.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={Styles.td}>No accounts found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const Styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    background: `linear-gradient(to right, #D2DAFF, #EFEFEF, #B1B2FF)`,
    minHeight: "100vh",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "10px",
  },
  searchInput: {
    marginTop: "10px",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "10px",
    marginRight: "2px",
    width: "250px",
    outline: "none",
  },
  searchButton: {
    marginTop: "10px",
    padding: "10px",
    fontSize: "1rem",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  icon: {
    width: "25 px",
    height: "25px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #ddd",
  },
  th: {
    backgroundColor: "#f2f2f2",
    padding: "10px",
    border: "1px solid #ddd",
    paddingBottom: "15px",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
  },
  row: {
    transition: "background-color 0.3s",
  },
};

export default AccountManagement;