import { useState } from 'react';

const CitizenDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [pnrNumber, setPnrNumber] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [complaints, setComplaints] = useState([
    { id: 1, category: 'Education', status: 'Resolved', details: 'Complaint about school facilities.' },
    { id: 2, category: 'Railways', status: 'Pending', details: 'Issue with train punctuality.' },
  ]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Complaint Submitted:', { selectedCategory, pnrNumber, description, file });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Citizen Dashboard</h1>

      {/* File a New Complaint */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">File a New Complaint</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="category" className="block text-lg font-medium">Complaint Category</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            >
              <option value="">Select Category</option>
              <option value="Education">Education</option>
              <option value="Railways">Railways</option>
              {/* Add more categories as needed */}
            </select>
          </div>

          {selectedCategory === 'Railways' && (
            <div>
              <label htmlFor="pnrNumber" className="block text-lg font-medium">PNR Number</label>
              <input
                type="text"
                id="pnrNumber"
                value={pnrNumber}
                onChange={(e) => setPnrNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter PNR Number"
              />
            </div>
          )}

          <div>
            <label htmlFor="description" className="block text-lg font-medium">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Describe your complaint"
            />
          </div>

          <div>
            <label htmlFor="file" className="block text-lg font-medium">Upload Supporting Documents</label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit Complaint
          </button>
        </form>
      </section>

      {/* View Existing Complaints */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Complaints</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Details</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td className="px-4 py-2 border">{complaint.id}</td>
                  <td className="px-4 py-2 border">{complaint.category}</td>
                  <td className="px-4 py-2 border">{complaint.status}</td>
                  <td className="px-4 py-2 border">{complaint.details}</td>
                  <td className="px-4 py-2 border">
                    <button className="text-blue-500 hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Repost Similar Complaint */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Repost Similar Complaint</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="trainNumber" className="block text-lg font-medium">Train Number</label>
            <input
              type="text"
              id="trainNumber"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter Train Number"
            />
          </div>

          <div>
            <label htmlFor="complaintDate" className="block text-lg font-medium">Date of Incident</label>
            <input
              type="date"
              id="complaintDate"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <button
            type="button"
            className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Repost Complaint
          </button>
        </form>
      </section>
    </div>
  );
};

export default CitizenDashboard;
 
