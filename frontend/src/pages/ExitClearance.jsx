import React, { useState } from "react";

export default function ExitClearance() {
  const [requests, setRequests] = useState([
    {
      id: "EXT-001",
      employee: "John Doe",
      status: "Pending",
      steps: {
        hr: "Approved",
        it: "Pending",
        admin: "Pending"
      }
    },
    {
      id: "EXT-002",
      employee: "Priya",
      status: "Pending",
      steps: {
        hr: "Approved",
        it: "Approved",
        admin: "Pending"
      }
    }
  ]);

  const handleApprove = (id, step) => {
    setRequests(prev =>
      prev.map(req => {
        if (req.id !== id) return req;

        const updatedSteps = { ...req.steps, [step]: "Approved" };

        const allApproved = Object.values(updatedSteps).every(
          s => s === "Approved"
        );

        return {
          ...req,
          steps: updatedSteps,
          status: allApproved ? "Completed" : "Pending"
        };
      })
    );
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4 fw-bold">Exit Clearance</h3>
        <p className="text-muted small">
          HR → IT → Admin approval workflow
        </p>
      <div className="card shadow-sm rounded-4">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>HR</th>
                <th>IT</th>
                <th>Admin</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {requests.map(req => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.employee}</td>

                  {/* HR */}
                  <td>
                    {req.steps.hr === "Approved" ? (
                      <span className="badge bg-success">Approved</span>
                    ) : (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleApprove(req.id, "hr")}
                      >
                        Approve
                      </button>
                    )}
                  </td>

                  {/* IT */}
                  <td>
                    {req.steps.it === "Approved" ? (
                      <span className="badge bg-success">Approved</span>
                    ) : (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleApprove(req.id, "it")}
                      >
                        Approve
                      </button>
                    )}
                  </td>

                  {/* Admin */}
                  <td>
                    {req.steps.admin === "Approved" ? (
                      <span className="badge bg-success">Approved</span>
                    ) : (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleApprove(req.id, "admin")}
                      >
                        Approve
                      </button>
                    )}
                  </td>

                  <td>
                    <div className="d-flex flex-column gap-1">

                      {/* Status */}
                      <span
                        className={`badge ${
                          req.status === "Completed"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {req.status}
                      </span>

                      {/* Progress Bar */}
                      <div className="progress" style={{ height: "6px" }}>
                        <div
                          className="progress-bar bg-success"
                          style={{
                            width: `${
                              (Object.values(req.steps).filter(s => s === "Approved").length / 3) * 100
                            }%`
                          }}
                        ></div>
                      </div>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}