import { auth } from "../../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { db } from "../../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //   fetching data from db

  useEffect(() => {
    async function getCities() {
      try {
        const data = await getDocs(collection(db, "cities"));
        const citiesData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCities(citiesData);
      } catch (error) {
        console.log(error);
      }
    }
    getCities();
  }, []);

  console.log(cities);
  return (
    <div>
      <div>
        <button onClick={handleSignOut}>Logout</button>
      </div>
      <div>
        <h2>List of Cities with Countries & Continents</h2>
        <ul>
          {cities.map((city) => (
            <li key={city.id}>
              {" "}
              City name :{city.cityName}, Country name : {city.Country}, located in {city.Continent}.
            </li>
          ))}
        </ul>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
