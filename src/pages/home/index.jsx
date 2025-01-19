import { auth } from "../../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { db } from "../../../config/firebaseConfig";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import loadingImage from "../../assets/loading.gif";

const Home = () => {
  const [cities, setCities] = useState([]);
  const [cityInfo, setCityInfo] = useState({ cityName: "", Country: "", Continent: "" });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //   handle frcging f data
  async function getCities() {
    try {
      const data = await getDocs(collection(db, "cities"));
      const citiesData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCities(citiesData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  // handle signout
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //   function to  add new document
  const handleCityInfo = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "cities"), cityInfo);

      getCities();
      alert("Added successfully");
    } catch (error) {
      console.log(error);
    }
    setCityInfo({ cityName: "", Country: "", Continent: "" });
  };

  //   fetching data from db

  useEffect(() => {
    getCities();
  }, []);

  // function to delete a document from firestore database

  const deleteCity = async (id) => {
    const city = doc(db, "cities", id);
    await deleteDoc(city);
    getCities();
  };

  //    function to update a city information

  return (
    <div>
      <div>
        <button onClick={handleSignOut}>Logout</button>
      </div>
      <div>
        <form onSubmit={handleCityInfo}>
          <div>Create new city info</div>
          <div>
            <input
              type="text"
              placeholder="City Name"
              value={cityInfo.cityName}
              onChange={(e) => {
                setCityInfo({ ...cityInfo, cityName: e.target.value });
              }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Country Name"
              value={cityInfo.Country}
              onChange={(e) => {
                setCityInfo({ ...cityInfo, Country: e.target.value });
              }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Continent Name"
              value={cityInfo.Continent}
              onChange={(e) => {
                setCityInfo({ ...cityInfo, Continent: e.target.value });
              }}
            />
          </div>
          <div>
            <button type="submit">Add Data</button>
          </div>
        </form>
      </div>
      <div></div>
      <div>
        <h2>List of Cities with Countries & Continents</h2>
        {loading ? (
          <div>
            <img src={loadingImage} alt="" />
          </div>
        ) : (
          <ul>
            {cities.map((city) => (
              <li key={city.id}>
                {" "}
                City name :{city.cityName}, Country name : {city.Country}, located in {city.Continent}.{" "}
                <button onClick={() => deleteCity(city.id)}>delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Home;
