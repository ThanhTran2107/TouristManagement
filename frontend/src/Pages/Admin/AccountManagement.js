import React, { useState, useEffect } from "react";
import AccountService from "../../Services/AccountService";
import searchIcon from "../../images/search-icon.png";
import refreshIcon from "../../images/refresh.png";
import deleteIcon from "../../images/delete.jpg";

const AccountManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [roleFilter, setRoleFilter] = useState("USER");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [newRole, setNewRole] = useState("USER");
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [accountToDelete, setAccountToDelete] = useState(null); 

  const fetchAccounts = async () => {
    try {
      const response = await AccountService.getAllUsers();
      setAccounts(response.data);
      setFilteredAccounts(response.data.filter(account => account.role === roleFilter));
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [roleFilter]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, accounts]);

  const handleSearch = () => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = accounts.filter((account) => {
      const matchesRole = roleFilter === "ALL" || account.role === roleFilter;
      const matchesSearchTerm =
        account.firstName.toLowerCase().includes(lowercasedFilter) ||
        account.lastName.toLowerCase().includes(lowercasedFilter) ||
        account.email.toLowerCase().includes(lowercasedFilter) ||
        account.phoneNo.toString().includes(searchTerm) ||
        account.address.toLowerCase().includes(lowercasedFilter) ||
        account.dob.toLowerCase().includes(lowercasedFilter);

      return matchesRole && matchesSearchTerm;
    });
    setFilteredAccounts(filteredData);
  };

  const handleRefresh = () => {
    fetchAccounts(); 
    setSearchTerm("");
    setRoleFilter("USER");
  };

  const handleRowClick = (account) => {
    setSelectedAccount(account);
    setNewRole(account.role);
    setSelectedRowId(account.id);
  };

  const handleRoleChange = async (e) => {
    e.preventDefault();
    try {
      const response = await AccountService.updateUserRole(selectedAccount.email, newRole);
      console.log("Response from API:", response.data);
      fetchAccounts();
      setSelectedAccount(null);
      setSelectedRowId(null); 
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await AccountService.deleteUserByEmai(accountToDelete.email);
      fetchAccounts();
      setShowDeleteModal(false);
      setAccountToDelete(null);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
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
        <button
          style={Styles.searchButton}
          onClick={handleSearch}
        >
          <img src={searchIcon} alt="Search" style={Styles.icon} />
        </button>
        <button
          style={Styles.refreshButton}
          onClick ={handleRefresh}
        >
          <img src={refreshIcon} alt="Refresh" style={Styles.icon} />
        </button>
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            handleSearch();
          }}
          style={Styles.cbxRole}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
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
            <th style={Styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((account, index) => (
              <tr
                key={account.id}
                style={{
                  ...Styles.row,
                  backgroundColor: selectedRowId === account.id ? '#d1e7dd' : 'transparent',
                }}
                onClick={() => handleRowClick(account)} 
              >
                <td style={Styles.td}>{index + 1}</td>
                <td style={Styles.td}>{account.firstName}</td>
                <td style={Styles.td}>{account.lastName}</td>
                <td style={Styles.td}>{account.email}</td>
                <td style={Styles.td}>{account.dob}</td>
                <td style={Styles.td}>{account.address}</td>
                <td style={Styles.td}>{account.phoneNo}</td>
                <td style={Styles.td}>{account.role}</td>
                <td style={Styles.td}>
                  <button
                    style={Styles.deleteButton}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click
                      setAccountToDelete(account);
                      setShowDeleteModal(true);
                    }}
                  >
                    <img src={deleteIcon} alt="Delete" style={Styles.deleteIcon} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={Styles.td}>No accounts found</td>
            </tr>
          )}
        </tbody>
      </table>
      {selectedAccount && (
        <>
          <div style={Styles.overlay} />
          <div style={Styles.modal}>
            <h3><b>Change Role for {selectedAccount.firstName} {selectedAccount.lastName}</b></h3>
            <form onSubmit={handleRoleChange}>
              <select value={newRole} onChange={(e) => setNewRole(e.target.value)} style={Styles.roleSelect}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              <button
                type="submit"
                style={Styles.submitButton}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "green"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedAccount(null);
                  setSelectedRowId(null);
                }}
                style={Styles.cancelButton}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#892318"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#e02c18"}
              >
                Cancel
              </button>
            </form>
          </div>
        </>
      )}
      {showDeleteModal && (
        <>
          <div style={Styles.overlay} />
          <div style={Styles.modal}>
            <h3><b>Delete This Account? {accountToDelete.firstName} {accountToDelete.lastName}</b></h3>
            <button
              onClick={handleDeleteAccount}
              style={Styles.submitButton}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "green"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setAccountToDelete(null);
              }}
              style={Styles.cancelButton}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#892318"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#e02c18"}
            >
              Cancel
            </button>
          </div>
        </>
      )}
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
    roleSelect: {
      marginTop: "10px",
      padding: "10px",
      fontSize: "1rem",
      border: "1px solid #ddd",
      borderRadius: "10px",
      marginRight: "10px",
      width: "200px",
      outline: "none",
    },
    cbxRole: {
      marginTop: "10px",
      padding: "10px",
      fontSize: "1rem",
      border: "1px solid #ddd",
      borderRadius: "10px",
      marginLeft: "935px",
      width: "200px",
      outline: "none",
    },
    searchButton: {
      marginTop: "10px",
      padding: "10px",
      fontSize: "1rem",
      border: "none",
      backgroundColor: "transparent",
      cursor: "pointer",
      transition: "background-color 0.3s, transform 0.3s",
    },
    refreshButton: {
      marginTop: "10px",
      padding: "10px",
      fontSize: "1rem",
      border: "none",
      backgroundColor: "transparent",
      cursor: "pointer",
      marginLeft: "5px",
      transition: "background-color 0.3s, transform 0.3s",
    },
    icon: {
      width: "25px",
      height: "25px",
    },
    deleteIcon: {
      width: "35px",
      height: "35px",
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
      cursor: "pointer",
    },
    modal: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      padding: "20px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
      borderRadius: "20px",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 999,
    },
    submitButton: {
      marginTop: "10px",
      padding: "10px",
      fontSize: "1rem",
      border: "none",
      backgroundColor: "#4CAF50",
      color: "white",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "background-color 0.3s, transform 0.3s",
    },
    cancelButton: {
      marginTop: "10px",
      padding: "10px",
      fontSize: "1rem",
      border: "none",
      backgroundColor: "#e02c18",
      color: "white",
      borderRadius: "5px",
      cursor: "pointer",
      marginLeft: "10px",
      fontWeight: "bold",
      transition: "background-color 0.3s, transform 0.3s",
    },
    deleteButton: {
      padding: "10px",
      border: "none",
      backgroundColor: "transparent",
      cursor: "pointer",
      transition: "background-color 0.3s, transform 0.3s",
    },
  };
  
  // Thêm hiệu ứng hover cho nút xóa
  const deleteButtonHoverStyle = {
    backgroundColor: "#f8d7da", // Màu nền khi hover
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Hiệu ứng bóng khi hover
  };
  
  export default AccountManagement;