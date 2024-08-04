import { useEffect, useState } from "react";
import Form from "../components/Form"
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const profilesPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem('profiles')) || [];
    setProfiles(storedProfiles);
  }, []);


  const handleSave = (profile) => {
    let updatedProfiles;
    if (editingIndex !== null) {
      // Update existing profile
      updatedProfiles = profiles.map((p, index) =>
        index === editingIndex ? profile : p
      );
      setEditingIndex(null); // Reset editing index after update
    } else {
      // Add new profile
      updatedProfiles = [...profiles, profile];
    }

    setProfiles(updatedProfiles);
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
  };

  const handleDelete = (index) => {
    const updatedProfiles = profiles.filter((_, i) => i !== index);
    setProfiles(updatedProfiles);
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    console.log('Edit profile at index:', index);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * profilesPerPage;
  const endIndex = startIndex + profilesPerPage;
  const currentProfiles = profiles.slice(startIndex, endIndex);
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="border border-primary p-7 rounded-md mb-10 flex flex-col items-center">
          <h1 className="text-2xl font-semibold mb-3">Add Profile</h1>
          <Form onSave={handleSave} editingProfile={profiles[editingIndex]} />
        </div>
        <div className="border p-7 border-primary rounded-md">
          <Button className='btn btn-ghost mb-2' onClick={() => navigate('/profiles')}>View All Profiles</Button>
          <Table profiles={currentProfiles} onDelete={handleDelete} onEdit={handleEdit} />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(profiles.length / profilesPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  )
}

export default Home