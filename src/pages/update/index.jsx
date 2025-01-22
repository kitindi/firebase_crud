import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";

const UpdateCity = () => {
  const [cityInfo, setCityInfo] = useState({ cityName: "", Country: "", Continent: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "cities", id); // Reference to the document
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCityInfo(docSnap.data()); // Set form data with the document data
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [id]);

  //   Shorthand function to handling change events on form input
  // Handle form input changes
  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   };

  const handleUpdateCity = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "cities", id); // Reference to the document
      await updateDoc(docRef, cityInfo); // Update Firestore document

      navigate("/home"); // Redirect to another page (e.g., home page) after update
    } catch (error) {
      if (error.code === "permission-denied") {
        setError("You do not have permission to update this document.");
      }
    }
  };

  return (
    <div>
      <h1>Update the City Information</h1>
      <div>
        <form onSubmit={handleUpdateCity}>
          <div>Create new city info</div>
          <div>
            <input
              type="text"
              placeholder="City Name"
              value={cityInfo?.cityName}
              onChange={(e) => {
                setCityInfo({ ...cityInfo, cityName: e.target.value });
              }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Country Name"
              value={cityInfo?.Country}
              onChange={(e) => {
                setCityInfo({ ...cityInfo, Country: e.target.value });
              }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Continent Name"
              value={cityInfo?.Continent}
              onChange={(e) => {
                setCityInfo({ ...cityInfo, Continent: e.target.value });
              }}
            />
          </div>
          <div>
            <button type="submit">Update City</button>
            {error && (
              <p style={{ color: "red" }}>
                Error: {error} <Link to="/home">Back Home</Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCity;
