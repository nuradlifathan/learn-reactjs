import "./Profile.css"

const Profile = (props) => {
  return (
    <div className="tagH">
      <h1>Full Name: {props.fullName}</h1>
      <h1>Position: {props.position}</h1>
      <h1>Age: {props.age}</h1>
    </div>
  )
}

export default Profile
