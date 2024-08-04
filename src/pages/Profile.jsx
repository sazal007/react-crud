import { useEffect, useState } from "react";
import Table from "../components/Table"
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem('profiles')) || [];
    setProfiles(storedProfiles);
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <Button className='btn btn-ghost' onClick={() => navigate('/')}>Back</Button>
        <h1 className="text-2xl font-semibold mb-4 text-center">Profiles</h1>
        <Table profiles={profiles} onDelete={() => { }} onEdit={() => { }} />
      </div>
    </>
  )
}

export default Profile