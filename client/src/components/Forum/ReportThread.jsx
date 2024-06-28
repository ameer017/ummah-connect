import React, { useState, useEffect } from "react";
import axios from "axios";
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const ReportThread = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${URL}/discussion/reports`);
        setReports(response.data.reports);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleUpdateReportStatus = async (reportId, status) => {
    try {
      const response = await axios.put(
        `${URL}/discussion/reports/${reportId}`,
        { status }
      );
      setReports(
        reports.map((report) =>
          report._id === reportId ? response.data : report
        )
      );
    } catch (error) {
      console.error("Error updating report status:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Reported Threads</h1>
      {reports.length > 0 ? (
        <ul className="mb-4">
          {reports.map((report) => (
            <li key={report._id} className="mb-2 p-2 border rounded">
              <p className="text-gray-700">Thread ID: {report.thread}</p>
              <p className="text-gray-700">
                Reported By: {report.reportedBy.username}
              </p>
              <p className="text-red-500 text-sm">Reason: {report.reason}</p>
              <p className="text-gray-500 text-sm">Status: {report.status}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() =>
                    handleUpdateReportStatus(report._id, "approved")
                  }
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    handleUpdateReportStatus(report._id, "disapproved")
                  }
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Disapprove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reports available.</p>
      )}
    </div>
  );
};

export default ReportThread;
