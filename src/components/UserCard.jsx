function UserCard({ user }) {
  console.log("card", user);
  const { name, emailId, about } = user;

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
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
