import React, { useState } from "react";

export default function Roles() {
  const [roles, setRoles] = useState([
    {
      name: "Admin",
      permissions: {
        tickets: "full",
        assets: "full",
        contracts: "full",
        users: "full"
      }
    },
    {
      name: "Editor",
      permissions: {
        tickets: "edit",
        assets: "edit",
        contracts: "view",
        users: "none"
      }
    },
    {
      name: "Viewer",
      permissions: {
        tickets: "view",
        assets: "view",
        contracts: "view",
        users: "none"
      }
    }
  ]);

  const permissionOptions = ["none", "view", "edit", "full"];

  const handleChange = (roleIndex, module, value) => {
    const updated = [...roles];
    updated[roleIndex].permissions[module] = value;
    setRoles(updated);
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Roles & Permissions</h3>

      <div className="card shadow-sm rounded-4 p-3">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Role</th>
              <th>Tickets</th>
              <th>Assets</th>
              <th>Contracts</th>
              <th>Users</th>
            </tr>
          </thead>

          <tbody>
            {roles.map((role, i) => (
              <tr key={i}>
                <td className="fw-semibold">{role.name}</td>

                {Object.keys(role.permissions).map((module) => (
                  <td key={module}>
                    <select
                      className="form-select form-select-sm"
                      value={role.permissions[module]}
                      onChange={(e) =>
                        handleChange(i, module, e.target.value)
                      }
                    >
                      {permissionOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}