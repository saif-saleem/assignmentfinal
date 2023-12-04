import React, { useEffect, useState } from "react";
import "./login.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Home = () => {
  const [data, setData] = useState("");
  const [label, setLabel] = useState({});
  const [radio, setRadio] = useState(true);
  const [input, setInput] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [customInput, setCustomInput] = useState();
  const [chargeCustomers, setChargeCustomers] = useState();
  const [regularSongs, SetRegularSongs] = useState([]);
  const [cat7, SetCat7] = useState();
  const [cat8, SetCat8] = useState();
  const [cat9, SetCat9] = useState();
  const [cat10, SetCat10] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardResponse = await fetch(
          "http://localhost:5000/account/admin/login/3"
        );
        const result = await dashboardResponse.json();

        setData(result.data);
        setLabel(result.data.amount);
        setChargeCustomers(result.data.charge_customers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(data);
  console.log(label);
  console.log(regularSongs);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
    scales: {
      xAxes: [
        {
          barThickness: 10,
          maxBarThickness: 12,
        },
      ],
      // yAxes: [{}],
    },
  };

  function handleRadioButton(value) {
    setChargeCustomers(value);
    setIsButtonActive(value);
  }

  const handleSetCustomLabel = (event) => {
    setCustomInput(event.target.value);
    const value = event.target.value;
    setIsButtonActive(Number(value) > 99);
  };

  const handleSetCat7 = (event) => {
    SetCat7(event.target.value);
    const value = event.target.value;
    // setIsButtonActive(Number(value) > 79);
  };

  const handleSetCat8 = (event) => {
    SetCat8(event.target.value);
    const value = event.target.value;
    // setIsButtonActive(Number(value) > 59);
  };

  const handleSetCat9 = (event) => {
    SetCat9(event.target.value);
    const value = event.target.value;
    // setIsButtonActive(Number(value) > 39);
  };

  const handleSetCat10 = (event) => {
    SetCat10(event.target.value);
    const value = event.target.value;
    setIsButtonActive(
      Number(value) > 19 && cat7 > 79 && cat8 > 59 && cat9 > 39
    );
  };

  const handleSubmit = async () => {
    try {
      // const reqBody = {};
      const updatedData = {
        amount: {
          category_6: customInput,
        },
        // other data properties...
      };
      const response = await fetch(
        "http://localhost:5000/account/admin/update/3",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const res = response.json();
      console.log(res);

      if (res.status === 200) {
        // Redirect to the home page upon successful login

        setCustomInput(res.data.amount.category_6);
        console.log("redirecting");
      } else {
        console.log("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }

    window.location.reload();
  };

  const dataForGraph = (label) => {
    const labels = [
      "Custom",
      "Category1",
      "Category2",
      "Category3",
      "Category4",
    ];
    // console.log(labelsForGraph);
    return {
      labels,
      datasets: [
        {
          data: Object.values(label),
          backgroundColor: "#f0c3f1",
        },
      ],
    };
  };

  return (
    <div className="home">
      {/* Render your data here */}
      {data && (
        <h1 className="home">
          {data.name},{data.location} on Dhun Jam
        </h1>
      )}

      <div className="col">
        <div className="row">
          Do you want to charge your customer for requesting Songs?
          <label>
            Yes
            <input
              type="radio"
              checked={chargeCustomers === true}
              onChange={() => handleRadioButton(true)}
            />
          </label>
          <label>
            No
            <input
              type="radio"
              checked={chargeCustomers === false}
              onChange={() => handleRadioButton(false)}
            />
          </label>
        </div>
        <div className="row">
          Custom Song For request amount -
          <label>
            <input
              className="text-input"
              type="text"
              placeholder="Enter custom Input"
              value={customInput}
              onChange={handleSetCustomLabel}
              disabled={!chargeCustomers}
            />
          </label>
        </div>
        <div className="row">
          Regular Songs request from High to Low
          <label>
            <input
              className="songs-input"
              type="text"
              placeholder=""
              value={cat7}
              onChange={handleSetCat7}
              disabled={!chargeCustomers}
            />
            <input
              className="songs-input"
              type="text"
              placeholder=""
              value={cat8}
              onChange={handleSetCat8}
              disabled={!chargeCustomers}
            />
            <input
              className="songs-input"
              type="text"
              placeholder=""
              value={cat9}
              onChange={handleSetCat9}
              disabled={!chargeCustomers}
            />
            <input
              className="songs-input"
              type="text"
              placeholder=""
              value={cat10}
              onChange={handleSetCat10}
              disabled={!chargeCustomers}
            />
          </label>
        </div>
      </div>

      {chargeCustomers && (
        <div>
          <Bar data={dataForGraph(label)} options={options} />
          <br></br>
        </div>
      )}
      <button
        className="save-button"
        onClick={handleSubmit}
        disabled={!isButtonActive}
      >
        Save
      </button>
    </div>
  );
};

export default Home;
