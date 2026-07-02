function UserCard({ user }) {
  const { name, emailId, about } = user;

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMCm1-BoxgbtmNzHpZW1vNRQ1AHCg_UV_uBdtFMuCYng&s=10"
          alt="Photo"
        />
      </figure>
      <div className="card-body bg-base-300">
        <h2 className="card-title">
          {name} <span className="text-sm">({emailId})</span>
        </h2>
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary">Ignored</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
