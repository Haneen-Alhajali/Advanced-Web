import React, { useCallback, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import styles from "../assets/css/sections/overview.module.css";
import { useMemo } from "react";
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PieController,
  DoughnutController,
  BarController,
} from "chart.js";
Chart.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PieController,
  DoughnutController,
  BarController
);

const Overview = () => {
  /*
  localStorage.removeItem("dataVillage");
  const datavillgeUpdate = [
    {
      id: 1,
      name: "Jabalia",
      Region: "- Gaza Strip",
      land: 10,
      Latitude: 31.6,
      Longitude: 35.22,
      Tags: "undifined",
      img: "https://via.placeholder.com/100",
      population: "4",
      age: [5, 75, 5, 5],
      gender: [30, 70],
      growthRate: 31.6,
      Urban: true,
    },
    {
      id: 2,
      name: "Beit Lahia",
      Region: "- Gaza Strip",
      land: 15,
      Latitude: 31.5,
      Longitude: 34.4,
      Tags: "undifined",
      img: "https://via.placeholder.com/100",
      population: "3",
      age: "30,60,10",
      gender: 20,
      growthRate: 38,
      Urban: true,
    },
    {
      id: 3,
      name: "Quds",
      Region: "- West Bank",
      land: 17,
      Latitude: 31.76,
      Longitude: 35.21,
      Tags: "undifined",
      img: "https://via.placeholder.com/100",
      population: "6",
      age: "30,60,10",
      gender: 50,
      growthRate: 64.01,
      Urban: false,
    },
    {
      id: 4,
      name: "Shejaiya",
      Region: "- Gaza Strip",
      land: 33,
      Latitude: 31.26,
      Longitude: 35.0,
      Tags: "undifined",
      img: "https://via.placeholder.com/100",
      population: "11",
      age: "30,60,10",
      gender: 90,
      growthRate: 8.3,
      Urban: true,
    },
  ];

  localStorage.setItem("dataVillage", JSON.stringify(datavillgeUpdate));
*/
  const googleMapsApiKey = "AIzaSyAywsxQ1DTWXBu1k6GonbudlIYXdQXdOdA";
  useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
  });

  const center = {
    lat: 31.7683,
    lng: 35.2137,
  };

  const onMapLoad = useCallback((map) => {
    console.log("Map Loaded", map);
  }, []);

  const dataVillage = useMemo(() => {
    return JSON.parse(localStorage.getItem("dataVillage")) || [];
  }, []);

  const firstVillageAge = dataVillage[0].age;
  const firstVillageGender = dataVillage[0].gender;
  const villageNames = dataVillage.map((village) => village.name);
  const villagePopulations = dataVillage.map((village) =>parseFloat(village.population));

  useEffect(() => {
    // Destroy previous charts if any
    if (ageChartRef.current) ageChartRef.current.destroy();
    if (genderChartRef.current) genderChartRef.current.destroy();
    if (barChartRef.current) barChartRef.current.destroy();

    const ageCtx = document.getElementById("ageChart").getContext("2d");
    ageChartRef.current = new Chart(ageCtx, {
      type: "pie",
      data: {
        labels: ["0-18", "19-35", "36-50", "51+"],
        datasets: [
          {
            label: "Age Distribution",
            data: firstVillageAge,
            backgroundColor: [
              "#a74c65",
              "#2f71a3",
              "#a58c4d",
              "#3c8489",
              "#684eaf",
            ],
          },
        ],
      },
    });

    // Gender Ratios Chart
    const genderCtx = document.getElementById("genderChart").getContext("2d");
    genderChartRef.current = new Chart(genderCtx, {
      type: "pie",
      data: {
        labels: ["Male", "Female"],
        datasets: [
          {
            label: "Gender Ratios",
            data: firstVillageGender,
            backgroundColor: ["#2f71a3", "#a74c65"],
          },
        ],
      },
    });

    // Bar Chart
    const barCtx = document.getElementById("barChart").getContext("2d");
    barChartRef.current = new Chart(barCtx, {
      type: "bar",
      data: {
        labels: villageNames,
        datasets: [
          {
            label: "Population",
            data: villagePopulations,
            borderColor: ["rgba(38,171,174,255)"],
            backgroundColor: ["rgba(56,94,106,255)"],
            borderWidth: 1,
          },
        ],
      },
    });
    return () => {
      if (ageChartRef.current) ageChartRef.current.destroy();
      if (genderChartRef.current) genderChartRef.current.destroy();
      if (barChartRef.current) barChartRef.current.destroy();
    };
  }, [firstVillageAge,firstVillageGender,villageNames,villagePopulations]);


  const ageChartRef = useRef(null);
  const genderChartRef = useRef(null);
  const barChartRef = useRef(null);
  
  const totalVillages = dataVillage.length;
  const totalUrbanAreas = dataVillage.filter((village) => village.Urban === true).length;
  const totalPopulation = dataVillage.reduce((sum, village) => sum + parseFloat(village.population),0);
  const averageLandArea = dataVillage.reduce((sum, village) => sum + village.land, 0) / totalVillages;

  const locations = dataVillage.map((village) => ({
    id: village.id,
    name: village.name,
    lat: parseFloat(village.Latitude),
    lng: parseFloat(village.Longitude),
  }));
  //console.log("Locations:", locations);

  /*  const locations = [
    { id: 1, name: "Jabalia", lat: 31.6, lng: 35.2245 },
    { id: 2, name: "Beit Lahia", lat: 31.55, lng: 35.25 },
    { id: 3, name: "Quds", lat: 31.7683, lng: 35.2137 },
    { id: 4, name: "Shejaiya", lat: 31.52, lng: 35.21 },
  ];
  console.log("Locations:", locations);
*/
  return (
    <div className={styles.overview}>
      <h1>Overview</h1>
      <div id="map" className={styles.map}>
        <GoogleMap
          mapContainerStyle={{ width: "78vw", height: "20vw" }}
          zoom={10}
          center={center}
          onLoad={onMapLoad}
        >
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              title={location.name}
            />
          ))}
        </GoogleMap>
      </div>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <p>Total Number of Villages: {totalVillages}</p>
        </div>
        <div className={styles.statItem}>
          <p>Total Number of Urban Areas: {totalUrbanAreas}</p>
        </div>
        <div className={styles.statItem}>
          <p>Total Population Size: {totalPopulation}</p>
        </div>
        <div className={styles.statItem}>
          <p>Average Land Area: {averageLandArea} sq km</p>
        </div>
      </div>
      <div className={styles.charts}>
        <div className={styles.chartContainer}>
          <h3>Age Distribution</h3>
          <canvas id="ageChart" />
        </div>
        <div className={styles.chartContainer}>
          <h3>Gender Ratios</h3>
          <canvas id="genderChart" />
        </div>
      </div>
      <div className={styles.barChartContainer}>
        <div className="barChart">
          <canvas id="barChart" />
        </div>
      </div>
    </div>
  );
};

export default Overview;
