import Button from "./Button"

// eslint-disable-next-line react/prop-types
const Table = ({ profiles, onDelete, onEdit }) => {
  return (
    <>
      <div className="overflow-x-auto w-[90%] border shadow-sm mx-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-primary text-white text-center">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>DOB</th>
              <th>City</th>
              <th>District</th>
              <th>Province</th>
              <th>Country</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="bg-slate-50 text-center">
            {/* row */}
            {/* eslint-disable-next-line react/prop-types */}
            {profiles.map((profile, index) => (
              <tr className='' key={index}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12 ">
                        {profile.profilePicture && (
                          <img
                            src={profile.profilePicture}
                            alt={`${profile.name}'s Profile`}
                            className="w-16 h-16 rounded-xl object-cover "
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{profile.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {profile.email}
                </td>
                <td>{profile.phone}</td>
                <td>{profile.dob}</td>
                <td>{profile.city}</td>
                <td>{profile.district}</td>
                <td>{profile.province}</td>
                <td>{profile.country}</td>
                <th>
                  <Button onClick={() => onEdit(index)} className="mr-2 btn btn-warning">
                    Edit
                  </Button>
                  <Button onClick={() => onDelete(index)} className='btn btn-error'>Delete</Button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Table